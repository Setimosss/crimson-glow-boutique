import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Crown, Loader2 } from "lucide-react";

interface AdminLoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminLoginDialog = ({ open, onOpenChange }: AdminLoginDialogProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, checkAdminRole } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Use email format for admin login
    const email = `${username}@treadtrendz.admin`;
    
    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "Erro de autenticação",
        description: "Credenciais inválidas",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Check if user has admin role
    const isAdmin = await checkAdminRole();
    
    if (!isAdmin) {
      toast({
        title: "Acesso negado",
        description: "Esta conta não tem permissões de administrador",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Bem-vindo!",
      description: "Login de administrador bem-sucedido",
    });
    
    setIsLoading(false);
    onOpenChange(false);
    setUsername("");
    setPassword("");
    navigate("/admin");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-6 h-6 text-primary" />
            <DialogTitle className="text-foreground">Administração</DialogTitle>
          </div>
          <DialogDescription>
            Introduz as tuas credenciais para aceder ao painel de administração.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nome de utilizador</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="bg-input border-border"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="bg-input border-border"
              required
            />
          </div>

          <Button type="submit" className="w-full neon-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                A verificar...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLoginDialog;
