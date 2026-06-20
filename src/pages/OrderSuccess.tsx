import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import { products } from "@/data/products";

export default function OrderSuccess() {
  const item = products[0];

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          
          <div className="flex justify-center mb-8">
            <CheckCircle className="h-20 w-20 text-primary" />
          </div>
          
          <h1 className="font-serif text-5xl mb-4">Thank You!</h1>
          <p className="text-lg text-muted-foreground mb-2">Your order has been placed successfully.</p>
          <p className="text-sm font-medium mb-12">Order #YUN12345678</p>

          <div className="bg-card border border-border/30 rounded-lg p-6 md:p-8 text-left mb-12 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 justify-between border-b border-border/50 pb-6 mb-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Estimated Delivery</p>
                <p className="font-medium">5-7 Business Days</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Shipping To</p>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">123 Luxury Lane, New Delhi</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Paid</p>
                <p className="font-medium">₹{item.price.toLocaleString("en-IN")}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-16 h-20 bg-muted/30">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-serif text-lg">{item.name}</p>
                <p className="text-sm text-muted-foreground">Qty: 1</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/track-order" className="bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors">
              Track Order
            </Link>
            <Link href="/shop" className="border border-foreground text-foreground px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors">
              Continue Shopping
            </Link>
          </div>

        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
