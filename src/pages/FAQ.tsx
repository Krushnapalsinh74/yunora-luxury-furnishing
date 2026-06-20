import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("shipping");
  const [openItem, setOpenItem] = useState<number | null>(0);

  const tabs = [
    { id: "shipping", label: "Shipping & Delivery" },
    { id: "returns", label: "Returns & Refunds" },
    { id: "products", label: "Product Information" },
    { id: "orders", label: "Orders & Payment" },
    { id: "warranty", label: "Warranty" },
  ];

  const faqs = {
    shipping: [
      { q: "How long will it take for my order to arrive?", a: "Standard shipping takes 5-7 business days for major metro cities in India, and 7-10 business days for other locations. Made-to-order or custom sized items may require an additional 14-21 days for manufacturing." },
      { q: "Do you offer international shipping?", a: "Currently, we ship exclusively within India. We are working on expanding our logistics network to serve international customers in the near future." },
      { q: "How can I track my order?", a: "Once your order is dispatched, you will receive an email and SMS with a tracking number and a link to track your shipment. You can also use our Track Order page with your Order ID." },
      { q: "What are the shipping charges?", a: "We offer free standard shipping on all orders above ₹2,000. For orders below this amount, a flat shipping fee of ₹150 applies." },
      { q: "Can I change my delivery address after placing an order?", a: "Address changes can only be accommodated if the order has not yet been processed for shipping. Please contact our customer support immediately at support@yunora.com for assistance." }
    ],
    returns: [
      { q: "What is your return policy?", a: "We offer a 7-day hassle-free return policy for unused, unwashed products in their original packaging with tags intact. Custom-made items and cut fabrics are non-returnable unless defective." }
    ],
    products: [
      { q: "How do I care for my YUNORA velvet products?", a: "Professional dry cleaning is recommended for all our premium velvet items. Avoid direct sunlight to prevent fading, and brush gently with a soft bristle brush to maintain the pile direction." }
    ],
    orders: [
      { q: "What payment methods do you accept?", a: "We accept all major Credit/Debit Cards, UPI, Net Banking through our secure Razorpay gateway, as well as Cash on Delivery for eligible pincodes." }
    ],
    warranty: [
      { q: "What does the 1-year warranty cover?", a: "Our warranty covers manufacturing defects in materials and workmanship. It does not cover normal wear and tear, misuse, improper care, or accidental damage." }
    ]
  };

  const currentFaqs = faqs[activeTab as keyof typeof faqs] || faqs.shipping;

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="Frequently Asked Questions" 
          subtitle="Find answers to common questions about our products and services."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            {/* Tabs Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-24 bg-card border border-border/30 rounded-lg p-2 shadow-sm">
                <nav className="flex flex-col">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setOpenItem(null); }}
                      className={`text-left px-6 py-4 text-sm transition-colors rounded-md ${
                        activeTab === tab.id 
                          ? "bg-primary text-primary-foreground font-medium" 
                          : "text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
            
            {/* FAQ Accordion */}
            <div className="flex-1 max-w-3xl">
              <div className="space-y-4">
                {currentFaqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="border border-border/50 bg-card rounded-lg overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setOpenItem(openItem === index ? null : index)}
                      className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                    >
                      <span className={`font-serif text-xl pr-8 ${openItem === index ? 'text-primary' : 'text-foreground'}`}>
                        {faq.q}
                      </span>
                      <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${openItem === index ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
                    </button>
                    
                    <div 
                      className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                        openItem === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-muted-foreground font-light leading-relaxed pt-2 border-t border-border/30">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 bg-muted/20 border border-border/50 p-8 rounded-lg text-center">
                <h3 className="font-serif text-2xl mb-2">Still have questions?</h3>
                <p className="text-muted-foreground mb-6 font-light">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                <button className="border border-foreground text-foreground px-8 py-3 text-sm font-medium uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors">
                  Contact Us
                </button>
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
