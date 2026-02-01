import { Truck, Shield, RefreshCw, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Envio Grátis",
    description: "Em todas as compras acima de €50"
  },
  {
    icon: Shield,
    title: "Pagamento Seguro",
    description: "Transações 100% protegidas"
  },
  {
    icon: RefreshCw,
    title: "Devoluções Fáceis",
    description: "30 dias para devolução gratuita"
  },
  {
    icon: Headphones,
    title: "Suporte 24/7",
    description: "Estamos sempre disponíveis"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 border-y border-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary/30 mb-4 group-hover:border-primary group-hover:neon-glow transition-all duration-300">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
