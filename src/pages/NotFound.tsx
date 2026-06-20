import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Link } from "wouter";
import hero1 from "@/assets/hero-1.png";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow flex items-center justify-center relative overflow-hidden py-24">
        <div className="absolute inset-0 z-0 opacity-[0.03]">
          <img src={hero1} alt="Luxury Interior" className="w-full h-full object-cover" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10 max-w-2xl">
          <h1 className="font-serif text-[150px] leading-none text-muted mb-4 opacity-50">404</h1>
          <h2 className="font-serif text-4xl mb-4">Page Not Found</h2>
          <p className="text-muted-foreground text-lg mb-8 font-light">Oops! The page you're looking for doesn't exist or has been moved.</p>
          
          <Link href="/" className="inline-block bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors">
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
