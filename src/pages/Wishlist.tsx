import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { useCart } from "@/context/CartContext";
import { Link } from "wouter";

export default function Wishlist() {
  const { isInWishlist, wishlistCount } = useCart();
  const wishlistedProducts = products.filter(p => isInWishlist(p.id));

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="My Wishlist" 
          subtitle="Pieces you've saved for later."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
          {wishlistedProducts.length > 0 ? (
            <div>
              <p className="text-muted-foreground mb-8">{wishlistCount} items saved to your wishlist.</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                {wishlistedProducts.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-card border border-border/30 rounded-lg max-w-2xl mx-auto shadow-sm">
              <h2 className="font-serif text-2xl mb-4">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8 font-light">Explore our collections and save your favorite pieces.</p>
              <Link href="/shop" className="inline-block bg-primary text-primary-foreground px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors">
                Explore Collection
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
