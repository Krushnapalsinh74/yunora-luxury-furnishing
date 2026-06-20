import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { products, categories, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useProducts, useCategories } from "@/lib/useApi";
import { adaptProduct } from "@/lib/productAdapter";
import hero1 from "@/assets/hero-1.png";
import {
  Search, Filter, ChevronDown, Heart, ShoppingCart, Star,
  Grid2X2, LayoutGrid, X, SlidersHorizontal, Eye, Check,
  ArrowRight, Truck, RotateCcw, ShieldCheck, Award, ChevronLeft, ChevronRight
} from "lucide-react";

/* ─── Constants ─── */
const COLORS = ["Ivory", "White", "Charcoal", "Terracotta"];
const MATERIALS = ["Cotton", "Velvet", "Linen", "Silk", "Polyester", "Jute", "Wool", "Ceramic", "Satin"];
const SIZES = ["Small", "Medium", "Large", "Extra Large"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "best-selling", label: "Best Selling" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
];
const PER_PAGE = 9;

/* ─── Star Rating ─── */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`h-3 w-3 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-border"}`} />
      ))}
    </div>
  );
}

/* ─── Product Card ─── */
function ShopProductCard({ product, view, onQuickView }: {
  product: Product; view: "grid" | "list"; onQuickView: (p: Product) => void;
}) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  if (view === "list") {
    return (
      <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-5 bg-card border border-border/20 rounded-2xl shadow-sm overflow-hidden hover:shadow-md hover:border-primary/30 transition-all group">
        <Link href={`/product/${product.id}`} className="w-44 shrink-0 overflow-hidden bg-muted/20">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </Link>
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category.replace("-", " ")}</p>
            <Link href={`/product/${product.id}`}><h3 className="font-serif text-lg hover:text-primary transition-colors mb-2">{product.name}</h3></Link>
            <div className="flex items-center gap-2 mb-3">
              <Stars rating={product.rating} />
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {product.colors.map((c) => <span key={c} className="text-[10px] bg-muted/40 text-muted-foreground px-2 py-0.5 rounded-full">{c}</span>)}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-medium">₹{product.price.toLocaleString("en-IN")}</span>
              {product.originalPrice && <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
              {discount && <span className="text-xs text-green-600 font-medium">{discount}% off</span>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggleWishlist(product.id)} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${wishlisted ? "bg-red-50 border-red-200 text-red-500" : "border-border hover:border-primary hover:text-primary"}`}><Heart className={`h-4 w-4 ${wishlisted ? "fill-red-500" : ""}`} /></button>
              <button onClick={() => addToCart()} disabled={!product.inStock} className="flex items-center gap-2 bg-primary text-white px-5 py-2 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {product.inStock ? <><ShoppingCart className="h-3.5 w-3.5" /> Add to Cart</> : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border/20 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300 group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-muted/20 aspect-[4/5]">
        <Link href={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </Link>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 ${product.isNew ? "bg-primary text-white" : "bg-green-500 text-white"}`}>{product.badge}</span>
          )}
          {!product.inStock && <span className="text-[10px] font-medium tracking-wider bg-foreground text-background px-2.5 py-1">OUT OF STOCK</span>}
          {product.isBestSeller && <span className="text-[10px] font-medium tracking-wider bg-amber-500 text-white px-2.5 py-1">BEST SELLER</span>}
        </div>
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleWishlist(product.id)}
            className={`w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-all ${wishlisted ? "bg-red-50 text-red-500" : "text-foreground hover:text-primary"}`}
            data-testid={`btn-wish-${product.id}`}
          >
            <Heart className={`h-4 w-4 ${wishlisted ? "fill-red-500" : ""}`} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onQuickView(product)}
            className="w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-md text-foreground hover:text-primary transition-colors"
            data-testid={`btn-qv-${product.id}`}
          >
            <Eye className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{product.category.replace("-", " ")}</p>
        <Link href={`/product/${product.id}`}><h3 className="font-serif text-base leading-snug hover:text-primary transition-colors mb-2 line-clamp-2">{product.name}</h3></Link>
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        {/* Colors */}
        <div className="flex gap-1 mb-3">
          {product.colors.slice(0, 3).map((c) => (
            <span key={c} className={`w-4 h-4 rounded-full border border-border/30 ${c === "Ivory" ? "bg-[#F8F4EF]" : c === "White" ? "bg-white" : c === "Charcoal" ? "bg-[#2C2C2C]" : "bg-[#C97B5E]"}`} title={c} />
          ))}
          {product.colors.length > 3 && <span className="text-[10px] text-muted-foreground self-center">+{product.colors.length - 3}</span>}
        </div>
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-serif text-lg font-medium">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
            {discount && <span className="text-xs text-green-600 font-medium">{discount}%</span>}
          </div>
          <button
            onClick={() => addToCart()}
            disabled={!product.inStock}
            className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary border border-primary/30 py-2.5 text-xs font-medium tracking-wider uppercase hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            data-testid={`btn-cart-${product.id}`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Quick View Modal ─── */
function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-card border border-border/20 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col sm:flex-row" onClick={(e) => e.stopPropagation()}>
        <div className="sm:w-2/5 bg-muted/20 overflow-hidden shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover min-h-[240px]" />
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/40 flex items-center justify-center hover:bg-muted transition-colors"><X className="h-4 w-4" /></button>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">{product.category.replace("-", " ")}</p>
          <h3 className="font-serif text-2xl mb-2">{product.name}</h3>
          <div className="flex items-center gap-2 mb-4">
            <Stars rating={product.rating} />
            <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
          </div>
          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-serif text-2xl">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
            {discount && <span className="text-sm text-green-600 font-medium">{discount}% off</span>}
          </div>
          <div className="space-y-3 mb-6">
            <div><p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Colors</p><div className="flex gap-2">{product.colors.map((c) => <button key={c} className="px-3 py-1.5 border border-border rounded-lg text-xs hover:border-primary transition-colors">{c}</button>)}</div></div>
            <div><p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Size</p><div className="flex gap-2 flex-wrap">{product.sizes.map((s) => <button key={s} className="px-3 py-1.5 border border-border rounded-lg text-xs hover:border-primary transition-colors">{s}</button>)}</div></div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { addToCart(); onClose(); }} disabled={!product.inStock} className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors disabled:opacity-50">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
            <button onClick={() => toggleWishlist(product.id)} className={`w-12 flex items-center justify-center border rounded-sm transition-all ${isInWishlist(product.id) ? "bg-red-50 border-red-200 text-red-500" : "border-border hover:border-primary"}`}>
              <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500" : ""}`} />
            </button>
          </div>
          <Link href={`/product/${product.id}`} onClick={onClose}>
            <button className="mt-3 w-full border border-border py-2.5 text-xs font-medium tracking-wider uppercase hover:border-primary hover:text-primary transition-colors">View Full Details</button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Filter Sidebar ─── */
function FilterSidebar({
  categories: cats, selectedCats, setSelectedCats,
  priceRange, setPriceRange,
  selectedColors, setSelectedColors,
  selectedMaterials, setSelectedMaterials,
  selectedSizes, setSelectedSizes,
  showInStock, setShowInStock,
  onReset,
}: {
  categories: typeof categories;
  selectedCats: string[]; setSelectedCats: (v: string[]) => void;
  priceRange: [number, number]; setPriceRange: (v: [number, number]) => void;
  selectedColors: string[]; setSelectedColors: (v: string[]) => void;
  selectedMaterials: string[]; setSelectedMaterials: (v: string[]) => void;
  selectedSizes: string[]; setSelectedSizes: (v: string[]) => void;
  showInStock: boolean; setShowInStock: (v: boolean) => void;
  onReset: () => void;
}) {
  const [open, setOpen] = useState({ cat: true, price: true, color: true, material: true, size: true, avail: true });
  const toggle = (k: keyof typeof open) => setOpen((p) => ({ ...p, [k]: !p[k] }));

  const toggleArr = <T,>(arr: T[], setArr: (v: T[]) => void, val: T) =>
    arr.includes(val) ? setArr(arr.filter((x) => x !== val)) : setArr([...arr, val]);

  const Section = ({ k, label, children }: { k: keyof typeof open; label: string; children: React.ReactNode }) => (
    <div className="border-b border-border/30 pb-5">
      <button onClick={() => toggle(k)} className="flex items-center justify-between w-full mb-3 group">
        <span className="font-medium text-sm">{label}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open[k] ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>{open[k] && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">{children}</motion.div>}</AnimatePresence>
    </div>
  );

  const hasFilters = selectedCats.length > 0 || selectedColors.length > 0 || selectedMaterials.length > 0 || selectedSizes.length > 0 || showInStock || priceRange[0] > 0 || priceRange[1] < 6500;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl">Filters</h3>
        {hasFilters && <button onClick={onReset} className="text-xs text-primary hover:underline underline-offset-2">Reset All</button>}
      </div>

      {/* Categories */}
      <Section k="cat" label="Categories">
        <div className="space-y-2.5">
          {cats.map((cat) => (
            <label key={cat.id} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2.5">
                <div onClick={() => toggleArr(selectedCats, setSelectedCats, cat.slug)} className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer ${selectedCats.includes(cat.slug) ? "bg-primary border-primary" : "border-border group-hover:border-primary"}`}>
                  {selectedCats.includes(cat.slug) && <Check className="h-2.5 w-2.5 text-white" />}
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{cat.name}</span>
              </div>
              <span className="text-[10px] text-muted-foreground bg-muted/40 px-1.5 py-0.5 rounded-full">{cat.count}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Price Range */}
      <Section k="price" label="Price Range">
        <div className="space-y-3">
          <input
            type="range" min={0} max={6500} step={100}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
            <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
          </div>
        </div>
      </Section>

      {/* Colors */}
      <Section k="color" label="Color">
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => toggleArr(selectedColors, setSelectedColors, c)}
              title={c}
              className={`relative w-8 h-8 rounded-full border-2 transition-all ${selectedColors.includes(c) ? "border-primary ring-2 ring-primary/30" : "border-transparent hover:border-border"}`}
              style={{ backgroundColor: c === "Ivory" ? "#F8F4EF" : c === "White" ? "#FFFFFF" : c === "Charcoal" ? "#2C2C2C" : "#C97B5E" }}
            >
              {selectedColors.includes(c) && <Check className="absolute inset-0 m-auto h-3 w-3 text-primary mix-blend-difference" />}
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {selectedColors.map((c) => <span key={c} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{c}</span>)}
        </div>
      </Section>

      {/* Materials */}
      <Section k="material" label="Material">
        <div className="space-y-2">
          {MATERIALS.map((m) => (
            <label key={m} className="flex items-center gap-2.5 cursor-pointer group">
              <div onClick={() => toggleArr(selectedMaterials, setSelectedMaterials, m)} className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer ${selectedMaterials.includes(m) ? "bg-primary border-primary" : "border-border group-hover:border-primary"}`}>
                {selectedMaterials.includes(m) && <Check className="h-2.5 w-2.5 text-white" />}
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{m}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Sizes */}
      <Section k="size" label="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button key={s} onClick={() => toggleArr(selectedSizes, setSelectedSizes, s)} className={`px-3 py-1.5 text-xs border rounded-lg transition-all ${selectedSizes.includes(s) ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
              {s}
            </button>
          ))}
        </div>
      </Section>

      {/* Availability */}
      <Section k="avail" label="Availability">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div onClick={() => setShowInStock(!showInStock)} className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer ${showInStock ? "bg-primary border-primary" : "border-border group-hover:border-primary"}`}>
            {showInStock && <Check className="h-2.5 w-2.5 text-white" />}
          </div>
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">In Stock Only</span>
        </label>
      </Section>
    </div>
  );
}

/* ─── MAIN SHOP PAGE ─── */
export default function Shop() {
  /* API data */
  const { data: productsData } = useProducts({ limit: 100 });
  const { data: apiCats } = useCategories();

  /* Build category slug map from API */
  const catSlugMap = useMemo(() => {
    const m: Record<number, string> = {};
    if (apiCats) apiCats.forEach((c) => { m[c.id] = c.slug; });
    return m;
  }, [apiCats]);

  /* Use API products or fall back to static */
  const allProducts: Product[] = useMemo(() => {
    if (productsData?.items?.length) {
      return productsData.items.map((p) => {
        const adapted = adaptProduct(p);
        return {
          ...adapted,
          category: (p.categoryId && catSlugMap[p.categoryId]) || adapted.category,
          rating: adapted.rating,
          reviews: adapted.reviews,
          sizes: adapted.sizes,
          isBestSeller: false,
        } as Product;
      });
    }
    return products;
  }, [productsData, catSlugMap]);

  /* Display categories */
  const displayCats = useMemo(() => {
    if (apiCats?.length) {
      return apiCats.map((c) => ({ id: c.id, name: c.name, slug: c.slug, count: undefined, image: c.imageUrl }));
    }
    return categories;
  }, [apiCats]);

  /* Filter state */
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6500]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [showInStock, setShowInStock] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [addedId, setAddedId] = useState<number | null>(null);
  const recentlyViewed = allProducts.slice(0, 6);

  /* Live search debounce */
  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchInput); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  /* Reset page on filter changes */
  useEffect(() => { setPage(1); }, [selectedCats, priceRange, selectedColors, selectedMaterials, selectedSizes, showInStock, sortBy]);

  const resetFilters = () => {
    setSelectedCats([]); setPriceRange([0, 6500]); setSelectedColors([]);
    setSelectedMaterials([]); setSelectedSizes([]); setShowInStock(false);
    setSearchInput(""); setSearch(""); setPage(1);
  };

  /* Filter & sort */
  const filtered = useMemo(() => {
    let result = allProducts.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.category.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCats.length > 0 && !selectedCats.includes(p.category)) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedColors.length > 0 && !selectedColors.some((c) => p.colors.includes(c))) return false;
      if (selectedMaterials.length > 0 && !selectedMaterials.some((m) => p.materials.includes(m))) return false;
      if (selectedSizes.length > 0 && !selectedSizes.some((s) => p.sizes.includes(s))) return false;
      if (showInStock && !p.inStock) return false;
      return true;
    });

    switch (sortBy) {
      case "price-low": result = [...result].sort((a, b) => a.price - b.price); break;
      case "price-high": result = [...result].sort((a, b) => b.price - a.price); break;
      case "rating": result = [...result].sort((a, b) => b.rating - a.rating); break;
      case "popular": result = [...result].sort((a, b) => b.reviews - a.reviews); break;
      case "best-selling": result = [...result].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)); break;
      default: result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    return result;
  }, [search, selectedCats, priceRange, selectedColors, selectedMaterials, selectedSizes, showInStock, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const activeFilterCount = selectedCats.length + selectedColors.length + selectedMaterials.length + selectedSizes.length + (showInStock ? 1 : 0) + (priceRange[1] < 6500 ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background overflow-x-hidden">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        {/* ── Hero ── */}
        <section className="relative h-[45vh] min-h-[300px] overflow-hidden">
          <img src={hero1} alt="Shop YUNORA" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 50%" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-12">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-lg">
                <p className="text-primary text-xs tracking-widest uppercase mb-3">Collections</p>
                <h1 className="font-serif text-4xl lg:text-5xl text-white leading-tight mb-4">Shop Luxury Furnishings</h1>
                <p className="text-white/75 text-sm font-light mb-6">Timeless designs. Premium materials. Made for modern living.</p>
                <button onClick={() => document.getElementById("shop-grid")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 text-xs font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors">
                  Explore Collection <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        <div id="shop-grid" className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          {/* ── Breadcrumb + count ── */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/30">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">Shop</span>
            </nav>
            <p className="text-xs text-muted-foreground">Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} products</p>
          </div>

          <div className="flex gap-8 lg:gap-10 items-start">
            {/* ── Desktop Sidebar ── */}
            <aside className="hidden lg:block w-56 xl:w-64 shrink-0 sticky top-24">
              <FilterSidebar
                categories={displayCats as typeof categories}
                selectedCats={selectedCats} setSelectedCats={setSelectedCats}
                priceRange={priceRange} setPriceRange={setPriceRange}
                selectedColors={selectedColors} setSelectedColors={setSelectedColors}
                selectedMaterials={selectedMaterials} setSelectedMaterials={setSelectedMaterials}
                selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes}
                showInStock={showInStock} setShowInStock={setShowInStock}
                onReset={resetFilters}
              />
            </aside>

            {/* ── Main Content ── */}
            <div className="flex-1 min-w-0">
              {/* Top Bar */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {/* Search */}
                <div className="relative flex-1 min-w-[180px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search products…"
                    className="w-full pl-9 pr-4 py-2.5 border border-border/40 bg-card rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  {searchInput && <button onClick={() => { setSearchInput(""); setSearch(""); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X className="h-3.5 w-3.5" /></button>}
                </div>

                {/* Mobile filter btn */}
                <button onClick={() => setShowMobileFilter(true)} className="lg:hidden flex items-center gap-2 border border-border px-4 py-2.5 text-sm rounded-xl hover:border-primary transition-colors">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters {activeFilterCount > 0 && <span className="w-5 h-5 bg-primary text-white text-[10px] rounded-full flex items-center justify-center font-bold">{activeFilterCount}</span>}
                </button>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:block">Sort By:</span>
                  <div className="relative">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none border border-border/40 bg-card rounded-xl pl-3 pr-8 py-2.5 text-xs focus:outline-none focus:border-primary transition-colors cursor-pointer">
                      {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* Grid toggle */}
                <div className="hidden lg:flex border border-border/40 rounded-xl overflow-hidden">
                  <button onClick={() => setGridCols(3)} className={`p-2.5 transition-colors ${gridCols === 3 ? "bg-primary text-white" : "hover:bg-muted/40"}`}><Grid2X2 className="h-4 w-4" /></button>
                  <button onClick={() => setGridCols(4)} className={`p-2.5 transition-colors ${gridCols === 4 ? "bg-primary text-white" : "hover:bg-muted/40"}`}><LayoutGrid className="h-4 w-4" /></button>
                </div>
              </div>

              {/* Active filter chips */}
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {selectedCats.map((c) => <span key={c} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full">{c} <button onClick={() => setSelectedCats(selectedCats.filter((x) => x !== c))}><X className="h-3 w-3" /></button></span>)}
                  {selectedColors.map((c) => <span key={c} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full">{c} <button onClick={() => setSelectedColors(selectedColors.filter((x) => x !== c))}><X className="h-3 w-3" /></button></span>)}
                  {selectedMaterials.map((m) => <span key={m} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full">{m} <button onClick={() => setSelectedMaterials(selectedMaterials.filter((x) => x !== m))}><X className="h-3 w-3" /></button></span>)}
                  {selectedSizes.map((s) => <span key={s} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full">{s} <button onClick={() => setSelectedSizes(selectedSizes.filter((x) => x !== s))}><X className="h-3 w-3" /></button></span>)}
                  {showInStock && <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full">In Stock <button onClick={() => setShowInStock(false)}><X className="h-3 w-3" /></button></span>}
                  <button onClick={resetFilters} className="text-xs text-muted-foreground hover:text-destructive underline underline-offset-2 ml-1">Clear all</button>
                </div>
              )}

              {/* Grid */}
              {paginated.length === 0 ? (
                <div className="bg-card border border-border/20 rounded-2xl p-16 text-center">
                  <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="font-serif text-xl mb-2">No products found</p>
                  <p className="text-muted-foreground text-sm mb-5">Try adjusting your filters or search query.</p>
                  <button onClick={resetFilters} className="bg-primary text-white px-8 py-3 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors">Clear Filters</button>
                </div>
              ) : (
                <motion.div layout className={`grid gap-4 ${gridCols === 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2 lg:grid-cols-3"}`}>
                  <AnimatePresence mode="popLayout">
                    {paginated.map((product) => (
                      <ShopProductCard key={product.id} product={product} view="grid" onQuickView={setQuickViewProduct} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-1.5">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                    .reduce<(number | "…")[]>((acc, p, i, arr) => {
                      if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      p === "…" ? (
                        <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-muted-foreground text-sm">…</span>
                      ) : (
                        <button key={p} onClick={() => setPage(p as number)} className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${page === p ? "bg-primary text-white" : "border border-border hover:border-primary hover:text-primary"}`}>{p}</button>
                      )
                    )}
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Recently Viewed ── */}
          <section className="mt-16 pt-10 border-t border-border/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl">Recently Viewed</h2>
              <Link href="/shop" className="text-xs text-primary hover:underline underline-offset-2">View All</Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {recentlyViewed.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <div className="group">
                    <div className="aspect-square bg-muted/20 rounded-xl overflow-hidden mb-2">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <p className="text-xs font-medium leading-tight truncate">{p.name}</p>
                    <p className="text-xs text-primary font-medium mt-0.5">₹{p.price.toLocaleString("en-IN")}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── You May Also Like ── */}
          <section className="mt-12 pt-10 border-t border-border/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl">You May Also Like</h2>
              <Link href="/shop" className="text-xs text-primary hover:underline underline-offset-2">View All</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {products.filter((p) => p.isBestSeller).slice(0, 6).map((p) => (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <div className="group bg-card border border-border/20 rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
                    <div className="aspect-square bg-muted/20 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-2.5">
                      <p className="text-xs font-medium leading-tight truncate">{p.name}</p>
                      <p className="text-xs text-primary font-medium mt-0.5">₹{p.price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* ── Trust Bar ── */}
        <div className="border-t border-border/30 bg-card mt-10">
          <div className="container mx-auto px-4 lg:px-12 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Award, t: "Premium Quality", d: "Finest materials & craftsmanship" },
                { icon: Truck, t: "Free Shipping", d: "On all orders above ₹1,000" },
                { icon: RotateCcw, t: "Easy Returns", d: "Hassle-free 7-day returns" },
                { icon: ShieldCheck, t: "Secure Payments", d: "100% safe & encrypted" },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{t}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ── Mobile Filter Drawer ── */}
      <AnimatePresence>
        {showMobileFilter && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setShowMobileFilter(false)}>
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="absolute left-0 top-0 bottom-0 w-80 max-w-[90vw] bg-card overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl">Filters</h3>
                <button onClick={() => setShowMobileFilter(false)} className="w-8 h-8 rounded-full bg-muted/40 flex items-center justify-center"><X className="h-4 w-4" /></button>
              </div>
              <FilterSidebar
                categories={displayCats as typeof categories}
                selectedCats={selectedCats} setSelectedCats={setSelectedCats}
                priceRange={priceRange} setPriceRange={setPriceRange}
                selectedColors={selectedColors} setSelectedColors={setSelectedColors}
                selectedMaterials={selectedMaterials} setSelectedMaterials={setSelectedMaterials}
                selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes}
                showInStock={showInStock} setShowInStock={setShowInStock}
                onReset={resetFilters}
              />
              <button onClick={() => setShowMobileFilter(false)} className="mt-6 w-full bg-primary text-white py-3 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors">Apply Filters</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Quick View Modal ── */}
      <AnimatePresence>
        {quickViewProduct && <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />}
      </AnimatePresence>

      <Footer />
      <MobileNav />
    </div>
  );
}
