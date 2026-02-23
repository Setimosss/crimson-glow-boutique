import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import AnimatedBackground from "@/components/AnimatedBackground";

type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

const statusConfig: Record<OrderStatus, { label: string; icon: React.ElementType; color: string }> = {
  pending: { label: "Pendente", icon: Clock, color: "bg-yellow-500/20 text-yellow-500" },
  confirmed: { label: "Confirmado", icon: CheckCircle, color: "bg-blue-500/20 text-blue-500" },
  processing: { label: "Em Preparação", icon: Package, color: "bg-purple-500/20 text-purple-500" },
  shipped: { label: "Enviado", icon: Truck, color: "bg-cyan-500/20 text-cyan-500" },
  delivered: { label: "Entregue", icon: CheckCircle, color: "bg-green-500/20 text-green-500" },
  cancelled: { label: "Cancelado", icon: XCircle, color: "bg-red-500/20 text-red-500" },
};

const AdminOrdersPage = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: orders, isLoading, refetch } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (*)
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  // Auth guard handled by ProtectedAdminRoute

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o estado",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Atualizado",
        description: `Estado alterado para ${statusConfig[status].label}`,
      });
      refetch();
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-background/90 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Gestão de Encomendas</h1>
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-card border border-border rounded-xl animate-pulse" />
              ))}
            </div>
          ) : orders?.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Ainda não há encomendas</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders?.map((order) => {
                const status = order.status as OrderStatus;
                const config = statusConfig[status];
                const StatusIcon = config.icon;
                const shippingAddress = order.shipping_address as any;

                return (
                  <div key={order.id} className="bg-card border border-border rounded-xl p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Encomenda #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString("pt-PT", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={config.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {config.label}
                        </Badge>
                        <Select value={status} onValueChange={(v) => updateStatus(order.id, v as OrderStatus)}>
                          <SelectTrigger className="w-40 bg-input border-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(statusConfig).map(([key, val]) => (
                              <SelectItem key={key} value={key}>
                                {val.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Cliente</p>
                        <p className="text-foreground">{shippingAddress?.full_name}</p>
                        <p className="text-muted-foreground">{shippingAddress?.phone}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Morada</p>
                        <p className="text-foreground">{shippingAddress?.address}</p>
                        <p className="text-muted-foreground">
                          {shippingAddress?.postal_code}, {shippingAddress?.city}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="border-t border-border pt-4">
                      <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">
                        Produtos ({order.order_items?.length || 0})
                      </p>
                      <div className="space-y-2">
                        {order.order_items?.map((item: any) => (
                          <div key={item.id} className="flex items-center gap-3">
                            {item.product_image && (
                              <img
                                src={item.product_image}
                                alt={item.product_name}
                                className="w-10 h-12 object-cover rounded"
                              />
                            )}
                            <div className="flex-1">
                              <p className="text-sm text-foreground">{item.product_name}</p>
                              <p className="text-xs text-muted-foreground">
                                Qtd: {item.quantity} {item.size && `• ${item.size}`}
                              </p>
                            </div>
                            <p className="text-sm font-medium text-foreground">
                              €{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-end pt-4 border-t border-border mt-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Subtotal: €{Number(order.subtotal).toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Portes: €{Number(order.shipping).toFixed(2)}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          Total: €{Number(order.total).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
