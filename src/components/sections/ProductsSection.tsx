import { ShoppingBag, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import type { Product } from "@/types/database";
import { Button } from "@/components/ui/button";

const ProductsSection = () => {
  const { data: products, isLoading } = useProducts();

  const featuredSlugs = ["air-force-1-black", "off-white-ooo-black"];
  const featuredProducts = products?.filter(p => featuredSlugs.includes(p.slug));

  return (
    <section id="collection" className="py-28 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14"
        >
          <div>
            <span className="text-primary text-xs uppercase tracking-[0.4em] font-medium">
              Coleção
            </span>
            <h2 className="text-4xl md:text-6xl font-black mt-2 leading-none">
              PRODUTOS EM{" "}
              <span className="text-primary neon-text">DESTAQUE</span>
            </h2>
          </div>
          <Link to="/#collection" className="mt-4 md:mt-0">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary group">
              Ver Tudo
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Products */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-primary/5 rounded-2xl animate-pulse aspect-square" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {featuredProducts?.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div className="relative overflow-hidden rounded-2xl bg-card aspect-square border border-border/30 group-hover:border-primary/20 transition-colors duration-500">
          <img 
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
          
          {/* Tag */}
          {product.tag && (
            <div className="absolute top-4 left-4 z-10">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-md ${
                product.tag === 'Best Seller' 
                  ? 'bg-amber-500/90 text-primary-foreground' 
                  : 'bg-primary/90 text-primary-foreground'
              }`}>
                {product.tag}
              </span>
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              onClick={(e) => {
                e.preventDefault();
                addItem(product.id, 1, product.sizes[0] || undefined);
              }}
            >
              <ShoppingBag className="w-5 h-5" />
            </motion.button>
            <span className="w-14 h-14 rounded-full bg-card/90 backdrop-blur-sm text-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform border border-border/30">
              <Eye className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-5 flex items-start justify-between">
          <div>
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-lg">
              {product.name}
            </h3>
            {product.sizes.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1.5">
                {product.sizes.slice(0, 5).join(" · ")}
                {product.sizes.length > 5 && ` +${product.sizes.length - 5}`}
              </p>
            )}
          </div>
          <div className="text-right">
            <span className="text-primary font-black text-xl">
              €{Number(product.price).toFixed(2)}
            </span>
            {product.compare_at_price && (
              <span className="block text-muted-foreground text-xs line-through">
                €{Number(product.compare_at_price).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductsSection;
