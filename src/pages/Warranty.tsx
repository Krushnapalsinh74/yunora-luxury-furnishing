import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import AccountSidebar from "@/components/ui/AccountSidebar";
import PageHero from "@/components/ui/PageHero";
import { useState } from "react";
import { useSubmitWarranty } from "@/lib/useApi";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function Warranty() {
  const submitWarranty = useSubmitWarranty();
  const [form, setForm] = useState({
    customerName: "",
    productName: "",
    orderId: "",
    issue: "",
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitWarranty.mutateAsync({
        customerName: form.customerName,
        productName: form.productName,
        orderId: form.orderId || undefined,
        issue: form.issue,
      });
      setSuccess(true);
      setForm({ customerName: "", productName: "", orderId: "", issue: "" });
    } catch {}
  };

  const field = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value })),
  });

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="Warranty Claim" 
          subtitle="Register your premium YUNORA products for hassle-free warranty claims."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "My Account", href: "/profile" }, { label: "Warranty" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <AccountSidebar />
            </aside>
            
            <div className="flex-1">
              <div className="bg-card border border-border/30 rounded-lg p-8 shadow-sm max-w-2xl">
                <h2 className="font-serif text-2xl mb-6 border-b border-border/50 pb-4">Submit Warranty Claim</h2>
                
                {success ? (
                  <div className="flex flex-col items-center text-center py-10 gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-serif text-xl">Claim Submitted!</h3>
                    <p className="text-muted-foreground text-sm">Our warranty team will review your claim and contact you within 2–3 business days.</p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-2 text-sm text-primary hover:underline underline-offset-2"
                    >
                      Submit another claim
                    </button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Your Name*</label>
                      <input type="text" {...field("customerName")} required className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Full Name" />
                    </div>

                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Product Name or SKU*</label>
                      <input type="text" {...field("productName")} required className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="e.g. Royal Velvet Curtain" />
                    </div>

                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Order ID (Optional)</label>
                      <input type="text" {...field("orderId")} className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="e.g. YUN-123456" />
                    </div>

                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Describe the Issue*</label>
                      <textarea
                        {...field("issue")}
                        required
                        rows={4}
                        className="w-full border border-border/50 p-4 text-sm focus:outline-none focus:border-primary bg-transparent min-h-[120px] resize-none"
                        placeholder="Describe the manufacturing defect or issue in detail…"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitWarranty.isPending}
                      className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-60"
                    >
                      {submitWarranty.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                      Submit Claim
                    </button>

                    {submitWarranty.isError && (
                      <p className="text-sm text-red-500">{(submitWarranty.error as Error)?.message || "Submission failed. Please try again."}</p>
                    )}
                  </form>
                )}
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
