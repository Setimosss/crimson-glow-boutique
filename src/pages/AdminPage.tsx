import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Crown, Package, Tag, ShoppingCart, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import AnimatedBackground from "@/components/AnimatedBackground";

interface AdminStats {
  activeProducts: number;
  pendingOrders: number;
  monthlyRevenue: number;
}

const AdminPage = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats>({
    activeProducts: 0,
    pendingOrders: 0,
    monthlyRevenue: 0,
  });

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchStats = async () => {
      // Fetch active products count
      const { count: productsCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      // Fetch pending orders count
      const { count: pendingCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      // Fetch this month's revenue
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: revenueData } = await supabase
        .from("orders")
        .select("total")
        .gte("created_at", startOfMonth.toISOString())
        .neq("status", "cancelled");

      const monthlyRevenue = revenueData?.reduce((sum, order) => sum + Number(order.total), 0) || 0;

      setStats({
        activeProducts: productsCount || 0,
        pendingOrders: pendingCount || 0,
        monthlyRevenue,
      });
    };

    fetchStats();
  }, [isAdmin]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const menuItems = [
    {
      title: "Produtos",
      description: "Gerir produtos, stock e preços",
      icon: Package,
      href: "/admin/products",
    },
    {
      title: "Encomendas",
      description: "Ver e gerir encomendas",
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    {
      title: "Promoções",
      description: "Criar descontos e campanhas",
      icon: Tag,
      href: "/admin/promotions",
    },
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        {/* Admin Header */}
        <header className="bg-background/90 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-primary" />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black tracking-wider text-primary">TREAD</span>
                <span className="text-lg font-black tracking-wider text-foreground">TRENDZ</span>
              </div>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <LayoutDashboard className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Painel Admin</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-muted-foreground">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-2">Bem-vindo, Admin</h1>
            <p className="text-muted-foreground mb-8">Gere a tua loja a partir daqui</p>

            <div className="grid md:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
                >
                  <item.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h2 className="text-lg font-semibold text-foreground mb-1">{item.title}</h2>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Link>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid sm:grid-cols-3 gap-4 mt-12">
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-muted-foreground text-sm">Produtos Ativos</p>
                <p className="text-3xl font-bold text-foreground mt-1">{stats.activeProducts}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-muted-foreground text-sm">Encomendas Pendentes</p>
                <p className="text-3xl font-bold text-foreground mt-1">{stats.pendingOrders}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-muted-foreground text-sm">Receita Este Mês</p>
                <p className="text-3xl font-bold text-foreground mt-1">€{stats.monthlyRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;