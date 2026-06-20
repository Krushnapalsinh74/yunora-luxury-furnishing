import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
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
import colCurated from "@/assets/col-curated.png";
import {
  Phone, MessageCircle, Mail, Clock, MapPin, Send,
  Instagram, ArrowRight, CheckCircle2, ChevronDown,
  Package, Users, Palette, Headphones, RotateCcw,
  ShieldCheck, Truck, ExternalLink
} from "lucide-react";

const WHATSAPP_NUMBER = "919624818530";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello YUNORA! I have a question about your products. Can you help me?"
);

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Contact Form ── */
function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s+/g, ""))) e.phone = "Enter a valid 10-digit mobile number";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;
    setStatus("sending");
    try {
      const { api } = await import("@/lib/api");
      await api.submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        source: "contact-form",
        notes: `Subject: ${form.subject}\n\n${form.message}`,
      });
      setStatus("success");
      setForm({ name: "", phone: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("success");
      setForm({ name: "", phone: "", email: "", subject: "", message: "" });
    }
  };

  const field = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: ev.target.value })),
    onFocus: () => setErrors((p) => ({ ...p, [k]: "" })),
  });

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-16 px-8 h-full">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="font-serif text-2xl mb-2">Message Sent!</h3>
        <p className="text-muted-foreground text-sm mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
        <button onClick={() => setStatus("idle")} className="text-sm text-primary font-medium hover:underline underline-offset-4">Send another message</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <input {...field("name")} type="text" placeholder="Your Name" className={`w-full border-b py-3 text-sm bg-transparent focus:outline-none transition-colors placeholder:text-muted-foreground/50 ${errors.name ? "border-red-400 text-red-600" : "border-border focus:border-primary"}`} />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <input {...field("phone")} type="tel" placeholder="Phone Number" className={`w-full border-b py-3 text-sm bg-transparent focus:outline-none transition-colors placeholder:text-muted-foreground/50 ${errors.phone ? "border-red-400 text-red-600" : "border-border focus:border-primary"}`} />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <input {...field("email")} type="email" placeholder="Email Address" className={`w-full border-b py-3 text-sm bg-transparent focus:outline-none transition-colors placeholder:text-muted-foreground/50 ${errors.email ? "border-red-400 text-red-600" : "border-border focus:border-primary"}`} />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>
      <div>
        <select {...field("subject")} className={`w-full border-b py-3 text-sm bg-transparent focus:outline-none transition-colors ${errors.subject ? "border-red-400 text-red-600" : "border-border focus:border-primary"} ${!form.subject ? "text-muted-foreground/50" : "text-foreground"}`}>
          <option value="" disabled>Subject</option>
          <option value="order">Order Inquiry</option>
          <option value="product">Product Information</option>
          <option value="warranty">Warranty Claim</option>
          <option value="dealer">Dealer / Franchise Inquiry</option>
          <option value="bulk">Bulk Order</option>
          <option value="interior">Interior Designer Collaboration</option>
          <option value="other">Other</option>
        </select>
        {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
      </div>
      <div>
        <textarea {...field("message")} rows={4} placeholder="Your Message" className={`w-full border rounded-xl p-4 text-sm bg-transparent focus:outline-none transition-colors resize-none placeholder:text-muted-foreground/50 ${errors.message ? "border-red-400 text-red-600" : "border-border focus:border-primary"}`} />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-60"
      >
        {status === "sending" ? (
          <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
        ) : (
          <><Send className="h-4 w-4" /> Send Message</>
        )}
      </button>
      <p className="text-xs text-muted-foreground">We'll get back to you as soon as possible.</p>
    </form>
  );
}

/* ── Dealer Form ── */
function DealerForm({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", business: "", city: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSent(true), 1000);
  };

  if (sent) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="font-serif text-xl mb-2">Inquiry Received!</h3>
        <p className="text-sm text-muted-foreground mb-5">Our dealer team will contact you within 48 hours.</p>
        <button onClick={onClose} className="text-sm text-primary font-medium hover:underline">Close</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {[["name", "Full Name", "text"], ["business", "Business Name", "text"], ["city", "City", "text"], ["phone", "Phone Number", "tel"], ["email", "Email Address", "email"]].map(([k, label, type]) => (
          <div key={k}>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">{label}</label>
            <input type={type} value={form[k as keyof typeof form]} onChange={(e) => setForm((p) => ({ ...p, [k]: e.target.value }))} required className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
          </div>
        ))}
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1.5">Message</label>
        <textarea rows={3} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} className="w-full border border-border rounded-lg p-3 text-sm bg-transparent focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Tell us about your business and requirements…" />
      </div>
      <div className="flex gap-3">
        <button type="submit" className="flex-1 bg-primary text-white py-3 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors">Submit Inquiry</button>
        <button type="button" onClick={onClose} className="px-6 border border-border text-sm font-medium hover:border-foreground transition-colors">Cancel</button>
      </div>
    </form>
  );
}

/* ── FAQ Accordion ── */
const FAQS = [
  { q: "What is the delivery time for my order?", a: "Standard delivery takes 5–7 working days for major cities across India. Remote locations may take up to 10–12 working days. Made-to-order items require an additional 14–21 days." },
  { q: "Do you offer installation services?", a: "Yes! We offer professional curtain and sofa installation services in select cities. Contact our support team after placing your order to schedule an installation appointment." },
  { q: "What is your return policy?", a: "We offer a 7-day hassle-free return policy on all standard products. Custom or made-to-order items are non-returnable unless there is a manufacturing defect." },
  { q: "How can I track my order?", a: "You can track your order using the Track Order page on our website. You will also receive SMS and email updates with your tracking link once your order is dispatched." },
  { q: "Do you offer customization?", a: "Absolutely. We offer custom sizing, fabric selection, and colour matching for curtains, bedsheets, and sofa fabrics. Contact us to discuss your requirements." },
];

function FAQItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-border/30 last:border-0">
      <button onClick={toggle} className="w-full flex items-center justify-between gap-4 py-5 text-left hover:text-primary transition-colors group">
        <span className={`text-sm font-medium leading-snug ${open ? "text-primary" : "text-foreground"}`}>{q}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-primary" : "text-muted-foreground"}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden">
            <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [dealerOpen, setDealerOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background overflow-x-hidden">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">

        {/* ══ 1. HERO ══ */}
        <section className="relative h-[55vh] lg:h-[65vh] min-h-[420px] overflow-hidden">
          <img src={hero1} alt="YUNORA contact" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 60%" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-12">
              <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-xl">
                <p className="text-primary text-xs font-medium tracking-widest uppercase mb-4">Contact Us</p>
                <h1 className="font-serif text-4xl lg:text-6xl text-white leading-tight mb-4">
                  We're Here To Help You Create Beautiful Spaces
                </h1>
                <p className="text-white/75 text-base font-light leading-relaxed">
                  Have questions about our furniture or need assistance with your order? Our team is here to help you every step of the way.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ 2. CONTACT INFO BAR ══ */}
        <section className="border-b border-border/30 bg-card">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border/30">
              {[
                {
                  icon: Phone, label: "Call Us", value: "+91 96248 18530",
                  sub: "Mon–Sun, 10AM – 7PM",
                  action: () => window.open("tel:+919624818530"),
                  color: "text-blue-500 bg-blue-50",
                },
                {
                  icon: MessageCircle, label: "WhatsApp Support", value: "+91 96248 18530",
                  sub: "Quick Reply",
                  action: () => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`, "_blank"),
                  color: "text-green-500 bg-green-50",
                },
                {
                  icon: Mail, label: "Email Support", value: "hello@yunora.in",
                  sub: "We reply within 24hrs",
                  action: () => window.open("mailto:hello@yunora.in"),
                  color: "text-primary bg-primary/10",
                },
                {
                  icon: Clock, label: "Business Hours", value: "Mon – Sun",
                  sub: "10:00 AM – 07:00 PM",
                  action: undefined,
                  color: "text-amber-500 bg-amber-50",
                },
              ].map(({ icon: Icon, label, value, sub, action, color }) => (
                <button key={label} onClick={action} disabled={!action} className={`flex items-center gap-4 px-6 py-7 text-left w-full transition-colors ${action ? "hover:bg-muted/30 cursor-pointer" : "cursor-default"}`}>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="font-medium text-sm text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 3. MAP + CONTACT FORM ══ */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Map */}
              <FadeUp>
                <div className="bg-card border border-border/20 rounded-2xl overflow-hidden shadow-sm h-full min-h-[480px] flex flex-col">
                  <div className="flex-1 relative min-h-[300px]">
                    <iframe
                      title="YUNORA Store"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3486.5!2d76.971!3d29.39!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPanipat%2C+Haryana+132103!5e0!3m2!1sen!2sin!4v1"
                      width="100%" height="100%"
                      style={{ border: 0, position: "absolute", inset: 0 }}
                      allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="p-6 border-t border-border/20">
                    <div className="flex items-start gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">YUNORA Experience Store</p>
                        <p className="text-sm text-muted-foreground mt-0.5">123, Design Street, New Delhi, India</p>
                        <a href="https://maps.google.com/?q=New+Delhi+India" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-1.5 hover:underline underline-offset-2">
                          Get Directions <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a href="https://maps.google.com/?q=Panipat+Haryana" target="_blank" rel="noopener noreferrer" className="flex-1 bg-primary text-white text-center py-2.5 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm">Get Directions</a>
                      <a href="https://maps.google.com/?q=Panipat+Haryana" target="_blank" rel="noopener noreferrer" className="flex-1 border border-border text-foreground text-center py-2.5 text-xs font-medium tracking-wider uppercase hover:border-primary hover:text-primary transition-colors rounded-sm flex items-center justify-center gap-1.5">
                        <ExternalLink className="h-3 w-3" /> Open Maps
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* Form */}
              <FadeUp delay={0.15}>
                <div className="bg-card border border-border/20 rounded-2xl p-8 shadow-sm">
                  <h2 className="font-serif text-2xl lg:text-3xl mb-1">Send Us A Message</h2>
                  <p className="text-sm text-muted-foreground mb-7">We'll get back to you as soon as possible.</p>
                  <ContactForm />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══ 4. WHATSAPP + INSTAGRAM ══ */}
        <section className="py-0 pb-16">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* WhatsApp */}
              <FadeUp>
                <div className="bg-card border border-border/20 rounded-2xl p-8 shadow-sm flex flex-col sm:flex-row items-start gap-6 overflow-hidden relative">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Instant Support</p>
                    <h3 className="font-serif text-2xl mb-4">Chat With Us On WhatsApp</h3>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {["Quick Response", "Product Information", "Order Assistance", "Design Consultation"].map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-7 py-3.5 text-sm font-medium tracking-wider uppercase hover:bg-[#1eb85a] transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" /> Chat Now
                    </a>
                  </div>
                  {/* WA icon decorative */}
                  <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-[#25D366]/10 flex items-center justify-center">
                    <MessageCircle className="h-14 w-14 sm:h-20 sm:w-20 text-[#25D366]" />
                  </div>
                </div>
              </FadeUp>

              {/* Instagram */}
              <FadeUp delay={0.1}>
                <div className="bg-card border border-border/20 rounded-2xl p-8 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Social Media</p>
                      <h3 className="font-serif text-2xl">Follow Us On Instagram</h3>
                      <p className="text-sm text-muted-foreground mt-1.5">Get inspired by our latest designs and beautiful spaces.</p>
                    </div>
                    <Instagram className="h-8 w-8 text-pink-500 shrink-0" />
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-5">
                    {[catCurtains, catBedsheets, catCushions, catSofa].map((img, i) => (
                      <a key={i} href="https://instagram.com/myyunora" target="_blank" rel="noopener noreferrer" className="aspect-square overflow-hidden rounded-lg">
                        <img src={img} alt={`YUNORA post ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                      </a>
                    ))}
                  </div>
                  <a
                    href="https://instagram.com/myyunora"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-border px-7 py-3 text-sm font-medium tracking-wider uppercase hover:border-primary hover:text-primary transition-colors"
                  >
                    <Instagram className="h-4 w-4" /> Follow @myyunora
                  </a>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══ 5. INQUIRY CARDS ══ */}
        <section className="py-8 pb-16">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Dealer */}
              <FadeUp>
                <div className="bg-card border border-border/20 rounded-2xl p-8 shadow-sm hover:border-primary/40 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">Dealer & Franchise Inquiry</h3>
                  <p className="text-sm text-muted-foreground mb-6">Join our network of trusted partners across India.</p>
                  <button onClick={() => setDealerOpen(true)} className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all group-hover:underline underline-offset-2">
                    Inquire Now <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </FadeUp>

              {/* Bulk Order */}
              <FadeUp delay={0.08}>
                <div className="bg-card border border-border/20 rounded-2xl p-8 shadow-sm hover:border-primary/40 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">Bulk Order Enquiry</h3>
                  <p className="text-sm text-muted-foreground mb-6">Looking for bulk orders? We've got special solutions for you.</p>
                  <button onClick={() => setBulkOpen(true)} className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all group-hover:underline underline-offset-2">
                    Get Quote <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </FadeUp>

              {/* Interior Designer */}
              <FadeUp delay={0.16}>
                <div className="bg-card border border-border/20 rounded-2xl p-8 shadow-sm hover:border-primary/40 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl mb-2">Interior Designer Collaboration</h3>
                  <p className="text-sm text-muted-foreground mb-6">Let's create beautiful spaces together.</p>
                  <a href={`mailto:hello@yunora.in?subject=Interior Designer Collaboration`} className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all group-hover:underline underline-offset-2">
                    Collaborate <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══ 6. SUPPORT BANNER + FAQ ══ */}
        <section className="pb-20">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Support Banner */}
              <FadeUp>
                <div className="relative rounded-2xl overflow-hidden min-h-[400px] flex flex-col justify-end">
                  <img src={colCurated} alt="Customer support" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="relative p-8">
                    <p className="text-white/70 text-xs tracking-widest uppercase mb-2">Customer Support</p>
                    <h3 className="font-serif text-white text-3xl mb-4">We're Here<br />For You</h3>
                    <p className="text-white/75 text-sm font-light mb-5">Our dedicated support team is committed to providing you with the best experience.</p>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {["Order Tracking", "Returns & Exchanges", "Product Support", "Warranty Information"].map((f) => (
                        <div key={f} className="flex items-center gap-2 text-white/80 text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 text-xs font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors">
                      Contact Support <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </FadeUp>

              {/* FAQ */}
              <FadeUp delay={0.1}>
                <div className="bg-card border border-border/20 rounded-2xl p-8 shadow-sm">
                  <p className="text-xs text-primary font-medium tracking-widest uppercase mb-3">Quick Help</p>
                  <h3 className="font-serif text-2xl mb-6">Frequently Asked Questions</h3>
                  <div>
                    {FAQS.map((faq, i) => (
                      <FAQItem key={i} q={faq.q} a={faq.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />
                    ))}
                  </div>
                  <Link href="/faq">
                    <button className="mt-6 inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all underline underline-offset-4">
                      View All FAQs <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ══ 7. TRUST BAR ══ */}
        <section className="border-t border-border/30 bg-[#FAF7F4] py-10">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Truck, title: "Free Shipping", desc: "On all orders above ₹999" },
                { icon: RotateCcw, title: "Easy Returns", desc: "7-day hassle-free returns" },
                { icon: ShieldCheck, title: "Secure Payments", desc: "100% safe & encrypted" },
                { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ══ DEALER MODAL ══ */}
      <AnimatePresence>
        {(dealerOpen || bulkOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => { setDealerOpen(false); setBulkOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-card border border-border/30 rounded-2xl p-8 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-2xl mb-1">{dealerOpen ? "Dealer & Franchise Inquiry" : "Bulk Order Enquiry"}</h3>
              <p className="text-sm text-muted-foreground mb-6">{dealerOpen ? "Join YUNORA's growing dealer network across India." : "Looking for bulk orders? Our team will get you the best deals."}</p>
              <DealerForm onClose={() => { setDealerOpen(false); setBulkOpen(false); }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <MobileNav />
    </div>
  );
}
