import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="Privacy Policy" 
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
              <div className="sticky top-24">
                <p className="font-serif text-xl mb-4 border-b border-border/50 pb-2">Contents</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="hover:text-primary cursor-pointer transition-colors">Information We Collect</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">How We Use Your Data</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Data Sharing</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Security</li>
                  <li className="hover:text-primary cursor-pointer transition-colors">Your Rights</li>
                </ul>
              </div>
            </aside>
            
            <div className="flex-1 max-w-3xl prose prose-lg prose-neutral prose-headings:font-serif prose-headings:font-normal prose-a:text-primary">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-8">Last Updated: October 1, 2023</p>
              
              <p className="lead font-light">
                YUNORA values your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
              </p>

              <h2>Information We Collect</h2>
              <p className="font-light">
                We may collect the following types of information:
              </p>
              <ul className="font-light">
                <li><strong>Personal Identification Data:</strong> Name, email address, phone number, shipping and billing address.</li>
                <li><strong>Transaction Data:</strong> Details about payments to and from you and other details of products you have purchased from us.</li>
                <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, products and services.</li>
              </ul>

              <h2>How We Use Your Data</h2>
              <p className="font-light">
                We use your personal data for the following purposes:
              </p>
              <ul className="font-light">
                <li>To process and deliver your order, including managing payments, fees and charges.</li>
                <li>To manage our relationship with you, which will include notifying you about changes to our terms or privacy policy.</li>
                <li>To administer and protect our business and this website.</li>
                <li>To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you.</li>
                <li>To use data analytics to improve our website, products/services, marketing, customer relationships and experiences.</li>
              </ul>

              <h2>Data Security</h2>
              <p className="font-light">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
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
