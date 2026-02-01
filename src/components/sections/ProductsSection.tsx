import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Hoodie Noir Elite",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    tag: "Novo",
    category: "Hoodies"
  },
  {
    id: 2,
    name: "T-Shirt Urban Edge",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    tag: null,
    category: "T-Shirts"
  },
  {
    id: 3,
    name: "Jacket Street King",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    tag: "Best Seller",
    category: "Jackets"
  },
  {
    id: 4,
    name: "Pants Shadow Tech",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop",
    tag: null,
    category: "Pants"
  },
  {
    id: 5,
    name: "Cap Revolution",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop",
    tag: "Promoção",
    category: "Accessories"
  },
  {
    id: 6,
    name: "Sneakers Blaze",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
    tag: "Novo",
    category: "Footwear"
  }
];

const ProductsSection = () => {
  return (
    <section id="collection" className="py-32 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">Coleção</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Peças em
              <br />
              <span className="text-primary neon-text">Destaque</span>
            </h2>
          </div>
          <Button 
            variant="ghost" 
            className="mt-6 md:mt-0 text-primary hover:text-primary/80 group"
          >
            Ver Tudo
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Unique Grid Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Featured Large Product */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5 row-span-2">
            <ProductCard product={products[0]} size="large" />
          </div>

          {/* Top Row */}
          <div className="col-span-6 md:col-span-3 lg:col-span-4">
            <ProductCard product={products[1]} />
          </div>
          <div className="col-span-6 md:col-span-3 lg:col-span-3">
            <ProductCard product={products[2]} />
          </div>

          {/* Bottom Row */}
          <div className="col-span-6 md:col-span-3 lg:col-span-3">
            <ProductCard product={products[3]} />
          </div>
          <div className="col-span-6 md:col-span-3 lg:col-span-4">
            <ProductCard product={products[4]} />
          </div>

          {/* Full Width */}
          <div className="col-span-12">
            <ProductCardWide product={products[5]} />
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: typeof products[0];
  size?: 'normal' | 'large';
}

const ProductCard = ({ product, size = 'normal' }: ProductCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl glass cursor-pointer h-full">
      <div className={`relative ${size === 'large' ? 'aspect-[3/4]' : 'aspect-[4/5]'} overflow-hidden`}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-70" />
        
        {/* Tag */}
        {product.tag && (
          <span className="absolute top-4 left-4 bg-primary/90 text-primary-foreground text-xs px-3 py-1.5 rounded-full font-medium">
            {product.tag}
          </span>
        )}

        {/* Quick Add Button */}
        <Button 
          size="icon"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 neon-button rounded-full w-10 h-10"
        >
          <ShoppingBag className="w-4 h-4" />
        </Button>

        {/* Product Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-xs text-primary uppercase tracking-wider mb-2">{product.category}</p>
          <h3 className={`font-semibold text-foreground mb-2 ${size === 'large' ? 'text-2xl' : 'text-lg'}`}>
            {product.name}
          </h3>
          <p className="text-primary font-bold text-xl">€{product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

const ProductCardWide = ({ product }: { product: typeof products[0] }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl glass cursor-pointer">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative aspect-[16/9] md:aspect-auto overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        <div className="p-8 md:p-12 flex flex-col justify-center">
          {product.tag && (
            <span className="inline-block w-fit bg-primary/90 text-primary-foreground text-xs px-3 py-1.5 rounded-full font-medium mb-4">
              {product.tag}
            </span>
          )}
          <p className="text-xs text-primary uppercase tracking-wider mb-2">{product.category}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{product.name}</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Design exclusivo com materiais premium. Conforto e estilo numa única peça que define tendências.
          </p>
          <div className="flex items-center justify-between">
            <p className="text-primary font-bold text-2xl">€{product.price.toFixed(2)}</p>
            <Button className="neon-button">
              <ShoppingBag className="mr-2 w-4 h-4" />
              Adicionar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
