 import { useState, useMemo } from "react";
 import { useParams, Link, useNavigate } from "react-router-dom";
 import { ArrowLeft, Minus, Plus, ShoppingBag, Truck, Shield, RotateCcw, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useProductBySlug, useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import type { ProductColor } from "@/types/database";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProductBySlug(id || "");
  const { data: allProducts } = useProducts();
  const { addItem } = useCart();
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Get the active images based on selected color
  const activeImages = useMemo(() => {
    if (selectedColor && selectedColor.images && selectedColor.images.length > 0) {
      return selectedColor.images;
    }
    return product?.images || [];
  }, [selectedColor, product?.images]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10">
          <Header />
          <div className="container mx-auto px-4 pt-32 pb-16">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="aspect-[3/4] bg-primary/5 rounded-2xl animate-pulse" />
              <div className="space-y-6">
                <div className="h-8 bg-primary/5 rounded animate-pulse w-3/4" />
                <div className="h-6 bg-primary/5 rounded animate-pulse w-1/4" />
                <div className="h-24 bg-primary/5 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10">
          <Header />
          <div className="container mx-auto px-4 pt-32 pb-16 text-center">
            <h1 className="text-3xl font-bold mb-4">Produto não encontrado</h1>
            <p className="text-muted-foreground mb-8">O produto que procuras não existe ou foi removido.</p>
            <Button onClick={() => navigate("/")} className="neon-button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar à Loja
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const relatedProducts = allProducts?.filter(p => p.id !== product.id).slice(0, 4) || [];

  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);
    setSelectedImage(0); // Reset to first image of the new color
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
            >
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to="/#collection" className="hover:text-primary transition-colors">Coleção</Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Product Images */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {/* Main Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-primary/10">
                  <img 
                    src={activeImages[selectedImage] || product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-contain p-6 transition-opacity duration-200"
                  />
                  {product.tag && (
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm px-4 py-2 rounded-full font-medium">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                {activeImages.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {activeImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index 
                            ? 'border-primary ring-2 ring-primary/20' 
                            : 'border-primary/10 hover:border-primary/30'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Info */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">{product.name}</h1>
                  <div className="flex items-center gap-4">
                    <span className="text-3xl md:text-4xl font-bold text-primary">
                      €{Number(product.price).toFixed(2)}
                    </span>
                    {product.compare_at_price && (
                      <>
                        <span className="text-xl text-muted-foreground line-through">
                          €{Number(product.compare_at_price).toFixed(2)}
                        </span>
                        <span className="bg-green-500/20 text-green-400 text-sm font-bold px-3 py-1 rounded-full">
                          -{Math.round((1 - Number(product.price) / Number(product.compare_at_price)) * 100)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  {product.description}
                </p>

                {/* Colors */}
                {product.colors.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">
                      Cor: <span className="text-primary">{selectedColor?.name || 'Seleciona uma cor'}</span>
                    </label>
                    <div className="flex gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => handleColorSelect(color)}
                          className={`w-10 h-10 rounded-full border-2 transition-all relative ${
                            selectedColor?.name === color.name 
                              ? 'border-primary ring-2 ring-primary/30 scale-110' 
                              : 'border-primary/20 hover:border-primary/50'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {selectedColor?.name === color.name && (
                            <Check className="w-4 h-4 absolute inset-0 m-auto text-white drop-shadow-lg" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">
                      Tamanho: <span className="text-primary">{selectedSize || 'Seleciona um tamanho'}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[48px] px-4 py-3 rounded-lg border font-medium transition-all ${
                            selectedSize === size 
                              ? 'bg-primary text-primary-foreground border-primary' 
                              : 'border-primary/20 hover:border-primary/50 text-foreground'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Quantidade</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-primary/20 rounded-lg">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="hover:bg-primary/10"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        className="hover:bg-primary/10"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.stock > 0 ? `${product.stock} em stock` : 'Esgotado'}
                    </span>
                  </div>
                </div>

                 {/* Actions */}
                 <div className="flex gap-4 pt-4">
                   <Button 
                     className="flex-1 neon-button py-6 text-base"
                     disabled={product.stock === 0 || isAddingToCart}
                     onClick={async () => {
                       if (product.sizes.length > 0 && !selectedSize) {
                         toast({
                           title: "Seleciona um tamanho",
                           variant: "destructive",
                         });
                         return;
                       }
                       setIsAddingToCart(true);
                       await addItem(
                         product.id, 
                         quantity, 
                         selectedSize || undefined, 
                         selectedColor?.name
                       );
                       setIsAddingToCart(false);
                     }}
                   >
                     {isAddingToCart ? (
                       <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                     ) : (
                       <ShoppingBag className="mr-2 h-5 w-5" />
                     )}
                     {product.stock === 0 ? "Esgotado" : "Adicionar ao Carrinho"}
                   </Button>
                 </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-primary/10">
                  <div className="text-center">
                    <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Envio<br />Rápido</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Devoluções<br />30 dias</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Pagamento<br />Seguro</p>
                  </div>
                </div>

                {/* Details */}
                {product.details.length > 0 && (
                  <div className="pt-6 border-t border-primary/10">
                    <h3 className="font-semibold text-foreground mb-4">Detalhes do Produto</h3>
                    <ul className="space-y-2">
                      {product.details.map((detail, index) => (
                        <li key={index} className="flex items-center gap-3 text-muted-foreground">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-24"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Produtos Relacionados</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <Link 
                      key={relatedProduct.id}
                      to={`/product/${relatedProduct.slug}`}
                      className="group"
                    >
                      <div className="relative rounded-xl overflow-hidden bg-card border border-primary/10 hover:border-primary/30 transition-all">
                        <div className="aspect-[3/4]">
                          <img 
                            src={relatedProduct.images[0]} 
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                            {relatedProduct.name}
                          </h3>
                          <p className="text-primary font-bold mt-1">€{Number(relatedProduct.price).toFixed(2)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;
