import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-16">
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content - Centered */}
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium">
              Nova Coleção 2026
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
            <span className="text-foreground block">DEFINE</span>
            <span className="text-primary neon-text block">YOUR STYLE</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Moda urbana que desafia convenções. Peças exclusivas desenhadas 
            para quem vive sem limites e cria o seu próprio caminho.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button className="neon-button text-base px-8 py-6 group" asChild>
              <Link to="#collection">
                Explorar Coleção
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 text-base px-8 py-6"
            >
              Ver Lookbook
            </Button>
          </div>
        </div>

        {/* Featured Products Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {featuredProducts.map((product, index) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[3/4] relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Product Info on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-xs text-primary uppercase tracking-wider mb-1">{product.category}</p>
                  <h3 className="text-sm font-semibold text-foreground">{product.name}</h3>
                  <p className="text-primary font-bold mt-1">€{product.price.toFixed(2)}</p>
                </div>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-primary/20 border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-20 pt-10 border-t border-primary/10">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-black text-foreground">200+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Produtos</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-black text-foreground">50k+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Clientes</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-black text-foreground">4.9</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Rating</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-black text-foreground">24h</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Envio</p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 border border-primary/10 rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-primary/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary/40 rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-primary/30 rounded-full" />
    </section>
  );
};

const featuredProducts = [
  {
    id: 1,
    name: "Hoodie Noir Elite",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    category: "Hoodies"
  },
  {
    id: 2,
    name: "T-Shirt Urban Edge",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    category: "T-Shirts"
  },
  {
    id: 3,
    name: "Jacket Street King",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    category: "Jackets"
  },
  {
    id: 4,
    name: "Cap Revolution",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop",
    category: "Accessories"
  }
];

export default HeroSection;
