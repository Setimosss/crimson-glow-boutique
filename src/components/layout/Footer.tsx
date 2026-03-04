import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-16 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <a href="/" className="text-2xl font-black tracking-tight text-foreground">
              TREAD<span className="text-primary">TRENDZ</span>
            </a>
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              Moda urbana para quem define as próprias regras.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Links</h4>
            <ul className="space-y-3">
              <li><a href="#collection" className="text-muted-foreground hover:text-primary transition-colors text-sm">Novidades</a></li>
              <li><a href="#collection" className="text-muted-foreground hover:text-primary transition-colors text-sm">Best Sellers</a></li>
              <li><a href="#collection" className="text-muted-foreground hover:text-primary transition-colors text-sm">Promoções</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Ajuda</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Envios</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Devoluções</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contacto</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Social</h4>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/_tread.trendz_/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
            <p className="text-muted-foreground text-xs mt-3">@_tread.trendz_</p>
          </div>
        </div>

        <div className="border-t border-border/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © 2026 TREAD TRENDZ. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xs">Privacidade</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xs">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
