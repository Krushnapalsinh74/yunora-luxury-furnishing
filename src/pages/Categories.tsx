import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "wouter";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import catCurtains from "@/assets/cat-curtains.png";
import catBedsheets from "@/assets/cat-bedsheets.png";
import catCushions from "@/assets/cat-cushions.png";
import catSofaFabrics from "@/assets/cat-sofa-fabrics.png";
import catComforters from "@/assets/cat-comforters.png";
import catHomeDecor from "@/assets/cat-home-decor.png";
import colCurated from "@/assets/col-curated.png";
import colBedding from "@/assets/col-bedding.png";
import colCurtains from "@/assets/col-curtains.png";
import hero1 from "@/assets/hero-1.png";
import {
  ArrowRight, Plus, Edit3, Trash2, X, Upload, Check,
  Grid3X3, Package, Star, ChevronRight, Settings
} from "lucide-react";

/* ─── Category Data (extends products.ts) ─── */
export type CategoryData = {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: string;
  image: string;
  featured?: boolean;
  color?: string;
};

const DEFAULT_CATEGORIES: CategoryData[] = [
  { id: 1, name: "Curtains", slug: "curtains", description: "Flowing elegance for every window. From sheer to blackout, find the perfect curtain for your space.", count: "120+ Products", image: catCurtains },
  { id: 2, name: "Bedsheets", slug: "bedsheets", description: "Sleep in luxury every night. Premium cotton, satin & linen bedsheets for the finest rest.", count: "250+ Products", image: catBedsheets },
  { id: 3, name: "Cushions", slug: "cushions", description: "Add the perfect finishing touch. Plush cushion covers that elevate any sofa or bed.", count: "180+ Products", image: catCushions },
  { id: 4, name: "Comforters", slug: "comforters", description: "Wrap yourself in warmth. Lightweight to heavyweight — luxury comfort for every season.", count: "90+ Products", image: catComforters },
  { id: 5, name: "Sofa Fabrics", slug: "sofa-fabrics", description: "Dress your sofa in style. Premium upholstery fabrics for every taste and décor.", count: "150+ Products", image: catSofaFabrics },
  { id: 6, name: "Home Decor", slug: "home-decor", description: "Beautiful accents for every room. Vases, lamps, art pieces and more for a curated home.", count: "200+ Products", image: catHomeDecor },
  { id: 7, name: "New Arrivals", slug: "new-arrivals", description: "Fresh styles just landed. Be the first to discover our latest luxury additions.", count: "40+ Products", image: colBedding },
  { id: 8, name: "Best Sellers", slug: "best-sellers", description: "Customer favourites, tried and trusted. The most-loved pieces in our collection.", count: "60+ Products", image: colCurtains },
];

function useCategories() {
  const [cats, setCats] = useState<CategoryData[]>(() => {
    try {
      const saved = localStorage.getItem("yunora_categories");
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  const save = (updated: CategoryData[]) => {
    setCats(updated);
    localStorage.setItem("yunora_categories", JSON.stringify(updated));
  };

  const add = (cat: Omit<CategoryData, "id">) => {
    const id = Math.max(0, ...cats.map((c) => c.id)) + 1;
    save([...cats, { ...cat, id }]);
  };

  const update = (id: number, cat: Partial<CategoryData>) => {
    save(cats.map((c) => (c.id === id ? { ...c, ...cat } : c)));
  };

  const remove = (id: number) => save(cats.filter((c) => c.id !== id));

  return { cats, add, update, remove };
}

/* ─── Category Card ─── */
function CategoryCard({ cat, index }: { cat: CategoryData; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/category/${cat.slug}`}>
        <div className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/5] lg:aspect-[3/4]">
          {/* Image */}
          <img
            src={cat.image}
            alt={cat.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5 transition-opacity duration-300 group-hover:from-black/85 group-hover:via-black/40" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6">
            <motion.div layout>
              <p className="text-white/70 text-[10px] tracking-widest uppercase mb-1 font-medium">{cat.count}</p>
              <h3 className="font-serif text-white text-2xl lg:text-2xl xl:text-3xl leading-tight mb-3">{cat.name}</h3>
              <p className="text-white/0 group-hover:text-white/75 text-xs font-light leading-relaxed mb-3 transition-all duration-300 max-h-0 group-hover:max-h-16 overflow-hidden">{cat.description}</p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-white text-foreground text-xs font-medium px-4 py-2 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Admin Panel ─── */
type AdminMode = "list" | "add" | "edit";

function AdminPanel({ cats, onAdd, onUpdate, onRemove, onClose }: {
  cats: CategoryData[];
  onAdd: (c: Omit<CategoryData, "id">) => void;
  onUpdate: (id: number, c: Partial<CategoryData>) => void;
  onRemove: (id: number) => void;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<AdminMode>("list");
  const [editTarget, setEditTarget] = useState<CategoryData | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", description: "", count: "", image: "" });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const STOCK_IMAGES: Record<string, string> = {
    catCurtains: catCurtains, catBedsheets: catBedsheets,
    catCushions: catCushions, catSofaFabrics: catSofaFabrics,
    catComforters: catComforters, catHomeDecor: catHomeDecor,
    colCurated: colCurated, colBedding: colBedding, colCurtains: colCurtains,
  };

  const openEdit = (cat: CategoryData) => {
    setEditTarget(cat);
    setForm({ name: cat.name, slug: cat.slug, description: cat.description, count: cat.count, image: cat.image });
    setMode("edit");
  };

  const openAdd = () => {
    setEditTarget(null);
    setForm({ name: "", slug: "", description: "", count: "", image: catCurtains });
    setMode("add");
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((p) => ({ ...p, image: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, "-");
    if (mode === "add") {
      onAdd({ ...form, slug });
    } else if (mode === "edit" && editTarget) {
      onUpdate(editTarget.id, { ...form, slug });
    }
    setMode("list");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }} className="bg-card border border-border/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[88vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            {mode !== "list" && (
              <button onClick={() => setMode("list")} className="text-muted-foreground hover:text-foreground transition-colors">
                <ChevronRight className="h-4 w-4 rotate-180" />
              </button>
            )}
            <h3 className="font-serif text-xl">
              {mode === "list" ? "Category Manager" : mode === "add" ? "Add New Category" : "Edit Category"}
            </h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted/40 flex items-center justify-center hover:bg-muted transition-colors"><X className="h-4 w-4" /></button>
        </div>

        <div className="overflow-y-auto flex-1">
          {/* List view */}
          {mode === "list" && (
            <div className="p-6">
              <div className="flex justify-end mb-4">
                <button onClick={openAdd} className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors">
                  <Plus className="h-3.5 w-3.5" /> Add Category
                </button>
              </div>
              <div className="space-y-3">
                {cats.map((cat) => (
                  <div key={cat.id} className="flex items-center gap-4 p-4 bg-muted/20 rounded-xl border border-border/20 hover:border-primary/30 transition-colors">
                    <img src={cat.image} alt={cat.name} className="w-14 h-14 object-cover rounded-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{cat.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{cat.description}</p>
                      <p className="text-xs text-primary font-medium mt-0.5">{cat.count}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => openEdit(cat)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      {deleteConfirm === cat.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => { onRemove(cat.id); setDeleteConfirm(null); }} className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"><Check className="h-3.5 w-3.5" /></button>
                          <button onClick={() => setDeleteConfirm(null)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-foreground transition-colors"><X className="h-3.5 w-3.5" /></button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(cat.id)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-red-400 hover:text-red-500 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add / Edit form */}
          {(mode === "add" || mode === "edit") && (
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Image preview */}
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-2">Category Image</label>
                <div className="relative">
                  {form.image && <img src={form.image} alt="preview" className="w-full h-40 object-cover rounded-xl mb-3" />}
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => fileRef.current?.click()} className="flex items-center justify-center gap-2 border border-dashed border-border rounded-xl py-3 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                      <Upload className="h-4 w-4" /> Upload Image
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
                    <div className="relative">
                      <select value={Object.entries(STOCK_IMAGES).find(([, v]) => v === form.image)?.[0] || ""} onChange={(e) => setForm((p) => ({ ...p, image: STOCK_IMAGES[e.target.value] || p.image }))} className="w-full border border-border rounded-xl py-3 px-3 text-xs bg-transparent focus:outline-none focus:border-primary appearance-none">
                        <option value="">Choose Stock Photo</option>
                        {Object.keys(STOCK_IMAGES).map((k) => <option key={k} value={k}>{k.replace(/([A-Z])/g, " $1").trim()}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">Category Name *</label>
                  <input value={form.name} onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value, slug: p.slug || e.target.value.toLowerCase().replace(/\s+/g, "-") })); }} required className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="e.g. Curtains" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">URL Slug</label>
                  <input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="e.g. curtains" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">Description</label>
                <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={2} className="w-full border border-border rounded-xl p-3 text-sm bg-transparent focus:outline-none focus:border-primary resize-none" placeholder="Short description of this category…" />
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">Product Count Label</label>
                <input value={form.count} onChange={(e) => setForm((p) => ({ ...p, count: e.target.value }))} className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="e.g. 120+ Products" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-primary text-white py-3 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors">
                  {mode === "add" ? "Add Category" : "Save Changes"}
                </button>
                <button type="button" onClick={() => setMode("list")} className="px-6 border border-border text-xs font-medium uppercase hover:border-foreground transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── MAIN CATEGORIES PAGE ─── */
export default function Categories() {
  const { cats, add, update, remove } = useCategories();
  const [showAdmin, setShowAdmin] = useState(false);

  const mainCats = cats.slice(0, 8);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background overflow-x-hidden">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">

        {/* ── 1. HERO ── */}
        <section ref={heroRef} className="relative">
          {/* Desktop: text + image split */}
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] min-h-[360px] lg:min-h-[420px]">
            {/* Left text panel */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FAF7F4] flex flex-col justify-center px-8 py-14 lg:px-14 lg:py-0"
            >
              <p className="text-primary text-xs tracking-widest uppercase font-medium mb-4">All Collections</p>
              <h1 className="font-serif text-5xl lg:text-6xl leading-tight mb-5">
                Explore<br />Categories
              </h1>
              <p className="text-muted-foreground text-sm font-light leading-relaxed mb-8 max-w-xs">
                Discover thoughtfully curated furnishings that define comfort, elegance, and you.
              </p>
              <div className="flex items-center gap-3">
                <Link href="/shop">
                  <button className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 text-xs font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors">
                    Shop All <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </Link>
                <button
                  onClick={() => setShowAdmin(true)}
                  className="inline-flex items-center gap-2 border border-border px-4 py-3.5 text-xs font-medium hover:border-primary hover:text-primary transition-colors"
                  title="Admin: Manage Categories"
                >
                  <Settings className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden min-h-[300px] lg:min-h-0"
            >
              <img src={hero1} alt="Luxury furnishings" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5" />
            </motion.div>
          </div>
        </section>

        {/* ── 2. STATS BAR ── */}
        <section className="border-y border-border/30 bg-card">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-3 lg:grid-cols-3 divide-x divide-border/30">
              {[
                { icon: Grid3X3, label: "Categories", value: `${cats.length}` },
                { icon: Package, label: "Total Products", value: "800+" },
                { icon: Star, label: "Avg. Rating", value: "4.7 / 5" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center justify-center gap-3 px-6 py-5">
                  <Icon className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="font-serif text-lg leading-tight">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. CATEGORY GRID ── */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {mainCats.map((cat, i) => (
                <CategoryCard key={cat.id} cat={cat} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. WIDE COLLECTION BANNER ── */}
        <section className="px-4 lg:px-8 pb-16">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/collections">
                <div className="group relative rounded-2xl overflow-hidden min-h-[280px] lg:min-h-[340px] cursor-pointer">
                  <img src={colCurated} alt="Living Room Collection" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20" />
                  <div className="relative h-full flex items-center min-h-[280px] lg:min-h-[340px]">
                    <div className="px-10 lg:px-16 py-10">
                      <p className="text-white/70 text-xs tracking-widest uppercase mb-3">Curated Collection</p>
                      <h2 className="font-serif text-white text-4xl lg:text-5xl mb-2">Living Room Collection</h2>
                      <p className="text-white/70 text-sm font-light mb-6">300+ thoughtfully curated pieces for the modern home</p>
                      <div className="inline-flex items-center gap-2 bg-white text-foreground px-7 py-3.5 text-xs font-medium tracking-wider uppercase group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        Explore Collection <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── 5. FEATURED CATEGORIES SHOWCASE ── */}
        <section className="bg-[#FAF7F4] py-14 lg:py-20">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="text-center mb-10">
              <p className="text-primary text-xs tracking-widest uppercase font-medium mb-3">Why YUNORA</p>
              <h2 className="font-serif text-3xl lg:text-4xl">Every Category, Thoughtfully Curated</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                { title: "Premium Curtains", desc: "From luxurious velvet drapes to breezy linen sheers — window treatments that transform every room.", image: catCurtains, slug: "curtains" },
                { title: "Luxury Bedsheets", desc: "Egyptian cotton, satin weaves, and jacquard patterns for the most indulgent sleep of your life.", image: catBedsheets, slug: "bedsheets" },
                { title: "Designer Cushions", desc: "Statement cushions in velvet, silk, and jute — the finishing touch your space deserves.", image: catCushions, slug: "cushions" },
              ].map((item, i) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                >
                  <Link href={`/category/${item.slug}`}>
                    <div className="group bg-card border border-border/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer">
                      <div className="relative overflow-hidden h-52">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-108" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-xl mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4">{item.desc}</p>
                        <div className="flex items-center gap-1.5 text-xs text-primary font-medium group-hover:gap-2.5 transition-all">
                          Shop Now <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Admin Modal ── */}
      <AnimatePresence>
        {showAdmin && (
          <AdminPanel
            cats={cats}
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
