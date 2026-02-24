import { ShoppingBag, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import type { Product } from "@/types/database";

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
        </motion.div>

        {/* Products */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-primary/5 rounded-3xl animate-pulse aspect-square" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
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
        <div className="relative overflow-hidden rounded-3xl bg-card aspect-square">
          <img 
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
          
          {/* Tag */}
          {product.tag && (
            <div className="absolute top-5 left-5 z-10">
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
          <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button 
              className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              onClick={(e) => {
                e.preventDefault();
                addItem(product.id, 1, product.sizes[0] || undefined);
              }}
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <span className="w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm text-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Eye className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* Info — outside the card for a cleaner look */}
        <div className="mt-4 flex items-start justify-between">
          <div>
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            {product.sizes.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                {product.sizes.slice(0, 5).join(" · ")}
                {product.sizes.length > 5 && ` +${product.sizes.length - 5}`}
              </p>
            )}
          </div>
          <div className="text-right">
            <span className="text-primary font-black text-lg">
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
