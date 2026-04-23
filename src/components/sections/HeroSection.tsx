import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollToCollection = () => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-[92vh] flex items-center justify-center relative overflow-hidden pt-16 pb-20">
      {/* Multi-layered ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 md:mb-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/45 px-5 py-2 text-primary text-xs uppercase tracking-[0.32em] font-semibold backdrop-blur-xl shadow-[0_0_40px_hsl(var(--primary)/0.12)]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Streetwear Premium
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-7"
          >
            <div className="absolute -inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
            <h1 className="relative text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter leading-[0.82]">
              <span className="text-primary block neon-text">TREAD</span>
              <span className="text-foreground block drop-shadow-2xl">TRENDZ</span>
            </h1>
          </motion.div>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-40 h-[1px] bg-gradient-to-r from-transparent via-primary/80 to-transparent mb-8"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light"
          >
            Moda urbana para quem lidera o próprio estilo.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Button
              className="neon-button text-sm px-12 py-7 group uppercase tracking-[0.2em] rounded-full border border-primary/30"
              onClick={scrollToCollection}
            >
              Explorar Coleção
              <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.button
              onClick={scrollToCollection}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
