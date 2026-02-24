import { motion } from "framer-motion";
import { Sparkles, Shield, Heart } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Estilo Autêntico",
    desc: "Peças inspiradas nas tendências urbanas e na atitude de quem vive a moda de forma autêntica.",
  },
  {
    icon: Shield,
    title: "Qualidade & Conforto",
    desc: "Valorizamos bons materiais, atenção aos detalhes e uma experiência de compra simples e confiável.",
  },
  {
    icon: Heart,
    title: "Atitude & Identidade",
    desc: "Mais do que roupas, oferecemos atitude e identidade. Cada peça é pensada para te fazer sentir confiante.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop"
                alt="Fashion model wearing Tread Trendz streetwear"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            
            {/* Floating Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 glass rounded-xl p-6 max-w-[200px]"
            >
              <p className="text-4xl font-bold text-primary mb-1">5+</p>
              <p className="text-sm text-muted-foreground">Anos de Excelência</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -top-8 -left-8 glass rounded-xl p-6 max-w-[200px]"
            >
              <p className="text-4xl font-bold text-primary mb-1">50k+</p>
              <p className="text-sm text-muted-foreground">Clientes Satisfeitos</p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">Sobre Nós</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                Onde o Estilo
                <br />
                <span className="text-primary neon-text">Encontra a Alma</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Na Tread Trendz, acreditamos que o estilo é uma forma de expressão. 
                Criamos peças modernas e versáteis, pensadas para quem quer destacar a 
                sua personalidade no dia a dia sem abrir mão do conforto e da qualidade. 
                Cada coleção nasce da inspiração nas tendências urbanas e na atitude de 
                quem vive a moda de forma autêntica.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                O nosso compromisso vai além do visual: valorizamos bons materiais, 
                atenção aos detalhes e uma experiência de compra simples e confiável. 
                Queremos que cada cliente se sinta confiante ao vestir Tread Trendz — 
                porque mais do que roupas, oferecemos atitude e identidade.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid gap-4">
              {values.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-8 pt-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-background overflow-hidden"
                  >
                    <img 
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="Customer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">+2.5k</span> pessoas 
                <br />já confiam em nós
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
