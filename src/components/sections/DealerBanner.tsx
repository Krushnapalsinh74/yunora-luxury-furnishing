import { Link } from "wouter";

export default function DealerBanner() {
  return (
    <section className="py-16 bg-primary/10 border-y border-primary/20">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">Grow Your Business with YUNORA</h2>
        <p className="text-muted-foreground mb-8">Join 500+ Dealers Across India</p>
        <Link 
          href="/contact" 
          className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-sm font-medium tracking-widest transition-colors"
        >
          APPLY NOW
        </Link>
      </div>
    </section>
  );
}
