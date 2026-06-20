import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="Return & Refund Policy" 
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Returns" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
              <div className="sticky top-24">
                <p className="font-serif text-xl mb-4 border-b border-border/50 pb-2">Contents</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="hover:text-primary cursor-pointer transition-colors">Return Window</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Eligibility</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Non-Returnable Items</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Refund Process</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Exchanges</li>
                </ul>
              </div>
            </aside>
            
            <div className="flex-1 max-w-3xl prose prose-lg prose-neutral prose-headings:font-serif prose-headings:font-normal prose-a:text-primary">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-8">Last Updated: October 1, 2023</p>
              
              <p className="lead font-light">
                At YUNORA, we stand behind the exceptional quality of our luxury furnishings. However, if you are not entirely satisfied with your purchase, we're here to help.
              </p>

              <h2>Return Window</h2>
              <p className="font-light">
                You have <strong>7 calendar days</strong> to return an item from the date you received it. Return requests initiated after 7 days will not be accepted.
              </p>

              <h2>Eligibility for Returns</h2>
              <p className="font-light">
                To be eligible for a return, your item must meet the following conditions:
              </p>
              <ul className="font-light">
                <li>The item must be unused, unwashed, and in the same condition that you received it.</li>
                <li>The item must be in the original packaging with all tags, labels, and protective covers intact.</li>
                <li>You must have the receipt or proof of purchase.</li>
              </ul>

              <h2>Non-Returnable Items</h2>
              <p className="font-light">
                Please note that for hygiene and logistical reasons, the following items cannot be returned unless they arrive defective:
              </p>
              <ul className="font-light">
                <li>Cut fabrics (sold by the meter)</li>
                <li>Custom-made or tailored items</li>
                <li>Items purchased during clearance sales or at a discount of 40% or higher</li>
                <li>Used bedding products (comforters, bedsheets) removed from their original sealed packaging</li>
              </ul>

              <h2>Refund Process</h2>
              <p className="font-light">
                Once we receive your item, our quality team will inspect it and notify you of the status of your refund. If your return is approved, we will initiate a refund to your original method of payment within 3-5 business days. The time it takes for the credit to reflect in your account depends on your card issuer's policies.
              </p>
              <p className="font-light">
                Return shipping costs will be deducted from your refund amount (flat ₹150 for standard items) unless the return is due to a defect or an error on our part.
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
