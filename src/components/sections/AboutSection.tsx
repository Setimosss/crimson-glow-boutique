import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-xs uppercase tracking-[0.4em] font-medium">Sobre Nós</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 leading-tight">
            Onde o Estilo <span className="text-primary neon-text">Encontra a Alma</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
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
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 glass rounded-xl p-5"
            >
              <p className="text-3xl font-black text-primary">5+</p>
              <p className="text-xs text-muted-foreground mt-1">Anos de Excelência</p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-5">
              <p className="text-muted-foreground leading-relaxed">
                Na Tread Trendz, acreditamos que o estilo é uma forma de expressão. 
                Criamos peças modernas e versáteis, pensadas para quem quer destacar a 
                sua personalidade no dia a dia sem abrir mão do conforto e da qualidade. 
                Cada coleção nasce da inspiração nas tendências urbanas e na atitude de 
                quem vive a moda de forma autêntica.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                O nosso compromisso vai além do visual: valorizamos bons materiais, 
                atenção aos detalhes e uma experiência de compra simples e confiável. 
                Queremos que cada cliente se sinta confiante ao vestir Tread Trendz — 
                porque mais do que roupas, oferecemos atitude e identidade.
              </p>
            </div>

            {/* Minimal Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/20">
              <div>
                <p className="text-2xl font-black text-primary">50k+</p>
                <p className="text-xs text-muted-foreground mt-1">Clientes Satisfeitos</p>
              </div>
              <div>
                <p className="text-2xl font-black text-primary">100%</p>
                <p className="text-xs text-muted-foreground mt-1">Qualidade Premium</p>
              </div>
              <div>
                <p className="text-2xl font-black text-primary">24/7</p>
                <p className="text-xs text-muted-foreground mt-1">Suporte Dedicado</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
