import type { ApiProduct } from "./api";
import catCurtains from "@/assets/cat-curtains.png";

export type AdaptedProduct = {
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
  description?: string;
  sku?: string;
  brand?: string;
};

export function adaptProduct(p: ApiProduct): AdaptedProduct {
  const hasDiscount = p.salePrice !== undefined && p.salePrice !== null && p.salePrice < p.price;
  const effectivePrice = hasDiscount ? p.salePrice! : p.price;
  const originalPrice = hasDiscount ? p.price : undefined;
  const discountPct = originalPrice
    ? Math.round((1 - effectivePrice / originalPrice) * 100)
    : null;

  const badge = discountPct ? `-${discountPct}%` : undefined;
  const inStock = (p.stock ?? 0) > 0;

  const daysSince = Math.floor(
    (Date.now() - new Date(p.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    id: p.id,
    name: p.name,
    price: effectivePrice,
    originalPrice,
    badge,
    rating: 4.5,
    reviews: 0,
    category: p.categoryId ? String(p.categoryId) : "general",
    image: p.imageUrl || catCurtains,
    colors: p.color ? p.color.split(",").map((c) => c.trim()) : [],
    materials: p.material ? p.material.split(",").map((m) => m.trim()) : [],
    sizes: [],
    inStock,
    isNew: daysSince < 30,
    sku: p.sku,
    brand: p.brand,
    description: p.description,
  };
}
