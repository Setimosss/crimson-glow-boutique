import { Link } from "react-router-dom";
import { ArrowLeft, Tag, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";

const AdminPromotionsPage = () => {
  // Auth guard handled by ProtectedAdminRoute

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <header className="bg-background/90 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-bold text-foreground">Promoções</h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card border border-border rounded-2xl p-12">
              <Construction className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Em Construção</h2>
              <p className="text-muted-foreground mb-6">
                A funcionalidade de promoções e códigos de desconto está a ser desenvolvida. Em breve poderás criar campanhas e gerir cupões diretamente aqui.
              </p>
              <Button variant="outline" asChild>
                <Link to="/admin">Voltar ao Painel</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPromotionsPage;
