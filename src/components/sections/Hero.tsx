import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { heroImages } from "@/data/products";
import { useBanners } from "@/lib/useApi";

const FALLBACK_SLIDES = [
  {
    label: "PREMIUM COLLECTION 2025",
    heading: "Luxury Furnishing\nCrafted For",
    headingItalic: "Elegant Living",
    subtext: "Elevate your home with our exclusive range of premium furnishings and décor.",
    imageUrl: heroImages[0],
    linkUrl: "/shop",
  },
  {
    label: "EXCLUSIVE DESIGNS",
    heading: "Timeless Comfort\nCrafted For",
    headingItalic: "Every Home",
    subtext: "Discover our curated collection of premium bedsheets, curtains and home décor.",
    imageUrl: heroImages[0],
    linkUrl: "/shop",
  },
  {
    label: "NEW ARRIVALS 2025",
    heading: "Artisan Fabrics\nMade For",
    headingItalic: "Elegant Spaces",
    subtext: "Explore our latest arrivals — premium textiles inspired by the finest global traditions.",
    imageUrl: heroImages[0],
    linkUrl: "/new-arrivals",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const { data: banners, isLoading } = useBanners("homepage");

  const slides =
    banners && banners.length > 0
      ? banners
          .sort((a, b) => a.priority - b.priority)
          .map((b) => ({
            label: b.title || "YUNORA COLLECTION",
            heading: b.title || "Luxury Furnishing\nCrafted For",
            headingItalic: "Elegant Living",
            subtext: "",
            imageUrl: b.imageUrl || heroImages[0],
            linkUrl: b.linkUrl || "/shop",
          }))
      : FALLBACK_SLIDES;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const slide = slides[current] || FALLBACK_SLIDES[0];

  return (
    <section className="relative w-full h-[88vh] lg:h-[85vh] overflow-hidden bg-[#2a1f18]">
      <div className="absolute inset-0">
        <img
          src={slide.imageUrl}
          alt="Luxury interior"
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = heroImages[0]; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {isLoading && (
        <div className="absolute top-4 right-4 z-20">
          <Loader2 className="h-5 w-5 text-white/50 animate-spin" />
        </div>
      )}

      <div className="relative h-full flex flex-col justify-center px-6 lg:px-16 xl:px-24 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <p className="text-[#D4956A] text-[0.65rem] lg:text-xs tracking-[0.3em] font-medium mb-4 uppercase">
              {slide.label}
            </p>

            <h1 className="font-serif text-white leading-[1.1] mb-4">
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl whitespace-pre-line">
                {slide.heading}
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic font-light">
                {slide.headingItalic}
              </span>
            </h1>

            {slide.subtext && (
              <p className="text-white/80 text-sm lg:text-base font-light leading-relaxed mb-8 max-w-sm">
                {slide.subtext}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={slide.linkUrl || "/shop"}
                className="bg-primary hover:bg-primary/90 text-white px-7 py-3.5 text-xs font-semibold tracking-widest uppercase transition-colors text-center"
              >
                SHOP COLLECTION
              </Link>
              <Link
                href="/categories"
                className="bg-transparent border border-white text-white hover:bg-white/10 px-7 py-3.5 text-xs font-semibold tracking-widest uppercase transition-colors text-center"
              >
                EXPLORE CATEGORIES
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={prev}
        className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/40 items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/40 items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-6 left-6 lg:left-16 xl:left-24 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-primary" : "w-4 bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
