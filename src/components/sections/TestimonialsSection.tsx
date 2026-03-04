import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

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
    text: "Do casual ao profissional, a Tread Trendz tem tudo. A atenção ao detalhe em cada peça é impressionante.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-xs uppercase tracking-[0.4em] font-medium">Testemunhos</span>
          <h2 className="text-4xl md:text-6xl font-black mt-3">
            O Que Dizem{" "}
            <span className="text-primary neon-text">Sobre Nós</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`relative rounded-2xl p-8 bg-card/50 border border-border/30 hover:border-primary/20 transition-all duration-500 group ${
                index === 1 ? 'md:-mt-6' : ''
              }`}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
              
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground/80 leading-relaxed mb-8 text-sm">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border/20">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
