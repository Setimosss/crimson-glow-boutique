import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToCollection = () => {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Interactive glow that follows mouse */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none transition-transform duration-[2000ms] ease-out"
        style={{
          background: "radial-gradient(circle, hsl(0 60% 45% / 0.12) 0%, transparent 60%)",
          filter: "blur(80px)",
          left: `calc(50% + ${mousePos.x * 150}px)`,
          top: `calc(50% + ${mousePos.y * 150}px)`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-primary/15 bg-primary/[0.04] text-primary text-[10px] uppercase tracking-[0.4em] font-medium backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Nova Coleção 2026
            </span>
          </motion.div>

          {/* Staggered title with clip reveal */}
          <div className="relative mb-8 overflow-hidden">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[clamp(4rem,15vw,14rem)] font-black leading-[0.8] tracking-tighter">
                <span className="text-primary block" style={{ textShadow: "0 0 120px hsl(0 60% 45% / 0.4)" }}>
                  TREAD
                </span>
              </h1>
            </motion.div>
          </div>

          <div className="relative overflow-hidden mb-10">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[clamp(4rem,15vw,14rem)] font-black leading-[0.8] tracking-tighter">
                <span className="text-foreground/90 block">TRENDZ</span>
              </h1>
            </motion.div>
          </div>

          {/* Horizontal rule with expanding animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent mb-8 origin-center"
          />

          {/* Tagline with word-by-word reveal */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-muted-foreground text-base md:text-lg max-w-md mb-14 leading-relaxed font-light tracking-wide"
          >
            Moda urbana para quem lidera o próprio estilo.
          </motion.p>

          {/* CTA with magnetic hover effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Button
              className="neon-button text-xs px-14 py-7 group uppercase tracking-[0.25em] rounded-full relative overflow-hidden"
              onClick={scrollToCollection}
            >
              <span className="relative z-10 flex items-center">
                Explorar Coleção
                <ArrowRight className="ml-3 h-3.5 w-3.5 group-hover:translate-x-2 transition-transform duration-500" />
              </span>
            </Button>
          </motion.div>

          {/* Scroll line indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/30 font-medium">
              Scroll
            </span>
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-primary/40 to-transparent origin-top"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
