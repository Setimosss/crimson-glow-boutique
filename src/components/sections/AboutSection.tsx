

const AboutSection = () => {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop"
                alt="Fashion model"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-8 -right-8 glass rounded-xl p-6 max-w-[200px]">
              <p className="text-4xl font-bold text-primary mb-1">5+</p>
              <p className="text-sm text-muted-foreground">Anos de Excelência</p>
            </div>
            
            <div className="absolute -top-8 -left-8 glass rounded-xl p-6 max-w-[200px]">
              <p className="text-4xl font-bold text-primary mb-1">50k+</p>
              <p className="text-sm text-muted-foreground">Clientes Satisfeitos</p>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <span className="text-primary text-sm uppercase tracking-[0.3em] font-medium">Sobre Nós</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                Onde o Estilo
                <br />
                <span className="text-primary neon-text">Encontra a Alma</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Nascemos da paixão por criar peças que transcendem o comum. 
                Cada item da nossa coleção é cuidadosamente desenhado para 
                quem recusa viver na mediocridade.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <h3 className="text-xl font-semibold">Design Único</h3>
                <p className="text-muted-foreground text-sm">
                  Peças exclusivas que não encontras em mais nenhum lugar.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <h3 className="text-xl font-semibold">Qualidade Premium</h3>
                <p className="text-muted-foreground text-sm">
                  Materiais selecionados para durabilidade e conforto.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 pt-4">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
