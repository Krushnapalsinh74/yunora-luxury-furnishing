import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import CategorySection from "@/components/sections/CategorySection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Collections from "@/components/sections/Collections";
import BestSellers from "@/components/sections/BestSellers";
import Manufacturing from "@/components/sections/Manufacturing";
import NewArrivals from "@/components/sections/NewArrivals";
import DealerBanner from "@/components/sections/DealerBanner";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <TrustBar />
        <CategorySection />
        <FeaturedProducts />
        <Collections />
        <BestSellers />
        <Manufacturing />
        <NewArrivals />
        <DealerBanner />
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
