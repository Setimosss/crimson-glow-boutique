import { ShoppingBag, ArrowRight } from "lucide-react";
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
    <section id="collection" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-xs uppercase tracking-[0.4em] font-medium">
            Coleção
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 leading-none">
            PRODUTOS EM <span className="text-primary neon-text">DESTAQUE</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            As peças mais desejadas da nossa coleção, selecionadas para ti.
          </p>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-primary/5 rounded-2xl animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredProducts?.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10 uppercase tracking-widest text-xs px-8 py-5 group"
            onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
          >
            Ver Toda a Coleção
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
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
        <div className="relative rounded-2xl overflow-hidden bg-card border border-border/30 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--primary)/0.1)]">
          {/* Image */}
          <div className="relative overflow-hidden aspect-[3/4]">
            <img 
              src={isHovered && product.images[1] ? product.images[1] : product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
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

            {/* Quick Add Button */}
            <div className="absolute bottom-4 left-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <button 
                className="w-full py-3 rounded-xl bg-primary/90 backdrop-blur-sm text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  addItem(product.id, 1, product.sizes[0] || undefined);
                }}
              >
                <ShoppingBag className="w-4 h-4" />
                Adicionar ao Carrinho
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="p-5">
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-lg">
              {product.name}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-primary font-black text-xl">
                €{Number(product.price).toFixed(2)}
              </span>
              {product.compare_at_price && (
                <span className="text-muted-foreground text-sm line-through">
                  €{Number(product.compare_at_price).toFixed(2)}
                </span>
              )}
            </div>
            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {product.sizes.slice(0, 6).map((size) => (
                  <span key={size} className="text-[10px] text-muted-foreground border border-border/50 px-2 py-1 rounded-md hover:border-primary/40 transition-colors">
                    {size}
                  </span>
                ))}
                {product.sizes.length > 6 && (
                  <span className="text-[10px] text-muted-foreground px-2 py-1">+{product.sizes.length - 6}</span>
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
