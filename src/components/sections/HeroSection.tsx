 import { ArrowRight } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { motion } from "framer-motion";
 
 const HeroSection = () => {
   const scrollToCollection = () => {
     document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
   };
 
   return (
     <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
       {/* Ambient glow */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
       </div>
 
       <div className="container mx-auto px-4 relative z-10">
         <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
           {/* Minimal badge */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="mb-12"
           >
             <span className="text-primary/80 text-xs uppercase tracking-[0.4em] font-medium">
               Streetwear Premium
             </span>
           </motion.div>
 
           {/* Main Title - Clean & Bold */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="relative mb-8"
           >
             <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85]">
               <span className="text-primary block">TREAD</span>
               <span className="text-foreground block">TRENDZ</span>
             </h1>
           </motion.div>
 
           {/* Divider line with glow */}
           <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="w-32 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mb-8"
           />
 
           {/* Tagline */}
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.5 }}
             className="text-muted-foreground text-base md:text-lg max-w-md mb-12 leading-relaxed font-light"
           >
             Moda urbana para quem lidera o próprio estilo.
           </motion.p>
 
           {/* Single CTA */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.6 }}
           >
             <Button
               className="neon-button text-sm px-10 py-6 group uppercase tracking-widest"
               onClick={scrollToCollection}
             >
               Explorar
               <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
             </Button>
           </motion.div>
 
           {/* Scroll indicator */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.6, delay: 1 }}
             className="absolute bottom-12 left-1/2 -translate-x-1/2"
           >
             <div className="flex flex-col items-center gap-2">
               <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">Scroll</span>
               <motion.div
                 animate={{ y: [0, 8, 0] }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                 className="w-[1px] h-8 bg-gradient-to-b from-primary/60 to-transparent"
               />
             </div>
           </motion.div>
         </div>
       </div>
     </section>
   );
 };
 
 export default HeroSection;
