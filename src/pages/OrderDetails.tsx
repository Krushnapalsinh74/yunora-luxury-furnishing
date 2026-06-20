import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";
import { Link } from "wouter";
import { CheckCircle2, Circle } from "lucide-react";
import { products } from "@/data/products";

export default function OrderDetails() {
  const item = products[0];

  const steps = [
    { label: "Ordered", date: "Oct 24, 2023 10:00 AM", completed: true },
    { label: "Processing", date: "Oct 25, 2023 09:30 AM", completed: true },
    { label: "Shipped", date: "Oct 26, 2023 02:15 PM", completed: true },
    { label: "Out for Delivery", date: "Pending", completed: false },
    { label: "Delivered", date: "Pending", completed: false },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="Order Details" 
          breadcrumb={[
            { label: "Home", href: "/" }, 
            { label: "My Account", href: "/profile" }, 
            { label: "Orders", href: "/profile/orders" },
            { label: "#YUN12345678" }
          ]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
          <div className="space-y-8">
            
            <div className="bg-card border border-border/30 p-8 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-8 pb-6 border-b border-border/50">
                <div>
                  <h2 className="font-serif text-2xl">Order #YUN12345678</h2>
                  <p className="text-sm text-muted-foreground mt-1">Placed on Oct 24, 2023</p>
                </div>
                <div className="text-right">
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase inline-block mb-2">Shipped</span>
                  <p className="text-sm font-medium">Est. Delivery: Oct 28, 2023</p>
                </div>
              </div>

              <h3 className="font-serif text-xl mb-6">Tracking Timeline</h3>
              <div className="relative pl-4 border-l border-border ml-4 space-y-10">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[25px] bg-card w-4 h-4 flex items-center justify-center`}>
                      {step.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-primary bg-card" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground bg-card" />
                      )}
                    </div>
                    <div className="pl-6">
                      <p className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border border-border/30 p-8 rounded-lg shadow-sm">
                <h3 className="font-serif text-xl mb-6 pb-4 border-b border-border/50">Shipping Address</h3>
                <p className="font-medium mb-1">John Doe</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  123 Luxury Lane, Apt 4B<br />
                  New Delhi, Delhi 110001<br />
                  India<br />
                  +91 98765 43210
                </p>
              </div>
              
              <div className="bg-card border border-border/30 p-8 rounded-lg shadow-sm">
                <h3 className="font-serif text-xl mb-6 pb-4 border-b border-border/50">Order Summary</h3>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹2,499</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Inclusive</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-medium">₹2,499</span>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                  <p className="text-sm font-medium">Razorpay (Paid)</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border/30 p-8 rounded-lg shadow-sm">
              <h3 className="font-serif text-xl mb-6 pb-4 border-b border-border/50">Items</h3>
              <div className="flex gap-6">
                <div className="w-20 h-24 bg-muted/30 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <Link href={`/product/${item.id}`} className="font-serif text-lg hover:text-primary transition-colors">{item.name}</Link>
                  <p className="text-sm text-muted-foreground mt-1 mb-2">Category: {item.category} | Size: Medium</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Qty: 1</span>
                    <span className="font-medium">₹{item.price.toLocaleString("en-IN")}</span>
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
