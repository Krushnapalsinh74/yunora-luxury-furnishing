import { craftImages } from "@/data/products";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Manufacturing() {
  return (
    <section className="py-24 bg-[#2A1F18] text-[#F3EFE9] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-serif text-4xl lg:text-6xl text-white mb-6">Crafted with Precision,<br/>Born from Passion</h2>
          <p className="max-w-2xl mx-auto text-white/70 font-light text-lg">
            Our state-of-the-art manufacturing facilities in Panipat ensure every thread meets the highest standards of luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
              <img src={craftImages[0]} alt="Fabric Craftsmanship" className="w-full h-full object-cover" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">01 / Fabric Craftsmanship</span>
            <h3 className="font-serif text-3xl lg:text-4xl">The Art of Weaving</h3>
            <p className="text-white/70 font-light leading-relaxed">
              We source only the finest raw materials, from long-staple Egyptian cotton to premium Belgian flax linen. Our master weavers combine traditional techniques with modern technology to create fabrics that not only look exquisite but stand the test of time.
            </p>
            <Link href="/about" className="inline-flex items-center text-primary hover:text-white transition-colors mt-4 text-sm font-medium uppercase tracking-widest border-b border-primary pb-1 w-fit">
              Learn More
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 lg:order-2"
          >
            <span className="text-primary text-sm font-medium tracking-[0.2em] uppercase">02 / Premium Quality</span>
            <h3 className="font-serif text-3xl lg:text-4xl">Exacting Standards</h3>
            <p className="text-white/70 font-light leading-relaxed">
              Every YUNORA product undergoes a rigorous 7-point quality inspection. From thread count verification to color fastness testing, we ensure that the piece you bring into your home is nothing short of flawless.
            </p>
            <Link href="/manufacturing" className="inline-flex items-center text-primary hover:text-white transition-colors mt-4 text-sm font-medium uppercase tracking-widest border-b border-primary pb-1 w-fit">
              Our Process
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:order-1"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
              <img src={craftImages[1]} alt="Premium Quality" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
