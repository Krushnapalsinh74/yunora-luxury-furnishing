import { useOffers } from "@/lib/useApi";

const FALLBACK = [
  "Free Shipping on Orders Above ₹999",
  "Exclusive Festive Collection — Now Available",
  "Up to 40% Off on Selected Products",
  "Premium Quality • Secure Payments • Easy Returns",
];

export default function AnnouncementBar() {
  const { data: offers } = useOffers();

  const texts =
    offers && offers.length > 0
      ? offers.sort((a, b) => a.priority - b.priority).map((o) => o.text)
      : FALLBACK;

  const doubled = [...texts, ...texts];

  return (
    <div className="bg-primary text-primary-foreground text-xs md:text-sm font-medium h-8 md:h-10 flex items-center overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-block">
        {doubled.map((text, i) => (
          <span key={i} className="mx-4 md:mx-8">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
