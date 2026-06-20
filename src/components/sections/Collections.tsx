import { collectionImages } from "@/data/products";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Collections() {
  const collections = [
    {
      title: "Curated Collections",
      subtitle: "Timeless designs for every space",
      image: collectionImages.curated,
      link: "/collections",
      cta: "EXPLORE NOW"
    },
    {
      title: "Luxury Bedding",
      subtitle: "Sleep in Style & Wake in Comfort",
      image: collectionImages.bedding,
      link: "/category/bedsheets",
      cta: "SHOP BEDSHEETS"
    },
    {
      title: "Premium Curtains",
      subtitle: "Elegance that frames your home",
      image: collectionImages.curtains,
      link: "/category/curtains",
      cta: "SHOP CURTAINS"
    },
    {
      title: "Become a Dealer",
      subtitle: "Grow with YUNORA. Join Our Network",
      image: collectionImages.curated, // Reusing for placeholder
      link: "/manufacturing",
      cta: "APPLY NOW"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {collections.map((col, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative aspect-video lg:aspect-[16/10] overflow-hidden group"
            >
              <div className="absolute inset-0 bg-muted">
                <img src={col.image} alt={col.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500"></div>
              </div>
              <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-center items-center text-center">
                <h3 className="font-serif text-3xl lg:text-4xl text-white mb-3">{col.title}</h3>
                <p className="text-white/80 font-light mb-8 max-w-sm">{col.subtitle}</p>
                <Link 
                  href={col.link}
                  className="bg-white text-foreground px-6 py-3 text-xs font-medium tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors uppercase"
                >
                  {col.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
