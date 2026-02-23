import { useState, useEffect, useCallback } from "react";
import { Smartphone, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

interface MbWayPaymentProps {
  phone: string;
  total: number;
  onPaymentConfirmed: () => void;
  onCancel: () => void;
}

const MbWayPayment = ({ phone, total, onPaymentConfirmed, onCancel }: MbWayPaymentProps) => {
  const [mbwayPhone, setMbwayPhone] = useState(phone);
  const [step, setStep] = useState<"phone" | "waiting" | "confirmed" | "error">("phone");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Poll for payment status
  useEffect(() => {
    if (step !== "waiting" || !paymentIntentId) return;

    const interval = setInterval(async () => {
      try {
        const { data, error } = await supabase.functions.invoke("check-payment-status", {
          body: { paymentIntentId },
        });

        if (error) throw error;

        if (data.status === "succeeded") {
          clearInterval(interval);
          setStep("confirmed");
        } else if (data.status === "canceled" || data.status === "requires_payment_method") {
          clearInterval(interval);
          setErrorMessage("Pagamento cancelado ou expirado. Tenta novamente.");
          setStep("error");
        }
      } catch (e) {
        console.error("Poll error:", e);
      }
    }, 3000);

    // Timeout after 5 minutes
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setErrorMessage("Tempo de espera esgotado. Tenta novamente.");
      setStep("error");
    }, 300000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [step, paymentIntentId]);

  useEffect(() => {
    if (step === "confirmed") {
      const timeout = setTimeout(onPaymentConfirmed, 1500);
      return () => clearTimeout(timeout);
    }
  }, [step, onPaymentConfirmed]);

  const handleSendRequest = useCallback(async () => {
    if (!mbwayPhone || mbwayPhone.length < 9) return;
    setIsCreating(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.functions.invoke("create-mbway-payment", {
        body: { amount: total, phone: mbwayPhone },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setPaymentIntentId(data.id);
      setStep("waiting");
    } catch (e: any) {
      console.error("Payment error:", e);
      setErrorMessage(e.message || "Erro ao processar pagamento. Tenta novamente.");
      setStep("error");
    } finally {
      setIsCreating(false);
    }
  }, [mbwayPhone, total]);

  if (step === "confirmed") {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-foreground">Pagamento Confirmado!</h3>
        <p className="text-sm text-muted-foreground mt-1">A finalizar a encomenda...</p>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-14 h-14 text-destructive mx-auto mb-3" />
        <h3 className="text-lg font-bold text-foreground">Erro no Pagamento</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4">{errorMessage}</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onCancel}>Voltar</Button>
          <Button onClick={() => setStep("phone")} className="neon-button">Tentar Novamente</Button>
        </div>
      </div>
    );
  }

  if (step === "waiting") {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Smartphone className="w-7 h-7 text-primary animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-foreground">A aguardar confirmação</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Confirma o pagamento de <span className="text-primary font-semibold">€{total.toFixed(2)}</span> na app MB Way no teu telemóvel
        </p>
        <p className="text-xs text-muted-foreground">
          Número: <span className="font-medium text-foreground">+351 {mbwayPhone}</span>
        </p>
        <div className="mt-6">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
          <p className="text-xs text-muted-foreground mt-2">A aguardar confirmação na app MB Way...</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onCancel} className="mt-4 text-muted-foreground">
          Cancelar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Smartphone className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Pagamento MB Way</h3>
          <p className="text-xs text-muted-foreground">Insere o número associado ao MB Way</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="mbway-phone">Número de Telemóvel</Label>
        <Input
          id="mbway-phone"
          type="tel"
          placeholder="9XX XXX XXX"
          value={mbwayPhone}
          onChange={(e) => setMbwayPhone(e.target.value)}
          className="bg-input border-border text-lg tracking-wider"
          maxLength={9}
        />
      </div>

      <div className="bg-muted/50 rounded-lg p-3 text-center">
        <p className="text-sm text-muted-foreground">Total a pagar</p>
        <p className="text-2xl font-bold text-primary">€{total.toFixed(2)}</p>
      </div>

      {errorMessage && (
        <p className="text-sm text-destructive text-center">{errorMessage}</p>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Voltar
        </Button>
        <Button 
          onClick={handleSendRequest} 
          className="flex-1 neon-button"
          disabled={!mbwayPhone || mbwayPhone.length < 9 || isCreating}
        >
          {isCreating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              A processar...
            </>
          ) : (
            "Enviar Pedido"
          )}
        </Button>
      </div>
    </div>
  );
};

export default MbWayPayment;
