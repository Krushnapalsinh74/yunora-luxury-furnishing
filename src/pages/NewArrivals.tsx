import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "wouter";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { useCart } from "@/context/CartContext";
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
import {
  Heart, ShoppingCart, Star, Eye, ArrowRight, Search, X, ChevronDown,
  Plus, Edit3, Trash2, Check, Upload, Calendar, Clock, Package,
  TrendingUp, Settings, Instagram, Shield, RotateCcw, Truck, Award, Gem,
  Filter, Grid3X3, LayoutList, Bell, Sparkles
} from "lucide-react";

/* ─── Types ─── */
export type NewArrival = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  colors: string[];
  materials: string[];
  inStock: boolean;
  isBestSeller?: boolean;
  launchDate: string; // ISO date string
  isScheduled?: boolean; // future launch
  badge?: string;
  description?: string;
};

/* ─── Stock image map ─── */
const STOCK_IMAGES: Record<string, string> = {
  "Luxury Interior": hero1, "Curtains": catCurtains, "Bedsheets": catBedsheets,
  "Cushions": catCushions, "Sofa Fabrics": catSofaFabrics, "Comforters": catComforters,
  "Home Decor": catHomeDecor, "Curated": colCurated, "Bedding": colBedding, "Col Curtains": colCurtains,
};

/* ─── Default products (with launch dates, newest first) ─── */
const DEFAULT_ARRIVALS: NewArrival[] = [
  { id: 1, name: "Royal Velvet Curtain", price: 2499, originalPrice: 3999, category: "curtains", image: catCurtains, rating: 4.8, reviews: 125, colors: ["Ivory", "Charcoal", "Terracotta"], materials: ["Velvet"], inStock: true, launchDate: "2026-06-18", badge: "NEW" },
  { id: 2, name: "Egyptian Cotton Bedsheet", price: 2799, originalPrice: 3999, category: "bedsheets", image: colBedding, rating: 4.9, reviews: 42, colors: ["White", "Ivory", "Charcoal"], materials: ["Cotton"], inStock: true, launchDate: "2026-06-17", badge: "NEW" },
  { id: 3, name: "Linen Sheer Curtain", price: 1899, originalPrice: 2499, category: "curtains", image: colCurtains, rating: 4.4, reviews: 65, colors: ["White", "Ivory"], materials: ["Linen"], inStock: true, launchDate: "2026-06-16", badge: "NEW" },
  { id: 4, name: "Embroidered Cushion Cover", price: 799, originalPrice: 999, category: "cushions", image: catCushions, rating: 4.6, reviews: 53, colors: ["Terracotta", "Ivory"], materials: ["Silk", "Cotton"], inStock: true, launchDate: "2026-06-15", badge: "NEW", isBestSeller: true },
  { id: 5, name: "Ceramic Decor Vase", price: 1299, originalPrice: 1799, category: "home-decor", image: catHomeDecor, rating: 4.5, reviews: 38, colors: ["Ivory", "Terracotta"], materials: ["Ceramic"], inStock: true, launchDate: "2026-06-14", badge: "NEW" },
  { id: 6, name: "Marbella Dining Table Cover", price: 2999, originalPrice: 3799, category: "home-decor", image: catHomeDecor, rating: 4.7, reviews: 33, colors: ["Ivory", "Charcoal"], materials: ["Cotton", "Polyester"], inStock: true, launchDate: "2026-06-12" },
  { id: 7, name: "Nova Bookshelf Linen", price: 34999, originalPrice: 45999, category: "sofa-fabrics", image: catSofaFabrics, rating: 4.6, reviews: 21, colors: ["Walnut", "Oak", "White"], materials: ["Linen"], inStock: true, launchDate: "2026-06-11" },
  { id: 8, name: "Terra Table Lamp", price: 3999, originalPrice: 5499, category: "home-decor", image: catHomeDecor, rating: 4.4, reviews: 44, colors: ["Terracotta", "Ivory"], materials: ["Ceramic"], inStock: true, launchDate: "2026-06-10" },
  { id: 9, name: "Boha Woven Throw", price: 2299, originalPrice: 2999, category: "comforters", image: catComforters, rating: 4.3, reviews: 22, colors: ["Ivory", "Terracotta"], materials: ["Wool", "Cotton"], inStock: true, launchDate: "2026-06-08" },
  { id: 10, name: "Olive Branch Plant Pot", price: 1499, originalPrice: 1999, category: "home-decor", image: catHomeDecor, rating: 4.2, reviews: 57, colors: ["White", "Sage"], materials: ["Ceramic"], inStock: true, launchDate: "2026-06-07" },
  { id: 11, name: "Cloud Comforter Set", price: 7999, originalPrice: 10499, category: "comforters", image: catComforters, rating: 4.8, reviews: 29, colors: ["White", "Ivory"], materials: ["Cotton", "Polyester"], inStock: true, launchDate: "2026-06-05", isBestSeller: true },
  { id: 12, name: "Modern Lounge Chair Cover", price: 24999, originalPrice: 32999, category: "sofa-fabrics", image: catSofaFabrics, rating: 4.6, reviews: 38, colors: ["Charcoal", "Terracotta", "Ivory"], materials: ["Velvet"], inStock: true, launchDate: "2026-06-04" },
  { id: 13, name: "Japandi Floor Rug", price: 3999, originalPrice: 5999, category: "home-decor", image: catHomeDecor, rating: 4.2, reviews: 22, colors: ["Ivory", "Charcoal"], materials: ["Jute", "Cotton"], inStock: true, launchDate: "2026-06-03" },
  { id: 14, name: "Minimalist Wall Art Set", price: 1449, originalPrice: 1999, category: "home-decor", image: catHomeDecor, rating: 4.1, reviews: 41, colors: ["Black", "White"], materials: ["Canvas"], inStock: true, launchDate: "2026-06-02" },
  { id: 15, name: "Linen Pillow Set", price: 1299, originalPrice: 1799, category: "cushions", image: catCushions, rating: 4.3, reviews: 27, colors: ["Ivory", "White", "Sage"], materials: ["Linen"], inStock: true, launchDate: "2026-06-01" },
];

/* ─── localStorage hook ─── */
function useNewArrivals() {
  const [arrivals, setArrivals] = useState<NewArrival[]>(() => {
    try {
      const s = localStorage.getItem("yunora_new_arrivals");
      return s ? JSON.parse(s) : DEFAULT_ARRIVALS;
    } catch { return DEFAULT_ARRIVALS; }
  });

  const save = (v: NewArrival[]) => { setArrivals(v); localStorage.setItem("yunora_new_arrivals", JSON.stringify(v)); };
  const add = (p: Omit<NewArrival, "id">) => { const id = Math.max(0, ...arrivals.map((x) => x.id)) + 1; save([{ ...p, id }, ...arrivals]); };
  const update = (id: number, p: Partial<NewArrival>) => save(arrivals.map((x) => (x.id === id ? { ...x, ...p } : x)));
  const remove = (id: number) => save(arrivals.filter((x) => x.id !== id));

  // Only show products whose launchDate is <= today
  const now = new Date().toISOString().split("T")[0];
  const live = arrivals.filter((p) => p.launchDate <= now).sort((a, b) => b.launchDate.localeCompare(a.launchDate));
  const scheduled = arrivals.filter((p) => p.launchDate > now).sort((a, b) => a.launchDate.localeCompare(b.launchDate));

  return { arrivals, live, scheduled, add, update, remove };
}

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

/* ─── Product Card (Grid) ─── */
function ProductCard({ p, index }: { p: NewArrival; index: number }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(p.id);
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : null;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.06 }} className="bg-card border border-border/20 rounded-2xl overflow-hidden group hover:shadow-lg hover:border-primary/25 transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden aspect-[4/5] bg-muted/20">
        <Link href={`/product/${p.id}`}>
          <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer" />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="text-[10px] font-bold tracking-widest bg-primary text-white px-2.5 py-1 uppercase">New</span>
          {p.isBestSeller && <span className="text-[10px] font-medium bg-amber-500 text-white px-2.5 py-1">BEST SELLER</span>}
        </div>
        <div className="absolute top-3 right-3">
          <button onClick={() => toggleWishlist(p.id)} className={`w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-all ${wishlisted ? "bg-red-50 text-red-500" : "text-foreground hover:text-primary"}`}>
            <Heart className={`h-4 w-4 ${wishlisted ? "fill-red-500" : ""}`} />
          </button>
        </div>
        {!p.inStock && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-foreground text-background text-xs font-medium px-4 py-2">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{p.category.replace("-", " ")}</p>
        <Link href={`/product/${p.id}`}><h3 className="font-serif text-base leading-snug hover:text-primary transition-colors cursor-pointer mb-2">{p.name}</h3></Link>
        <div className="flex items-center gap-1.5 mb-2">
          <Stars rating={p.rating} />
          <span className="text-xs text-muted-foreground">({p.reviews})</span>
        </div>
        <div className="flex gap-1 mb-3 flex-wrap">
          {p.colors.slice(0, 4).map((c) => (
            <span key={c} className="text-[10px] text-muted-foreground border border-border/40 px-2 py-0.5 rounded-full">{c}</span>
          ))}
        </div>
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-serif text-lg">₹{p.price.toLocaleString("en-IN")}</span>
            {p.originalPrice && <span className="text-xs text-muted-foreground line-through">₹{p.originalPrice.toLocaleString("en-IN")}</span>}
            {discount && <span className="text-xs text-green-600 font-medium">-{discount}%</span>}
          </div>
          <button onClick={() => addToCart()} disabled={!p.inStock} className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary border border-primary/30 py-2.5 text-[11px] font-medium tracking-wider uppercase hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-sm">
            <ShoppingCart className="h-3.5 w-3.5" />
            {p.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Horizontal Scroll Card (compact) ─── */
function ScrollCard({ p, index }: { p: NewArrival; index: number }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(p.id);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: index * 0.06 }} className="w-44 shrink-0 group">
      <div className="relative overflow-hidden rounded-2xl aspect-square bg-muted/20 mb-3">
        <Link href={`/product/${p.id}`}>
          <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer" />
        </Link>
        <span className="absolute top-2 left-2 text-[9px] font-bold tracking-widest bg-primary text-white px-2 py-0.5">NEW</span>
        <button onClick={() => toggleWishlist(p.id)} className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-card/90 flex items-center justify-center shadow ${wishlisted ? "text-red-500" : "text-foreground hover:text-primary"}`}>
          <Heart className={`h-3 w-3 ${wishlisted ? "fill-red-500" : ""}`} />
        </button>
      </div>
      <p className="font-serif text-sm leading-snug line-clamp-2 mb-1">{p.name}</p>
      <div className="flex items-center gap-1 mb-1"><Stars rating={p.rating} /><span className="text-[10px] text-muted-foreground">({p.reviews})</span></div>
      <p className="font-serif text-sm mb-2">₹{p.price.toLocaleString("en-IN")}</p>
      <button onClick={() => addToCart()} disabled={!p.inStock} className="w-full flex items-center justify-center gap-1.5 border border-border/50 py-2 text-[10px] font-medium tracking-wider uppercase hover:border-primary hover:text-primary transition-all disabled:opacity-40 disabled:cursor-not-allowed rounded-sm">
        <ShoppingCart className="h-3 w-3" /> {p.inStock ? "Add to Cart" : "Sold Out"}
      </button>
    </motion.div>
  );
}

/* ─── ADMIN PANEL ─── */
type AdminTab = "products" | "scheduled" | "add" | "edit";
const BLANK: Omit<NewArrival, "id"> = {
  name: "", price: 0, originalPrice: undefined, category: "curtains", image: catCurtains,
  rating: 4.5, reviews: 0, colors: [], materials: [], inStock: true, launchDate: new Date().toISOString().split("T")[0], badge: "NEW", description: ""
};

function AdminPanel({ arrivals, scheduled, onAdd, onUpdate, onRemove, onClose }: {
  arrivals: NewArrival[]; scheduled: NewArrival[];
  onAdd: (p: Omit<NewArrival, "id">) => void;
  onUpdate: (id: number, p: Partial<NewArrival>) => void;
  onRemove: (id: number) => void;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<AdminTab>("products");
  const [editTarget, setEditTarget] = useState<NewArrival | null>(null);
  const [form, setForm] = useState(BLANK);
  const [search, setSearch] = useState("");
  const [delConfirm, setDelConfirm] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const today = new Date().toISOString().split("T")[0];

  const filtered = arrivals.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setForm({ ...BLANK, launchDate: today }); setTab("add"); setEditTarget(null); };
  const openEdit = (p: NewArrival) => { setEditTarget(p); setForm({ name: p.name, price: p.price, originalPrice: p.originalPrice, category: p.category, image: p.image, rating: p.rating, reviews: p.reviews, colors: p.colors, materials: p.materials, inStock: p.inStock, launchDate: p.launchDate, badge: p.badge || "NEW", description: p.description || "" }); setTab("edit"); };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((p) => ({ ...p, image: ev.target?.result as string }));
    reader.readAsDataURL(f);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "add") onAdd(form);
    else if (tab === "edit" && editTarget) onUpdate(editTarget.id, form);
    setTab("products");
  };

  const isScheduledForm = form.launchDate > today;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }} className="bg-card border border-border/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            {(tab === "add" || tab === "edit") && (
              <button onClick={() => setTab("products")} className="text-muted-foreground hover:text-foreground">
                <ArrowRight className="h-4 w-4 rotate-180" />
              </button>
            )}
            <h3 className="font-serif text-xl">
              {tab === "products" ? "New Arrivals Manager" : tab === "scheduled" ? "Scheduled Launches" : tab === "add" ? "Add New Product" : "Edit Product"}
            </h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted/40 flex items-center justify-center hover:bg-muted transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        {tab === "products" || tab === "scheduled" ? (
          <div className="flex border-b border-border/30">
            {(["products", "scheduled"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 text-xs font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${tab === t ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {t === "products" ? <><Package className="h-3.5 w-3.5" /> Live Products ({arrivals.length})</> : <><Clock className="h-3.5 w-3.5" /> Scheduled ({scheduled.length})</>}
              </button>
            ))}
          </div>
        ) : null}

        <div className="overflow-y-auto flex-1">

          {/* Products List */}
          {tab === "products" && (
            <div className="p-5 space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products…" className="w-full pl-9 pr-4 py-2.5 border border-border/40 rounded-xl text-sm focus:outline-none focus:border-primary bg-transparent" />
                </div>
                <button onClick={openAdd} className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 text-xs font-medium tracking-wider uppercase shrink-0 hover:bg-primary/90 transition-colors rounded-sm">
                  <Plus className="h-3.5 w-3.5" /> Add Product
                </button>
              </div>
              <div className="space-y-2.5">
                {filtered.map((p) => {
                  const isLive = p.launchDate <= today;
                  return (
                    <div key={p.id} className="flex items-center gap-4 p-4 bg-muted/15 rounded-xl border border-border/20 hover:border-primary/25 transition-colors">
                      <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-xl shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-medium text-sm truncate">{p.name}</p>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${isLive ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"}`}>{isLive ? "Live" : "Scheduled"}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">₹{p.price.toLocaleString("en-IN")} · {p.category.replace("-", " ")}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.launchDate}</span>
                          <span className={`text-[10px] ${p.inStock ? "text-green-600" : "text-red-500"}`}>{p.inStock ? "In Stock" : "Out of Stock"}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"><Edit3 className="h-3.5 w-3.5" /></button>
                        {delConfirm === p.id ? (
                          <div className="flex gap-1">
                            <button onClick={() => { onRemove(p.id); setDelConfirm(null); }} className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center"><Check className="h-3.5 w-3.5" /></button>
                            <button onClick={() => setDelConfirm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center"><X className="h-3.5 w-3.5" /></button>
                          </div>
                        ) : (
                          <button onClick={() => setDelConfirm(p.id)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-red-400 hover:text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Scheduled tab */}
          {tab === "scheduled" && (
            <div className="p-5">
              {scheduled.length === 0 ? (
                <div className="text-center py-16">
                  <Bell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="font-serif text-lg mb-2">No Scheduled Launches</p>
                  <p className="text-muted-foreground text-sm mb-5">Schedule a future product launch from the Add Product form.</p>
                  <button onClick={openAdd} className="bg-primary text-white px-8 py-3 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm">Schedule a Launch</button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {scheduled.map((p) => {
                    const daysLeft = Math.ceil((new Date(p.launchDate).getTime() - Date.now()) / 86400000);
                    return (
                      <div key={p.id} className="flex items-center gap-4 p-4 bg-amber-50/50 border border-amber-200/40 rounded-xl">
                        <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-xl shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate mb-0.5">{p.name}</p>
                          <p className="text-xs text-muted-foreground">₹{p.price.toLocaleString("en-IN")}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] flex items-center gap-1 text-amber-600"><Calendar className="h-3 w-3" /> {p.launchDate}</span>
                            <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">{daysLeft}d left</span>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"><Edit3 className="h-3.5 w-3.5" /></button>
                          <button onClick={() => onRemove(p.id)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-red-400 hover:text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Add / Edit Form */}
          {(tab === "add" || tab === "edit") && (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image */}
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-2">Product Image</label>
                {form.image && <img src={form.image} alt="preview" className="w-full h-36 object-cover rounded-xl mb-3" />}
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => fileRef.current?.click()} className="flex items-center justify-center gap-2 border border-dashed border-border rounded-xl py-3 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    <Upload className="h-4 w-4" /> Upload Photo
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                  <select onChange={(e) => { if (STOCK_IMAGES[e.target.value]) setForm((p) => ({ ...p, image: STOCK_IMAGES[e.target.value] })); }} className="border border-border rounded-xl px-3 py-3 text-xs bg-transparent focus:outline-none focus:border-primary">
                    <option value="">Stock Photo</option>
                    {Object.keys(STOCK_IMAGES).map((k) => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">Product Name *</label>
                <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="e.g. Velvet Cushion Set" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">Price (₹) *</label>
                  <input type="number" min="0" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: +e.target.value }))} required className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="2499" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">Original Price (₹)</label>
                  <input type="number" min="0" value={form.originalPrice || ""} onChange={(e) => setForm((p) => ({ ...p, originalPrice: e.target.value ? +e.target.value : undefined }))} className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="3999" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">Category</label>
                  <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary appearance-none">
                    {["curtains", "bedsheets", "cushions", "sofa-fabrics", "comforters", "home-decor"].map((c) => <option key={c} value={c}>{c.replace("-", " ")}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">Colors (comma-separated)</label>
                  <input value={form.colors.join(",")} onChange={(e) => setForm((p) => ({ ...p, colors: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }))} className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="Ivory, Charcoal, Terracotta" />
                </div>
              </div>

              {/* Launch Date — the key admin feature */}
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5 flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" /> Launch Date *
                </label>
                <input type="date" value={form.launchDate} onChange={(e) => setForm((p) => ({ ...p, launchDate: e.target.value }))} required className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary" />
                {isScheduledForm && (
                  <div className="mt-2 flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    <p className="text-xs">This product will be <strong>scheduled</strong> — it will automatically appear on {form.launchDate}</p>
                  </div>
                )}
                {!isScheduledForm && (
                  <div className="mt-2 flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    <Sparkles className="h-3.5 w-3.5 shrink-0" />
                    <p className="text-xs">This product will <strong>go live immediately</strong> on the New Arrivals page</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div onClick={() => setForm((p) => ({ ...p, inStock: !p.inStock }))} className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all shrink-0 ${form.inStock ? "bg-primary border-primary" : "border-border"}`}>
                  {form.inStock && <Check className="h-2.5 w-2.5 text-white" />}
                </div>
                <span className="text-sm text-muted-foreground cursor-pointer" onClick={() => setForm((p) => ({ ...p, inStock: !p.inStock }))}>In Stock</span>
                <div className="ml-4" onClick={() => setForm((p) => ({ ...p, isBestSeller: !p.isBestSeller }))} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0 ${form.isBestSeller ? "bg-amber-500 border-amber-500" : "border-border"}`}>
                    {form.isBestSeller && <Check className="h-2.5 w-2.5 text-white" />}
                  </div>
                  <span className="text-sm text-muted-foreground">Best Seller</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-primary text-white py-3 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm">
                  {tab === "add" ? (isScheduledForm ? "Schedule Launch" : "Add to New Arrivals") : "Save Changes"}
                </button>
                <button type="button" onClick={() => setTab("products")} className="px-6 border border-border text-xs font-medium uppercase hover:border-foreground transition-colors rounded-sm">Cancel</button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Quick View Modal ─── */
function QuickViewModal({ p, onClose }: { p: NewArrival; onClose: () => void }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [qty, setQty] = useState(1);
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-card rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="grid grid-cols-2">
          <div className="relative aspect-square overflow-hidden">
            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            <span className="absolute top-3 left-3 text-[10px] font-bold bg-primary text-white px-2.5 py-1">NEW</span>
          </div>
          <div className="p-6 flex flex-col justify-center">
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"><X className="h-4 w-4" /></button>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{p.category.replace("-", " ")}</p>
            <h3 className="font-serif text-xl mb-2 leading-snug">{p.name}</h3>
            <div className="flex items-center gap-1.5 mb-3"><Stars rating={p.rating} /><span className="text-xs text-muted-foreground">({p.reviews})</span></div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-serif text-2xl">₹{p.price.toLocaleString("en-IN")}</span>
              {p.originalPrice && <span className="text-sm text-muted-foreground line-through">₹{p.originalPrice.toLocaleString("en-IN")}</span>}
              {discount && <span className="text-xs text-green-600 font-medium">-{discount}%</span>}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-primary transition-colors text-sm">-</button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-primary transition-colors text-sm">+</button>
            </div>
            <button onClick={() => addToCart()} disabled={!p.inStock} className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors disabled:opacity-40 mb-2 rounded-sm">
              <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
            </button>
            <button onClick={() => toggleWishlist(p.id)} className={`w-full flex items-center justify-center gap-2 border py-3 text-xs font-medium tracking-wider uppercase transition-colors rounded-sm ${isInWishlist(p.id) ? "border-red-400 text-red-500" : "border-border hover:border-primary hover:text-primary"}`}>
              <Heart className={`h-3.5 w-3.5 ${isInWishlist(p.id) ? "fill-red-500" : ""}`} /> {isInWishlist(p.id) ? "In Wishlist" : "Add to Wishlist"}
            </button>
            <Link href={`/product/${p.id}`}><button className="mt-2 w-full text-xs text-primary hover:underline underline-offset-2">View Full Details</button></Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── FadeUp helper ─── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function NewArrivals() {
  const { live, scheduled, arrivals, add, update, remove } = useNewArrivals();
  const [showAdmin, setShowAdmin] = useState(false);
  const [quickView, setQuickView] = useState<NewArrival | null>(null);
  const [searchQ, setSearchQ] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [gridMode, setGridMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  /* Featured = top 5 newest */
  const featured = live.slice(0, 5);
  /* Recently added = next 5 */
  const recently = live.slice(5, 10);
  /* Trending = best sellers + extras, deduped */
  const trendingRaw = [...live.filter((p) => p.isBestSeller), ...live.filter((p) => !p.isBestSeller)];
  const seen = new Set<number>();
  const trending = trendingRaw.filter((p) => { if (seen.has(p.id)) return false; seen.add(p.id); return true; }).slice(0, 5);

  const categories = ["all", "curtains", "bedsheets", "cushions", "sofa-fabrics", "comforters", "home-decor"];

  /* Filtered + sorted main grid */
  const filtered = live.filter((p) => {
    const q = searchQ.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.category.includes(q);
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    return matchSearch && matchCat;
  }).sort((a, b) => {
    if (sortBy === "newest") return b.launchDate.localeCompare(a.launchDate);
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const instagramImages = [colCurated, catCurtains, catBedsheets, catCushions, catSofaFabrics, catComforters];

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background overflow-x-hidden">
      <AnnouncementBar />
      <Header />
      <main className="flex-grow">

        {/* ══ 1. SPLIT HERO ══ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px] lg:min-h-[500px]">
          {/* Left — text */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-14 bg-[#FAF7F4] order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
              <p className="text-primary text-xs tracking-widest uppercase font-medium mb-3">Just In</p>
              <h1 className="font-serif text-5xl lg:text-6xl leading-tight mb-4">New Arrivals</h1>
              <p className="text-muted-foreground text-sm lg:text-base font-light leading-relaxed mb-8 max-w-sm">
                Discover Our Latest<br />Luxury Furnishing Collection
              </p>
              <div className="flex items-center gap-3">
                <button onClick={() => document.getElementById("all-products")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 text-xs font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors">
                  Explore Collection <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => setShowAdmin(true)} className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors" title="Admin: Manage New Arrivals">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
              {scheduled.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 flex items-center gap-2 text-amber-600 text-xs">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>{scheduled.length} product{scheduled.length > 1 ? "s" : ""} launching soon</span>
                </motion.div>
              )}
            </motion.div>
          </div>
          {/* Right — fullbleed image */}
          <div className="relative overflow-hidden min-h-[280px] order-1 lg:order-2">
            <motion.img src={hero1} alt="New Arrivals" initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </section>

        {/* ══ 2. FEATURED NEW ARRIVALS ══ */}
        <section className="py-12 lg:py-16 border-b border-border/30">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeUp className="flex items-center justify-between mb-7">
              <div>
                <p className="text-primary text-xs tracking-widest uppercase font-medium mb-1">Handpicked</p>
                <h2 className="font-serif text-3xl">Featured New Arrivals</h2>
              </div>
              <Link href="/shop"><button className="text-xs text-primary hover:underline underline-offset-2 flex items-center gap-1 shrink-0">View All New Arrivals <ArrowRight className="h-3.5 w-3.5" /></button></Link>
            </FadeUp>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4">
              {featured.map((p, i) => <ScrollCard key={p.id} p={p} index={i} />)}
            </div>
          </div>
        </section>

        {/* ══ 3. COLLECTION HIGHLIGHT BANNER ══ */}
        <section className="py-10">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeUp>
              <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden min-h-[340px] border border-border/20">
                {/* Left */}
                <div className="bg-[#FAF7F4] flex flex-col justify-center px-10 lg:px-14 py-12">
                  <p className="text-primary text-[10px] font-bold tracking-widest uppercase mb-4">New Collection Highlights</p>
                  <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-5">
                    Timeless Designs.<br />Thoughtfully Curated.
                  </h2>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed mb-7 max-w-sm">
                    Our new collection blends premium materials with contemporary aesthetics to bring warmth, elegance and comfort to your living spaces.
                  </p>
                  <Link href="/collections">
                    <button className="inline-flex items-center gap-2 border border-border px-7 py-3.5 text-xs font-medium tracking-wider uppercase hover:border-primary hover:text-primary transition-colors w-fit">
                      Explore Collection <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                </div>
                {/* Right image */}
                <div className="relative overflow-hidden min-h-[260px]">
                  <motion.img src={colBedding} alt="Collection highlight" initial={{ scale: 1.06 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══ 4. RECENTLY ADDED ══ */}
        <section className="py-10 border-t border-border/30">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeUp className="flex items-center justify-between mb-7">
              <div>
                <p className="text-primary text-xs tracking-widest uppercase font-medium mb-1">Latest Drops</p>
                <h2 className="font-serif text-3xl">Recently Added</h2>
              </div>
              <Link href="/shop"><button className="text-xs text-primary hover:underline underline-offset-2 flex items-center gap-1 shrink-0">View All <ArrowRight className="h-3.5 w-3.5" /></button></Link>
            </FadeUp>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4">
              {(recently.length > 0 ? recently : live.slice(0, 5)).map((p, i) => <ScrollCard key={p.id} p={p} index={i} />)}
            </div>
          </div>
        </section>

        {/* ══ 5. TRENDING THIS WEEK ══ */}
        <section className="py-10 border-t border-border/30">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeUp className="flex items-center justify-between mb-7">
              <div>
                <p className="text-primary text-xs tracking-widest uppercase font-medium mb-1">What's Hot</p>
                <h2 className="font-serif text-3xl">Trending This Week</h2>
              </div>
              <Link href="/best-sellers"><button className="text-xs text-primary hover:underline underline-offset-2 flex items-center gap-1 shrink-0">View All <ArrowRight className="h-3.5 w-3.5" /></button></Link>
            </FadeUp>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4">
              {(trending.length > 0 ? trending : live.slice(0, 5)).map((p, i) => <ScrollCard key={p.id} p={p} index={i} />)}
            </div>
          </div>
        </section>

        {/* ══ 6. ALL NEW ARRIVALS GRID ══ */}
        <section id="all-products" className="py-12 lg:py-16 border-t border-border/30">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeUp className="mb-7">
              <div className="flex items-end justify-between flex-wrap gap-3">
                <div>
                  <p className="text-primary text-xs tracking-widest uppercase font-medium mb-1">Browse</p>
                  <h2 className="font-serif text-3xl">All New Arrivals</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setGridMode("grid")} className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${gridMode === "grid" ? "bg-primary text-white border-primary" : "border-border hover:border-primary"}`}><Grid3X3 className="h-4 w-4" /></button>
                  <button onClick={() => setGridMode("list")} className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${gridMode === "list" ? "bg-primary text-white border-primary" : "border-border hover:border-primary"}`}><LayoutList className="h-4 w-4" /></button>
                </div>
              </div>
            </FadeUp>

            {/* Search + Filter bar */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)} placeholder="Search new arrivals…" className="w-full pl-9 pr-10 py-2.5 border border-border/40 rounded-xl text-sm focus:outline-none focus:border-primary bg-background" />
                {searchQ && <button onClick={() => setSearchQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"><X className="h-4 w-4" /></button>}
              </div>
              <div className="relative">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none border border-border/40 bg-card rounded-xl pl-3 pr-8 py-2.5 text-xs focus:outline-none focus:border-primary cursor-pointer">
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              </div>
              <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 text-xs font-medium transition-colors ${showFilters ? "bg-primary text-white border-primary" : "border-border/40 hover:border-primary"}`}>
                <Filter className="h-3.5 w-3.5" /> Filters
              </button>
              <span className="ml-auto self-center text-xs text-muted-foreground whitespace-nowrap">{filtered.length} products</span>
            </div>

            {/* Category chips */}
            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-5">
                  <div className="flex flex-wrap gap-2 py-3">
                    {categories.map((c) => (
                      <button key={c} onClick={() => setActiveCategory(c)} className={`px-4 py-2 text-xs font-medium tracking-wider rounded-full transition-all ${activeCategory === c ? "bg-primary text-white" : "border border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
                        {c === "all" ? "All Categories" : c.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className={gridMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" : "grid grid-cols-1 gap-4"}>
                {filtered.map((p, i) => (
                  gridMode === "grid" ? (
                    <div key={p.id} className="relative group">
                      <ProductCard p={p} index={i} />
                      <button onClick={() => setQuickView(p)} className="absolute bottom-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 bg-card/95 backdrop-blur-sm border border-border text-xs font-medium px-4 py-1.5 whitespace-nowrap shadow-lg flex items-center gap-1.5 z-10">
                        <Eye className="h-3 w-3" /> Quick View
                      </button>
                    </div>
                  ) : (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="flex gap-4 bg-card border border-border/20 rounded-2xl overflow-hidden hover:border-primary/25 hover:shadow-md transition-all duration-300 p-4">
                      <Link href={`/product/${p.id}`}><img src={p.image} alt={p.name} className="w-28 h-28 object-cover rounded-xl shrink-0" /></Link>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">{p.category.replace("-", " ")}</p>
                        <Link href={`/product/${p.id}`}><h3 className="font-serif text-lg hover:text-primary transition-colors mb-1">{p.name}</h3></Link>
                        <div className="flex items-center gap-1.5 mb-2"><Stars rating={p.rating} /><span className="text-xs text-muted-foreground">({p.reviews})</span></div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-xl">₹{p.price.toLocaleString("en-IN")}</span>
                          {p.originalPrice && <span className="text-sm text-muted-foreground line-through">₹{p.originalPrice.toLocaleString("en-IN")}</span>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 justify-center shrink-0">
                        <button onClick={() => useCart().addToCart()} disabled={!p.inStock} className="flex items-center gap-1.5 bg-primary text-white px-4 py-2.5 text-xs font-medium uppercase hover:bg-primary/90 transition-colors disabled:opacity-40 rounded-sm">
                          <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
                        </button>
                        <button onClick={() => setQuickView(p)} className="flex items-center gap-1.5 border border-border px-4 py-2.5 text-xs font-medium uppercase hover:border-primary hover:text-primary transition-colors rounded-sm">
                          <Eye className="h-3.5 w-3.5" /> Quick View
                        </button>
                      </div>
                    </motion.div>
                  )
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card border border-border/20 rounded-2xl">
                <Sparkles className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="font-serif text-xl mb-2">No arrivals found</p>
                <p className="text-muted-foreground text-sm mb-5">Try a different search or filter.</p>
                <button onClick={() => { setSearchQ(""); setActiveCategory("all"); }} className="bg-primary text-white px-8 py-3 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm">Clear Filters</button>
              </div>
            )}
          </div>
        </section>

        {/* ══ 7. INSTAGRAM INSPIRED ══ */}
        <section className="py-12 border-t border-border/30">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeUp className="flex items-center justify-between mb-6">
              <div>
                <p className="text-primary text-xs tracking-widest uppercase font-medium mb-1">Follow @myyunora</p>
                <h2 className="font-serif text-3xl">Instagram Inspired</h2>
                <p className="text-muted-foreground text-xs mt-1">Follow @yunora.furnishing</p>
              </div>
              <a href="https://instagram.com/myyunora" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline underline-offset-2 flex items-center gap-1">View All <ArrowRight className="h-3.5 w-3.5" /></a>
            </FadeUp>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3">
              {instagramImages.map((img, i) => (
                <motion.a key={i} href="https://instagram.com/myyunora" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="group aspect-square overflow-hidden rounded-2xl bg-muted/20">
                  <img src={img} alt={`Instagram ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 8. TRUST BAR ══ */}
        <section className="border-t border-border/30 bg-card py-10">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { icon: Award, title: "Premium Materials", desc: "Crafted with care" },
                { icon: TrendingUp, title: "New Trends", desc: "Stay ahead always" },
                { icon: Gem, title: "Timeless Quality", desc: "Made to last" },
                { icon: RotateCcw, title: "Easy Returns", desc: "Hassle-free returns" },
                { icon: Truck, title: "Free Shipping", desc: "On all orders" },
              ].map(({ icon: Icon, title, desc }) => (
                <FadeUp key={title} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ══ MODALS ══ */}
      <AnimatePresence>
        {showAdmin && (
          <AdminPanel arrivals={arrivals} scheduled={scheduled} onAdd={add} onUpdate={update} onRemove={remove} onClose={() => setShowAdmin(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {quickView && <QuickViewModal p={quickView} onClose={() => setQuickView(null)} />}
      </AnimatePresence>

      <Footer />
      <MobileNav />
    </div>
  );
}
