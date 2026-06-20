import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import AccountSidebar from "@/components/ui/AccountSidebar";
import PageHero from "@/components/ui/PageHero";
import { Link } from "wouter";
import { products } from "@/data/products";

export default function Orders() {
  const item = products[0];

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="My Orders" 
          breadcrumb={[{ label: "Home", href: "/" }, { label: "My Account", href: "/profile" }, { label: "Orders" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <AccountSidebar />
            </aside>
            
            <div className="flex-1 space-y-8">
              
              <div className="flex overflow-x-auto pb-2 border-b border-border mb-6 no-scrollbar">
                <button className="px-6 py-2 border-b-2 border-primary text-primary font-medium whitespace-nowrap">All Orders</button>
                <button className="px-6 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground whitespace-nowrap">Processing</button>
                <button className="px-6 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground whitespace-nowrap">Shipped</button>
                <button className="px-6 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground whitespace-nowrap">Delivered</button>
                <button className="px-6 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground whitespace-nowrap">Cancelled</button>
              </div>

              {/* Order Card */}
              <div className="bg-card border border-border/30 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-muted/10 p-6 border-b border-border/50 flex flex-wrap gap-6 justify-between items-center">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order Placed</p>
                      <p className="text-sm font-medium">Oct 24, 2023</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total</p>
                      <p className="text-sm font-medium">₹2,499</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order #</p>
                      <p className="text-sm font-medium">YUN12345678</p>
                    </div>
                  </div>
                  <div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide">Shipped</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-6 mb-6 pb-6 border-b border-border/30 last:mb-0 last:pb-0 last:border-0">
                    <div className="w-20 h-24 bg-muted/30 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <Link href={`/product/${item.id}`} className="font-serif text-lg hover:text-primary transition-colors">{item.name}</Link>
                      <p className="text-sm text-muted-foreground mt-1 mb-2">Category: {item.category} | Size: Medium | Qty: 1</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">₹{item.price.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/5 p-4 border-t border-border/50 flex justify-end">
                  <Link href="/profile/orders/1" className="border border-border hover:border-foreground text-foreground px-6 py-2 text-xs font-medium tracking-widest uppercase transition-colors">
                    View Details
                  </Link>
                </div>
              </div>

              {/* Order Card 2 */}
              <div className="bg-card border border-border/30 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-muted/10 p-6 border-b border-border/50 flex flex-wrap gap-6 justify-between items-center">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order Placed</p>
                      <p className="text-sm font-medium">Sep 12, 2023</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total</p>
                      <p className="text-sm font-medium">₹4,999</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order #</p>
                      <p className="text-sm font-medium">YUN87654321</p>
                    </div>
                  </div>
                  <div>
                    <span className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide">Delivered</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-6">
                    <div className="w-20 h-24 bg-muted/30 flex-shrink-0">
                      <img src={products[1].image} alt={products[1].name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <Link href={`/product/${products[1].id}`} className="font-serif text-lg hover:text-primary transition-colors">{products[1].name}</Link>
                      <p className="text-sm text-muted-foreground mt-1 mb-2">Category: {products[1].category} | Size: King | Qty: 2</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">₹{products[1].price.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/5 p-4 border-t border-border/50 flex justify-end">
                  <Link href="/profile/orders/2" className="border border-border hover:border-foreground text-foreground px-6 py-2 text-xs font-medium tracking-widest uppercase transition-colors">
                    View Details
                  </Link>
                </div>
              </div>

            </div>
            
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
