import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import catCurtains from "@/assets/cat-curtains.png";
import catSofaFabrics from "@/assets/cat-sofa-fabrics.png";
import { useApplyDealer } from "@/lib/useApi";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function BecomeDealer() {
  const applyDealer = useApplyDealer();
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await applyDealer.mutateAsync({
        businessName: form.businessName,
        contactName: form.contactName,
        email: form.email,
        phone: form.phone,
        city: form.city,
      });
      setSuccess(true);
    } catch {}
  };

  const field = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value })),
  });

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-foreground">
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
            <img src={catCurtains} alt="Become a Dealer" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl lg:text-7xl mb-6">Grow With YUNORA</h1>
            <p className="text-lg text-white/80 font-light max-w-2xl mx-auto mb-8">
              Join our network of premium retail partners and bring India's finest luxury home furnishings to your discerning customers.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            <div className="space-y-12 pr-0 lg:pr-12">
              <div>
                <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">Why Partner With Us</span>
                <h2 className="font-serif text-4xl mb-6">The YUNORA Advantage</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  As a YUNORA dealer, you're not just selling products; you're offering an experience. We provide our partners with comprehensive support to ensure mutual growth and success in the luxury retail space.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "High Margins", desc: "Competitive wholesale pricing ensuring excellent profitability for your retail business." },
                  { title: "Marketing Support", desc: "Access to high-quality visual assets, catalogs, and co-branded marketing materials." },
                  { title: "Exclusive Products", desc: "Early access to new collections and dealer-exclusive product lines." },
                  { title: "Training", desc: "Comprehensive product knowledge and sales training for your showroom staff." },
                ].map((item) => (
                  <div key={item.title} className="bg-card p-6 border border-border/30 rounded-lg shadow-sm">
                    <h3 className="font-serif text-xl mb-3 text-primary">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-light">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="relative aspect-[4/3] w-full hidden lg:block">
                <img src={catSofaFabrics} alt="Dealer Experience" className="w-full h-full object-cover rounded-lg shadow-sm" />
              </div>
            </div>

            <div className="bg-card border border-border/30 rounded-lg p-8 lg:p-12 shadow-sm sticky top-24">
              <h2 className="font-serif text-3xl mb-2">Dealer Application</h2>
              <p className="text-muted-foreground mb-8">Please fill out the form below to initiate the partnership process.</p>

              {success ? (
                <div className="flex flex-col items-center text-center py-10 gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl">Application Submitted!</h3>
                  <p className="text-muted-foreground text-sm">Our partnership team will review your application and contact you within 2–3 business days.</p>
                  <button onClick={() => { setSuccess(false); setForm({ businessName: "", contactName: "", email: "", phone: "", city: "" }); }} className="mt-2 text-sm text-primary hover:underline underline-offset-2">
                    Submit another application
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Business Name*</label>
                      <input type="text" {...field("businessName")} required className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Company Name" />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Contact Name*</label>
                      <input type="text" {...field("contactName")} required className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Full Name" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Email Address*</label>
                      <input type="email" {...field("email")} required className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Email" />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Phone Number*</label>
                      <input type="tel" {...field("phone")} required className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Phone" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">City*</label>
                    <input type="text" {...field("city")} required className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="City" />
                  </div>

                  <button
                    type="submit"
                    disabled={applyDealer.isPending}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-60 mt-4"
                  >
                    {applyDealer.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                    Apply Now
                  </button>

                  {applyDealer.isError && (
                    <p className="text-sm text-red-500 text-center">{(applyDealer.error as Error)?.message || "Submission failed. Please try again."}</p>
                  )}

                  <p className="text-xs text-muted-foreground text-center mt-4">Our partnership team will review your application and contact you within 2–3 business days.</p>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
