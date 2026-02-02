import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products, Product } from "@/data/products";

const ProductsSection = () => {
  return (
    <section id="collection" className="py-32 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
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
        </motion.div>

        {/* Unique Grid Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Featured Large Product */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-12 md:col-span-6 lg:col-span-5 row-span-2"
          >
            <ProductCard product={products[0]} size="large" />
          </motion.div>

          {/* Top Row */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-6 md:col-span-3 lg:col-span-4"
          >
            <ProductCard product={products[1]} />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-6 md:col-span-3 lg:col-span-3"
          >
            <ProductCard product={products[2]} />
          </motion.div>

          {/* Bottom Row */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-6 md:col-span-3 lg:col-span-3"
          >
            <ProductCard product={products[3]} />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="col-span-6 md:col-span-3 lg:col-span-4"
          >
            <ProductCard product={products[4]} />
          </motion.div>

          {/* Full Width */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="col-span-12"
          >
            <ProductCardWide product={products[5]} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  size?: 'normal' | 'large';
}

const ProductCard = ({ product, size = 'normal' }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group relative overflow-hidden rounded-2xl glass cursor-pointer h-full block">
      <div className={`relative ${size === 'large' ? 'aspect-[3/4]' : 'aspect-[4/5]'} overflow-hidden`}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
        
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
          onClick={(e) => e.preventDefault()}
        >
          <ShoppingBag className="w-4 h-4" />
        </Button>

        {/* Product Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
          <p className="text-xs text-primary uppercase tracking-wider mb-2">{product.category}</p>
          <h3 className={`font-semibold text-foreground mb-2 ${size === 'large' ? 'text-2xl' : 'text-lg'}`}>
            {product.name}
          </h3>
          <p className="text-primary font-bold text-xl">€{product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

const ProductCardWide = ({ product }: { product: Product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group relative overflow-hidden rounded-2xl glass cursor-pointer block">
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
            <Button className="neon-button" onClick={(e) => e.preventDefault()}>
              <ShoppingBag className="mr-2 w-4 h-4" />
              Adicionar
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductsSection;
