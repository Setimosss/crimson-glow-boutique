 import { createContext, useContext, useState, useEffect, ReactNode } from "react";
 import { Product } from "@/types/database";
 import { useToast } from "@/hooks/use-toast";
 import { supabase } from "@/integrations/supabase/client";

 interface CartItem {
   id: string;
   product_id: string;
   quantity: number;
   size: string | null;
   color: string | null;
   product?: Product;
 }
 
 const CART_STORAGE_KEY = "treadtrendz_cart";

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (productId: string, quantity: number, size?: string, color?: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

 export const CartProvider = ({ children }: { children: ReactNode }) => {
   const [items, setItems] = useState<CartItem[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const { toast } = useToast();
 
   // Load cart from localStorage on mount
   useEffect(() => {
     const loadCart = async () => {
       setIsLoading(true);
       const stored = localStorage.getItem(CART_STORAGE_KEY);
       if (stored) {
         try {
           const parsedItems = JSON.parse(stored) as CartItem[];
           // Fetch product details for each item
           const productIds = parsedItems.map(item => item.product_id);
           if (productIds.length > 0) {
             const { data: products } = await supabase
               .from("products")
               .select("*")
               .in("id", productIds);
             
             const itemsWithProducts = parsedItems.map(item => {
               const dbProduct = products?.find(p => p.id === item.product_id);
               if (!dbProduct) return { ...item, product: undefined };
               const product: Product = {
                 ...dbProduct,
                 colors: (dbProduct.colors as unknown as Product["colors"]) || [],
               };
               return { ...item, product };
             });
             setItems(itemsWithProducts);
           }
         } catch (e) {
           console.error("Error loading cart:", e);
         }
       }
       setIsLoading(false);
     };
     loadCart();
   }, []);
 
   // Save cart to localStorage whenever items change
   const saveCart = (newItems: CartItem[]) => {
     const toStore = newItems.map(({ id, product_id, quantity, size, color }) => ({
       id, product_id, quantity, size, color
     }));
     localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(toStore));
   };
 
   const addItem = async (productId: string, quantity: number, size?: string, color?: string) => {
     // Fetch product details
     const { data: product } = await supabase
       .from("products")
       .select("*")
       .eq("id", productId)
       .maybeSingle();
 
     if (!product) {
       toast({
         title: "Erro",
         description: "Produto não encontrado",
         variant: "destructive",
       });
       return;
     }
 
     // Check if item already exists with same size/color
     const existingItemIndex = items.findIndex(
       (item) => item.product_id === productId && item.size === (size || null) && item.color === (color || null)
     );
 
     let newItems: CartItem[];
     if (existingItemIndex >= 0) {
       newItems = items.map((item, index) => 
         index === existingItemIndex 
           ? { ...item, quantity: item.quantity + quantity }
           : item
       );
     } else {
       const newItem: CartItem = {
         id: crypto.randomUUID(),
         product_id: productId,
         quantity,
         size: size || null,
         color: color || null,
       product: {
         ...product,
         colors: (product.colors as unknown as Product["colors"]) || [],
       } as Product,
       };
       newItems = [...items, newItem];
     }
 
     setItems(newItems);
     saveCart(newItems);
     toast({
       title: "Adicionado!",
       description: "Produto adicionado ao carrinho",
     });
     setIsOpen(true);
   };
 
   const updateQuantity = async (itemId: string, quantity: number) => {
     if (quantity <= 0) {
       await removeItem(itemId);
       return;
     }
 
     const newItems = items.map(item => 
       item.id === itemId ? { ...item, quantity } : item
     );
     setItems(newItems);
     saveCart(newItems);
   };
 
   const removeItem = async (itemId: string) => {
     const newItems = items.filter(item => item.id !== itemId);
     setItems(newItems);
     saveCart(newItems);
   };
 
   const clearCart = async () => {
     setItems([]);
     localStorage.removeItem(CART_STORAGE_KEY);
   };

  const total = items.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        isOpen,
        setIsOpen,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
