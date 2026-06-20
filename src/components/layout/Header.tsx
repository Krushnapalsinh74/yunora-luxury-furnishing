import { Search, Heart, User, ShoppingBag, Menu } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/context/CartContext";
import logo from "@assets/02_1781943228013.png";

export default function Header() {
  const { cartCount, wishlistCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border">
      <div className="h-16 lg:h-20 flex items-center px-4 lg:px-8 relative">

        {/* Mobile: Hamburger left */}
        <div className="flex items-center lg:hidden absolute left-4">
          <button className="p-1" data-testid="button-mobile-menu">
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </div>

        {/* Desktop: Logo left */}
        <Link href="/" className="hidden lg:flex flex-col items-start justify-center cursor-pointer group shrink-0" data-testid="link-home-logo-desktop">
          <img src={logo} alt="YUNORA" className="h-9 object-contain group-hover:opacity-90 transition-opacity" />
          <span className="text-[0.55rem] tracking-[0.25em] font-medium text-foreground/60 mt-0.5">LUXURY FURNISHING</span>
        </Link>

        {/* Mobile: Logo center */}
        <Link href="/" className="lg:hidden absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer group" data-testid="link-home-logo-mobile">
          <img src={logo} alt="YUNORA" className="h-7 object-contain group-hover:opacity-90 transition-opacity" />
          <span className="text-[0.5rem] tracking-[0.2em] font-medium text-foreground/60 mt-0.5">LUXURY FURNISHING</span>
        </Link>

        {/* Desktop: Nav center */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[0.7rem] xl:text-xs font-medium tracking-widest absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="hover:text-primary transition-colors text-primary border-b border-primary pb-0.5">HOME</Link>
          <Link href="/shop" className="hover:text-primary transition-colors">SHOP</Link>
          <Link href="/categories" className="hover:text-primary transition-colors">CATEGORIES</Link>
          <Link href="/collections" className="hover:text-primary transition-colors">COLLECTIONS</Link>
          <Link href="/new-arrivals" className="hover:text-primary transition-colors">NEW ARRIVALS</Link>
          <Link href="/best-sellers" className="hover:text-primary transition-colors">BEST SELLERS</Link>
          <Link href="/about" className="hover:text-primary transition-colors">ABOUT US</Link>
          <Link href="/manufacturing" className="hover:text-primary transition-colors">MANUFACTURING</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">CONTACT US</Link>
        </nav>

        {/* Icons — right side for both mobile and desktop */}
        <div className="flex items-center gap-3 lg:gap-5 ml-auto">
          <Link href="/search" className="text-foreground hover:text-primary transition-colors" data-testid="link-search">
            <Search className="h-5 w-5" />
          </Link>
          <Link href="/wishlist" className="relative text-foreground hover:text-primary transition-colors hidden lg:block" data-testid="link-wishlist">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/profile" className="hidden lg:block text-foreground hover:text-primary transition-colors" data-testid="link-profile">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="relative text-foreground hover:text-primary transition-colors" data-testid="link-cart">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
