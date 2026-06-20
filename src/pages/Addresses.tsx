import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import AccountSidebar from "@/components/ui/AccountSidebar";
import PageHero from "@/components/ui/PageHero";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function Addresses() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="Saved Addresses" 
          breadcrumb={[{ label: "Home", href: "/" }, { label: "My Account", href: "/profile" }, { label: "Addresses" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <AccountSidebar />
            </aside>
            
            <div className="flex-1 space-y-8">
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-2xl">Your Addresses</h2>
                <button className="flex items-center gap-2 border border-foreground text-foreground hover:bg-foreground hover:text-background px-4 py-2 text-sm font-medium tracking-widest uppercase transition-colors">
                  <Plus className="h-4 w-4" />
                  Add New
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border-2 border-primary rounded-lg p-6 shadow-sm relative">
                  <span className="absolute top-4 right-4 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium tracking-wide">Default</span>
                  <div className="mb-4">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider bg-muted px-2 py-1 rounded">Home</span>
                  </div>
                  <p className="font-medium mb-1">John Doe</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    123 Luxury Lane, Apt 4B<br />
                    New Delhi, Delhi 110001<br />
                    India<br />
                    Phone: +91 98765 43210
                  </p>
                  <div className="flex gap-4 border-t border-border/50 pt-4">
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Edit2 className="h-4 w-4" /> Edit
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </div>

                <div className="bg-card border border-border/30 rounded-lg p-6 shadow-sm">
                  <div className="mb-4">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider bg-muted px-2 py-1 rounded">Office</span>
                  </div>
                  <p className="font-medium mb-1">John Doe</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Tech Park, Tower C, 4th Floor<br />
                    Gurugram, Haryana 122001<br />
                    India<br />
                    Phone: +91 98765 43211
                  </p>
                  <div className="flex gap-4 border-t border-border/50 pt-4">
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Edit2 className="h-4 w-4" /> Edit
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                    <button className="text-sm text-primary hover:underline underline-offset-4 ml-auto">
                      Set as Default
                    </button>
                  </div>
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
