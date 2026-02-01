import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-[#2B0505]/50 via-black to-black" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">JUNTA-TE À </span>
            <span className="text-primary neon-text">TRIBO</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Subscreve a nossa newsletter e recebe acesso exclusivo a novidades, 
            promoções e lançamentos especiais.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Input
              type="email"
              placeholder="O teu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input border-border focus:border-primary text-foreground placeholder:text-muted-foreground max-w-sm"
              required
            />
            <Button type="submit" className="neon-button">
              Subscrever
            </Button>
          </form>

          <p className="text-muted-foreground text-xs mt-4">
            Ao subscrever, aceitas receber emails de marketing. Podes cancelar a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
