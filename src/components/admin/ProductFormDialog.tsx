 import { useState, useEffect } from "react";
 import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Textarea } from "@/components/ui/textarea";
 import { Switch } from "@/components/ui/switch";
 import { supabase } from "@/integrations/supabase/client";
 import { useToast } from "@/hooks/use-toast";
 import { Product } from "@/types/database";
 import { Loader2 } from "lucide-react";
 
 interface ProductFormDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   product: Product | null;
   onSuccess: () => void;
 }
 
 const ProductFormDialog = ({ open, onOpenChange, product, onSuccess }: ProductFormDialogProps) => {
   const { toast } = useToast();
   const [isLoading, setIsLoading] = useState(false);
   
   const [formData, setFormData] = useState({
     name: "",
     slug: "",
     description: "",
     price: "",
     compare_at_price: "",
     stock: "10",
     tag: "",
     images: "",
     sizes: "S, M, L, XL",
     details: "",
     is_featured: false,
     is_active: true,
   });
 
   // Update form when product changes or dialog opens
   useEffect(() => {
     if (open) {
       if (product) {
         setFormData({
           name: product.name || "",
           slug: product.slug || "",
           description: product.description || "",
           price: product.price?.toString() || "",
           compare_at_price: product.compare_at_price?.toString() || "",
           stock: product.stock?.toString() || "10",
           tag: product.tag || "",
           images: product.images?.join("\n") || "",
           sizes: product.sizes?.join(", ") || "S, M, L, XL",
           details: product.details?.join("\n") || "",
           is_featured: product.is_featured || false,
           is_active: product.is_active ?? true,
         });
       } else {
         setFormData({
           name: "",
           slug: "",
           description: "",
           price: "",
           compare_at_price: "",
           stock: "10",
           tag: "",
           images: "",
           sizes: "S, M, L, XL",
           details: "",
           is_featured: false,
           is_active: true,
         });
       }
     }
   }, [product, open]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: product ? formData.slug : generateSlug(name),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

     const productData = {
       name: formData.name,
       slug: formData.slug || generateSlug(formData.name),
       description: formData.description || null,
       price: parseFloat(formData.price),
       compare_at_price: formData.compare_at_price ? parseFloat(formData.compare_at_price) : null,
       stock: parseInt(formData.stock) || 0,
       tag: formData.tag || null,
       images: formData.images.split("\n").filter((url) => url.trim()),
       sizes: formData.sizes.split(",").map((s) => s.trim()).filter(Boolean),
       details: formData.details.split("\n").filter((d) => d.trim()),
       is_featured: formData.is_featured,
       is_active: formData.is_active,
     };

    try {
      if (product) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id);
        
        if (error) throw error;
        toast({ title: "Atualizado", description: "Produto atualizado com sucesso" });
      } else {
        const { error } = await supabase.from("products").insert(productData);
        if (error) throw error;
        toast({ title: "Criado", description: "Produto criado com sucesso" });
      }
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível guardar o produto",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Editar Produto" : "Novo Produto"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="bg-input border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="bg-input border-border"
                placeholder="auto-gerado"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-input border-border resize-none"
              rows={3}
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (€) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-input border-border"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="compare_at_price">Preço Anterior</Label>
              <Input
                id="compare_at_price"
                type="number"
                step="0.01"
                value={formData.compare_at_price}
                onChange={(e) => setFormData({ ...formData, compare_at_price: e.target.value })}
                className="bg-input border-border"
                placeholder="Para promoções"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tag">Tag (opcional)</Label>
              <Input
                id="tag"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="bg-input border-border"
                placeholder="NOVO, SALE, HOT..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sizes">Tamanhos</Label>
              <Input
                id="sizes"
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                className="bg-input border-border"
                placeholder="S, M, L, XL"
              />
            </div>
          </div>

           <div className="space-y-2">
             <Label htmlFor="images">URLs das Imagens (uma por linha)</Label>
             <Textarea
               id="images"
               value={formData.images}
               onChange={(e) => setFormData({ ...formData, images: e.target.value })}
               className="bg-input border-border resize-none"
               rows={3}
               placeholder="https://..."
             />
           </div>
 
           <div className="space-y-2">
             <Label htmlFor="details">Detalhes do Produto (um por linha)</Label>
             <Textarea
               id="details"
               value={formData.details}
               onChange={(e) => setFormData({ ...formData, details: e.target.value })}
               className="bg-input border-border resize-none"
               rows={3}
               placeholder="100% Algodão&#10;Corte Regular&#10;Feito em Portugal"
             />
           </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
              />
              <Label htmlFor="is_featured">Destaque</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Ativo</Label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 neon-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  A guardar...
                </>
              ) : product ? (
                "Guardar"
              ) : (
                "Criar Produto"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
