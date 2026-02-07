import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import type { Product } from "@/types/database";

const ProductsSection = () => {
  const { data: products, isLoading } = useProducts();

  // Only show the two featured sneakers
  const featuredSlugs = ["air-force-1-black", "off-white-ooo-black"];
  const featuredProducts = products?.filter(p => featuredSlugs.includes(p.slug));

  return (
    <section id="collection" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-xs uppercase tracking-[0.4em] font-medium">
            Coleção
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-2 leading-none">
            PRODUTOS EM <span className="text-primary">DESTAQUE</span>
          </h2>
        </motion.div>

        {/* Products Grid - Side by side */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-primary/5 rounded-xl animate-pulse aspect-[4/5]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link 
        to={`/product/${product.slug}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/40 transition-all duration-400">
          {/* Image */}
          <div className="relative overflow-hidden aspect-square">
            <img 
              src={isHovered && product.images[1] ? product.images[1] : product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />
            
            {/* Tag */}
            {product.tag && (
              <div className="absolute top-3 left-3 z-10">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm ${
                  product.tag === 'Best Seller' 
                    ? 'bg-amber-500/80 text-primary-foreground' 
                    : 'bg-primary/80 text-primary-foreground'
                }`}>
                  {product.tag}
                </span>
              </div>
            )}

            {/* Quick Add */}
            <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <button 
                className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_15px_hsl(var(--primary)/0.4)] hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.preventDefault();
                  addItem(product.id, 1, product.sizes[0] || undefined);
                }}
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-primary font-bold">
                €{Number(product.price).toFixed(2)}
              </span>
              {product.compare_at_price && (
                <span className="text-muted-foreground text-xs line-through">
                  €{Number(product.compare_at_price).toFixed(2)}
                </span>
              )}
            </div>
            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="flex gap-1 mt-2 flex-wrap">
                {product.sizes.slice(0, 6).map((size) => (
                  <span key={size} className="text-[9px] text-muted-foreground border border-border/50 px-1.5 py-0.5 rounded">
                    {size}
                  </span>
                ))}
                {product.sizes.length > 6 && (
                  <span className="text-[9px] text-muted-foreground">+{product.sizes.length - 6}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductsSection;