import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Plus, Pencil, Trash2, Search, Package, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import AnimatedBackground from "@/components/AnimatedBackground";
import ProductFormDialog from "@/components/admin/ProductFormDialog";
import { Product } from "@/types/database";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AdminProductsPage = () => {
  const { data: products, isLoading, refetch } = useProducts();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Auth guard handled by ProtectedAdminRoute

  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingProductId) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", deletingProductId);

    if (error) {
      toast({
        title: "Erro",
        description: "Não foi possível eliminar o produto",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Eliminado",
        description: "Produto eliminado com sucesso",
      });
      refetch();
    }
    setDeletingProductId(null);
  };

  const toggleActive = async (product: Product) => {
    const { error } = await supabase
      .from("products")
      .update({ is_active: !product.is_active })
      .eq("id", product.id);

    if (!error) {
      refetch();
      toast({
        title: product.is_active ? "Desativado" : "Ativado",
        description: `${product.name} foi ${product.is_active ? "desativado" : "ativado"}`,
      });
    }
  };

  const toggleSoldOut = async (product: Product) => {
    const newStock = product.stock > 0 ? 0 : 10;
    const { error } = await supabase
      .from("products")
      .update({ stock: newStock })
      .eq("id", product.id);

    if (!error) {
      refetch();
      toast({
        title: newStock === 0 ? "Sold Out" : "Em Stock",
        description: `${product.name} marcado como ${newStock === 0 ? "esgotado" : "disponível"}`,
      });
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-background/90 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-foreground">Gestão de Produtos</h1>
            </div>
            <Button className="neon-button" onClick={() => { setEditingProduct(null); setIsFormOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Produto
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-input border-border"
            />
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-card border border-border rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filteredProducts?.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum produto encontrado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts?.map((product) => (
                <div
                  key={product.id}
                  className={`bg-card border border-border rounded-xl p-4 flex gap-4 items-center ${!product.is_active ? "opacity-60" : ""}`}
                >
                  {/* Image */}
                  <div className="w-16 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    {product.images?.[0] && (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                      {product.tag && (
                        <Badge variant="secondary" className="text-xs">{product.tag}</Badge>
                      )}
                    </div>
                    <p className="text-primary font-bold">€{Number(product.price).toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {product.stock === 0 ? (
                        <Badge variant="destructive" className="text-xs">Sold Out</Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">Stock: {product.stock}</span>
                      )}
                      {!product.is_active && (
                        <Badge variant="outline" className="text-xs">Inativo</Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSoldOut(product)}
                      className="text-xs"
                    >
                      {product.stock === 0 ? "Repor Stock" : "Sold Out"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(product)}
                      className="text-xs"
                    >
                      {product.is_active ? "Desativar" : "Ativar"}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeletingProductId(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Product Form Dialog */}
      <ProductFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        product={editingProduct}
        onSuccess={() => {
          refetch();
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingProductId} onOpenChange={() => setDeletingProductId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Eliminar Produto
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tens a certeza que queres eliminar este produto? Esta ação não pode ser revertida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProductsPage;
