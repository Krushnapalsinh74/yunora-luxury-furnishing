import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";
import { useState } from "react";
import { CheckCircle2, Circle, Loader2, AlertCircle, Package } from "lucide-react";
import { api, type ApiOrderTracking } from "@/lib/api";

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<ApiOrderTracking | null>(null);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const data = await api.trackOrder(orderNumber.trim());
      setOrder(data);
    } catch {
      setError("Order not found. Please check the order number and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="Track Your Order" 
          subtitle="Enter your order number to see its current status."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Track Order" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto">
            
            <div className="bg-card border border-border/30 p-8 rounded-lg shadow-sm mb-8">
              <form onSubmit={handleTrack} className="space-y-6">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Order Number</label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent"
                    placeholder="e.g. YUN-123456"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-60 mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Tracking…
                    </>
                  ) : "Track Now"}
                </button>
                {loading && (
                  <p className="text-xs text-center text-muted-foreground">Backend may take 8–10 seconds on first load…</p>
                )}
                {error && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}
              </form>
            </div>

            {order && (
              <div className="space-y-8">
                <div className="bg-card border border-border/30 p-8 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-8 border-b border-border/50 pb-6 flex-wrap gap-4">
                    <div>
                      <h2 className="font-serif text-2xl">Order #{order.orderNumber}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                      {order.customerName && (
                        <p className="text-sm text-muted-foreground mt-0.5">Customer: {order.customerName}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Status</p>
                      <span className={`inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full ${
                        order.status === "delivered" ? "bg-green-100 text-green-700" :
                        order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                        order.status === "processing" ? "bg-amber-100 text-amber-700" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {order.status}
                      </span>
                      {order.total && (
                        <p className="text-sm font-medium mt-2">Total: ₹{order.total.toLocaleString("en-IN")}</p>
                      )}
                      {order.trackingNumber && (
                        <p className="text-xs text-muted-foreground mt-1">Tracking: {order.trackingNumber}</p>
                      )}
                    </div>
                  </div>

                  <div className="relative pl-4 border-l border-border ml-4 space-y-10">
                    {order.timeline.map((step, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[25px] bg-card w-4 h-4 flex items-center justify-center">
                          {step.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-primary bg-card" />
                          ) : step.active ? (
                            <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            </div>
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground bg-card" />
                          )}
                        </div>
                        <div className="pl-6">
                          <p className={`font-medium ${step.completed || step.active ? "text-foreground" : "text-muted-foreground"}`}>
                            {step.label}
                          </p>
                          {step.active && (
                            <span className="text-xs text-primary font-medium">Current status</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => { setOrder(null); setOrderNumber(""); }}
                    className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                  >
                    Track Another Order
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
