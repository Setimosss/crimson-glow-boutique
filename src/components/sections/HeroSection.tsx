import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useFeaturedProducts } from "@/hooks/useProducts";

const HeroSection = () => {
  const { data: products, isLoading } = useFeaturedProducts();

  const scrollToCollection = () => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Main Hero Content */}
      <div className="flex-1 flex items-center pt-20 pb-8">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div className="text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium">
                  Nova Coleção 2026
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9]"
              >
                <span className="text-foreground block">DEFINE</span>
                <span className="text-foreground block">YOUR</span>
                <span className="text-primary block">STYLE</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                Moda urbana que desafia convenções. Peças exclusivas desenhadas 
                para quem vive sem limites e cria o seu próprio caminho.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button 
                  className="neon-button text-base px-8 py-6 group" 
                  onClick={scrollToCollection}
                >
                  Explorar Coleção
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 text-base px-8 py-6"
                  asChild
                >
                  <Link to="#lookbook">Ver Lookbook</Link>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex gap-8 mt-12 justify-center lg:justify-start"
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="text-center lg:text-left"
                  >
                    <p className="text-3xl md:text-4xl font-black text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right - Featured Products Grid */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`bg-primary/5 rounded-2xl animate-pulse ${i === 0 ? 'row-span-2 aspect-[3/5]' : 'aspect-[3/4]'}`} 
                    />
                  ))
                ) : (
                  products?.slice(0, 4).map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className={index === 0 ? 'row-span-2' : ''}
                    >
                      <Link 
                        to={`/product/${product.slug}`}
                        className="group relative rounded-2xl overflow-hidden block h-full"
                      >
                        <div className={`relative ${index === 0 ? 'aspect-[3/5]' : 'aspect-[3/4]'}`}>
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                          
                          {/* Tag */}
                          {product.tag && (
                            <div className="absolute top-3 left-3">
                              <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                                {product.tag}
                              </span>
                            </div>
                          )}
                          
                          {/* Product Info */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <h3 className="text-sm font-semibold text-foreground">{product.name}</h3>
                            <p className="text-primary font-bold mt-1">€{Number(product.price).toFixed(2)}</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 border border-primary/20 rounded-full blur-sm" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="flex justify-center pb-8"
      >
        <button 
          onClick={scrollToCollection}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>
      </motion.div>

      {/* Mobile Featured Products */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="lg:hidden px-4 pb-8"
      >
        <div className="grid grid-cols-2 gap-3">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-primary/5 rounded-xl aspect-[3/4] animate-pulse" />
            ))
          ) : (
            products?.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <Link 
                  to={`/product/${product.slug}`}
                  className="group relative rounded-xl overflow-hidden block"
                >
                  <div className="aspect-[3/4] relative">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
                    
                    {product.tag && (
                      <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {product.tag}
                      </span>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-xs font-semibold text-foreground truncate">{product.name}</h3>
                      <p className="text-primary font-bold text-sm">€{Number(product.price).toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
};

const stats = [
  { value: "200+", label: "Produtos" },
  { value: "50k+", label: "Clientes" },
  { value: "4.9", label: "Rating" },
];

export default HeroSection;
