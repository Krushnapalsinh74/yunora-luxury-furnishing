import { Truck, ShieldCheck, CreditCard, HeadphonesIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustBar() {
  const features = [
    { icon: Truck, title: "Free Shipping", subtitle: "On orders above ₹999" },
    { icon: ShieldCheck, title: "Premium Quality", subtitle: "Crafted with perfection" },
    { icon: CreditCard, title: "Secure Payments", subtitle: "100% secure transactions" },
    { icon: HeadphonesIcon, title: "24/7 Support", subtitle: "We're here to help" },
  ];

  return (
    <div className="relative z-10 mx-4 lg:mx-8 -mt-8 bg-card shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-border/30">
      <div className="grid grid-cols-4 divide-x divide-border/30">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex flex-col items-center justify-center gap-1.5 py-5 px-2 lg:py-7 lg:px-6 text-center"
            >
              <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-foreground/50 mb-1" strokeWidth={1.5} />
              <p className="text-[0.6rem] lg:text-xs font-semibold tracking-wide text-foreground leading-tight">{feature.title}</p>
              <p className="text-[0.55rem] lg:text-[0.65rem] text-muted-foreground hidden lg:block leading-tight">{feature.subtitle}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
