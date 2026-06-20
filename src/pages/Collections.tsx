import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "wouter";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { products } from "@/data/products";
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
  ArrowRight, Search, Plus, Edit3, Trash2, X, Check, Upload,
  BarChart2, Package, TrendingUp, Star, Settings, Instagram,
  ChevronRight, ShieldCheck, Truck, RotateCcw, Award, Gem
} from "lucide-react";

/* ─── Collection Type ─── */
export type Collection = {
  id: number;
  name: string;
  slug: string;
  description: string;
  story: string;
  image: string;
  productIds: number[];
  isFeatured: boolean;
  isTrending: boolean;
  isNew: boolean;
  views: number;
  tag?: string;
};

/* ─── Stock images map ─── */
const STOCK: Record<string, string> = {
  "Luxury Interior": hero1,
  "Curated Living": colCurated,
  "Bedding Collection": colBedding,
  "Curtain Collection": colCurtains,
  "Curtains": catCurtains,
  "Bedsheets": catBedsheets,
  "Cushions": catCushions,
  "Sofa Fabrics": catSofaFabrics,
  "Comforters": catComforters,
  "Home Decor": catHomeDecor,
};

const DEFAULT_COLLECTIONS: Collection[] = [
  { id: 1, name: "Royal Heritage", slug: "royal-heritage", description: "Timeless elegance inspired by classic luxury.", story: "Rooted in the grand traditions of Indian royal households, Royal Heritage brings the splendour of palaces into your home.", image: catCurtains, productIds: [1, 6, 14, 18], isFeatured: true, isTrending: false, isNew: false, views: 4820, tag: "Classic" },
  { id: 2, name: "Modern Luxe", slug: "modern-luxe", description: "Sleek designs for contemporary spaces.", story: "Where clean lines meet opulent materials. Modern Luxe is for those who believe luxury should be effortless.", image: colCurated, productIds: [2, 7, 13, 17], isFeatured: true, isTrending: true, isNew: false, views: 6310, tag: "Trending" },
  { id: 3, name: "Minimal Living", slug: "minimal-living", description: "Clean, calm & beautifully minimal.", story: "Less is more. Minimal Living celebrates the beauty of restraint — thoughtful pieces that breathe and belong.", image: colBedding, productIds: [5, 10, 15, 19], isFeatured: true, isTrending: false, isNew: false, views: 3290, tag: "Minimal" },
  { id: 4, name: "Classic Comfort", slug: "classic-comfort", description: "Enduring comfort with a classic touch.", story: "Built for families, designed for generations. Classic Comfort is YUNORA's most beloved everyday collection.", image: catComforters, productIds: [4, 12, 15, 17], isFeatured: true, isTrending: false, isNew: false, views: 5140, tag: "Comfort" },
  { id: 5, name: "Festive Collection", slug: "festive-collection", description: "Celebrate every moment in style.", story: "Designed for India's most joyous occasions — from Diwali to weddings, every piece is made to be remembered.", image: catHomeDecor, productIds: [3, 8, 11, 16, 20], isFeatured: true, isTrending: true, isNew: true, views: 8920, tag: "Festive" },
  { id: 6, name: "Premium Bedding Collection", slug: "premium-bedding", description: "Luxurious bedding for restful nights.", story: "Every thread is chosen for its quality, every weave for its beauty. Our Premium Bedding collection redefines rest.", image: catBedsheets, productIds: [2, 6, 10, 18], isFeatured: true, isTrending: false, isNew: false, views: 7210, tag: "Bedding" },
  { id: 7, name: "Luxury Curtain Collection", slug: "luxury-curtains", description: "Drape your space in elegance.", story: "From dramatic floor-length velvet drapes to breezy linen sheers, every window deserves to make a statement.", image: colCurtains, productIds: [1, 5, 9, 14], isFeatured: true, isTrending: false, isNew: true, views: 4650, tag: "Curtains" },
  { id: 8, name: "Designer Cushion Collection", slug: "designer-cushions", description: "The perfect accent for every space.", story: "Small in size, big in impact. Our designer cushions are handcrafted by artisans and styled by experts.", image: catCushions, productIds: [3, 7, 11], isFeatured: true, isTrending: false, isNew: false, views: 3870, tag: "Cushions" },
  { id: 9, name: "Monsoon Refresh", slug: "monsoon-refresh", description: "Fresh hues for the season.", story: "Inspired by the relief of the first rains, Monsoon Refresh brings cool, revitalising colours to your home.", image: colBedding, productIds: [2, 5, 15], isFeatured: false, isTrending: true, isNew: true, views: 2140, tag: "Seasonal" },
  { id: 10, name: "Earthy Neutrals", slug: "earthy-neutrals", description: "Grounded. Warm. Timeless.", story: "Terracotta, sand, and sage — colours borrowed from the earth to ground your living spaces.", image: catSofaFabrics, productIds: [8, 13, 19], isFeatured: false, isTrending: true, isNew: false, views: 3560, tag: "Neutral" },
  { id: 11, name: "Velvet Luxe", slug: "velvet-luxe", description: "Rich textures. Regal appeal.", story: "There is nothing quite like velvet — its depth, its sheen, its warmth. Velvet Luxe is unapologetically opulent.", image: catCurtains, productIds: [1, 7, 14], isFeatured: false, isTrending: true, isNew: false, views: 5280, tag: "Velvet" },
  { id: 12, name: "Boho Indie", slug: "boho-indie", description: "Free-spirited & artistic.", story: "Celebrating India's craft traditions with a bohemian twist — jute, ikat, block prints and beyond.", image: catCushions, productIds: [3, 11, 16], isFeatured: false, isTrending: true, isNew: false, views: 2930, tag: "Boho" },
  { id: 13, name: "Midnight Elegance", slug: "midnight-elegance", description: "Bold. Dramatic. Sophisticated.", story: "For those who love drama. Deep charcoals, midnight blues and rich embroideries make every room a statement.", image: colCurtains, productIds: [9, 1, 14], isFeatured: false, isTrending: true, isNew: false, views: 4190, tag: "Bold" },
];

/* ─── localStorage hook ─── */
function useCollections() {
  const [cols, setCols] = useState<Collection[]>(() => {
    try { const s = localStorage.getItem("yunora_collections"); return s ? JSON.parse(s) : DEFAULT_COLLECTIONS; } catch { return DEFAULT_COLLECTIONS; }
  });
  const save = (v: Collection[]) => { setCols(v); localStorage.setItem("yunora_collections", JSON.stringify(v)); };
  const add = (c: Omit<Collection, "id" | "views">) => { const id = Math.max(0, ...cols.map((x) => x.id)) + 1; save([...cols, { ...c, id, views: 0 }]); };
  const update = (id: number, c: Partial<Collection>) => save(cols.map((x) => (x.id === id ? { ...x, ...c } : x)));
  const remove = (id: number) => save(cols.filter((x) => x.id !== id));
  return { cols, add, update, remove };
}

/* ─── Framer helpers ─── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Collection Card ─── */
function CollectionCard({ col, index, large = false }: { col: Collection; index: number; large?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}>
      <Link href={`/collection/${col.slug}`}>
        <div className={`group relative overflow-hidden rounded-2xl cursor-pointer ${large ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
          <img src={col.image} alt={col.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 group-hover:from-black/85 transition-all duration-300" />

          {/* Tag */}
          {col.tag && (
            <div className="absolute top-3 left-3">
              <span className={`text-[10px] font-bold tracking-widest px-2.5 py-1 uppercase ${col.isNew ? "bg-primary text-white" : col.isTrending ? "bg-amber-500 text-white" : "bg-white/20 backdrop-blur-sm text-white"}`}>{col.isNew ? "New" : col.tag}</span>
            </div>
          )}

          <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6">
            <h3 className={`font-serif text-white leading-tight mb-1.5 ${large ? "text-3xl" : "text-xl"}`}>{col.name}</h3>
            <p className="text-white/70 text-xs font-light mb-3 line-clamp-2">{col.description}</p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 border border-white/20 group-hover:bg-white group-hover:text-foreground transition-all duration-300">
                Explore Collection <ArrowRight className="h-3 w-3" />
              </span>
              <span className="text-white/50 text-[10px]">{col.productIds.length} pieces</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Trending Scroll Card ─── */
function TrendingCard({ col }: { col: Collection }) {
  return (
    <Link href={`/collection/${col.slug}`}>
      <div className="group w-44 shrink-0 cursor-pointer">
        <div className="relative overflow-hidden rounded-2xl aspect-square mb-3">
          <img src={col.image} alt={col.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <p className="font-serif text-sm group-hover:text-primary transition-colors">{col.name}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">{col.description}</p>
      </div>
    </Link>
  );
}

/* ─── Admin Panel ─── */
type AdminTab = "collections" | "analytics";
const BLANK: Omit<Collection, "id" | "views"> = { name: "", slug: "", description: "", story: "", image: hero1, productIds: [], isFeatured: false, isTrending: false, isNew: false, tag: "" };

function AdminPanel({ cols, onAdd, onUpdate, onRemove, onClose }: {
  cols: Collection[]; onAdd: (c: Omit<Collection, "id" | "views">) => void;
  onUpdate: (id: number, c: Partial<Collection>) => void; onRemove: (id: number) => void; onClose: () => void;
}) {
  const [tab, setTab] = useState<AdminTab>("collections");
  const [editMode, setEditMode] = useState<"none" | "add" | "edit">("none");
  const [editTarget, setEditTarget] = useState<Collection | null>(null);
  const [form, setForm] = useState(BLANK);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [searchQ, setSearchQ] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = cols.filter((c) => c.name.toLowerCase().includes(searchQ.toLowerCase()));

  const openEdit = (c: Collection) => { setEditTarget(c); setForm({ name: c.name, slug: c.slug, description: c.description, story: c.story, image: c.image, productIds: c.productIds, isFeatured: c.isFeatured, isTrending: c.isTrending, isNew: c.isNew, tag: c.tag || "" }); setEditMode("edit"); };
  const openAdd = () => { setEditTarget(null); setForm(BLANK); setEditMode("add"); };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((p) => ({ ...p, image: ev.target?.result as string }));
    reader.readAsDataURL(f);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, "-");
    if (editMode === "add") onAdd({ ...form, slug });
    else if (editMode === "edit" && editTarget) onUpdate(editTarget.id, { ...form, slug });
    setEditMode("none");
  };

  const sortedByViews = [...cols].sort((a, b) => b.views - a.views);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }} className="bg-card border border-border/20 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
          <div className="flex items-center gap-4">
            {editMode !== "none" && <button onClick={() => setEditMode("none")} className="text-muted-foreground hover:text-foreground transition-colors"><ChevronRight className="h-4 w-4 rotate-180" /></button>}
            <h3 className="font-serif text-xl">{editMode === "none" ? "Collection Manager" : editMode === "add" ? "New Collection" : "Edit Collection"}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted/40 flex items-center justify-center hover:bg-muted transition-colors"><X className="h-4 w-4" /></button>
        </div>

        {editMode === "none" && (
          <div className="flex border-b border-border/30">
            {(["collections", "analytics"] as AdminTab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 text-xs font-medium uppercase tracking-wider transition-colors ${tab === t ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {t === "collections" ? "Collections" : "Analytics"}
              </button>
            ))}
          </div>
        )}

        <div className="overflow-y-auto flex-1">
          {/* Collections Tab */}
          {editMode === "none" && tab === "collections" && (
            <div className="p-6">
              <div className="flex gap-3 mb-5">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)} placeholder="Search collections…" className="w-full pl-9 pr-4 py-2.5 border border-border/40 rounded-xl text-sm focus:outline-none focus:border-primary bg-transparent" />
                </div>
                <button onClick={openAdd} className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors shrink-0 rounded-sm">
                  <Plus className="h-3.5 w-3.5" /> Add Collection
                </button>
              </div>
              <div className="space-y-2.5">
                {filtered.map((c) => (
                  <div key={c.id} className="flex items-center gap-4 p-4 bg-muted/20 rounded-xl border border-border/20 hover:border-primary/30 transition-colors">
                    <img src={c.image} alt={c.name} className="w-14 h-14 object-cover rounded-xl shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-medium text-sm truncate">{c.name}</p>
                        <div className="flex gap-1">
                          {c.isFeatured && <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">Featured</span>}
                          {c.isTrending && <span className="text-[9px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded-full font-medium">Trending</span>}
                          {c.isNew && <span className="text-[9px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full font-medium">New</span>}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{c.description}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Package className="h-3 w-3" /> {c.productIds.length} products</span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1"><BarChart2 className="h-3 w-3" /> {c.views.toLocaleString()} views</span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => openEdit(c)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"><Edit3 className="h-3.5 w-3.5" /></button>
                      {deleteConfirm === c.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => { onRemove(c.id); setDeleteConfirm(null); }} className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"><Check className="h-3.5 w-3.5" /></button>
                          <button onClick={() => setDeleteConfirm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center"><X className="h-3.5 w-3.5" /></button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(c.id)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-red-400 hover:text-red-500 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {editMode === "none" && tab === "analytics" && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total Collections", value: cols.length, icon: Package, color: "bg-primary/10 text-primary" },
                  { label: "Featured", value: cols.filter((c) => c.isFeatured).length, icon: Star, color: "bg-amber-100 text-amber-600" },
                  { label: "Trending", value: cols.filter((c) => c.isTrending).length, icon: TrendingUp, color: "bg-green-100 text-green-600" },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className={`rounded-xl p-4 border border-border/20`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${color}`}><Icon className="h-4 w-4" /></div>
                    <p className="font-serif text-2xl">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-medium text-sm mb-3">Top Collections by Views</p>
                <div className="space-y-2">
                  {sortedByViews.slice(0, 8).map((c, i) => {
                    const maxViews = sortedByViews[0].views;
                    return (
                      <div key={c.id} className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                        <img src={c.image} alt={c.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="text-xs font-medium truncate">{c.name}</p>
                            <p className="text-xs text-muted-foreground shrink-0 ml-2">{c.views.toLocaleString()}</p>
                          </div>
                          <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${(c.views / maxViews) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Add / Edit Form */}
          {(editMode === "add" || editMode === "edit") && (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image */}
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-2">Collection Image</label>
                {form.image && <img src={form.image} alt="preview" className="w-full h-36 object-cover rounded-xl mb-3" />}
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => fileRef.current?.click()} className="flex items-center justify-center gap-2 border border-dashed border-border rounded-xl py-2.5 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    <Upload className="h-4 w-4" /> Upload Image
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                  <select onChange={(e) => { if (STOCK[e.target.value]) setForm((p) => ({ ...p, image: STOCK[e.target.value] })); }} className="border border-border rounded-xl px-3 py-2.5 text-xs bg-transparent focus:outline-none focus:border-primary appearance-none">
                    <option value="">Choose Stock Photo</option>
                    {Object.keys(STOCK).map((k) => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">Collection Name *</label>
                  <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value, slug: p.slug || e.target.value.toLowerCase().replace(/\s+/g, "-") }))} required className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="e.g. Royal Heritage" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">URL Slug</label>
                  <input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="e.g. royal-heritage" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">Short Description</label>
                <input value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="One line description…" />
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">Collection Story</label>
                <textarea value={form.story} onChange={(e) => setForm((p) => ({ ...p, story: e.target.value }))} rows={3} className="w-full border border-border rounded-xl p-3 text-sm bg-transparent focus:outline-none focus:border-primary resize-none" placeholder="The story behind this collection…" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">Tag Label</label>
                  <input value={form.tag} onChange={(e) => setForm((p) => ({ ...p, tag: e.target.value }))} className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="e.g. Festive, New, Classic" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">Product IDs (comma-separated)</label>
                  <input value={form.productIds.join(",")} onChange={(e) => setForm((p) => ({ ...p, productIds: e.target.value.split(",").map(Number).filter(Boolean) }))} className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="1,2,3,4" />
                </div>
              </div>

              <div className="flex gap-6">
                {([["isFeatured", "Featured"], ["isTrending", "Trending"], ["isNew", "New"]] as const).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <div onClick={() => setForm((p) => ({ ...p, [key]: !p[key] }))} className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all ${form[key] ? "bg-primary border-primary" : "border-border hover:border-primary"}`}>
                      {form[key] && <Check className="h-2.5 w-2.5 text-white" />}
                    </div>
                    <span className="text-sm text-muted-foreground">{label}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-primary text-white py-3 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors">
                  {editMode === "add" ? "Create Collection" : "Save Changes"}
                </button>
                <button type="button" onClick={() => setEditMode("none")} className="px-6 border border-border text-xs font-medium uppercase hover:border-foreground transition-colors">Cancel</button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── MAIN COLLECTIONS PAGE ─── */
export default function Collections() {
  const { cols, add, update, remove } = useCollections();
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "featured" | "trending" | "new">("all");

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featured = cols.filter((c) => c.isFeatured);
  const trending = cols.filter((c) => c.isTrending);

  const filtered = cols.filter((c) => {
    const q = searchQ.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || (c.tag || "").toLowerCase().includes(q);
    const matchFilter = activeFilter === "all" || (activeFilter === "featured" && c.isFeatured) || (activeFilter === "trending" && c.isTrending) || (activeFilter === "new" && c.isNew);
    return matchSearch && matchFilter;
  });

  const instagramImages = [colCurated, catCurtains, catBedsheets, catCushions, catSofaFabrics, catComforters, colBedding, catHomeDecor];

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background overflow-x-hidden">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">

        {/* ══ 1. PARALLAX HERO ══ */}
        <section ref={heroRef} className="relative h-[60vh] lg:h-[70vh] min-h-[420px] overflow-hidden">
          <motion.div style={{ y: heroY }} className="absolute inset-0 will-change-transform">
            <img src={hero1} alt="YUNORA Collections" className="absolute inset-0 w-full h-full object-cover scale-110" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
          <motion.div style={{ opacity: heroOpacity }} className="relative h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-12">
              <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="max-w-xl">
                <p className="text-primary text-xs tracking-widest uppercase font-medium mb-4">Discover Timeless Elegance</p>
                <h1 className="font-serif text-5xl lg:text-7xl text-white leading-tight mb-5">
                  Curated Luxury<br />Collections
                </h1>
                <p className="text-white/70 text-sm lg:text-base font-light leading-relaxed mb-8">
                  Handpicked designs that blend timeless craftsmanship with modern living.
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <button onClick={() => document.getElementById("featured-section")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 text-xs font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors">
                    Explore All Collections <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => setShowAdmin(true)} className="inline-flex items-center gap-2 border border-white/30 text-white/80 px-4 py-3.5 text-xs font-medium hover:border-white hover:text-white transition-colors" title="Admin: Manage Collections">
                    <Settings className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ══ 2. SEARCH + FILTER BAR ══ */}
        <section className="border-b border-border/30 bg-card sticky top-[0px] z-30">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="flex items-center gap-4 py-4 flex-wrap">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input value={searchQ} onChange={(e) => setSearchQ(e.target.value)} placeholder="Search collections…" className="w-full pl-9 pr-10 py-2.5 border border-border/40 rounded-xl text-sm focus:outline-none focus:border-primary bg-background transition-colors" />
                {searchQ && <button onClick={() => setSearchQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>}
              </div>
              {/* Filter chips */}
              <div className="flex items-center gap-2 flex-wrap">
                {(["all", "featured", "trending", "new"] as const).map((f) => (
                  <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all rounded-full ${activeFilter === f ? "bg-primary text-white" : "border border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
                    {f === "all" ? "All" : f === "featured" ? "Featured" : f === "trending" ? "Trending" : "New"}
                  </button>
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">{filtered.length} collections</span>
            </div>
          </div>
        </section>

        {/* ══ 3. FEATURED COLLECTIONS ══ */}
        <section id="featured-section" className="py-14 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeUp className="flex items-center justify-between mb-8">
              <div>
                <p className="text-primary text-xs tracking-widest uppercase font-medium mb-1">Handpicked</p>
                <h2 className="font-serif text-3xl lg:text-4xl">Featured Collections</h2>
              </div>
              <Link href="/collections"><button className="text-xs text-primary hover:underline underline-offset-2 flex items-center gap-1 shrink-0">View All <ArrowRight className="h-3.5 w-3.5" /></button></Link>
            </FadeUp>

            {searchQ || activeFilter !== "all" ? (
              /* Filtered view */
              filtered.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                  {filtered.map((c, i) => <CollectionCard key={c.id} col={c} index={i} />)}
                </div>
              ) : (
                <div className="text-center py-20 bg-card border border-border/20 rounded-2xl">
                  <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="font-serif text-xl mb-2">No collections found</p>
                  <p className="text-muted-foreground text-sm mb-5">Try different keywords or filters.</p>
                  <button onClick={() => { setSearchQ(""); setActiveFilter("all"); }} className="bg-primary text-white px-8 py-3 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors">Clear Filters</button>
                </div>
              )
            ) : (
              /* Default featured 2×4 grid */
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {featured.slice(0, 8).map((c, i) => <CollectionCard key={c.id} col={c} index={i} />)}
              </div>
            )}
          </div>
        </section>

        {/* ══ 4. YUNORA STORY ══ */}
        <section className="py-0 pb-16 lg:pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeUp>
              <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden min-h-[400px]">
                {/* Text */}
                <div className="bg-[#FAF7F4] flex flex-col justify-center px-10 lg:px-16 py-14">
                  <p className="text-primary text-xs tracking-widest uppercase font-medium mb-4">The YUNORA Story</p>
                  <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-5">
                    Designing Spaces.<br />Creating Emotions.
                  </h2>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed mb-5 max-w-md">
                    Every collection is a reflection of our passion for beautiful living. We blend craftsmanship, premium materials & timeless aesthetics to create pieces that elevate your everyday.
                  </p>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed mb-8 max-w-md">
                    From the looms of Panipat to homes across India — each thread carries intention, each design carries heart.
                  </p>
                  <Link href="/about">
                    <button className="inline-flex items-center gap-2 border border-border px-7 py-3.5 text-xs font-medium tracking-wider uppercase hover:border-primary hover:text-primary transition-colors w-fit">
                      Our Design Philosophy <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                </div>
                {/* Image with reveal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative overflow-hidden min-h-[300px]"
                >
                  <motion.img
                    src={colCurated}
                    alt="YUNORA story"
                    initial={{ scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══ 5. TRENDING COLLECTIONS ══ */}
        <section className="pb-16 lg:pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeUp className="flex items-center justify-between mb-7">
              <div>
                <p className="text-primary text-xs tracking-widest uppercase font-medium mb-1">What's Hot</p>
                <h2 className="font-serif text-3xl lg:text-4xl">Trending Collections</h2>
              </div>
              <Link href="/collections"><button className="text-xs text-primary hover:underline underline-offset-2 flex items-center gap-1 shrink-0">View All <ArrowRight className="h-3.5 w-3.5" /></button></Link>
            </FadeUp>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4">
              {trending.map((c) => <TrendingCard key={c.id} col={c} />)}
            </div>
          </div>
        </section>

        {/* ══ 6. INSTAGRAM INSPIRED ══ */}
        <section className="pb-16 lg:pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <FadeUp className="flex items-center justify-between mb-6">
              <div>
                <p className="text-primary text-xs tracking-widest uppercase font-medium mb-1">@myyunora</p>
                <h2 className="font-serif text-3xl">Instagram Inspired</h2>
                <p className="text-muted-foreground text-sm mt-1">Follow @yunora.furnishing</p>
              </div>
              <a href="https://instagram.com/myyunora" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-border px-5 py-2.5 text-xs font-medium hover:border-primary hover:text-primary transition-colors">
                <Instagram className="h-4 w-4" /> Follow Us
              </a>
            </FadeUp>
            <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
              {instagramImages.map((img, i) => (
                <motion.a
                  key={i}
                  href="https://instagram.com/myyunora"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group aspect-square overflow-hidden rounded-xl bg-muted/20"
                >
                  <img src={img} alt={`Instagram ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 7. TRUST BAR ══ */}
        <section className="border-t border-border/30 bg-card py-10">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { icon: Award, title: "Premium Quality", desc: "Crafted to perfection" },
                { icon: Gem, title: "Timeless Designs", desc: "Made to last forever" },
                { icon: ShieldCheck, title: "Secure Payments", desc: "100% safe & secure" },
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

      {/* ══ ADMIN PANEL ══ */}
      <AnimatePresence>
        {showAdmin && (
          <AdminPanel
            cols={cols}
            onAdd={add}
            onUpdate={update}
            onRemove={remove}
            onClose={() => setShowAdmin(false)}
          />
        )}
      </AnimatePresence>

      <Footer />
      <MobileNav />
    </div>
  );
}
