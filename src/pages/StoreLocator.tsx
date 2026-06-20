import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";
import { Search, MapPin, Phone, Navigation2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDealers } from "@/lib/useApi";

export default function StoreLocator() {
  const [cityInput, setCityInput] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const { data: dealers, isLoading } = useDealers(searchCity || undefined);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchCity(cityInput.trim());
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="Store Locator" 
          subtitle="Find an authorized YUNORA dealer or flagship store near you."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Store Locator" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12 relative">
            <input 
              type="text" 
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="w-full bg-card border border-border/50 py-4 pl-12 pr-24 text-sm focus:outline-none focus:border-primary shadow-sm rounded-lg" 
              placeholder="Search by city…" 
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-2 text-xs font-medium uppercase tracking-widest rounded hover:bg-primary/90 transition-colors">
              Search
            </button>
          </form>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Loading dealers…</p>
              <p className="text-xs text-muted-foreground/60">Backend may take up to 10 seconds on first load</p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[400px]">
              <div className="w-full lg:w-1/3 flex flex-col border border-border/30 rounded-lg bg-card shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border/50 bg-muted/10 sticky top-0 z-10">
                  <p className="font-serif text-lg">
                    {dealers?.length ?? 0} {dealers?.length === 1 ? "Dealer" : "Dealers"} Found
                    {searchCity && <span className="text-muted-foreground text-sm font-sans ml-2">in {searchCity}</span>}
                  </p>
                </div>
                
                {dealers && dealers.length > 0 ? (
                  <div className="divide-y divide-border/50 overflow-y-auto max-h-[600px]">
                    {dealers.map((dealer) => (
                      <div key={dealer.id} className="p-6 hover:bg-muted/5 transition-colors cursor-pointer group">
                        <h3 className="font-serif text-xl mb-3 group-hover:text-primary transition-colors">{dealer.businessName}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground font-light mb-4">
                          <div className="flex gap-3 items-center">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span>{dealer.city}</span>
                          </div>
                          <div className="flex gap-3 items-center">
                            <Phone className="h-4 w-4 shrink-0" />
                            <a href={`tel:${dealer.phone}`} className="hover:text-primary transition-colors">{dealer.phone}</a>
                          </div>
                          {dealer.contactName && (
                            <p className="text-xs">Contact: {dealer.contactName}</p>
                          )}
                        </div>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(dealer.businessName + " " + dealer.city)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary border border-primary px-4 py-2 rounded hover:bg-primary hover:text-primary-foreground transition-colors w-full justify-center"
                        >
                          <Navigation2 className="h-3 w-3" /> Get Directions
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center p-8 text-center">
                    <div>
                      <MapPin className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm">
                        {searchCity ? `No dealers found in "${searchCity}"` : "No dealers found. Try searching by city."}
                      </p>
                      {searchCity && (
                        <button onClick={() => { setCityInput(""); setSearchCity(""); }} className="mt-3 text-xs text-primary hover:underline underline-offset-2">
                          Show all dealers
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 bg-[#EFE9E1] rounded-lg border border-border/30 relative overflow-hidden hidden lg:flex items-center justify-center min-h-[400px]">
                <div className="text-center px-8">
                  <MapPin className="h-16 w-16 text-primary/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm">
                    {dealers && dealers.length > 0
                      ? `${dealers.length} dealer${dealers.length > 1 ? "s" : ""} found. Click on a dealer to get directions.`
                      : "Search by city to find YUNORA dealers near you."}
                  </p>
                  {dealers && dealers.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      {dealers.map((d) => (
                        <a
                          key={d.id}
                          href={`https://maps.google.com/?q=${encodeURIComponent(d.businessName + " " + d.city)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors"
                        >
                          {d.businessName} — {d.city}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
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
