import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "wouter";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { products, categories, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  Heart, ShoppingCart, Star, Eye, SlidersHorizontal, X,
  ChevronDown, Grid2X2, LayoutGrid, ArrowRight, Check,
  ChevronLeft, ChevronRight, Package
} from "lucide-react";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
];
const PER_PAGE = 8;

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  curtains: "Flowing elegance for every window. From sheer to blackout, find your perfect curtain.",
  bedsheets: "Sleep in luxury every night. Premium cotton, satin & linen bedsheets.",
  cushions: "Add the perfect finishing touch with plush cushion covers.",
  comforters: "Wrap yourself in warmth — lightweight to heavyweight for every season.",
  "sofa-fabrics": "Dress your sofa in style with premium upholstery fabrics.",
  "home-decor": "Beautiful accents for every room — vases, lamps, art pieces and more.",
  "new-arrivals": "Fresh styles just landed. Be the first to discover our latest additions.",
  "best-sellers": "Customer favourites, tried and trusted.",
};

/* ─── Stars ─── */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`h-3 w-3 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-border"}`} />
      ))}
    </div>
  );
}

/* ─── Quick View Modal ─── */
function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-card border border-border/20 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col sm:flex-row overflow-hidden max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="sm:w-5/12 bg-muted/20 shrink-0 min-h-[220px] relative overflow-hidden">
          <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/40 flex items-center justify-center hover:bg-muted transition-colors"><X className="h-4 w-4" /></button>
          <p className="text-[10px] text-primary uppercase tracking-widest mb-2">{product.category.replace("-", " ")}</p>
          <h3 className="font-serif text-2xl mb-2">{product.name}</h3>
          <div className="flex items-center gap-2 mb-4"><Stars rating={product.rating} /><span className="text-xs text-muted-foreground">({product.reviews})</span></div>
          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-serif text-2xl">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
            {discount && <span className="text-sm text-green-600 font-medium">{discount}% off</span>}
          </div>
          <div className="space-y-3 mb-6">
            <div><p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">Colors</p><div className="flex gap-2 flex-wrap">{product.colors.map((c) => <button key={c} className="px-3 py-1.5 border border-border rounded-lg text-xs hover:border-primary transition-colors">{c}</button>)}</div></div>
            <div><p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">Size</p><div className="flex gap-2 flex-wrap">{product.sizes.map((s) => <button key={s} className="px-3 py-1.5 border border-border rounded-lg text-xs hover:border-primary transition-colors">{s}</button>)}</div></div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { addToCart(); onClose(); }} disabled={!product.inStock} className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors disabled:opacity-50"><ShoppingCart className="h-4 w-4" /> Add to Cart</button>
            <button onClick={() => toggleWishlist(product.id)} className={`w-11 flex items-center justify-center border rounded-sm transition-all ${isInWishlist(product.id) ? "bg-red-50 border-red-200 text-red-500" : "border-border hover:border-primary"}`}><Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500" : ""}`} /></button>
          </div>
          <Link href={`/product/${product.id}`} onClick={onClose}><button className="mt-3 w-full border border-border py-2.5 text-xs font-medium tracking-wider uppercase hover:border-primary hover:text-primary transition-colors">View Full Details</button></Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Product Card ─── */
function ProductCard({ product, cols, onQuickView }: { product: Product; cols: 3 | 4; onQuickView: (p: Product) => void }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 group flex flex-col">
      <div className="relative overflow-hidden bg-muted/20 aspect-[4/5]">
        <Link href={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 ${product.isNew ? "bg-primary text-white" : "bg-green-500 text-white"}`}>{product.badge}</span>}
          {!product.inStock && <span className="text-[10px] font-medium bg-foreground text-background px-2.5 py-1">OUT OF STOCK</span>}
          {product.isBestSeller && <span className="text-[10px] font-medium bg-amber-500 text-white px-2.5 py-1">BEST SELLER</span>}
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button onClick={() => toggleWishlist(product.id)} className={`w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-all ${wishlisted ? "bg-red-50 text-red-500" : "text-foreground hover:text-primary"}`}>
            <Heart className={`h-4 w-4 ${wishlisted ? "fill-red-500" : ""}`} />
          </button>
          <button onClick={() => onQuickView(product)} className="w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-md text-foreground hover:text-primary transition-colors">
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{product.category.replace("-", " ")}</p>
        <Link href={`/product/${product.id}`}><h3 className="font-serif text-base leading-snug hover:text-primary transition-colors mb-2 line-clamp-2">{product.name}</h3></Link>
        <div className="flex items-center gap-1.5 mb-3"><Stars rating={product.rating} /><span className="text-xs text-muted-foreground">({product.reviews})</span></div>
        <div className="flex gap-1 mb-3">
          {product.colors.slice(0, 3).map((c) => (
            <span key={c} className={`w-4 h-4 rounded-full border border-border/30`} style={{ backgroundColor: c === "Ivory" ? "#F8F4EF" : c === "White" ? "#FFFFFF" : c === "Charcoal" ? "#2C2C2C" : "#C97B5E" }} title={c} />
          ))}
          {product.colors.length > 3 && <span className="text-[10px] text-muted-foreground self-center">+{product.colors.length - 3}</span>}
        </div>
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-serif text-lg">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
            {discount && <span className="text-xs text-green-600 font-medium">{discount}%</span>}
          </div>
          <button onClick={() => addToCart()} disabled={!product.inStock} className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary border border-primary/30 py-2.5 text-xs font-medium tracking-wider uppercase hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
            <ShoppingCart className="h-3.5 w-3.5" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MAIN CATEGORY PAGE ─── */
export default function Category() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug) || categories[0];

  const [sortBy, setSortBy] = useState("newest");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [showInStock, setShowInStock] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState({ color: true, material: true, avail: true });

  const allColors = ["Ivory", "White", "Charcoal", "Terracotta"];
  const allMaterials = ["Cotton", "Velvet", "Linen", "Silk", "Polyester", "Jute"];

  const toggleArr = <T,>(arr: T[], setArr: (v: T[]) => void, val: T) =>
    arr.includes(val) ? setArr(arr.filter((x) => x !== val)) : setArr([...arr, val]);

  const rawProducts = useMemo(() => {
    let base = products.filter((p) => {
      if (slug === "new-arrivals") return p.isNew;
      if (slug === "best-sellers") return p.isBestSeller;
      return p.category === category.slug;
    });
    if (showInStock) base = base.filter((p) => p.inStock);
    if (selectedColors.length > 0) base = base.filter((p) => selectedColors.some((c) => p.colors.includes(c)));
    if (selectedMaterials.length > 0) base = base.filter((p) => selectedMaterials.some((m) => p.materials.includes(m)));
    return base;
  }, [slug, category.slug, showInStock, selectedColors, selectedMaterials]);

  const sorted = useMemo(() => {
    const r = [...rawProducts];
    switch (sortBy) {
      case "price-low": return r.sort((a, b) => a.price - b.price);
      case "price-high": return r.sort((a, b) => b.price - a.price);
      case "rating": return r.sort((a, b) => b.rating - a.rating);
      case "popular": return r.sort((a, b) => b.reviews - a.reviews);
      default: return r.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
  }, [rawProducts, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const resetFilters = () => { setShowInStock(false); setSelectedColors([]); setSelectedMaterials([]); setPage(1); };
  const activeCount = (showInStock ? 1 : 0) + selectedColors.length + selectedMaterials.length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Color */}
      <div>
        <button onClick={() => setFiltersOpen((p) => ({ ...p, color: !p.color }))} className="flex items-center justify-between w-full mb-3">
          <span className="font-medium text-sm">Color</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${filtersOpen.color ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {filtersOpen.color && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="flex flex-wrap gap-2 pb-1">
                {allColors.map((c) => (
                  <button key={c} onClick={() => toggleArr(selectedColors, setSelectedColors, c)} title={c}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all ${selectedColors.includes(c) ? "border-primary ring-2 ring-primary/30" : "border-transparent hover:border-border"}`}
                    style={{ backgroundColor: c === "Ivory" ? "#F8F4EF" : c === "White" ? "#FFFFFF" : c === "Charcoal" ? "#2C2C2C" : "#C97B5E" }}
                  >
                    {selectedColors.includes(c) && <Check className="absolute inset-0 m-auto h-3 w-3 text-primary mix-blend-difference" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Material */}
      <div className="border-t border-border/30 pt-5">
        <button onClick={() => setFiltersOpen((p) => ({ ...p, material: !p.material }))} className="flex items-center justify-between w-full mb-3">
          <span className="font-medium text-sm">Material</span>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${filtersOpen.material ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {filtersOpen.material && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="space-y-2 pb-1">
                {allMaterials.map((m) => (
                  <label key={m} className="flex items-center gap-2.5 cursor-pointer group">
                    <div onClick={() => toggleArr(selectedMaterials, setSelectedMaterials, m)} className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all ${selectedMaterials.includes(m) ? "bg-primary border-primary" : "border-border group-hover:border-primary"}`}>
                      {selectedMaterials.includes(m) && <Check className="h-2.5 w-2.5 text-white" />}
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{m}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Availability */}
      <div className="border-t border-border/30 pt-5">
        <p className="font-medium text-sm mb-3">Availability</p>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div onClick={() => setShowInStock(!showInStock)} className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all ${showInStock ? "bg-primary border-primary" : "border-border group-hover:border-primary"}`}>
            {showInStock && <Check className="h-2.5 w-2.5 text-white" />}
          </div>
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">In Stock Only</span>
        </label>
      </div>

      {activeCount > 0 && (
        <button onClick={resetFilters} className="w-full border border-border py-2.5 text-xs font-medium uppercase hover:border-primary hover:text-primary transition-colors">
          Reset Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background overflow-x-hidden">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        {/* ── Hero ── */}
        <section className="relative h-[42vh] min-h-[280px] overflow-hidden">
          <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
          <div className="relative h-full flex items-end">
            <div className="container mx-auto px-4 lg:px-12 pb-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <nav className="flex items-center gap-2 text-white/60 text-xs mb-3">
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                  <span>/</span>
                  <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
                  <span>/</span>
                  <span className="text-white">{category.name}</span>
                </nav>
                <p className="text-primary text-xs tracking-widest uppercase mb-2">Category</p>
                <h1 className="font-serif text-4xl lg:text-6xl text-white mb-3">{category.name}</h1>
                <p className="text-white/70 text-sm font-light max-w-lg">
                  {CATEGORY_DESCRIPTIONS[category.slug] || `Discover our premium ${category.name.toLowerCase()} collection.`}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <div className="flex gap-8 lg:gap-10 items-start">

            {/* ── Desktop Sidebar ── */}
            <aside className="hidden lg:block w-52 xl:w-60 shrink-0 sticky top-24">
              <div className="mb-6 pb-5 border-b border-border/30">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Showing</p>
                <p className="font-serif text-2xl">{sorted.length} Products</p>
              </div>

              {/* Browse categories */}
              <div className="mb-6 pb-5 border-b border-border/30">
                <p className="font-medium text-sm mb-3">Browse Categories</p>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <Link key={cat.id} href={`/category/${cat.slug}`}>
                      <div className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${cat.slug === slug ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"}`}>
                        <span>{cat.name}</span>
                        <span className="text-[10px]">{cat.count}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <FilterContent />
            </aside>

            {/* ── Main ── */}
            <div className="flex-1 min-w-0">
              {/* Top bar */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{Math.min((page - 1) * PER_PAGE + 1, sorted.length)}–{Math.min(page * PER_PAGE, sorted.length)}</span> of <span className="font-medium text-foreground">{sorted.length}</span> products
                  </p>
                </div>
                {/* Mobile filter */}
                <button onClick={() => setShowMobileFilter(true)} className="lg:hidden flex items-center gap-2 border border-border px-4 py-2.5 text-xs rounded-xl hover:border-primary transition-colors">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters {activeCount > 0 && <span className="w-4 h-4 bg-primary text-white text-[9px] rounded-full flex items-center justify-center font-bold">{activeCount}</span>}
                </button>
                {/* Sort */}
                <div className="relative">
                  <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }} className="appearance-none border border-border/40 bg-card rounded-xl pl-3 pr-8 py-2.5 text-xs focus:outline-none focus:border-primary cursor-pointer">
                    {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                </div>
                {/* Grid toggle */}
                <div className="hidden lg:flex border border-border/40 rounded-xl overflow-hidden">
                  <button onClick={() => setGridCols(4)} className={`p-2.5 transition-colors ${gridCols === 4 ? "bg-primary text-white" : "hover:bg-muted/40"}`}><Grid2X2 className="h-4 w-4" /></button>
                  <button onClick={() => setGridCols(3)} className={`p-2.5 transition-colors ${gridCols === 3 ? "bg-primary text-white" : "hover:bg-muted/40"}`}><LayoutGrid className="h-4 w-4" /></button>
                </div>
              </div>

              {/* Filter chips */}
              {activeCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedColors.map((c) => <span key={c} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full">{c} <button onClick={() => setSelectedColors(selectedColors.filter((x) => x !== c))}><X className="h-3 w-3" /></button></span>)}
                  {selectedMaterials.map((m) => <span key={m} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full">{m} <button onClick={() => setSelectedMaterials(selectedMaterials.filter((x) => x !== m))}><X className="h-3 w-3" /></button></span>)}
                  {showInStock && <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full">In Stock <button onClick={() => setShowInStock(false)}><X className="h-3 w-3" /></button></span>}
                </div>
              )}

              {/* Grid */}
              {paginated.length === 0 ? (
                <div className="bg-card border border-border/20 rounded-2xl p-16 text-center">
                  <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="font-serif text-xl mb-2">No products found</p>
                  <p className="text-muted-foreground text-sm mb-5">Try adjusting your filters.</p>
                  <button onClick={resetFilters} className="bg-primary text-white px-8 py-3 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors">Clear Filters</button>
                </div>
              ) : (
                <motion.div layout className={`grid gap-4 ${gridCols === 4 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "grid-cols-2 lg:grid-cols-3"}`}>
                  <AnimatePresence mode="popLayout">
                    {paginated.map((p) => <ProductCard key={p.id} product={p} cols={gridCols} onQuickView={setQuickViewProduct} />)}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex justify-center items-center gap-1.5">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-40">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${page === p ? "bg-primary text-white" : "border border-border hover:border-primary hover:text-primary"}`}>{p}</button>
                  ))}
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-40">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Related Categories ── */}
          <section className="mt-16 pt-10 border-t border-border/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl">Explore Other Categories</h2>
              <Link href="/categories"><button className="text-xs text-primary hover:underline underline-offset-2 flex items-center gap-1">View All <ArrowRight className="h-3.5 w-3.5" /></button></Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {categories.filter((c) => c.slug !== slug).slice(0, 5).map((cat, i) => (
                <motion.div key={cat.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <Link href={`/category/${cat.slug}`}>
                    <div className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-3">
                        <p className="text-white font-serif text-sm leading-tight">{cat.name}</p>
                        <p className="text-white/60 text-[10px] mt-0.5">{cat.count}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showMobileFilter && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setShowMobileFilter(false)}>
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-card overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl">Filters</h3>
                <button onClick={() => setShowMobileFilter(false)} className="w-8 h-8 rounded-full bg-muted/40 flex items-center justify-center"><X className="h-4 w-4" /></button>
              </div>
              <FilterContent />
              <button onClick={() => setShowMobileFilter(false)} className="mt-6 w-full bg-primary text-white py-3 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors">Apply Filters</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick View */}
      <AnimatePresence>
        {quickViewProduct && <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />}
      </AnimatePresence>

      <Footer />
      <MobileNav />
    </div>
  );
}
