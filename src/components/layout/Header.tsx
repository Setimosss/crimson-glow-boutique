import { Menu, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold tracking-widest text-foreground hover:text-primary transition-colors">
            BRAND<span className="text-primary neon-text">X</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="nav-link">Home</a>
            <a href="#collection" className="nav-link">Coleção</a>
            <a href="#about" className="nav-link">Sobre</a>
            <a href="#contact" className="nav-link">Contacto</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-primary/10">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-primary/10 relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center neon-glow">
                0
              </span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-primary/20 pt-4">
            <div className="flex flex-col gap-4">
              <a href="#home" className="nav-link">Home</a>
              <a href="#collection" className="nav-link">Coleção</a>
              <a href="#about" className="nav-link">Sobre</a>
              <a href="#contact" className="nav-link">Contacto</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
