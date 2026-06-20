import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { useProducts } from "@/lib/useApi";
import { adaptProduct } from "@/lib/productAdapter";
import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Search() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setQuery(input.trim()), 400);
    return () => clearTimeout(t);
  }, [input]);

  const { data, isLoading } = useProducts(query ? { search: query, limit: 20 } : { limit: 8 });

  const results = data?.items?.map(adaptProduct) || [];

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow pt-12 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h1 className="font-serif text-4xl mb-8">Search Products</h1>
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full border-b-2 border-foreground py-4 pl-12 pr-4 text-xl focus:outline-none bg-transparent" 
                placeholder="Search for curtains, bedsheets, cushions…" 
                autoFocus
              />
              {isLoading ? (
                <Loader2 className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-6 text-primary animate-spin" />
              ) : (
                <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              )}
            </div>
            {isLoading && (
              <p className="text-xs text-muted-foreground mt-3">Backend may take 8–10 seconds on first load…</p>
            )}
          </div>

          {query && (
            <div className="mb-8 border-b border-border/50 pb-4">
              <p className="font-serif text-xl">{data?.total ?? 0} result{(data?.total ?? 0) !== 1 ? "s" : ""} for "{query}"</p>
            </div>
          )}

          {results.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {results.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className="group flex flex-col gap-3">
                    <div className="relative aspect-square overflow-hidden bg-muted/30">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                      {product.badge && (
                        <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-medium tracking-wider px-2 py-0.5">
                          {product.badge}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-serif text-base hover:text-primary transition-colors line-clamp-2">{product.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-medium text-sm">₹{product.price.toLocaleString("en-IN")}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                        )}
                      </div>
                      <span className={`text-xs mt-1 ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : !isLoading && query ? (
            <div className="text-center py-20 bg-muted/20 border border-border rounded-lg max-w-2xl mx-auto">
              <p className="text-muted-foreground text-lg mb-4">No results found for "{query}"</p>
              <p className="text-sm font-light">Try checking your spelling or using more general terms.</p>
              <Link href="/shop" className="mt-4 inline-block text-primary hover:underline underline-offset-2 text-sm">Browse all products</Link>
            </div>
          ) : !isLoading && !query && results.length > 0 ? (
            <div>
              <p className="text-muted-foreground text-sm mb-8 text-center">Browse our products or start typing to search</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                {results.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <div className="group flex flex-col gap-3">
                      <div className="relative aspect-square overflow-hidden bg-muted/30">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { (e.target as HTMLImageElement).src = ""; }}
                        />
                      </div>
                      <div>
                        <p className="font-serif text-base hover:text-primary transition-colors line-clamp-2">{product.name}</p>
                        <span className="font-medium text-sm">₹{product.price.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
