import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscrito com sucesso!",
        description: "Receberás as nossas novidades em breve.",
      });
      setEmail("");
    }
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto text-center"
        >
          <span className="text-primary text-xs uppercase tracking-[0.4em] font-medium">Newsletter</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
            <span className="text-foreground">JUNTA-TE À </span>
            <span className="text-primary neon-text">TRIBO</span>
          </h2>
          <p className="text-muted-foreground mb-10 text-sm">
            Subscreve e recebe acesso exclusivo a novidades, promoções e lançamentos especiais.
          </p>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="flex gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="O teu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input border-border focus:border-primary text-foreground placeholder:text-muted-foreground h-12 rounded-full px-5 flex-1"
              required
            />
            <Button type="submit" className="neon-button h-12 rounded-full px-6">
              <Send className="w-4 h-4 mr-2" />
              Subscrever
            </Button>
          </motion.form>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground text-[11px] mt-4"
          >
            Ao subscrever, aceitas receber emails de marketing. Cancela a qualquer momento.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
