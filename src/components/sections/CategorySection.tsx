import { useCategories, useProducts } from "@/lib/useApi";
import { adaptProduct } from "@/lib/productAdapter";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { categories as staticCats, products as staticProducts } from "@/data/products";

export default function CategorySection() {
  const { data: apiCats } = useCategories();
  const { data: productsData } = useProducts({ limit: 4 });

  const cats = apiCats?.length
    ? apiCats.slice(0, 6).map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        image: c.imageUrl || staticCats[0]?.image,
        count: undefined,
      }))
    : staticCats;

  const featuredProducts = productsData?.items?.length
    ? productsData.items.slice(0, 4).map(adaptProduct)
    : staticProducts.slice(0, 4);

  return (
    <section className="pt-16 pb-8 lg:py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Mobile: horizontal scroll */}
        <div className="lg:hidden">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-serif text-2xl text-foreground">Shop by Category</h2>
            <Link href="/categories" className="text-xs font-medium text-primary uppercase tracking-widest border-b border-primary pb-0.5">
              View All
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none snap-x snap-mandatory">
            {cats.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="shrink-0 w-36 snap-start"
              >
                <Link href={`/category/${cat.slug}`}>
                  <div className="relative overflow-hidden group cursor-pointer">
                    <div className="aspect-[3/4] bg-muted/30 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = staticCats[0]?.image || ""; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
                      <div>
                        <p className="text-white text-[0.6rem] tracking-widest font-medium uppercase">{cat.name}</p>
                      </div>
                      <div className="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center">
                        <ArrowRight className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: two-column layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-10 xl:gap-16">
          <div>
            <div className="flex justify-between items-center mb-7">
              <h2 className="font-serif text-3xl xl:text-4xl text-foreground">Shop by Category</h2>
              <Link href="/categories" className="text-xs font-medium text-primary uppercase tracking-widest border-b border-primary pb-0.5 hover:text-foreground transition-colors">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {cats.slice(0, 5).map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                >
                  <Link href={`/category/${cat.slug}`}>
                    <div className="group relative overflow-hidden cursor-pointer">
                      <div className="aspect-[2/3] bg-muted/30 overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.06 }}
                          transition={{ duration: 0.5 }}
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = staticCats[i % staticCats.length]?.image || ""; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2.5">
                        <p className="text-white text-[0.58rem] tracking-[0.12em] font-medium uppercase leading-tight">{cat.name}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-7">
              <h2 className="font-serif text-3xl xl:text-4xl text-foreground">Featured Products</h2>
              <div className="flex gap-2">
                <Link href="/shop" className="text-xs font-medium text-primary uppercase tracking-widest border-b border-primary pb-0.5 hover:text-foreground transition-colors">
                  View All →
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 xl:gap-6">
              {featuredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Featured Products */}
        <div className="lg:hidden mt-10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-serif text-2xl text-foreground">Featured Products</h2>
            <Link href="/shop" className="text-xs font-medium text-primary uppercase tracking-widest border-b border-primary pb-0.5">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {featuredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
