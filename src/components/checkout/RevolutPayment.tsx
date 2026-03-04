import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Copy, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RevolutPaymentProps {
  total: number;
  onPaymentConfirmed: () => void;
  onCancel: () => void;
}

const RevolutPayment = ({ total, onPaymentConfirmed, onCancel }: RevolutPaymentProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const revolutTag = "@treadtrendz";
  const revolutIBAN = "PT50 0000 0000 0000 0000 0000 0";
  const revolutName = "Tread Trendz Lda";

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${label} copiado para a área de transferência`,
    });
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    await onPaymentConfirmed();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[hsl(250,80%,55%)]/10 flex items-center justify-center">
          <span className="text-lg font-bold text-[hsl(250,80%,55%)]">R</span>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Revolut</h3>
          <p className="text-xs text-muted-foreground">Transferência via Revolut</p>
        </div>
      </div>

      {/* Amount */}
      <div className="bg-muted/50 rounded-xl p-4 text-center">
        <p className="text-sm text-muted-foreground">Total a transferir</p>
        <p className="text-3xl font-black text-primary mt-1">€{total.toFixed(2)}</p>
      </div>

      {/* Payment details */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">Dados para transferência:</p>
        
        {/* Revolut Tag */}
        <div className="flex items-center justify-between bg-input border border-border rounded-lg p-3">
          <div>
            <p className="text-xs text-muted-foreground">Revolut Tag</p>
            <p className="text-sm font-medium text-foreground">{revolutTag}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copyToClipboard(revolutTag, "Revolut Tag")}
            className="text-muted-foreground hover:text-primary"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>

        {/* IBAN */}
        <div className="flex items-center justify-between bg-input border border-border rounded-lg p-3">
          <div>
            <p className="text-xs text-muted-foreground">IBAN</p>
            <p className="text-sm font-medium text-foreground font-mono">{revolutIBAN}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copyToClipboard(revolutIBAN.replace(/\s/g, ""), "IBAN")}
            className="text-muted-foreground hover:text-primary"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>

        {/* Name */}
        <div className="flex items-center justify-between bg-input border border-border rounded-lg p-3">
          <div>
            <p className="text-xs text-muted-foreground">Titular</p>
            <p className="text-sm font-medium text-foreground">{revolutName}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copyToClipboard(revolutName, "Titular")}
            className="text-muted-foreground hover:text-primary"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <CheckCircle className="w-3.5 h-3.5 text-primary inline mr-1.5" />
          Após a transferência, clica em "Confirmar" para registar a encomenda. Confirmaremos a receção do pagamento e enviaremos a tua encomenda.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Voltar
        </Button>
        <Button
          onClick={handleConfirm}
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
  );
};

export default RevolutPayment;
