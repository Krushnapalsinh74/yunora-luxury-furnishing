import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Link } from "wouter";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import hero1 from "@/assets/hero-1.png";
import catCurtains from "@/assets/cat-curtains.png";
import catBedsheets from "@/assets/cat-bedsheets.png";
import catCushions from "@/assets/cat-cushions.png";
import catSofa from "@/assets/cat-sofa-fabrics.png";
import catComforters from "@/assets/cat-comforters.png";
import catHomeDecor from "@/assets/cat-home-decor.png";
import colCurated from "@/assets/col-curated.png";
import colBedding from "@/assets/col-bedding.png";
import {
  Leaf, Star, Heart, Zap, Shield, Award, Truck, RotateCcw,
  Lock, Headphones, MapPin, Instagram, ArrowRight, CheckCircle2,
  Scissors, Gem, Users, Globe, Package, ChevronRight
} from "lucide-react";

/* ─── Animated Counter ─── */
function Counter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString("en-IN")}{suffix}</span>;
}

/* ─── Fade-up wrapper ─── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background overflow-x-hidden">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">

        {/* ══════════════════════════════════════════
            1. HERO BANNER
        ══════════════════════════════════════════ */}
        <section className="relative h-[70vh] lg:h-[85vh] min-h-[500px] overflow-hidden">
          <img src={hero1} alt="YUNORA luxury interiors" className="absolute inset-0 w-full h-full object-cover scale-105" style={{ objectPosition: "center 40%" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl"
              >
                <p className="text-white/70 text-xs font-medium tracking-widest uppercase mb-4">About YUNORA</p>
                <h1 className="font-serif text-5xl lg:text-7xl text-white leading-tight mb-6">
                  Crafting Beautiful<br />Living Spaces Since{" "}
                  <span className="text-primary">2008</span>
                </h1>
                <p className="text-white/75 text-base lg:text-lg font-light mb-8 max-w-lg leading-relaxed">
                  YUNORA is more than furniture — we craft timeless experiences that transform houses into homes.
                </p>
                <Link href="/collections">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors"
                  >
                    Explore Our Collections <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            2. OUR STORY
        ══════════════════════════════════════════ */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Text */}
              <FadeUp>
                <span className="text-primary text-xs font-medium tracking-widest uppercase block mb-5">Our Story</span>
                <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-6">From Passion<br />to Purpose</h2>
                <p className="text-muted-foreground leading-relaxed mb-5 font-light">
                  YUNORA was born from a simple belief — that every home deserves furniture that blends beauty, function and soul. What began as a passion project in 2008 has grown into a modern furnishing brand trusted by thousands.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8 font-light">
                  From our state-of-the-art manufacturing facility in Panipat to living rooms across India, we bring craftsmanship, warmth and timeless design to every home we touch.
                </p>
                <div className="space-y-3 mb-10">
                  {["Founded in 2008 in Panipat, Haryana", "500+ dealer partners across India", "Exported to 12 countries worldwide", "ISO certified manufacturing facility"].map((t) => (
                    <div key={t} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{t}</span>
                    </div>
                  ))}
                </div>
                <Link href="/manufacturing">
                  <button className="inline-flex items-center gap-2 border border-foreground px-8 py-3.5 text-sm font-medium tracking-widest uppercase hover:bg-foreground hover:text-background transition-all">
                    Our Journey <ChevronRight className="h-4 w-4" />
                  </button>
                </Link>
              </FadeUp>

              {/* Image collage */}
              <FadeUp delay={0.2}>
                <div className="grid grid-cols-2 gap-3 h-[520px]">
                  <div className="space-y-3 h-full">
                    <div className="h-[60%] overflow-hidden rounded-xl">
                      <img src={catCurtains} alt="YUNORA curtains" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="h-[37%] overflow-hidden rounded-xl">
                      <img src={catCushions} alt="YUNORA cushions" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                  </div>
                  <div className="space-y-3 h-full pt-8">
                    <div className="h-[37%] overflow-hidden rounded-xl">
                      <img src={catBedsheets} alt="YUNORA bedsheets" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="h-[60%] overflow-hidden rounded-xl">
                      <img src={colCurated} alt="YUNORA collection" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            3. FOUNDER VISION
        ══════════════════════════════════════════ */}
        <section className="py-20 bg-[#FAF7F4]">
          <div className="container mx-auto px-4 lg:px-12">
            <FadeUp>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 bg-card border border-border/20 rounded-2xl overflow-hidden shadow-lg">
                {/* Quote side */}
                <div className="lg:col-span-3 p-10 lg:p-14 flex flex-col justify-center">
                  <span className="text-primary text-xs font-medium tracking-widest uppercase block mb-6">Founder's Vision</span>
                  <div className="text-primary text-5xl font-serif leading-none mb-4 select-none">"</div>
                  <p className="font-serif text-xl lg:text-2xl leading-relaxed text-foreground italic mb-8">
                    I envisioned YUNORA as a brand that doesn't just furnish spaces, but elevates lifestyles. Every piece we create is a step towards that vision.
                  </p>
                  <div>
                    <p className="font-serif text-lg text-foreground">Arjun Mehta</p>
                    <p className="text-sm text-muted-foreground mt-0.5">Founder & CEO, YUNORA</p>
                  </div>
                  {/* Signature flourish */}
                  <div className="mt-6">
                    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" className="opacity-30">
                      <path d="M10 30 C 30 10, 50 5, 80 20 S 110 35, 115 15" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                {/* Photo side */}
                <div className="lg:col-span-2 relative min-h-[300px]">
                  <img src={colBedding} alt="Arjun Mehta — Founder YUNORA" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4. MANUFACTURING EXCELLENCE
        ══════════════════════════════════════════ */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <FadeUp>
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                    <img src={catSofa} alt="YUNORA manufacturing" className="w-full h-full object-cover" />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-5 -right-5 bg-card border border-border/30 rounded-xl p-4 shadow-xl">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Est.</p>
                    <p className="font-serif text-3xl text-primary">2008</p>
                    <p className="text-xs text-muted-foreground">Panipat, Haryana</p>
                  </div>
                </div>
              </FadeUp>

              {/* Content */}
              <FadeUp delay={0.2}>
                <span className="text-primary text-xs font-medium tracking-widest uppercase block mb-5">Manufacturing Excellence</span>
                <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-6">Crafted With Precision, Made To Last</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  At YUNORA's facility in Panipat — India's textile capital — we use state-of-the-art machines alongside time-honoured techniques. Quality isn't just a promise — it's our process.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: Gem, title: "Premium Materials", desc: "Sourced from certified mills across India, Egypt and Turkey." },
                    { icon: Users, title: "Skilled Artisans", desc: "Experienced and passionate craftspeople with decades of expertise." },
                    { icon: CheckCircle2, title: "Quality Assurance", desc: "Every product tested for durability, colour fastness and finish." },
                    { icon: Scissors, title: "Precision Stitching", desc: "Engineered seams and reinforced edges for long-lasting perfection." },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/manufacturing">
                  <button className="mt-8 inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all underline underline-offset-4">
                    Visit Our Factory <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            5. MISSION & VALUES
        ══════════════════════════════════════════ */}
        <section className="py-20 bg-[#FAF7F4]">
          <div className="container mx-auto px-4 lg:px-12">
            <FadeUp className="text-center mb-14">
              <span className="text-primary text-xs font-medium tracking-widest uppercase block mb-4">Our Mission & Values</span>
              <h2 className="font-serif text-4xl lg:text-5xl leading-tight">What We Stand For</h2>
            </FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { icon: Star, title: "Timeless Design", desc: "Elegant styles that never go out of style." },
                { icon: Shield, title: "Quality First", desc: "We use only the finest materials available." },
                { icon: Leaf, title: "Sustainability", desc: "Eco-conscious manufacturing for a better tomorrow." },
                { icon: Heart, title: "Customer Happiness", desc: "Your satisfaction drives everything we do." },
                { icon: Zap, title: "Innovation", desc: "Modern designs that inspire contemporary living." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <FadeUp key={title} delay={i * 0.08}>
                  <div className="bg-card border border-border/20 rounded-2xl p-6 text-center hover:border-primary/40 hover:shadow-md transition-all duration-300 group h-full">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-serif text-base text-foreground mb-2">{title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            6. WHY CHOOSE YUNORA
        ══════════════════════════════════════════ */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeUp>
                <span className="text-primary text-xs font-medium tracking-widest uppercase block mb-5">Why YUNORA</span>
                <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-10">Why Choose YUNORA?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { icon: Award, title: "Premium Quality", desc: "Our products are rigorously tested — reliable & beautiful." },
                    { icon: Star, title: "Modern Designs", desc: "Curated for contemporary Indian lifestyles." },
                    { icon: Gem, title: "Affordable Luxury", desc: "Luxury look and feel at fair prices." },
                    { icon: Zap, title: "Easy Experience", desc: "Smooth shopping from start to finish." },
                    { icon: Users, title: "Trusted Brand", desc: "Thousands of happy customers across India." },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-4 p-5 bg-background border border-border/20 rounded-xl hover:border-primary/30 hover:shadow-sm transition-all">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm mb-0.5">{title}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
              <FadeUp delay={0.2}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <img src={catComforters} alt="YUNORA quality" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-serif text-2xl mb-1">India's Premier<br />Luxury Furnishing</p>
                    <p className="text-white/70 text-xs">Trusted by 10,000+ happy homes</p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            7. STATISTICS SECTION
        ══════════════════════════════════════════ */}
        <section className="py-20 bg-foreground text-background">
          <div className="container mx-auto px-4 lg:px-12">
            <FadeUp className="text-center mb-14">
              <span className="text-primary text-xs font-medium tracking-widest uppercase block mb-3">By the Numbers</span>
              <h2 className="font-serif text-4xl text-background/90">Our Impact in Numbers</h2>
            </FadeUp>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Heart, target: 10000, suffix: "+", label: "Happy Customers", color: "text-rose-400" },
                { icon: Package, target: 25000, suffix: "+", label: "Products Sold", color: "text-blue-400" },
                { icon: Globe, target: 50, suffix: "+", label: "Cities Served", color: "text-emerald-400" },
                { icon: Star, target: 98, suffix: "%", label: "Customer Satisfaction", color: "text-amber-400" },
              ].map(({ icon: Icon, target, suffix, label, color }, i) => (
                <FadeUp key={label} delay={i * 0.1}>
                  <div className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-6 w-6 ${color}`} />
                    </div>
                    <p className={`font-serif text-4xl lg:text-5xl mb-2 ${color}`}>
                      <Counter target={target} suffix={suffix} />
                    </p>
                    <p className="text-sm tracking-wider text-background/60 uppercase">{label}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            8. TEAM + STORE MAP
        ══════════════════════════════════════════ */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Team */}
              <FadeUp>
                <span className="text-primary text-xs font-medium tracking-widest uppercase block mb-5">Our Team & Craftspeople</span>
                <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-6">People Behind the Perfection</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  Our designers, weavers, tailors and innovators work passionately to bring YUNORA to life. Together, we create furniture that tells a story.
                </p>
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl mb-6">
                  <img src={catHomeDecor} alt="YUNORA team" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white text-sm font-medium">200+ craftspeople at our Panipat facility</p>
                  </div>
                </div>
                <Link href="/manufacturing">
                  <button className="inline-flex items-center gap-2 border border-foreground px-8 py-3.5 text-sm font-medium tracking-widest uppercase hover:bg-foreground hover:text-background transition-all">
                    Meet Our Team <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </FadeUp>

              {/* Map */}
              <FadeUp delay={0.15}>
                <span className="text-primary text-xs font-medium tracking-widest uppercase block mb-5">Visit Our Experience Store</span>
                <h2 className="font-serif text-3xl leading-tight mb-6">See. Feel. Experience. YUNORA</h2>
                <div className="bg-card border border-border/20 rounded-2xl overflow-hidden shadow-md">
                  {/* Embedded Google Maps */}
                  <div className="relative h-64 bg-muted/30">
                    <iframe
                      title="YUNORA Store Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3486.5!2d76.971!3d29.39!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPanipat%2C+Haryana!5e0!3m2!1sen!2sin!4v1"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">YUNORA Experience Store</p>
                        <p className="text-sm text-muted-foreground mt-0.5">123 Luxury Lane, Panipat, Haryana 132103</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Mon – Sat: 9am – 6pm</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href="https://maps.google.com/?q=Panipat,Haryana"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-primary text-white text-center py-2.5 text-xs font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors rounded-sm"
                      >
                        Get Directions
                      </a>
                      <a
                        href="https://maps.google.com/?q=Panipat,Haryana"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 border border-border text-foreground text-center py-2.5 text-xs font-medium tracking-widest uppercase hover:border-primary hover:text-primary transition-colors rounded-sm"
                      >
                        Open in Maps
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            9. INSTAGRAM SHOWCASE
        ══════════════════════════════════════════ */}
        <section className="py-20 bg-[#FAF7F4]">
          <div className="container mx-auto px-4 lg:px-12">
            <FadeUp className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-primary text-xs font-medium tracking-widest uppercase block mb-3">Instagram Showcase</span>
                <h2 className="font-serif text-3xl lg:text-4xl">@yunora.furnishing</h2>
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-foreground px-6 py-3 text-xs font-medium tracking-widest uppercase hover:bg-foreground hover:text-background transition-all shrink-0"
              >
                <Instagram className="h-4 w-4" /> Follow Us
              </a>
            </FadeUp>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {[catCurtains, catBedsheets, catCushions, catSofa, colCurated, colBedding].map((img, i) => (
                <FadeUp key={i} delay={i * 0.06}>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="aspect-square overflow-hidden rounded-xl group">
                      <img
                        src={img}
                        alt={`YUNORA Instagram post ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </a>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            10. CUSTOMER TRUST SECTION
        ══════════════════════════════════════════ */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Review card */}
              <FadeUp>
                <span className="text-primary text-xs font-medium tracking-widest uppercase block mb-6">Customer Reviews</span>
                <h2 className="font-serif text-3xl lg:text-4xl mb-8">Customers Trust YUNORA</h2>
                <div className="space-y-4">
                  {[
                    { name: "Priya Sharma", city: "Mumbai", text: "Beautiful design, premium quality, and amazing service. YUNORA truly elevated my living room!", rating: 5 },
                    { name: "Rahul Gupta", city: "Delhi", text: "The curtains are absolutely stunning. The quality far exceeds the price point. Highly recommended.", rating: 5 },
                    { name: "Meera Nair", city: "Bangalore", text: "Fast delivery, perfect packaging, and exactly what was shown. YUNORA has a lifetime customer in me.", rating: 5 },
                  ].map((r) => (
                    <div key={r.name} className="bg-card border border-border/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex text-amber-400 gap-0.5 mb-3">
                        {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
                      </div>
                      <p className="text-sm text-foreground italic mb-3">"{r.text}"</p>
                      <p className="text-xs font-medium text-foreground">— {r.name}, <span className="text-muted-foreground">{r.city}</span></p>
                    </div>
                  ))}
                </div>
              </FadeUp>

              {/* Trust badges + Image */}
              <FadeUp delay={0.2}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-8">
                  <img src={hero1} alt="YUNORA luxury home" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-serif text-white text-xl mb-1">Loved by 10,000+ homes across India</p>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />)}
                      <span className="text-white/80 text-xs ml-2 self-center">4.9/5 average rating</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Truck, title: "Free Shipping", desc: "On all orders above ₹999" },
                    { icon: RotateCcw, title: "Easy Returns", desc: "Hassle-free 7-day returns" },
                    { icon: Lock, title: "Secure Payments", desc: "100% safe & encrypted" },
                    { icon: Headphones, title: "24/7 Support", desc: "We're here to help" },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-3 p-4 bg-card border border-border/20 rounded-xl">
                      <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold">{title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════════ */}
        <section className="py-24 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="container mx-auto px-4 lg:px-12 text-center relative">
            <FadeUp>
              <p className="text-primary-foreground/70 text-xs tracking-widest uppercase mb-4">Start Your Journey</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-primary-foreground mb-6">Transform Your Home with YUNORA</h2>
              <p className="text-primary-foreground/75 text-base mb-10 max-w-lg mx-auto font-light">
                Explore our curated collection of luxury furnishings and find pieces that speak to your soul.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/shop">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-white text-primary px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-white/90 transition-colors"
                  >
                    Shop Now
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="border border-white/50 text-white px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-white/10 transition-colors"
                  >
                    Contact Us
                  </motion.button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
