import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Heart, Share2, Check, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/data/products";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ProductPage = () => {
  const { id } = useParams();
  const product = getProductById(Number(id));
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10">
          <Header />
          <div className="min-h-screen flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-foreground mb-4">Produto não encontrado</h1>
              <Button asChild className="neon-button">
                <Link to="/">Voltar à Home</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar à Loja</span>
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Image Gallery */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {/* Main Image */}
                <div className="aspect-[3/4] rounded-2xl overflow-hidden glass relative group">
                  <motion.img 
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={product.images[selectedImage]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.tag && (
                    <span className="absolute top-4 left-4 bg-primary/90 text-primary-foreground text-sm px-4 py-2 rounded-full font-medium">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3">
                  {product.images.map((img, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index 
                          ? 'border-primary neon-glow' 
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:sticky lg:top-28 lg:self-start space-y-8"
              >
                {/* Header */}
                <div>
                  <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-2">
                    {product.category}
                  </p>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    {product.name}
                  </h1>
                  <p className="text-3xl font-bold text-primary neon-text">
                    €{product.price.toFixed(2)}
                  </p>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {product.description}
                </p>

                {/* Color Selection */}
                <div>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                    Cor: <span className="text-foreground">{product.colors[selectedColor].name}</span>
                  </p>
                  <div className="flex gap-3">
                    {product.colors.map((color, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedColor(index)}
                        className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === index 
                            ? 'border-primary scale-110' 
                            : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {selectedColor === index && (
                          <Check className={`w-5 h-5 ${color.hex === '#f5f5f5' ? 'text-background' : 'text-white'}`} />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm uppercase tracking-wider text-muted-foreground">
                      Tamanho
                    </p>
                    <button className="text-primary text-sm hover:underline">
                      Guia de Tamanhos
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[50px] px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedSize === size 
                            ? 'border-primary bg-primary/20 text-primary' 
                            : 'border-border text-foreground hover:border-primary/50'
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                    Quantidade
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-primary/10 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-primary/10 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <motion.div className="flex-1" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button className="neon-button w-full py-6 text-base">
                      <ShoppingBag className="mr-2 w-5 h-5" />
                      Adicionar ao Carrinho
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="w-14 h-14 border-primary/30 hover:bg-primary/10 hover:border-primary"
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="w-14 h-14 border-primary/30 hover:bg-primary/10 hover:border-primary"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>

                {/* Product Details */}
                <div className="border-t border-border pt-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Detalhes do Produto</h3>
                  <ul className="space-y-2">
                    {product.details.map((detail, index) => (
                      <motion.li 
                        key={index} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                        className="flex items-center gap-3 text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;
