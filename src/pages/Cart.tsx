import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Link } from "wouter";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Minus, Plus, X } from "lucide-react";

export default function Cart() {
  const { cartCount } = useCart();
  const cartItems = products.slice(0, cartCount > 0 ? 2 : 0);
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const delivery = 0;
  const discount = subtotal > 3000 ? 500 : 0;
  const total = subtotal + delivery - discount;

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow pt-8 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shopping Cart" }]} />
          
          <h1 className="font-serif text-4xl mb-8 text-foreground">Shopping Cart</h1>
          
          {cartCount === 0 ? (
            <div className="text-center py-24 bg-card border border-border/30 rounded-lg shadow-sm">
              <h2 className="font-serif text-2xl mb-4">Your cart is currently empty</h2>
              <p className="text-muted-foreground mb-8 font-light">Discover our luxury collections to find your next perfect piece.</p>
              <Link href="/shop" className="inline-block bg-primary text-primary-foreground px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-primary/90 transition-colors">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-grow">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-6 py-6 border-b border-border/50">
                      <div className="w-24 h-32 bg-muted/30 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link href={`/product/${item.id}`} className="font-serif text-lg hover:text-primary transition-colors">
                              {item.name}
                            </Link>
                            <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                          </div>
                          <button className="text-muted-foreground hover:text-destructive transition-colors">
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="flex items-center border border-border h-10 w-28">
                            <button className="px-2 text-muted-foreground hover:text-foreground transition-colors"><Minus className="h-3 w-3" /></button>
                            <span className="flex-1 text-center text-sm font-medium">1</span>
                            <button className="px-2 text-muted-foreground hover:text-foreground transition-colors"><Plus className="h-3 w-3" /></button>
                          </div>
                          <span className="font-medium">₹{item.price.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors underline underline-offset-4">
                    Continue Shopping
                  </Link>
                </div>
              </div>
              
              <div className="w-full lg:w-96 flex-shrink-0">
                <div className="bg-card border border-border/30 rounded-lg p-6 shadow-sm sticky top-24">
                  <h2 className="font-serif text-xl mb-6 border-b border-border/50 pb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Delivery</span>
                      <span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-border/50 pt-4 mb-6">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Total</span>
                      <span className="text-xl font-medium">₹{total.toLocaleString("en-IN")}</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-right">Inclusive of all taxes</p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Promo Code" 
                        className="flex-1 border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary"
                      />
                      <button className="bg-foreground text-background px-4 py-2 text-sm hover:bg-foreground/90 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                  
                  <Link href="/checkout" className="block w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-center text-sm font-medium tracking-widest uppercase transition-colors">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
