import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import type { Product } from "@/types/database";

const ProductsSection = () => {
  const { data: products, isLoading } = useProducts();
  const { data: categories } = useCategories();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Only show the two featured sneakers
  const featuredSlugs = ["air-force-1-black", "off-white-ooo-black"];
  const featuredProducts = products?.filter(p => featuredSlugs.includes(p.slug));
  
  const filteredProducts = activeCategory === "all" 
    ? featuredProducts 
    : featuredProducts?.filter(p => p.category_id === activeCategory);

  return (
    <section id="collection" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <span className="text-primary text-xs uppercase tracking-[0.4em] font-medium">
              Coleção
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-3 leading-none">
              PRODUTOS EM<br />
              <span className="text-primary">DESTAQUE</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm mt-4 md:mt-0 text-sm leading-relaxed">
            Descobre as peças que estão a definir o streetwear desta temporada.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            Todos
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid - Creative Masonry-like layout */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`bg-primary/5 rounded-2xl animate-pulse ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-[3/4]'}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {filteredProducts?.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} isFeatured={index === 0} />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <Button className="neon-button px-8 py-6 text-base group">
            Ver Toda a Coleção
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, index, isFeatured }: { product: Product; index: number; isFeatured: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={isFeatured ? "md:col-span-2 md:row-span-2" : ""}
    >
      <Link 
        to={`/product/${product.slug}`}
        className="group block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/40 transition-all duration-500 h-full">
          {/* Image Container */}
          <div className={`relative overflow-hidden ${isFeatured ? 'aspect-square' : 'aspect-[3/4]'}`}>
            <img 
              src={isHovered && product.images[1] ? product.images[1] : product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Tag */}
            {product.tag && (
              <div className="absolute top-3 left-3 z-10">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-sm ${
                  product.tag === 'Best Seller' 
                    ? 'bg-amber-500/80 text-primary-foreground' 
                    : product.tag === 'Promoção'
                    ? 'bg-green-500/80 text-primary-foreground'
                    : 'bg-primary/80 text-primary-foreground'
                }`}>
                  {product.tag}
                </span>
              </div>
            )}

            {/* Quick Add Button */}
            <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <button 
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.4)] hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.preventDefault();
                  addItem(product.id, 1, product.sizes[0] || undefined);
                }}
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>

            {/* Discount Badge */}
            {product.compare_at_price && (
              <div className="absolute bottom-3 left-3 z-10">
                <span className="bg-green-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  -{Math.round((1 - Number(product.price) / Number(product.compare_at_price)) * 100)}%
                </span>
              </div>
            )}

            {/* Featured: Show product info overlay on hover */}
            {isFeatured && (
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-xl font-bold text-foreground mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
                <span className="text-primary font-bold text-xl">€{Number(product.price).toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Product Info - Hidden for featured on larger screens */}
          <div className={`p-4 ${isFeatured ? 'md:hidden' : ''}`}>
            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="flex gap-1.5 mb-2">
                {product.colors.slice(0, 4).map((color) => (
                  <span 
                    key={color.name}
                    className="w-3 h-3 rounded-full border border-border"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-[10px] text-muted-foreground">+{product.colors.length - 4}</span>
                )}
              </div>
            )}

            <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-primary font-bold">
                €{Number(product.price).toFixed(2)}
              </span>
              {product.compare_at_price && (
                <span className="text-muted-foreground text-xs line-through">
                  €{Number(product.compare_at_price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Sizes Preview */}
            {product.sizes.length > 0 && (
              <div className="flex gap-1 mt-2 flex-wrap">
                {product.sizes.slice(0, 5).map((size) => (
                  <span 
                    key={size}
                    className="text-[9px] text-muted-foreground border border-border/50 px-1.5 py-0.5 rounded"
                  >
                    {size}
                  </span>
                ))}
                {product.sizes.length > 5 && (
                  <span className="text-[9px] text-muted-foreground">+{product.sizes.length - 5}</span>
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
