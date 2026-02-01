import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sofia Mendes",
    role: "Influencer",
    image: "https://i.pravatar.cc/150?img=5",
    text: "A qualidade é incomparável. Cada peça que compro torna-se a minha favorita. O estilo é único e sempre recebo elogios.",
    rating: 5
  },
  {
    id: 2,
    name: "Miguel Santos",
    role: "DJ & Producer",
    image: "https://i.pravatar.cc/150?img=8",
    text: "Finalmente uma marca que entende o que é ter estilo próprio. As peças são perfeitas para quem quer destacar-se.",
    rating: 5
  },
  {
    id: 3,
    name: "Ana Costa",
    role: "Entrepreneur",
    image: "https://i.pravatar.cc/150?img=9",
    text: "Do casual ao profissional, a BRANDX tem tudo. A atenção ao detalhe em cada peça é impressionante.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">Testemunhos</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            O Que Dizem
            <br />
            <span className="text-primary neon-text">Sobre Nós</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`glass rounded-2xl p-8 relative ${
                index === 1 ? 'md:-mt-8' : ''
              }`}
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/20" />
              
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground/90 leading-relaxed mb-8">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
