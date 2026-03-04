import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/database";
import { Loader2, ImagePlus, X, Plus, Upload, Palette } from "lucide-react";
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

const COLOR_PRESETS = [
  { name: "Preto", hex: "#000000" },
  { name: "Branco", hex: "#FFFFFF" },
  { name: "Cinza", hex: "#808080" },
  { name: "Vermelho", hex: "#DC2626" },
  { name: "Azul", hex: "#2563EB" },
  { name: "Verde", hex: "#16A34A" },
  { name: "Bege", hex: "#D2B48C" },
  { name: "Rosa", hex: "#EC4899" },
  { name: "Castanho", hex: "#8B4513" },
  { name: "Amarelo", hex: "#EAB308" },
];

interface ColorItem {
  name: string;
  hex: string;
}

const ProductFormDialog = ({ open, onOpenChange, product, onSuccess }: ProductFormDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#000000");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    colors: [] as ColorItem[],
    details: [] as string[],
    is_featured: false,
    is_active: true,
  });

  useEffect(() => {
    if (open) {
      if (product) {
        const productColors = Array.isArray(product.colors) 
          ? (product.colors as unknown as ColorItem[]) 
          : [];
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
          colors: productColors,
          details: product.details || [],
          is_featured: product.is_featured || false,
          is_active: product.is_active ?? true,
        });
      } else {
        setFormData({
          name: "", slug: "", description: "", price: "", compare_at_price: "",
          stock: "10", tag: "", images: [], sizes: [], colors: [], details: [],
          is_featured: false, is_active: true,
        });
      }
      setNewImageUrl("");
      setNewDetail("");
      setNewColorName("");
      setNewColorHex("#000000");
    }
  }, [product, open]);

  const generateSlug = (name: string) => {
    return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData({ ...formData, name, slug: product ? formData.slug : generateSlug(name) });
  };

  // === IMAGE HANDLING ===
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
        
        const { error } = await supabase.storage
          .from('product-images')
          .upload(fileName, file, { contentType: file.type });

        if (error) throw error;

        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);

        uploadedUrls.push(urlData.publicUrl);
      }

      setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
      toast({ title: "Upload concluído", description: `${uploadedUrls.length} imagem(ns) carregada(s)` });
    } catch (error: any) {
      toast({ title: "Erro no upload", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const addImageUrl = () => {
    const url = newImageUrl.trim();
    if (url && !formData.images.includes(url)) {
      setFormData({ ...formData, images: [...formData.images, url] });
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  // === COLORS ===
  const toggleColorPreset = (color: ColorItem) => {
    const exists = formData.colors.some(c => c.hex === color.hex);
    if (exists) {
      setFormData({ ...formData, colors: formData.colors.filter(c => c.hex !== color.hex) });
    } else {
      setFormData({ ...formData, colors: [...formData.colors, color] });
    }
  };

  const addCustomColor = () => {
    const name = newColorName.trim();
    if (name && newColorHex && !formData.colors.some(c => c.hex === newColorHex)) {
      setFormData({ ...formData, colors: [...formData.colors, { name, hex: newColorHex }] });
      setNewColorName("");
      setNewColorHex("#000000");
    }
  };

  const removeColor = (index: number) => {
    setFormData({ ...formData, colors: formData.colors.filter((_, i) => i !== index) });
  };

  // === SIZES ===
  const toggleSize = (size: string) => {
    const newSizes = formData.sizes.includes(size)
      ? formData.sizes.filter(s => s !== size)
      : [...formData.sizes, size];
    setFormData({ ...formData, sizes: newSizes });
  };

  // === DETAILS ===
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
      colors: formData.colors as unknown as any,
      details: formData.details,
      is_featured: formData.is_featured,
      is_active: formData.is_active,
    };

    try {
      if (product) {
        const { error } = await supabase.from("products").update(productData).eq("id", product.id);
        if (error) throw error;
        toast({ title: "Atualizado", description: "Produto atualizado com sucesso" });
      } else {
        const { error } = await supabase.from("products").insert(productData);
        if (error) throw error;
        toast({ title: "Criado", description: "Produto criado com sucesso" });
      }
      onSuccess();
    } catch (error: any) {
      toast({ title: "Erro", description: error.message || "Não foi possível guardar o produto", variant: "destructive" });
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
                <Input id="name" value={formData.name} onChange={(e) => handleNameChange(e.target.value)} className="bg-input border-border" placeholder="Nike Air Force 1" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug <span className="text-muted-foreground text-xs">(auto)</span></Label>
                <Input id="slug" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="bg-input border-border text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-input border-border resize-none" rows={3} placeholder="Descrição breve do produto..." />
            </div>
          </fieldset>

          {/* === PRICING === */}
          <fieldset className="space-y-4">
            <legend className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Preço & Stock</legend>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Preço (€) *</Label>
                <Input id="price" type="number" step="0.01" min="0" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="bg-input border-border" placeholder="99.90" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="compare_at_price">Preço Anterior</Label>
                <Input id="compare_at_price" type="number" step="0.01" min="0" value={formData.compare_at_price} onChange={(e) => setFormData({ ...formData, compare_at_price: e.target.value })} className="bg-input border-border" placeholder="129.90" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" type="number" min="0" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="bg-input border-border" />
              </div>
            </div>
          </fieldset>

          {/* === TAG === */}
          <fieldset className="space-y-3">
            <legend className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Tag</legend>
            <div className="flex flex-wrap gap-2">
              {TAG_PRESETS.map((tag) => (
                <Badge key={tag} variant={formData.tag === tag ? "default" : "outline"} className={`cursor-pointer transition-colors ${formData.tag === tag ? "bg-primary text-primary-foreground" : "hover:border-primary/50"}`} onClick={() => setFormData({ ...formData, tag: formData.tag === tag ? "" : tag })}>
                  {tag}
                </Badge>
              ))}
            </div>
            <Input value={formData.tag} onChange={(e) => setFormData({ ...formData, tag: e.target.value })} className="bg-input border-border" placeholder="Ou escreve uma tag personalizada..." />
          </fieldset>

          {/* === SIZES === */}
          <fieldset className="space-y-3">
            <legend className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">Tamanhos</legend>
            <div className="flex gap-2 mb-3">
              {Object.entries(SIZE_PRESETS).map(([label, sizes]) => (
                <Button key={label} type="button" variant="outline" size="sm" className="text-xs" onClick={() => setFormData({ ...formData, sizes })}>
                  {label}
                </Button>
              ))}
              <Button type="button" variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={() => setFormData({ ...formData, sizes: [] })}>
                Limpar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(formData.sizes.length > 0 ? [...new Set([...formData.sizes, ...SIZE_PRESETS["Calçado EU"]])] : SIZE_PRESETS["Calçado EU"]).map((size) => (
                <Badge key={size} variant={formData.sizes.includes(size) ? "default" : "outline"} className={`cursor-pointer transition-colors ${formData.sizes.includes(size) ? "bg-primary text-primary-foreground" : "hover:border-primary/50 text-muted-foreground"}`} onClick={() => toggleSize(size)}>
                  {size}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="Tamanho personalizado..." className="bg-input border-border flex-1" onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const val = (e.target as HTMLInputElement).value.trim();
                  if (val && !formData.sizes.includes(val)) {
                    setFormData({ ...formData, sizes: [...formData.sizes, val] });
                    (e.target as HTMLInputElement).value = "";
                  }
                }
              }} />
            </div>
          </fieldset>

          {/* === COLORS === */}
          <fieldset className="space-y-3">
            <legend className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2 flex items-center gap-2">
              <Palette className="w-3.5 h-3.5" /> Cores
            </legend>
            {/* Color presets */}
            <div className="flex flex-wrap gap-2">
              {COLOR_PRESETS.map((color) => {
                const isSelected = formData.colors.some(c => c.hex === color.hex);
                return (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => toggleColorPreset(color)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs transition-all ${
                      isSelected ? "border-primary bg-primary/10 text-foreground" : "border-border hover:border-primary/50 text-muted-foreground"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full border border-border/50 shrink-0" style={{ backgroundColor: color.hex }} />
                    {color.name}
                  </button>
                );
              })}
            </div>
            {/* Selected colors */}
            {formData.colors.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {formData.colors.map((color, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-muted/50 rounded-full pl-1.5 pr-2 py-1 text-xs group">
                    <span className="w-4 h-4 rounded-full border border-border/50" style={{ backgroundColor: color.hex }} />
                    <span className="text-foreground">{color.name}</span>
                    <button type="button" onClick={() => removeColor(i)} className="ml-1 text-muted-foreground hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* Custom color */}
            <div className="flex gap-2 items-end">
              <div className="space-y-1 flex-1">
                <Label className="text-xs text-muted-foreground">Nome da cor</Label>
                <Input value={newColorName} onChange={(e) => setNewColorName(e.target.value)} className="bg-input border-border" placeholder="Ex: Azul Marinho" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Cor</Label>
                <div className="flex items-center gap-2">
                  <input type="color" value={newColorHex} onChange={(e) => setNewColorHex(e.target.value)} className="w-10 h-10 rounded-lg border border-border cursor-pointer bg-transparent" />
                </div>
              </div>
              <Button type="button" variant="outline" size="icon" onClick={addCustomColor} className="shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
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
                    <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3" />
                    </button>
                    {i === 0 && (
                      <span className="absolute bottom-0 left-0 right-0 text-[8px] text-center bg-primary/80 text-primary-foreground rounded-b-lg py-0.5">Principal</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/* Upload from device */}
            <div className="flex gap-2">
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
              <Button type="button" variant="outline" className="flex-1" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                {isUploading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> A carregar...</>
                ) : (
                  <><Upload className="w-4 h-4 mr-2" /> Carregar do Dispositivo</>
                )}
              </Button>
            </div>
            {/* Or add by URL */}
            <div className="flex gap-2">
              <Input value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} className="bg-input border-border flex-1" placeholder="Ou colar URL da imagem..." onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addImageUrl(); } }} />
              <Button type="button" variant="outline" size="icon" onClick={addImageUrl}>
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
                    <button type="button" onClick={() => removeDetail(i)} className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Input value={newDetail} onChange={(e) => setNewDetail(e.target.value)} className="bg-input border-border flex-1" placeholder="Ex: 100% Couro Natural" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addDetail(); } }} />
              <Button type="button" variant="outline" size="icon" onClick={addDetail}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </fieldset>

          {/* === SWITCHES === */}
          <div className="flex items-center gap-8 pt-2 border-t border-border/20">
            <div className="flex items-center gap-2">
              <Switch id="is_featured" checked={formData.is_featured} onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })} />
              <Label htmlFor="is_featured">Destaque</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="is_active" checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
              <Label htmlFor="is_active">Ativo</Label>
            </div>
          </div>

          {/* === ACTIONS === */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">Cancelar</Button>
            <Button type="submit" className="flex-1 neon-button" disabled={isLoading}>
              {isLoading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> A guardar...</>) : product ? "Guardar Alterações" : "Criar Produto"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
