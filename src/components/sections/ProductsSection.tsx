import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    id: 1,
    name: "Hoodie Noir Elite",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    tag: "Novo"
  },
  {
    id: 2,
    name: "T-Shirt Urban Edge",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    tag: null
  },
  {
    id: 3,
    name: "Jacket Street King",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    tag: "Best Seller"
  },
  {
    id: 4,
    name: "Pants Shadow Tech",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop",
    tag: null
  },
  {
    id: 5,
    name: "Cap Revolution",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop",
    tag: "Promoção"
  },
  {
    id: 6,
    name: "Sneakers Blaze",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
    tag: "Novo"
  }
];

const ProductsSection = () => {
  return (
    <section id="collection" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0000] to-black" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">NOSSA </span>
            <span className="text-primary neon-text">COLEÇÃO</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Peças selecionadas que definem o seu estilo único
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="group bg-card/50 border-border hover:border-primary/50 transition-all duration-300 overflow-hidden backdrop-blur-sm"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.tag && (
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full neon-glow">
                      {product.tag}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Button 
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 neon-button"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Adicionar
                  </Button>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{product.name}</h3>
                  <p className="text-primary font-bold text-xl">€{product.price.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary px-8">
            Ver Todos os Produtos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
