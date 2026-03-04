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
    <section className="py-12 border-y border-primary/10 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex items-center gap-4 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-500">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-xs mt-0.5">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
