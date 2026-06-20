import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="Shipping Policy" 
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Shipping Policy" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
              <div className="sticky top-24">
                <p className="font-serif text-xl mb-4 border-b border-border/50 pb-2">Contents</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="hover:text-primary cursor-pointer transition-colors">Order Processing</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Shipping Rates & Estimates</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Shipment Confirmation</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Customs, Duties & Taxes</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Damages</li>
                </ul>
              </div>
            </aside>
            
            <div className="flex-1 max-w-3xl prose prose-lg prose-neutral prose-headings:font-serif prose-headings:font-normal prose-a:text-primary">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-8">Last Updated: October 1, 2023</p>
              
              <p className="lead font-light">
                Thank you for visiting and shopping at YUNORA. Following are the terms and conditions that constitute our Shipping Policy.
              </p>

              <h2>Order Processing Time</h2>
              <p className="font-light">
                All standard orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. Custom-made items or tailored fabrics require an additional processing time of 7-10 business days.
              </p>
              <p className="font-light">
                If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email or telephone.
              </p>

              <h2>Shipping Rates & Delivery Estimates</h2>
              <p className="font-light">
                Shipping charges for your order will be calculated and displayed at checkout.
              </p>
              <ul className="font-light">
                <li><strong>Standard Shipping (Metro Cities):</strong> 3-5 business days. Free for orders above ₹2,000.</li>
                <li><strong>Standard Shipping (Rest of India):</strong> 5-7 business days. Flat rate of ₹150 for orders below ₹2,000.</li>
                <li><strong>Express Delivery:</strong> 1-2 business days (Available in select pincodes). Flat rate of ₹350.</li>
              </ul>
              <p className="font-light text-sm italic">
                * Delivery delays can occasionally occur due to unforeseen logistical circumstances.
              </p>

              <h2>Shipment Confirmation & Order Tracking</h2>
              <p className="font-light">
                You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.
              </p>

              <h2>Damages During Transit</h2>
              <p className="font-light">
                YUNORA ensures all products are securely packaged to withstand transit. However, if you receive a damaged order, please contact our customer service immediately (within 48 hours of delivery) at support@yunora.com with photographic evidence of the damage and packaging. Please save all packaging materials and damaged goods before filing a claim.
              </p>

            </div>

          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
