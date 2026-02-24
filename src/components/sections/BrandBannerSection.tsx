import { motion } from "framer-motion";
import { Truck, RefreshCw, Lock, Headphones } from "lucide-react";

const perks = [
  { icon: Truck, title: "Envio Grátis", desc: "Em encomendas acima de €50" },
  { icon: RefreshCw, title: "Devoluções Fáceis", desc: "30 dias para devolver" },
  { icon: Lock, title: "Pagamento Seguro", desc: "Encriptação total" },
  { icon: Headphones, title: "Suporte 24/7", desc: "Estamos aqui para ti" },
];

const BrandBannerSection = () => {
  return (
    <section className="py-16 border-y border-border/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <perk.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{perk.title}</h3>
                <p className="text-muted-foreground text-xs mt-1">{perk.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandBannerSection;
