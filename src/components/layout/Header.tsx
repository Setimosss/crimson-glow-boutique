 import { Menu, ShoppingBag, User, X } from "lucide-react";
 import { useState, useEffect } from "react";
 import { Link, useNavigate, useLocation } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { useCart } from "@/contexts/CartContext";
 import { useAuth } from "@/contexts/AuthContext";
 import CartSidebar from "@/components/cart/CartSidebar";
 import AdminLoginDialog from "@/components/admin/AdminLoginDialog";
 
 const Header = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [showAdminLogin, setShowAdminLogin] = useState(false);
   const [scrolled, setScrolled] = useState(false);
   const { setIsOpen: setCartOpen, itemCount } = useCart();
   const { user, isAdmin, signOut } = useAuth();
   const navigate = useNavigate();
   const location = useLocation();
 
   useEffect(() => {
     const handleScroll = () => {
       setScrolled(window.scrollY > 50);
     };
     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);
 
   const handleUserClick = () => {
     if (isAdmin) {
       navigate("/admin");
     } else {
       setShowAdminLogin(true);
     }
   };
 
   const scrollToSection = (id: string) => {
     setIsMenuOpen(false);
     if (location.pathname !== "/") {
       navigate("/");
       setTimeout(() => {
         document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
       }, 100);
     } else {
       document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
     }
   };
 
   return (
     <>
       <header 
         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
           scrolled 
             ? "bg-background/95 backdrop-blur-lg border-b border-border/50" 
             : "bg-transparent border-b border-transparent"
         }`}
       >
         {/* Gradient accent line */}
         <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
         
         <div className="container mx-auto px-4 py-4">
           <div className="flex items-center justify-between">
             {/* Logo */}
             <Link to="/" className="flex items-center gap-1 group">
               <div className="flex items-baseline gap-0.5">
                 <span className="text-xl font-black tracking-tight text-primary transition-all duration-300 group-hover:text-primary/80">
                   TREAD
                 </span>
                 <span className="text-xl font-black tracking-tight text-foreground transition-all duration-300 group-hover:text-foreground/80">
                   TRENDZ
                 </span>
               </div>
             </Link>
 
             {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              <button 
                onClick={() => scrollToSection("home")} 
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 py-1 group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
              </button>
              <Link 
                to="/shop" 
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 py-1 group"
              >
                Loja
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
              {[
                { label: "Coleção", id: "collection" },
                { label: "Sobre", id: "about" },
                { label: "Contacto", id: "contact" },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 py-1 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>
 
             {/* Actions */}
             <div className="flex items-center gap-1">
               {/* Admin/User Button */}
               <Button
                 variant="ghost"
                 size="icon"
                 className={`relative text-muted-foreground hover:text-foreground hover:bg-transparent transition-colors ${isAdmin ? "text-primary" : ""}`}
                 onClick={handleUserClick}
                 title={isAdmin ? "Painel Admin" : "Administração"}
               >
                 <User className="h-5 w-5" />
                 {isAdmin && (
                   <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                 )}
               </Button>
 
               {/* Cart Button */}
               <Button
                 variant="ghost"
                 size="icon"
                 className="relative text-muted-foreground hover:text-foreground hover:bg-transparent transition-colors"
                 onClick={() => setCartOpen(true)}
               >
                 <ShoppingBag className="h-5 w-5" />
                 {itemCount > 0 && (
                   <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold px-1">
                     {itemCount > 9 ? "9+" : itemCount}
                   </span>
                 )}
               </Button>
 
               {/* Mobile Menu Toggle */}
               <Button
                 variant="ghost"
                 size="icon"
                 className="md:hidden text-muted-foreground hover:text-foreground hover:bg-transparent"
                 onClick={() => setIsMenuOpen(!isMenuOpen)}
               >
                 {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
               </Button>
             </div>
           </div>
 
           {/* Mobile Menu */}
           {isMenuOpen && (
             <nav className="md:hidden mt-6 pb-4">
               <div className="flex flex-col gap-1">
                  <button 
                    onClick={() => scrollToSection("home")} 
                    className="text-left py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border/30"
                  >
                    Home
                  </button>
                  <Link 
                    to="/shop"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-left py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border/30"
                  >
                    Loja
                  </Link>
                  {[
                    { label: "Coleção", id: "collection" },
                    { label: "Sobre", id: "about" },
                    { label: "Contacto", id: "contact" },
                  ].map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => scrollToSection(item.id)} 
                      className="text-left py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border/30"
                    >
                      {item.label}
                    </button>
                  ))}
                 {user && (
                   <button 
                     onClick={() => signOut()} 
                     className="text-left py-3 text-lg font-medium text-destructive hover:text-destructive/80 transition-colors"
                   >
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
