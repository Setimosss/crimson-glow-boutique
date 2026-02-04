import { Menu, ShoppingBag, User, X, Crown } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import CartSidebar from "@/components/cart/CartSidebar";
import AdminLoginDialog from "@/components/admin/AdminLoginDialog";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { setIsOpen: setCartOpen, itemCount } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (isAdmin) {
      navigate("/admin");
    } else {
      setShowAdminLogin(true);
    }
  };

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <Crown className="w-6 h-6 text-primary" />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black tracking-wider text-primary neon-text">
                  TREAD
                </span>
                <span className="text-lg font-black tracking-wider text-foreground">
                  TRENDZ
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection("home")} className="nav-link">
                Home
              </button>
              <button onClick={() => scrollToSection("collection")} className="nav-link">
                Coleção
              </button>
              <button onClick={() => scrollToSection("about")} className="nav-link">
                Sobre
              </button>
              <button onClick={() => scrollToSection("contact")} className="nav-link">
                Contacto
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Admin/User Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`text-foreground hover:text-primary hover:bg-primary/10 ${isAdmin ? "text-primary" : ""}`}
                onClick={handleUserClick}
                title={isAdmin ? "Painel Admin" : "Administração"}
              >
                <User className="h-5 w-5" />
                {isAdmin && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    A
                  </span>
                )}
              </Button>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-primary hover:bg-primary/10 relative"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center neon-glow font-bold">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Toggle */}
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
            <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <div className="flex flex-col gap-4">
                <button onClick={() => scrollToSection("home")} className="nav-link text-left">
                  Home
                </button>
                <button onClick={() => scrollToSection("collection")} className="nav-link text-left">
                  Coleção
                </button>
                <button onClick={() => scrollToSection("about")} className="nav-link text-left">
                  Sobre
                </button>
                <button onClick={() => scrollToSection("contact")} className="nav-link text-left">
                  Contacto
                </button>
                {user && (
                  <button onClick={() => signOut()} className="nav-link text-left text-destructive">
                    Sair
                  </button>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      <CartSidebar />
      <AdminLoginDialog open={showAdminLogin} onOpenChange={setShowAdminLogin} />
    </>
  );
};

export default Header;
