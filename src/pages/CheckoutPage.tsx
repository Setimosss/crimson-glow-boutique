import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Loader2, CheckCircle, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import MbWayPayment from "@/components/checkout/MbWayPayment";
import RevolutPayment from "@/components/checkout/RevolutPayment";

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mbway");
  const [showPayment, setShowPayment] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Portugal",
  });

  const shippingCost = 0;
  const finalTotal = total + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adiciona produtos ao carrinho primeiro",
        variant: "destructive",
      });
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentConfirmed = async () => {
    setIsSubmitting(true);

    try {
      const orderId = crypto.randomUUID();

      const { error: orderError } = await supabase
        .from("orders")
        .insert({
          id: orderId,
          user_id: null,
          status: "pending",
          subtotal: total,
          shipping: shippingCost,
          total: finalTotal,
          customer_email: formData.email,
          shipping_address: {
            full_name: formData.fullName,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            postal_code: formData.postalCode,
            country: formData.country,
            phone: formData.phone,
          },
          notes: `Pagamento: ${paymentMethod.toUpperCase()}`,
        });

      if (orderError) throw orderError;

      const orderItems = items.map((item) => ({
        order_id: orderId,
        product_id: item.product_id,
        product_name: item.product?.name || "Produto",
        product_image: item.product?.images?.[0] || null,
        quantity: item.quantity,
        price: item.product?.price || 0,
        size: item.size,
        color: item.color,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Send confirmation email (non-blocking, ignore errors)
      supabase.functions.invoke("send-order-email", {
        body: {
          type: "confirmation",
          orderId,
          customerEmail: formData.email,
          customerName: formData.fullName,
          orderTotal: finalTotal,
          items: items.map((item) => ({
            name: item.product?.name || "Produto",
            quantity: item.quantity,
            price: item.product?.price || 0,
            size: item.size,
            color: item.color,
          })),
        },
      }).then(({ error }) => {
        if (error) console.warn("Email sending failed (non-critical):", error);
      }).catch((err) => {
        console.warn("Email sending failed (non-critical):", err);
      });

      await clearCart();
      setOrderComplete(true);
    } catch (error) {
      console.error("Order error:", error);
      toast({
        title: "Erro",
        description: "Não foi possível processar a encomenda. Tenta novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10">
          <Header />
          <main className="container mx-auto px-4 pt-24 pb-12">
            <div className="max-w-lg mx-auto text-center">
              <div className="bg-card border border-border rounded-2xl p-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-foreground mb-2">Encomenda Confirmada!</h1>
                <p className="text-muted-foreground mb-6">
                  Obrigado pela tua compra. Receberás um email com os detalhes da encomenda.
                </p>
                <Button onClick={() => navigate("/")} className="neon-button">
                  Voltar à Loja
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <Button
            variant="ghost"
            onClick={() => showPayment ? setShowPayment(false) : navigate(-1)}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side: Form or Payment */}
            <div className="bg-card border border-border rounded-2xl p-6">
              {showPayment ? (
                <>
                  <h1 className="text-2xl font-bold text-foreground mb-6">Pagamento</h1>
                  {paymentMethod === "mbway" ? (
                    <MbWayPayment
                      phone={formData.phone}
                      total={finalTotal}
                      onPaymentConfirmed={handlePaymentConfirmed}
                      onCancel={() => setShowPayment(false)}
                    />
                  ) : paymentMethod === "revolut" ? (
                    <RevolutPayment
                      total={finalTotal}
                      onPaymentConfirmed={handlePaymentConfirmed}
                      onCancel={() => setShowPayment(false)}
                    />
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Referência Multibanco</h3>
                          <p className="text-xs text-muted-foreground">Receberás os dados por email</p>
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 text-center">
                        <p className="text-sm text-muted-foreground">Total a pagar</p>
                        <p className="text-2xl font-bold text-primary">€{finalTotal.toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        Após confirmares, receberás os dados de pagamento por email para <span className="text-foreground font-medium">{formData.email}</span>
                      </p>
                      <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setShowPayment(false)} className="flex-1">
                          Voltar
                        </Button>
                        <Button 
                          onClick={handlePaymentConfirmed} 
                          className="flex-1 neon-button"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              A processar...
                            </>
                          ) : (
                            "Confirmar Encomenda"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-foreground mb-6">Checkout</h1>
                  <form onSubmit={handleProceedToPayment} className="space-y-6">
                    {/* Contact */}
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-foreground">Contacto</h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Nome Completo</Label>
                          <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} className="bg-input border-border" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="bg-input border-border" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telemóvel</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="9XX XXX XXX" value={formData.phone} onChange={handleInputChange} className="bg-input border-border" required />
                      </div>
                    </div>

                    {/* Shipping */}
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-foreground">Morada de Envio</h2>
                      <div className="space-y-2">
                        <Label htmlFor="address">Morada</Label>
                        <Input id="address" name="address" value={formData.address} onChange={handleInputChange} className="bg-input border-border" required />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">Cidade</Label>
                          <Input id="city" name="city" value={formData.city} onChange={handleInputChange} className="bg-input border-border" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Código Postal</Label>
                          <Input id="postalCode" name="postalCode" placeholder="XXXX-XXX" value={formData.postalCode} onChange={handleInputChange} className="bg-input border-border" required />
                        </div>
                      </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-foreground">Método de Pagamento</h2>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-3 bg-input border border-border rounded-lg p-4 cursor-pointer hover:border-primary/50">
                          <RadioGroupItem value="mbway" id="mbway" />
                          <Label htmlFor="mbway" className="flex items-center gap-2 cursor-pointer flex-1">
                            <Smartphone className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">MB Way</p>
                              <p className="text-xs text-muted-foreground">Paga com o teu telemóvel</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 bg-input border border-border rounded-lg p-4 cursor-pointer hover:border-primary/50">
                          <RadioGroupItem value="multibanco" id="multibanco" />
                          <Label htmlFor="multibanco" className="flex items-center gap-2 cursor-pointer flex-1">
                            <CreditCard className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">Multibanco / Referência</p>
                              <p className="text-xs text-muted-foreground">Receberás os dados por email</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 bg-input border border-border rounded-lg p-4 cursor-pointer hover:border-primary/50">
                          <RadioGroupItem value="revolut" id="revolut" />
                          <Label htmlFor="revolut" className="flex items-center gap-2 cursor-pointer flex-1">
                            <Wallet className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">Revolut</p>
                              <p className="text-xs text-muted-foreground">Transferência via Revolut</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button type="submit" className="w-full neon-button py-6 rounded-full" disabled={items.length === 0}>
                      Avançar para Pagamento — €{finalTotal.toFixed(2)}
                    </Button>
                  </form>
                </>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-card border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4">Resumo</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      {item.product?.images?.[0] && (
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{item.product?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.size && `Tam: ${item.size}`} {item.color && `• ${item.color}`}
                      </p>
                      <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      €{((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Portes</span>
                  <span className="text-foreground">
                    <span className="text-green-500">Grátis</span>
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">€{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CheckoutPage;