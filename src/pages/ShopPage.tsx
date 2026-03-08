import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Eye, SlidersHorizontal, ChevronLeft } from "lucide-react";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import type { Product } from "@/types/database";

const ShopPage = () => {
  const { data: products, isLoading } = useProducts();
  const { data: categories } = useCategories();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products?.filter((p) => p.category_id === activeCategory);

  const categoryTabs = [
    { id: "all", name: "Tudo" },
    ...(categories?.map((c) => ({ id: c.id, name: c.name })) || []),
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            {/* Page Header */}
            <div className="mb-10">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Voltar
              </Link>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                <span className="text-primary neon-text">LOJA</span>
              </h1>
              <p className="text-muted-foreground mt-3 text-sm md:text-base max-w-md">
                Explora toda a nossa coleção organizada por categorias.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground mr-1 flex-shrink-0" />
              {categoryTabs.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 border ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                      : "bg-transparent text-muted-foreground border-border/50 hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-card/50 rounded-xl animate-pulse aspect-[3/4]"
                  />
                ))}
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <ShopProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  Nenhum produto nesta categoria.
                </p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

const ShopProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-xl bg-card aspect-[3/4] border border-border/20 group-hover:border-primary/20 transition-colors duration-500">
          {product.images[0] ? (
            <img
              src={
                isHovered && product.images[1]
                  ? product.images[1]
                  : product.images[0]
              }
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
              Sem imagem
            </div>
          )}

          {/* Tag */}
          {product.tag && (
            <div className="absolute top-3 left-3 z-10">
              <span
                className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md ${
                  product.tag === "Best Seller"
                    ? "bg-amber-500/90 text-primary-foreground"
                    : product.tag === "SALE"
                    ? "bg-destructive/90 text-destructive-foreground"
                    : "bg-primary/90 text-primary-foreground"
                }`}
              >
                {product.tag}
              </span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                addItem(product.id, 1, product.sizes[0] || undefined);
              }}
            >
              <ShoppingBag className="w-4 h-4" />
            </motion.button>
            <span className="w-11 h-11 rounded-full bg-card/90 backdrop-blur-sm text-foreground flex items-center justify-center shadow-lg border border-border/30">
              <Eye className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-3 px-0.5">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-tight truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-primary font-bold text-sm">
              €{Number(product.price).toFixed(2)}
            </span>
            {product.compare_at_price && (
              <span className="text-muted-foreground text-xs line-through">
                €{Number(product.compare_at_price).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ShopPage;
