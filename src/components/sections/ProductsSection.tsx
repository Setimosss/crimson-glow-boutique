import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { useState } from "react";
import type { Product } from "@/types/database";

const ProductsSection = () => {
  const { data: products, isLoading } = useProducts();
  const { data: categories } = useCategories();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products?.filter(p => p.category_id === activeCategory);

  return (
    <section id="collection" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">
            Coleção
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4 mb-4">
            PRODUTOS EM <span className="text-primary">DESTAQUE</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descobre as peças que estão a definir o streetwear desta temporada
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-primary/10 text-foreground hover:bg-primary/20"
            }`}
          >
            Todos
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-foreground hover:bg-primary/20"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-primary/5 rounded-2xl aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts?.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
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

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link 
        to={`/product/${product.slug}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative rounded-2xl overflow-hidden bg-card border border-primary/10 hover:border-primary/30 transition-all duration-300">
          {/* Image Container */}
          <div className="aspect-[3/4] relative overflow-hidden">
            <img 
              src={isHovered && product.images[1] ? product.images[1] : product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
            
            {/* Tag */}
            {product.tag && (
              <div className="absolute top-3 left-3 z-10">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  product.tag === 'Best Seller' 
                    ? 'bg-amber-500/90 text-white' 
                    : product.tag === 'Promoção'
                    ? 'bg-green-500/90 text-white'
                    : 'bg-primary text-primary-foreground'
                }`}>
                  {product.tag}
                </span>
              </div>
            )}

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                className="w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Add to wishlist
                }}
              >
                <Heart className="w-4 h-4" />
              </button>
              <button 
                className="w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Quick add to cart
                }}
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>

            {/* Compare Price */}
            {product.compare_at_price && (
              <div className="absolute bottom-3 right-3 z-10">
                <span className="bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded">
                  -{Math.round((1 - Number(product.price) / Number(product.compare_at_price)) * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="flex gap-1.5 mb-2">
                {product.colors.slice(0, 4).map((color) => (
                  <span 
                    key={color.name}
                    className="w-4 h-4 rounded-full border border-primary/20"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
                )}
              </div>
            )}

            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-2 mt-2">
              <span className="text-primary font-bold text-lg">
                €{Number(product.price).toFixed(2)}
              </span>
              {product.compare_at_price && (
                <span className="text-muted-foreground text-sm line-through">
                  €{Number(product.compare_at_price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Sizes Preview */}
            {product.sizes.length > 0 && (
              <div className="flex gap-1 mt-3 flex-wrap">
                {product.sizes.slice(0, 5).map((size) => (
                  <span 
                    key={size}
                    className="text-[10px] text-muted-foreground bg-primary/5 px-1.5 py-0.5 rounded"
                  >
                    {size}
                  </span>
                ))}
                {product.sizes.length > 5 && (
                  <span className="text-[10px] text-muted-foreground">+{product.sizes.length - 5}</span>
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
