import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link, useParams } from "wouter";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { products, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
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
import { Heart, ShoppingCart, Star, Eye, ArrowRight, ChevronDown, X, Package, TrendingUp, Check } from "lucide-react";

/* ─── Re-use the localStorage collections ─── */
const DEFAULT_COLLECTIONS = [
  { id: 1, name: "Royal Heritage", slug: "royal-heritage", description: "Timeless elegance inspired by classic luxury.", story: "Rooted in the grand traditions of Indian royal households, Royal Heritage brings the splendour of palaces into your home. Each piece is a tribute to the artisans of Panipat whose hands weave centuries of craft into every thread.", image: catCurtains, productIds: [1, 6, 14, 18], isFeatured: true, isTrending: false, isNew: false, views: 4820, tag: "Classic" },
  { id: 2, name: "Modern Luxe", slug: "modern-luxe", description: "Sleek designs for contemporary spaces.", story: "Where clean lines meet opulent materials. Modern Luxe is for those who believe luxury should be effortless — present in every detail, never overwhelming, always elegant.", image: colCurated, productIds: [2, 7, 13, 17], isFeatured: true, isTrending: true, isNew: false, views: 6310, tag: "Trending" },
  { id: 3, name: "Minimal Living", slug: "minimal-living", description: "Clean, calm & beautifully minimal.", story: "Less is more. Minimal Living celebrates the beauty of restraint — thoughtful pieces that breathe and belong. Designed for those who see simplicity as the ultimate sophistication.", image: colBedding, productIds: [5, 10, 15, 19], isFeatured: true, isTrending: false, isNew: false, views: 3290, tag: "Minimal" },
  { id: 4, name: "Classic Comfort", slug: "classic-comfort", description: "Enduring comfort with a classic touch.", story: "Built for families, designed for generations. Classic Comfort is YUNORA's most beloved everyday collection — quality you can feel, beauty that never fades.", image: catComforters, productIds: [4, 12, 15, 17], isFeatured: true, isTrending: false, isNew: false, views: 5140, tag: "Comfort" },
  { id: 5, name: "Festive Collection", slug: "festive-collection", description: "Celebrate every moment in style.", story: "Designed for India's most joyous occasions — from Diwali to weddings, every piece is made to be remembered. Rich colours, lavish textures, and festive motifs that make every celebration unforgettable.", image: catHomeDecor, productIds: [3, 8, 11, 16, 20], isFeatured: true, isTrending: true, isNew: true, views: 8920, tag: "Festive" },
  { id: 6, name: "Premium Bedding Collection", slug: "premium-bedding", description: "Luxurious bedding for restful nights.", story: "Every thread is chosen for its quality, every weave for its beauty. Our Premium Bedding collection redefines rest — because great sleep starts with the finest linens.", image: catBedsheets, productIds: [2, 6, 10, 18], isFeatured: true, isTrending: false, isNew: false, views: 7210, tag: "Bedding" },
  { id: 7, name: "Luxury Curtain Collection", slug: "luxury-curtains", description: "Drape your space in elegance.", story: "From dramatic floor-length velvet drapes to breezy linen sheers, every window deserves to make a statement. Our curtain collection transforms ordinary rooms into extraordinary spaces.", image: colCurtains, productIds: [1, 5, 9, 14], isFeatured: true, isTrending: false, isNew: true, views: 4650, tag: "Curtains" },
  { id: 8, name: "Designer Cushion Collection", slug: "designer-cushions", description: "The perfect accent for every space.", story: "Small in size, big in impact. Our designer cushions are handcrafted by artisans and styled by experts — the final touch your sofa or bed has been waiting for.", image: catCushions, productIds: [3, 7, 11], isFeatured: true, isTrending: false, isNew: false, views: 3870, tag: "Cushions" },
  { id: 9, name: "Monsoon Refresh", slug: "monsoon-refresh", description: "Fresh hues for the season.", story: "Inspired by the relief of the first rains, Monsoon Refresh brings cool, revitalising colours to your home. Light fabrics, fresh palettes, and breezy designs for the season.", image: colBedding, productIds: [2, 5, 15], isFeatured: false, isTrending: true, isNew: true, views: 2140, tag: "Seasonal" },
  { id: 10, name: "Earthy Neutrals", slug: "earthy-neutrals", description: "Grounded. Warm. Timeless.", story: "Terracotta, sand, and sage — colours borrowed from the earth to ground your living spaces. Earthy Neutrals is YUNORA's love letter to natural beauty.", image: catSofaFabrics, productIds: [8, 13, 19], isFeatured: false, isTrending: true, isNew: false, views: 3560, tag: "Neutral" },
  { id: 11, name: "Velvet Luxe", slug: "velvet-luxe", description: "Rich textures. Regal appeal.", story: "There is nothing quite like velvet — its depth, its sheen, its warmth. Velvet Luxe is unapologetically opulent and designed for those who refuse to compromise.", image: catCurtains, productIds: [1, 7, 14], isFeatured: false, isTrending: true, isNew: false, views: 5280, tag: "Velvet" },
  { id: 12, name: "Boho Indie", slug: "boho-indie", description: "Free-spirited & artistic.", story: "Celebrating India's craft traditions with a bohemian twist — jute, ikat, block prints and hand-knotted textures that tell a story of heritage and freedom.", image: catCushions, productIds: [3, 11, 16], isFeatured: false, isTrending: true, isNew: false, views: 2930, tag: "Boho" },
  { id: 13, name: "Midnight Elegance", slug: "midnight-elegance", description: "Bold. Dramatic. Sophisticated.", story: "For those who love drama. Deep charcoals, midnight blues and rich embroideries make every room a statement. Midnight Elegance is not for the faint of heart.", image: colCurtains, productIds: [9, 1, 14], isFeatured: false, isTrending: true, isNew: false, views: 4190, tag: "Bold" },
];

function getCollections() {
  try { const s = localStorage.getItem("yunora_collections"); return s ? JSON.parse(s) : DEFAULT_COLLECTIONS; } catch { return DEFAULT_COLLECTIONS; }
}

/* ─── Stars ─── */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => <Star key={s} className={`h-3 w-3 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-border"}`} />)}
    </div>
  );
}

/* ─── Product Card ─── */
function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.06 }} className="bg-card border border-border/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 group flex flex-col">
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
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{product.category.replace("-", " ")}</p>
        <Link href={`/product/${product.id}`}><h3 className="font-serif text-base leading-snug hover:text-primary transition-colors mb-2">{product.name}</h3></Link>
        <div className="flex items-center gap-1.5 mb-2"><Stars rating={product.rating} /><span className="text-xs text-muted-foreground">({product.reviews})</span></div>
        <div className="flex gap-1 mb-3">
          {product.colors.slice(0, 3).map((c) => <span key={c} className="w-4 h-4 rounded-full border border-border/30" style={{ backgroundColor: c === "Ivory" ? "#F8F4EF" : c === "White" ? "#fff" : c === "Charcoal" ? "#2C2C2C" : "#C97B5E" }} title={c} />)}
        </div>
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-serif text-lg">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
            {discount && <span className="text-xs text-green-600 font-medium">{discount}%</span>}
          </div>
          <button onClick={() => addToCart()} disabled={!product.inStock} className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary border border-primary/30 py-2.5 text-xs font-medium tracking-wider uppercase hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed">
            <ShoppingCart className="h-3.5 w-3.5" />{product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MAIN COLLECTION DETAIL PAGE ─── */
export default function Collection() {
  const { slug } = useParams();
  const allCollections = getCollections();
  const collection = allCollections.find((c: any) => c.slug === slug) || allCollections[0];
  const related = allCollections.filter((c: any) => c.slug !== slug && c.isFeatured).slice(0, 4);

  const collectionProducts = products.filter((p) => collection.productIds.includes(p.id));
  const allProducts = collectionProducts.length > 0 ? collectionProducts : products.slice(0, 6);

  const [sortBy, setSortBy] = useState("default");

  function sortProducts(prods: Product[], sort: string) {
    const r = [...prods];
    switch (sort) {
      case "price-low": return r.sort((a, b) => a.price - b.price);
      case "price-high": return r.sort((a, b) => b.price - a.price);
      case "rating": return r.sort((a, b) => b.rating - a.rating);
      default: return r;
    }
  }

  const sorted = sortProducts(allProducts, sortBy);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background overflow-x-hidden">
      <AnnouncementBar />
      <Header />
      <main className="flex-grow">

        {/* ── Parallax Hero ── */}
        <section ref={heroRef} className="relative h-[60vh] min-h-[380px] overflow-hidden">
          <motion.div style={{ y: heroY }} className="absolute inset-0 will-change-transform">
            <img src={collection.image} alt={collection.name} className="absolute inset-0 w-full h-full object-cover scale-110" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
          <div className="relative h-full flex items-end">
            <div className="container mx-auto px-4 lg:px-12 pb-12">
              <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
                <nav className="flex items-center gap-2 text-white/60 text-xs mb-4">
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                  <span>/</span>
                  <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
                  <span>/</span>
                  <span className="text-white">{collection.name}</span>
                </nav>
                {collection.tag && (
                  <span className={`text-[10px] font-bold tracking-widest px-3 py-1.5 uppercase mb-4 inline-block ${collection.isNew ? "bg-primary text-white" : collection.isTrending ? "bg-amber-500 text-white" : "bg-white/20 text-white"}`}>{collection.isNew ? "New Collection" : collection.tag}</span>
                )}
                <h1 className="font-serif text-5xl lg:text-7xl text-white leading-tight mb-4">{collection.name}</h1>
                <p className="text-white/75 text-base font-light max-w-xl leading-relaxed">{collection.description}</p>
                <div className="flex items-center gap-6 mt-5 text-white/60 text-xs">
                  <span className="flex items-center gap-1.5"><Package className="h-3.5 w-3.5" /> {allProducts.length} pieces</span>
                  <span className="flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> {collection.views.toLocaleString()} views</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Collection Story ── */}
        <section className="py-14 lg:py-20 bg-[#FAF7F4]">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary text-xs tracking-widest uppercase font-medium mb-4">The Story</p>
              <h2 className="font-serif text-3xl lg:text-4xl mb-6 leading-snug">{collection.name}</h2>
              <p className="text-muted-foreground text-base font-light leading-relaxed">{collection.story}</p>
              <div className="flex justify-center gap-2 mt-6">
                {collection.isFeatured && <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">Featured Collection</span>}
                {collection.isTrending && <span className="text-xs bg-amber-100 text-amber-600 px-3 py-1.5 rounded-full">Trending</span>}
                {collection.isNew && <span className="text-xs bg-green-100 text-green-600 px-3 py-1.5 rounded-full">New Arrival</span>}
              </div>
            </div>
          </div>
        </section>

        {/* ── Products ── */}
        <section className="py-14 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-primary text-xs tracking-widest uppercase font-medium mb-1">The Edit</p>
                <h2 className="font-serif text-3xl">Collection Products</h2>
                <p className="text-muted-foreground text-sm mt-1">{allProducts.length} handpicked pieces</p>
              </div>
              <div className="relative">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none border border-border/40 bg-card rounded-xl pl-3 pr-8 py-2.5 text-xs focus:outline-none focus:border-primary cursor-pointer">
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {sorted.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
            <div className="mt-10 text-center">
              <Link href="/shop">
                <button className="inline-flex items-center gap-2 border border-border px-10 py-3.5 text-xs font-medium tracking-wider uppercase hover:border-primary hover:text-primary transition-colors">
                  Shop All Products <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Split Image Banner ── */}
        <section className="pb-16 lg:pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden min-h-[260px] lg:min-h-[340px]">
              <img src={hero1} alt="Collection lifestyle" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
              <div className="relative h-full flex items-center min-h-[260px] lg:min-h-[340px] px-10 lg:px-16 py-10">
                <div>
                  <p className="text-white/70 text-xs tracking-widest uppercase mb-3">Complete Your Space</p>
                  <h2 className="font-serif text-white text-3xl lg:text-4xl mb-4 max-w-sm leading-snug">Every Piece Tells a Story</h2>
                  <p className="text-white/70 text-sm font-light mb-6 max-w-sm">Discover how YUNORA's collections come together to create spaces that feel like home.</p>
                  <Link href="/shop">
                    <button className="inline-flex items-center gap-2 bg-white text-foreground px-7 py-3.5 text-xs font-medium tracking-wider uppercase hover:bg-primary hover:text-white transition-all duration-300">
                      Shop All Collections <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related Collections ── */}
        {related.length > 0 && (
          <section className="pb-16 lg:pb-20 border-t border-border/30 pt-12">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-primary text-xs tracking-widest uppercase font-medium mb-1">Explore More</p>
                  <h2 className="font-serif text-3xl">Related Collections</h2>
                </div>
                <Link href="/collections"><button className="text-xs text-primary hover:underline underline-offset-2 flex items-center gap-1">View All <ArrowRight className="h-3.5 w-3.5" /></button></Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {related.map((c: any, i: number) => (
                  <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <Link href={`/collection/${c.slug}`}>
                      <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer">
                        <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-600" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                        <div className="absolute inset-0 flex flex-col justify-end p-4">
                          <h3 className="font-serif text-white text-lg leading-tight mb-1">{c.name}</h3>
                          <p className="text-white/65 text-xs mb-2 line-clamp-1">{c.description}</p>
                          <span className="inline-flex items-center gap-1 text-white/80 text-xs group-hover:text-white transition-colors">Explore <ArrowRight className="h-3 w-3" /></span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
