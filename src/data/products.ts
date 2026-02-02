export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[];
  tag: string | null;
  category: string;
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  details: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Hoodie Noir Elite",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=800&h=1000&fit=crop"
    ],
    tag: "Novo",
    category: "Hoodies",
    description: "O Hoodie Noir Elite combina conforto premium com um design urbano sofisticado. Fabricado com algodão orgânico de alta qualidade, oferece uma experiência única de vestir.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Preto", hex: "#0a0a0a" },
      { name: "Cinza", hex: "#4a4a4a" },
      { name: "Bordô", hex: "#722f37" }
    ],
    details: [
      "100% Algodão Orgânico",
      "Forro interior macio",
      "Capuz ajustável com cordão",
      "Bolso canguru frontal",
      "Costuras reforçadas",
      "Lavável à máquina"
    ]
  },
  {
    id: 2,
    name: "T-Shirt Urban Edge",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=1000&fit=crop"
    ],
    tag: null,
    category: "T-Shirts",
    description: "A T-Shirt Urban Edge é a peça essencial para qualquer guarda-roupa urbano. Design minimalista com corte moderno que se adapta a qualquer ocasião.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Branco", hex: "#f5f5f5" },
      { name: "Preto", hex: "#0a0a0a" },
      { name: "Cinza", hex: "#6b6b6b" }
    ],
    details: [
      "95% Algodão, 5% Elastano",
      "Corte regular fit",
      "Gola reforçada",
      "Respirável e leve",
      "Anti-encolhimento"
    ]
  },
  {
    id: 3,
    name: "Jacket Street King",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&h=1000&fit=crop"
    ],
    tag: "Best Seller",
    category: "Jackets",
    description: "A Jacket Street King define o que é moda de rua premium. Com acabamentos de alta qualidade e design atemporal, é a peça statement que faltava no teu armário.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Preto", hex: "#0a0a0a" },
      { name: "Verde Militar", hex: "#4b5320" }
    ],
    details: [
      "Exterior: 100% Poliéster",
      "Forro: 100% Algodão",
      "Resistente à água",
      "Múltiplos bolsos",
      "Fecho de correr YKK",
      "Punhos ajustáveis"
    ]
  },
  {
    id: 4,
    name: "Pants Shadow Tech",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop"
    ],
    tag: null,
    category: "Pants",
    description: "As Pants Shadow Tech combinam funcionalidade técnica com estilo urbano. Perfeitas para o dia-a-dia, oferecem liberdade de movimento e durabilidade excepcional.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [
      { name: "Preto", hex: "#0a0a0a" },
      { name: "Cinza Escuro", hex: "#2d2d2d" },
      { name: "Caqui", hex: "#8b7355" }
    ],
    details: [
      "Tecido técnico stretch",
      "Cintura elástica ajustável",
      "6 bolsos funcionais",
      "Resistente a manchas",
      "Secagem rápida"
    ]
  },
  {
    id: 5,
    name: "Cap Revolution",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&h=1000&fit=crop"
    ],
    tag: "Promoção",
    category: "Accessories",
    description: "O Cap Revolution é mais que um acessório – é uma declaração de estilo. Com bordado de alta definição e materiais premium, completa qualquer look urbano.",
    sizes: ["Único"],
    colors: [
      { name: "Preto", hex: "#0a0a0a" },
      { name: "Branco", hex: "#f5f5f5" },
      { name: "Vermelho", hex: "#8b0000" }
    ],
    details: [
      "100% Algodão twill",
      "Bordado de alta definição",
      "Fecho traseiro ajustável",
      "Aba curva estruturada",
      "Forro interior em mesh"
    ]
  },
  {
    id: 6,
    name: "Sneakers Blaze",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=1000&fit=crop"
    ],
    tag: "Novo",
    category: "Footwear",
    description: "Os Sneakers Blaze redefinem o conceito de calçado urbano. Com tecnologia de amortecimento avançada e design audacioso, são perfeitos para quem não passa despercebido.",
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Vermelho/Preto", hex: "#8b0000" },
      { name: "Preto/Branco", hex: "#0a0a0a" },
      { name: "Branco", hex: "#f5f5f5" }
    ],
    details: [
      "Upper em mesh respirável",
      "Sola de borracha antiderrapante",
      "Palmilha com memory foam",
      "Sistema de amortecimento",
      "Atacadores planos premium"
    ]
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};
