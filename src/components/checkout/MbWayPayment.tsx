import { useState, useEffect } from "react";
import { Smartphone, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MbWayPaymentProps {
  phone: string;
  total: number;
  onPaymentConfirmed: () => void;
  onCancel: () => void;
}

const MbWayPayment = ({ phone, total, onPaymentConfirmed, onCancel }: MbWayPaymentProps) => {
  const [mbwayPhone, setMbwayPhone] = useState(phone);
  const [step, setStep] = useState<"phone" | "waiting" | "confirmed">("phone");
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (step !== "waiting") return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStep("confirmed");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step]);

  useEffect(() => {
    if (step === "confirmed") {
      const timeout = setTimeout(onPaymentConfirmed, 1500);
      return () => clearTimeout(timeout);
    }
  }, [step, onPaymentConfirmed]);

  const handleSendRequest = () => {
    if (!mbwayPhone || mbwayPhone.length < 9) return;
    setStep("waiting");
  };

  if (step === "confirmed") {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-foreground">Pagamento Confirmado!</h3>
        <p className="text-sm text-muted-foreground mt-1">A finalizar a encomenda...</p>
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
          Número: <span className="font-medium text-foreground">{mbwayPhone}</span>
        </p>
        <div className="mt-6">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
          <p className="text-xs text-muted-foreground mt-2">A simular confirmação em {countdown}s...</p>
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

      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Voltar
        </Button>
        <Button 
          onClick={handleSendRequest} 
          className="flex-1 neon-button"
          disabled={!mbwayPhone || mbwayPhone.length < 9}
        >
          Enviar Pedido
        </Button>
      </div>
    </div>
  );
};

export default MbWayPayment;