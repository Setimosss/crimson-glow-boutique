import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Eye, SlidersHorizontal, ChevronLeft } from "lucide-react";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import type { Product } from "@/types/database";

const ShopPage = () => {
  const { data: products, isLoading } = useProducts();
  const { data: categories } = useCategories();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

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
        <main className="pt-28 pb-24">
          <div className="container mx-auto px-4">
            {/* Page Header */}
            <div className="mb-12 max-w-3xl">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Voltar
              </Link>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
                <span className="text-primary neon-text">LOJA</span>
              </h1>
              <p className="text-muted-foreground mt-3 text-sm md:text-base max-w-md">
                Explora toda a nossa coleção organizada por categorias.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="premium-panel rounded-2xl px-3 py-3 mb-10 flex items-center gap-2 overflow-x-auto scrollbar-hide">
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
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10"
              >
                {filteredProducts.map((product, index) => (
                  <ShopProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
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
        <QuickViewDialog
          product={quickViewProduct}
          open={Boolean(quickViewProduct)}
          onOpenChange={(open) => !open && setQuickViewProduct(null)}
        />
        <Footer />
      </div>
    </div>
  );
};

const ShopProductCard = ({
  product,
  index,
  onQuickView,
}: {
  product: Product;
  index: number;
  onQuickView: (product: Product) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [colorRotationIndex, setColorRotationIndex] = useState(0);
  const { addItem } = useCart();

  // Build unique color images for rotation (one per color)
  const colorPrimaryImages = (product.colors || [])
    .filter((color) => Array.isArray(color.images) && color.images.length > 0)
    .map((color) => color.images[0]);

  const hasMultipleColors = colorPrimaryImages.length > 1;

  // Auto-rotate colors every 3 seconds
  useEffect(() => {
    if (!hasMultipleColors || isHovered) return;
    const interval = setInterval(() => {
      setColorRotationIndex((prev) => (prev + 1) % colorPrimaryImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hasMultipleColors, isHovered, colorPrimaryImages.length]);

  const fallbackImage = colorPrimaryImages[0];

  const primaryImage = hasMultipleColors
    ? colorPrimaryImages[colorRotationIndex]
    : product.images?.[0] || fallbackImage || "";
  const secondaryImage = product.images?.[1] || fallbackImage || primaryImage;
  const colorImages =
    product.colors?.flatMap((color) =>
      Array.isArray(color.images) ? color.images : [],
    ) || [];
  const preferredImage = isHovered ? secondaryImage : primaryImage;
  const imageCandidates = Array.from(
    new Set(
      [preferredImage, primaryImage, secondaryImage, fallbackImage, ...colorImages].filter(
        (img): img is string => Boolean(img),
      ),
    ),
  );
  const displayImage =
    imageCandidates.find((img) => !failedImages.includes(img)) || "";

  useEffect(() => {
    setFailedImages([]);
  }, [product.id]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <div
        role="button"
        tabIndex={0}
        className="group block cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        onClick={() => onQuickView(product)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onQuickView(product);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-square rounded-xl premium-panel transition-all duration-500 group-hover:border-primary/35 group-hover:shadow-[0_24px_80px_hsl(var(--primary)/0.14)]">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-70" />
          {displayImage ? (
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              loading="lazy"
              onError={() => {
                if (!displayImage) return;
                setFailedImages((prev) =>
                  prev.includes(displayImage) ? prev : [...prev, displayImage],
                );
              }}
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
          <div className="absolute inset-0 z-20 bg-background/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product.id, 1, product.sizes[0] || undefined);
              }}
            >
              <ShoppingBag className="w-4 h-4" />
            </motion.button>
            <button
              className="w-11 h-11 rounded-full bg-card/90 backdrop-blur-sm text-foreground flex items-center justify-center shadow-lg border border-border/30"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label={`Vista rápida de ${product.name}`}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 px-0.5">
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
          {hasMultipleColors && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.map((color, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    i === colorRotationIndex
                      ? "border-primary scale-125"
                      : "border-border/50 scale-100"
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const QuickViewDialog = ({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();

  useEffect(() => {
    setSelectedSize(product?.sizes?.[0]);
    setSelectedColor(product?.colors?.[0]?.name);
  }, [product]);

  if (!product) return null;

  const selectedColorData = product.colors?.find((color) => color.name === selectedColor);
  const image = selectedColorData?.images?.[0] || product.images?.[0] || "";

  const handleAddToCart = async () => {
    await addItem(product.id, 1, selectedSize, selectedColor);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl overflow-hidden border-border/70 bg-background/95 p-0 shadow-[0_40px_140px_hsl(0_0%_0%/0.58)] backdrop-blur-2xl sm:rounded-2xl">
        <div className="grid gap-0 md:grid-cols-[1fr_0.9fr]">
          <div className="relative aspect-square bg-card md:aspect-auto">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
            {image ? (
              <img src={image} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center text-sm text-muted-foreground">
                Sem imagem
              </div>
            )}
          </div>

          <div className="flex flex-col p-6 md:p-8 lg:p-10">
            <DialogHeader>
              <DialogTitle className="pr-8 text-2xl font-black leading-tight md:text-4xl">
                {product.name}
              </DialogTitle>
              <DialogDescription className="line-clamp-3 pt-2">
                {product.description || "Seleciona a tua opção e adiciona diretamente ao carrinho."}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-5 flex items-end gap-3">
              <span className="text-2xl font-black text-primary">€{Number(product.price).toFixed(2)}</span>
              {product.compare_at_price && (
                <span className="pb-1 text-sm text-muted-foreground line-through">
                  €{Number(product.compare_at_price).toFixed(2)}
                </span>
              )}
            </div>

            {product.colors?.length > 0 && (
              <div className="mt-7">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Cor</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-all ${
                        selectedColor === color.name
                          ? "border-primary bg-primary/15 text-foreground shadow-[0_0_24px_hsl(var(--primary)/0.14)]"
                          : "border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      <span className="h-3 w-3 rounded-full border border-border" style={{ backgroundColor: color.hex }} />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes?.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Tamanho</p>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 rounded-lg border text-sm font-bold transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="neon-button h-12 flex-1 rounded-full font-bold" onClick={handleAddToCart}>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Adicionar ao carrinho
              </Button>
              <Button variant="outline" className="h-12 rounded-full border-border/70 bg-card/40" asChild>
                <Link to={`/product/${product.slug}`}>Ver detalhes</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShopPage;
