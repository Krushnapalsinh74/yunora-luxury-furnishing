import hero1 from "@/assets/hero-1.png";
import catCurtains from "@/assets/cat-curtains.png";
import catBedsheets from "@/assets/cat-bedsheets.png";
import catCushions from "@/assets/cat-cushions.png";
import catSofaFabrics from "@/assets/cat-sofa-fabrics.png";
import catComforters from "@/assets/cat-comforters.png";
import catHomeDecor from "@/assets/cat-home-decor.png";
import colCurated from "@/assets/col-curated.png";
import colBedding from "@/assets/col-bedding.png";
import colCurtains from "@/assets/col-curtains.png";

export const categories = [
  { id: 1, name: "Curtains", count: 6, slug: "curtains", image: catCurtains },
  { id: 2, name: "Bedsheets", count: 5, slug: "bedsheets", image: catBedsheets },
  { id: 3, name: "Cushions", count: 4, slug: "cushions", image: catCushions },
  { id: 4, name: "Sofa Fabrics", count: 3, slug: "sofa-fabrics", image: catSofaFabrics },
  { id: 5, name: "Comforters", count: 4, slug: "comforters", image: catComforters },
  { id: 6, name: "Home Decor", count: 2, slug: "home-decor", image: catHomeDecor },
];

export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  colors: string[];
  materials: string[];
  sizes: string[];
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
};

export const products: Product[] = [
  { id: 1, name: "Royal Velvet Curtain", price: 2499, originalPrice: 3999, badge: "NEW", rating: 4.8, reviews: 125, category: "curtains", image: catCurtains, colors: ["Ivory", "Charcoal", "Terracotta"], materials: ["Velvet"], sizes: ["Small", "Medium", "Large"], inStock: true, isNew: true },
  { id: 2, name: "Premium Cotton Bedsheet", price: 1899, originalPrice: 2699, badge: "-30%", rating: 4.5, reviews: 88, category: "bedsheets", image: catBedsheets, colors: ["Ivory", "White"], materials: ["Cotton"], sizes: ["Small", "Medium", "Large", "Extra Large"], inStock: true, isBestSeller: true },
  { id: 3, name: "Luxury Cushion Cover", price: 499, originalPrice: 699, badge: "-20%", rating: 4.6, reviews: 58, category: "cushions", image: catCushions, colors: ["Terracotta", "Charcoal"], materials: ["Silk", "Velvet"], sizes: ["Small", "Medium"], inStock: true },
  { id: 4, name: "Shera Comforter", price: 3299, originalPrice: 4399, badge: "-25%", rating: 4.7, reviews: 28, category: "comforters", image: catComforters, colors: ["Ivory", "White"], materials: ["Cotton"], sizes: ["Medium", "Large", "Extra Large"], inStock: true, isBestSeller: true },
  { id: 5, name: "Linen Sheer Curtain", price: 1899, originalPrice: 2499, badge: "-24%", rating: 4.4, reviews: 65, category: "curtains", image: colCurtains, colors: ["White", "Ivory"], materials: ["Linen"], sizes: ["Small", "Medium", "Large"], inStock: true },
  { id: 6, name: "Egyptian Cotton Bedsheet", price: 2799, originalPrice: 3999, badge: "NEW", rating: 4.9, reviews: 42, category: "bedsheets", image: colBedding, colors: ["White", "Ivory", "Charcoal"], materials: ["Cotton"], sizes: ["Medium", "Large", "Extra Large"], inStock: true, isNew: true },
  { id: 7, name: "Velvet Cushion Set", price: 1299, originalPrice: 1799, badge: "-28%", rating: 4.5, reviews: 91, category: "cushions", image: catCushions, colors: ["Terracotta", "Charcoal", "Ivory"], materials: ["Velvet"], sizes: ["Small", "Medium"], inStock: true, isBestSeller: true },
  { id: 8, name: "Silk Sofa Fabric", price: 599, originalPrice: 799, badge: "-25%", rating: 4.3, reviews: 37, category: "sofa-fabrics", image: catSofaFabrics, colors: ["Ivory", "Terracotta"], materials: ["Silk"], sizes: ["Small", "Medium", "Large"], inStock: true },
  { id: 9, name: "Blackout Eyelet Curtain", price: 3199, originalPrice: 4499, badge: "-29%", rating: 4.6, reviews: 73, category: "curtains", image: catCurtains, colors: ["Charcoal", "White"], materials: ["Polyester"], sizes: ["Medium", "Large"], inStock: true },
  { id: 10, name: "Satin Weave Bedsheet", price: 2299, originalPrice: 2999, badge: "-23%", rating: 4.7, reviews: 54, category: "bedsheets", image: catBedsheets, colors: ["Ivory", "White"], materials: ["Satin", "Cotton"], sizes: ["Medium", "Large", "Extra Large"], inStock: false },
  { id: 11, name: "Boho Jute Cushion", price: 799, originalPrice: 999, badge: "NEW", rating: 4.2, reviews: 31, category: "cushions", image: catCushions, colors: ["Ivory", "Terracotta"], materials: ["Jute"], sizes: ["Small", "Medium"], inStock: true, isNew: true },
  { id: 12, name: "Down Feather Comforter", price: 4999, originalPrice: 6499, badge: "-23%", rating: 4.8, reviews: 19, category: "comforters", image: catComforters, colors: ["White", "Ivory"], materials: ["Cotton"], sizes: ["Large", "Extra Large"], inStock: true },
  { id: 13, name: "Chenille Sofa Fabric", price: 899, originalPrice: 1199, badge: "-25%", rating: 4.4, reviews: 46, category: "sofa-fabrics", image: catSofaFabrics, colors: ["Charcoal", "Terracotta", "Ivory"], materials: ["Velvet"], sizes: ["Small", "Medium", "Large"], inStock: true },
  { id: 14, name: "Embroidered Curtain", price: 3599, originalPrice: 4799, badge: "NEW", rating: 4.9, reviews: 22, category: "curtains", image: colCurtains, colors: ["Ivory", "White"], materials: ["Cotton", "Silk"], sizes: ["Medium", "Large"], inStock: true, isNew: true, isBestSeller: true },
  { id: 15, name: "Microfibre Comforter", price: 2199, originalPrice: 2999, badge: "-27%", rating: 4.5, reviews: 67, category: "comforters", image: catComforters, colors: ["White", "Ivory", "Charcoal"], materials: ["Polyester"], sizes: ["Medium", "Large", "Extra Large"], inStock: true },
  { id: 16, name: "Decorative Vase Set", price: 1499, originalPrice: 1999, badge: "NEW", rating: 4.3, reviews: 14, category: "home-decor", image: catHomeDecor, colors: ["Ivory", "Terracotta"], materials: ["Ceramic"], sizes: ["Small"], inStock: true, isNew: true },
  { id: 17, name: "Woven Throw Blanket", price: 1799, originalPrice: 2299, badge: "-22%", rating: 4.6, reviews: 39, category: "comforters", image: colCurated, colors: ["Terracotta", "Ivory", "Charcoal"], materials: ["Wool", "Cotton"], sizes: ["Medium", "Large"], inStock: true },
  { id: 18, name: "Jacquard Bedsheet Set", price: 3499, originalPrice: 4999, badge: "-30%", rating: 4.8, reviews: 81, category: "bedsheets", image: colBedding, colors: ["Ivory", "White", "Charcoal"], materials: ["Cotton", "Silk"], sizes: ["Large", "Extra Large"], inStock: true, isBestSeller: true },
  { id: 19, name: "Linen Sofa Fabric", price: 749, originalPrice: 999, badge: "-25%", rating: 4.1, reviews: 28, category: "sofa-fabrics", image: catSofaFabrics, colors: ["Ivory", "White"], materials: ["Linen"], sizes: ["Small", "Medium", "Large"], inStock: false },
  { id: 20, name: "Ceramic Table Lamp", price: 2899, originalPrice: 3799, badge: "NEW", rating: 4.7, reviews: 33, category: "home-decor", image: catHomeDecor, colors: ["Ivory", "Terracotta"], materials: ["Ceramic"], sizes: ["Medium"], inStock: true, isNew: true },
];

export const heroImages = [hero1];
export const collectionImages = { curated: colCurated, bedding: colBedding, curtains: colCurtains };
export const craftImages = [catCurtains, catBedsheets];
