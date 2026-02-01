import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] font-medium mb-6">
              Nova Coleção 2026
            </span>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-foreground">ESTILO</span>
              <br />
              <span className="text-primary neon-text">REDEFINIDO</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mb-10">
              Descubra a nova coleção que combina elegância urbana com atitude. 
              Peças exclusivas para quem não tem medo de se destacar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="neon-button group">
                Ver Coleção
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary group">
                <div className="w-10 h-10 rounded-full border border-primary/50 flex items-center justify-center mr-3 group-hover:border-primary group-hover:bg-primary/10 transition-all">
                  <Play className="w-4 h-4 fill-primary text-primary" />
                </div>
                Ver Vídeo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-12 mt-16 justify-center lg:justify-start">
              <div>
                <p className="text-3xl font-bold text-foreground">200+</p>
                <p className="text-sm text-muted-foreground">Produtos</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">50k+</p>
                <p className="text-sm text-muted-foreground">Clientes</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">4.9</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Image */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=800&fit=crop"
                  alt="Fashion model"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop"
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Hoodie Noir</p>
                  <p className="text-primary font-bold">€89.99</p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/30 rounded-full" />
              <div className="absolute top-1/4 -right-8 w-16 h-16 bg-primary/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
