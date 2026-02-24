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
import { Loader2, ImagePlus, X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSuccess: () => void;
}

const TAG_PRESETS = ["NOVO", "SALE", "HOT", "Best Seller", "Exclusivo", "Limitado"];
const SIZE_PRESETS = {
  "Roupa": ["XS", "S", "M", "L", "XL", "XXL"],
  "Calçado EU": ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
  "Único": ["Tamanho Único"],
};

const ProductFormDialog = ({ open, onOpenChange, product, onSuccess }: ProductFormDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newDetail, setNewDetail] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    compare_at_price: "",
    stock: "10",
    tag: "",
    images: [] as string[],
    sizes: [] as string[],
    details: [] as string[],
    is_featured: false,
    is_active: true,
  });

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
          images: product.images || [],
          sizes: product.sizes || [],
          details: product.details || [],
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
          images: [],
          sizes: [],
          details: [],
          is_featured: false,
          is_active: true,
        });
      }
      setNewImageUrl("");
      setNewDetail("");
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

  const addImage = () => {
    const url = newImageUrl.trim();
    if (url && !formData.images.includes(url)) {
      setFormData({ ...formData, images: [...formData.images, url] });
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  const toggleSize = (size: string) => {
    const newSizes = formData.sizes.includes(size)
      ? formData.sizes.filter(s => s !== size)
      : [...formData.sizes, size];
    setFormData({ ...formData, sizes: newSizes });
  };

  const addDetail = () => {
    const detail = newDetail.trim();
    if (detail) {
      setFormData({ ...formData, details: [...formData.details, detail] });
      setNewDetail("");
    }
  };

  const removeDetail = (index: number) => {
    setFormData({ ...formData, details: formData.details.filter((_, i) => i !== index) });
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
      images: formData.images,
      sizes: formData.sizes,
      details: formData.details,
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
      <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{product ? "Editar Produto" : "Novo Produto"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          {/* === BASIC INFO === */}
          <fieldset className="space-y-4">
            <legend className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Informação Básica</legend>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="bg-input border-border"
                  placeholder="Nike Air Force 1"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug <span className="text-muted-foreground text-xs">(auto)</span></Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="bg-input border-border text-muted-foreground"
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
                placeholder="Descrição breve do produto..."
              />
            </div>
          </fieldset>

          {/* === PRICING === */}
          <fieldset className="space-y-4">
            <legend className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Preço & Stock</legend>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Preço (€) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="bg-input border-border"
                  placeholder="99.90"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="compare_at_price">Preço Anterior</Label>
                <Input
                  id="compare_at_price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.compare_at_price}
                  onChange={(e) => setFormData({ ...formData, compare_at_price: e.target.value })}
                  className="bg-input border-border"
                  placeholder="129.90"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
            </div>
          </fieldset>

          {/* === TAG === */}
          <fieldset className="space-y-3">
            <legend className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Tag</legend>
            <div className="flex flex-wrap gap-2">
              {TAG_PRESETS.map((tag) => (
                <Badge
                  key={tag}
                  variant={formData.tag === tag ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    formData.tag === tag 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setFormData({ ...formData, tag: formData.tag === tag ? "" : tag })}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <Input
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="bg-input border-border"
              placeholder="Ou escreve uma tag personalizada..."
            />
          </fieldset>

          {/* === SIZES === */}
          <fieldset className="space-y-3">
            <legend className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Tamanhos</legend>
            {/* Presets */}
            <div className="flex gap-2 mb-3">
              {Object.entries(SIZE_PRESETS).map(([label, sizes]) => (
                <Button
                  key={label}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setFormData({ ...formData, sizes })}
                >
                  {label}
                </Button>
              ))}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
                onClick={() => setFormData({ ...formData, sizes: [] })}
              >
                Limpar
              </Button>
            </div>
            {/* Size chips */}
            <div className="flex flex-wrap gap-2">
              {(formData.sizes.length > 0 ? [...new Set([...formData.sizes, ...SIZE_PRESETS["Calçado EU"]])] : SIZE_PRESETS["Calçado EU"]).map((size) => (
                <Badge
                  key={size}
                  variant={formData.sizes.includes(size) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    formData.sizes.includes(size) 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:border-primary/50 text-muted-foreground"
                  }`}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </Badge>
              ))}
            </div>
            {/* Custom size input */}
            <div className="flex gap-2">
              <Input
                placeholder="Tamanho personalizado..."
                className="bg-input border-border flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val && !formData.sizes.includes(val)) {
                      setFormData({ ...formData, sizes: [...formData.sizes, val] });
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
              />
            </div>
          </fieldset>

          {/* === IMAGES === */}
          <fieldset className="space-y-3">
            <legend className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Imagens</legend>
            {/* Image previews */}
            {formData.images.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {formData.images.map((url, i) => (
                  <div key={i} className="relative group shrink-0">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-border bg-muted">
                      <img src={url} alt={`Imagem ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    {i === 0 && (
                      <span className="absolute bottom-0 left-0 right-0 text-[8px] text-center bg-primary/80 text-primary-foreground rounded-b-lg py-0.5">
                        Principal
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/* Add image */}
            <div className="flex gap-2">
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="bg-input border-border flex-1"
                placeholder="https://... (URL da imagem)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addImage();
                  }
                }}
              />
              <Button type="button" variant="outline" size="icon" onClick={addImage}>
                <ImagePlus className="w-4 h-4" />
              </Button>
            </div>
          </fieldset>

          {/* === DETAILS === */}
          <fieldset className="space-y-3">
            <legend className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Detalhes do Produto</legend>
            {formData.details.length > 0 && (
              <div className="space-y-1.5">
                {formData.details.map((detail, i) => (
                  <div key={i} className="flex items-center gap-2 group">
                    <span className="text-sm text-muted-foreground flex-1">• {detail}</span>
                    <button
                      type="button"
                      onClick={() => removeDetail(i)}
                      className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
                className="bg-input border-border flex-1"
                placeholder="Ex: 100% Couro Natural"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addDetail();
                  }
                }}
              />
              <Button type="button" variant="outline" size="icon" onClick={addDetail}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </fieldset>

          {/* === SWITCHES === */}
          <div className="flex items-center gap-8 pt-2 border-t border-border/20">
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

          {/* === ACTIONS === */}
          <div className="flex gap-3 pt-2">
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
                "Guardar Alterações"
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
