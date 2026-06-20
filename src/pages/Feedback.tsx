import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import AccountSidebar from "@/components/ui/AccountSidebar";
import PageHero from "@/components/ui/PageHero";
import { Star } from "lucide-react";
import { useState } from "react";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="We Value Your Feedback" 
          subtitle="Help us improve our luxury experience by sharing your thoughts."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "My Account", href: "/profile" }, { label: "Feedback" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <AccountSidebar />
            </aside>
            
            <div className="flex-1">
              
              <div className="bg-card border border-border/30 rounded-lg p-8 shadow-sm max-w-2xl mb-12">
                <h2 className="font-serif text-2xl mb-6 border-b border-border/50 pb-4">Submit Feedback</h2>
                
                <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-4">How would you rate your overall experience?</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star 
                            className={`h-8 w-8 ${
                              (hoverRating || rating) >= star 
                                ? "fill-[#D4AF37] text-[#D4AF37]" 
                                : "text-muted-foreground"
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Name</label>
                      <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Email</label>
                      <input type="email" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Your Email" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Your Message</label>
                    <textarea 
                      className="w-full border border-border/50 rounded-none p-4 text-sm focus:outline-none focus:border-primary bg-transparent min-h-[150px] resize-none" 
                      placeholder="Tell us what you loved or what we can improve..."
                    ></textarea>
                  </div>

                  <button className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors mt-4">
                    Submit Feedback
                  </button>
                </form>
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
