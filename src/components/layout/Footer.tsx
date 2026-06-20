import logoWhite from "@assets/01_1781943231369.png";
import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Linkedin, Pinterest } from "lucide-react";
import { useSiteSettings } from "@/lib/useApi";

export default function Footer() {
  const { data: settings } = useSiteSettings();

  const phone = settings?.phone || "+91 98765 43210";
  const email = settings?.email || "support@yunora.com";
  const address = settings?.address || "Panipat, Haryana 132103, India";
  const whatsapp = settings?.whatsapp || phone;

  return (
    <footer className="bg-[#2A1F18] text-[#F3EFE9] pt-16 pb-24 lg:pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          <div>
            <img src={logoWhite} alt="YUNORA" className="h-10 mb-6" />
            <p className="text-[#F3EFE9]/80 text-sm leading-relaxed mb-6 font-sans font-light">
              {settings?.siteName
                ? `${settings.siteName} — transforming homes with timeless designs, premium fabrics and exceptional craftsmanship.`
                : "Transforming homes with timeless designs, premium fabrics and exceptional craftsmanship. India's premier luxury home furnishing brand."}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {settings?.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-[#F3EFE9]/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {settings?.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-[#F3EFE9]/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {settings?.twitter && (
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-[#F3EFE9]/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {settings?.youtube && (
                <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-[#F3EFE9]/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                  <Youtube className="h-4 w-4" />
                </a>
              )}
              {!settings && (
                <>
                  <a href="#" className="w-9 h-9 rounded-full border border-[#F3EFE9]/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"><Facebook className="h-4 w-4" /></a>
                  <a href="#" className="w-9 h-9 rounded-full border border-[#F3EFE9]/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"><Instagram className="h-4 w-4" /></a>
                  <a href="#" className="w-9 h-9 rounded-full border border-[#F3EFE9]/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors"><Youtube className="h-4 w-4" /></a>
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 font-sans text-sm text-[#F3EFE9]/80 font-light">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link href="/collections" className="hover:text-primary transition-colors">Collections</Link></li>
              <li><Link href="/manufacturing" className="hover:text-primary transition-colors">Manufacturing</Link></li>
              <li><Link href="/blogs" className="hover:text-primary transition-colors">Blogs</Link></li>
              <li><Link href="/become-dealer" className="hover:text-primary transition-colors">Become a Dealer</Link></li>
              <li><Link href="/store-locator" className="hover:text-primary transition-colors">Store Locator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-3 font-sans text-sm text-[#F3EFE9]/80 font-light">
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-primary transition-colors">Return Policy</Link></li>
              <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 font-sans text-sm text-[#F3EFE9]/80 font-light">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">
                  {phone}
                </a>
              </li>
              {whatsapp && (
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-green-400" />
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors"
                  >
                    WhatsApp: {whatsapp}
                  </a>
                </li>
              )}
              <li className="flex gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-[#F3EFE9]/10 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-[#F3EFE9]/60">
          <p>&copy; {new Date().getFullYear()} {settings?.siteName || "YUNORA Luxury Furnishing"}. All rights reserved.</p>
          <div className="flex gap-2 items-center opacity-70">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>UPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
