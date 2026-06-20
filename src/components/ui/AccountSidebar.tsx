import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  MessageSquare, 
  LogOut 
} from "lucide-react";

export default function AccountSidebar() {
  const [location] = useLocation();

  const links = [
    { label: "Dashboard", href: "/profile", icon: LayoutDashboard },
    { label: "My Orders", href: "/profile/orders", icon: ShoppingBag },
    { label: "Wishlist", href: "/wishlist", icon: Heart },
    { label: "Addresses", href: "/profile/addresses", icon: MapPin },
    { label: "Warranty", href: "/profile/warranty", icon: ShieldCheck },
    { label: "Feedback", href: "/profile/feedback", icon: MessageSquare },
  ];

  return (
    <div className="bg-card border border-border/30 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border/30 bg-muted/10">
        <h2 className="font-serif text-2xl">My Account</h2>
        <p className="text-muted-foreground text-sm mt-1">Manage your luxury experience</p>
      </div>
      <nav className="flex flex-col py-2">
        {links.map((link) => {
          const isActive = location === link.href;
          const Icon = link.icon;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center gap-3 px-6 py-4 text-sm transition-colors border-l-2 ${
                isActive 
                  ? "border-primary bg-primary/5 text-primary font-medium" 
                  : "border-transparent text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
        <button className="flex items-center gap-3 px-6 py-4 text-sm transition-colors border-l-2 border-transparent text-destructive hover:bg-destructive/5 text-left w-full">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </nav>
    </div>
  );
}
