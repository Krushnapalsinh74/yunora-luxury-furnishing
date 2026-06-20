import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import catCurtains from "@/assets/cat-curtains.png";
import catSofaFabrics from "@/assets/cat-sofa-fabrics.png";
import catComforters from "@/assets/cat-comforters.png";
import catCushions from "@/assets/cat-cushions.png";

export default function Manufacturing() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        {/* Dark Hero */}
        <div className="relative h-[60vh] lg:h-[80vh] flex items-center justify-center overflow-hidden bg-foreground">
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
            <img src={catCurtains} alt="Manufacturing Facility" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block">Our Facilities</span>
            <h1 className="font-serif text-5xl lg:text-7xl mb-6">Crafted With Precision,<br />Made With Passion.</h1>
            <p className="text-lg text-white/80 font-light max-w-2xl mx-auto">A look inside our state-of-the-art manufacturing facilities where raw materials are transformed into luxury home furnishings.</p>
          </div>
        </div>
        
        {/* The Process */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
              <div className="order-2 lg:order-1 space-y-6 pr-0 lg:pr-12">
                <span className="text-primary text-sm font-medium tracking-widest uppercase">The Process</span>
                <h2 className="font-serif text-4xl">From Loom to Living Room</h2>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  Our vertically integrated manufacturing process gives us complete control over quality at every stage. We begin with the careful selection of premium yarns, meticulously woven on state-of-the-art European looms.
                </p>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  Our dyeing and finishing facility utilizes eco-friendly processes to ensure vibrant, lasting colors that resist fading while maintaining a luxurious hand-feel.
                </p>
              </div>
              <div className="order-1 lg:order-2 relative aspect-[4/3]">
                <img src={catSofaFabrics} alt="Loom Process" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/3]">
                <img src={catComforters} alt="Quality Control" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-6 pl-0 lg:pl-12">
                <span className="text-primary text-sm font-medium tracking-widest uppercase">The Standards</span>
                <h2 className="font-serif text-4xl">Rigorous Quality Control</h2>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  Every product that bears the YUNORA name must pass through our rigorous 7-point quality inspection. From tensile strength testing to color-fastness analysis, we leave nothing to chance.
                </p>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  Our master tailors finish each piece by hand, ensuring perfect seams, precise dimensions, and flawless detailing before it is carefully packaged for its journey to your home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Factory Stats */}
        <section className="py-20 bg-muted/20 border-y border-border/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-8 border border-border/30 text-center shadow-sm">
                <h4 className="font-serif text-4xl mb-2 text-primary">100,000+</h4>
                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Sq. Ft. Facility</p>
              </div>
              <div className="bg-card p-8 border border-border/30 text-center shadow-sm">
                <h4 className="font-serif text-4xl mb-2 text-primary">ISO 9001</h4>
                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Certified Processes</p>
              </div>
              <div className="bg-card p-8 border border-border/30 text-center shadow-sm">
                <h4 className="font-serif text-4xl mb-2 text-primary">Zero</h4>
                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Liquid Discharge Plant</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl">Inside Our World</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-square bg-muted/30 col-span-2 row-span-2">
                <img src={catCurtains} alt="Gallery 1" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square bg-muted/30">
                <img src={catSofaFabrics} alt="Gallery 2" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square bg-muted/30">
                <img src={catComforters} alt="Gallery 3" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square bg-muted/30 col-span-2">
                <img src={catCushions} alt="Gallery 4" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
