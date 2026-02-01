import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const looks = [
  {
    id: 1,
    title: "Urban Nights",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop",
    items: 4
  },
  {
    id: 2,
    title: "Street Elite",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=800&fit=crop",
    items: 3
  },
  {
    id: 3,
    title: "Dark Essence",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop",
    items: 5
  },
  {
    id: 4,
    title: "Minimal Edge",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop",
    items: 3
  }
];

const LookbookSection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">Lookbook</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Looks
              <br />
              <span className="text-primary neon-text">Curados</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md mt-6 md:mt-0">
            Combinações pensadas ao detalhe para te inspirar. 
            Descobre o teu próximo outfit completo.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {looks.map((look, index) => (
            <div 
              key={look.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                index === 0 ? 'row-span-2' : ''
              }`}
            >
              <div className={`relative ${index === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
                <img 
                  src={look.image} 
                  alt={look.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs text-primary uppercase tracking-wider mb-2">{look.items} Peças</p>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">{look.title}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-0 text-primary hover:text-primary/80"
                    >
                      Ver Look
                      <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LookbookSection;
