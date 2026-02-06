import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-primary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <a href="/" className="text-2xl font-bold tracking-widest text-foreground">
              TREAD<span className="text-primary neon-text">TRENDZ</span>
            </a>
            <p className="text-muted-foreground text-sm mt-4">
              Moda urbana para quem define as próprias regras.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#collection" className="text-muted-foreground hover:text-primary transition-colors text-sm">Novidades</a></li>
              <li><a href="#collection" className="text-muted-foreground hover:text-primary transition-colors text-sm">Best Sellers</a></li>
              <li><a href="#collection" className="text-muted-foreground hover:text-primary transition-colors text-sm">Promoções</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Ajuda</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Envios</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Devoluções</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contacto</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Segue-nos</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/_tread.trendz_/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-muted-foreground text-xs mt-3">
              @_tread.trendz_
            </p>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 TREAD TRENDZ. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
