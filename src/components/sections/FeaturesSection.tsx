import { Truck, Shield, RefreshCw, Headphones } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="py-16 border-y border-primary/10 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/5 border border-primary/20 mb-4 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-500">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
