import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";

export default function TermsConditions() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="Terms & Conditions" 
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
              <div className="sticky top-24">
                <p className="font-serif text-xl mb-4 border-b border-border/50 pb-2">Contents</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="hover:text-primary cursor-pointer transition-colors">Acceptance of Terms</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Use of Website</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Products & Pricing</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Payment Terms</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Intellectual Property</li>
                </ul>
              </div>
            </aside>
            
            <div className="flex-1 max-w-3xl prose prose-lg prose-neutral prose-headings:font-serif prose-headings:font-normal prose-a:text-primary">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-8">Last Updated: October 1, 2023</p>
              
              <p className="lead font-light">
                Please read these terms and conditions carefully before using our website.
              </p>

              <h2>Acceptance of Terms</h2>
              <p className="font-light">
                By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use YUNORA's website if you do not accept all of the terms and conditions stated on this page.
              </p>

              <h2>Use of Website</h2>
              <p className="font-light">
                Unless otherwise stated, YUNORA and/or its licensors own the intellectual property rights for all material on YUNORA. All intellectual property rights are reserved. You may view and/or print pages from https://www.yunora.com for your own personal use subject to restrictions set in these terms and conditions.
              </p>
              <p className="font-light">
                You must not:
              </p>
              <ul className="font-light">
                <li>Republish material from https://www.yunora.com</li>
                <li>Sell, rent or sub-license material from https://www.yunora.com</li>
                <li>Reproduce, duplicate or copy material from https://www.yunora.com</li>
                <li>Redistribute content from YUNORA (unless content is specifically made for redistribution).</li>
              </ul>

              <h2>Products & Pricing</h2>
              <p className="font-light">
                All prices are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
              </p>
              <p className="font-light">
                We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.
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
