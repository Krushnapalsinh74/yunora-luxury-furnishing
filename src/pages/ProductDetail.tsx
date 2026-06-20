import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { useParams, Link } from "wouter";
import { useProduct, useInventory, useReviews, useSubmitReview } from "@/lib/useApi";
import { useCart } from "@/context/CartContext";
import { Heart, Star, Truck, ShieldCheck, RefreshCcw, Minus, Plus, Loader2, Package, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { adaptProduct } from "@/lib/productAdapter";
import { useProducts } from "@/lib/useApi";

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "h-4 w-4" : "h-3 w-3";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`${cls} ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-border"}`} />
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const productId = Number(id);
  const { data: product, isLoading: productLoading } = useProduct(productId);
  const { data: inventory } = useInventory(productId);
  const { data: relatedData } = useProducts({ limit: 4 });
  const { data: reviewsData } = useReviews({ limit: 10 });
  const submitReview = useSubmitReview();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState({ name: "", comment: "", rating: 5 });
  const [reviewSent, setReviewSent] = useState(false);

  const adapted = product ? adaptProduct(product) : null;
  const colors = adapted?.colors || [];
  const inStock = inventory ? inventory.totalStock > 0 : (adapted?.inStock ?? true);
  const stockCount = inventory?.totalStock;

  const relatedProducts = relatedData?.items?.slice(0, 4).map(adaptProduct) || [];

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adapted) return;
    try {
      await submitReview.mutateAsync({
        customerName: reviewForm.name,
        productName: adapted.name,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      setReviewSent(true);
      setReviewForm({ name: "", comment: "", rating: 5 });
    } catch {}
  };

  if (productLoading) {
    return (
      <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
        <AnnouncementBar />
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Loading product…</p>
            <p className="text-xs text-muted-foreground/60">Backend may take 8–10 seconds on first load</p>
          </div>
        </main>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  if (!adapted) {
    return (
      <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
        <AnnouncementBar />
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Product not found.</p>
            <Link href="/shop" className="text-primary hover:underline">Browse all products</Link>
          </div>
        </main>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-foreground">{adapted.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
            <div className="space-y-4">
              <div className="bg-muted/30 aspect-square lg:aspect-[4/5] flex items-center justify-center relative overflow-hidden">
                {adapted.badge && (
                  <div className="absolute top-6 left-6 bg-card text-foreground text-xs font-medium tracking-widest px-3 py-1.5 z-10 shadow-sm uppercase">
                    {adapted.badge}
                  </div>
                )}
                <img
                  src={adapted.image}
                  alt={adapted.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </div>

            <div className="flex flex-col pt-4">
              {adapted.brand && (
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{adapted.brand}</p>
              )}
              {adapted.sku && (
                <p className="text-xs text-muted-foreground mb-2">SKU: {adapted.sku}</p>
              )}
              <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">{adapted.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <Stars rating={4.5} size="md" />
                {reviewsData && reviewsData.total > 0 && (
                  <span className="text-sm text-muted-foreground">({reviewsData.total} reviews)</span>
                )}
              </div>

              <div className="flex items-center gap-3 mb-3">
                {inStock ? (
                  <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                    <CheckCircle2 className="h-4 w-4" /> In Stock
                    {stockCount !== undefined && <span className="text-muted-foreground font-normal">({stockCount} units)</span>}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm text-red-500 font-medium">
                    <AlertCircle className="h-4 w-4" /> Out of Stock
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-border">
                <span className="text-2xl font-medium">₹{adapted.price.toLocaleString("en-IN")}</span>
                {adapted.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">₹{adapted.originalPrice.toLocaleString("en-IN")}</span>
                )}
                {adapted.originalPrice && (
                  <span className="text-sm text-green-600 font-medium">
                    {Math.round((1 - adapted.price / adapted.originalPrice) * 100)}% off
                  </span>
                )}
                <span className="text-xs text-muted-foreground ml-2">Inclusive of all taxes</span>
              </div>

              {adapted.description && (
                <p className="text-muted-foreground font-light leading-relaxed mb-6">{adapted.description}</p>
              )}

              {colors.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium mb-3">Color</p>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c === selectedColor ? null : c)}
                        className={`px-4 py-2 text-sm border transition-colors ${selectedColor === c ? "border-foreground bg-foreground text-background" : "border-border/50 text-foreground hover:border-foreground"}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {adapted.materials.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium mb-2 text-muted-foreground">Material: {adapted.materials.join(", ")}</p>
                </div>
              )}

              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center border border-border h-14">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 text-muted-foreground hover:text-foreground transition-colors">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 text-muted-foreground hover:text-foreground transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={addToCart}
                  disabled={!inStock}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-sm font-medium tracking-widest uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {inStock ? "Add to Cart" : "Out of Stock"}
                </button>
                <button
                  onClick={() => toggleWishlist(adapted.id)}
                  className="flex items-center justify-center border border-border hover:border-foreground text-foreground h-14 w-14 transition-colors shrink-0"
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(adapted.id) ? "fill-primary text-primary" : ""}`} />
                </button>
              </div>

              <div className="space-y-4 pt-8 border-t border-border">
                <div className="flex items-center gap-4 text-sm">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <span>Free shipping on this item</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                  <span>1 Year Warranty against manufacturing defects</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <RefreshCcw className="h-5 w-5 text-muted-foreground" />
                  <span>Easy 7-day return policy</span>
                </div>
                {inventory && inventory.warehouses.length > 0 && (
                  <div className="flex items-center gap-4 text-sm">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <span>Available in {inventory.warehouses.length} warehouse{inventory.warehouses.length > 1 ? "s" : ""}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="pt-16 border-t border-border/50 mb-16">
            <h2 className="font-serif text-3xl mb-8">Customer Reviews</h2>
            {reviewsData && reviewsData.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {reviewsData.items.slice(0, 6).map((r) => (
                  <div key={r.id} className="bg-card border border-border/30 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Stars rating={r.rating} />
                      <span className="font-medium text-sm">{r.customerName}</span>
                    </div>
                    {r.productName && (
                      <p className="text-xs text-muted-foreground mb-2">Product: {r.productName}</p>
                    )}
                    <p className="text-sm text-muted-foreground font-light">{r.comment}</p>
                    <p className="text-xs text-muted-foreground mt-3">
                      {new Date(r.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mb-8">No reviews yet. Be the first to review this product!</p>
            )}

            {/* Submit Review */}
            {reviewSent ? (
              <div className="flex items-center gap-3 text-green-600 mb-8">
                <CheckCircle2 className="h-5 w-5" />
                <span>Thank you for your review!</span>
              </div>
            ) : (
              <div className="bg-card border border-border/30 rounded-lg p-6 max-w-xl">
                <h3 className="font-serif text-xl mb-4">Write a Review</h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Your Name</label>
                    <input
                      required
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm((p) => ({ ...p, name: e.target.value }))}
                      className="w-full border-b border-border py-2 text-sm bg-transparent focus:outline-none focus:border-primary"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} type="button" onClick={() => setReviewForm((p) => ({ ...p, rating: s }))}>
                          <Star className={`h-6 w-6 transition-colors ${s <= reviewForm.rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Your Review</label>
                    <textarea
                      required
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm((p) => ({ ...p, comment: e.target.value }))}
                      rows={3}
                      className="w-full border border-border rounded-lg p-3 text-sm bg-transparent focus:outline-none focus:border-primary resize-none"
                      placeholder="Share your experience…"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitReview.isPending}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-xs font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-60"
                  >
                    {submitReview.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                    Submit Review
                  </button>
                  {submitReview.isError && (
                    <p className="text-sm text-red-500">{(submitReview.error as Error)?.message || "Failed to submit review."}</p>
                  )}
                </form>
              </div>
            )}
          </div>

          {relatedProducts.length > 0 && (
            <div className="pt-8 border-t border-border/50">
              <h2 className="font-serif text-3xl mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                {relatedProducts.map((p, idx) => (
                  <Link key={p.id} href={`/product/${p.id}`}>
                    <div className="group">
                      <div className="aspect-square bg-muted/30 overflow-hidden mb-3">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      </div>
                      <p className="font-serif text-base group-hover:text-primary transition-colors">{p.name}</p>
                      <p className="text-sm mt-1">₹{p.price.toLocaleString("en-IN")}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
