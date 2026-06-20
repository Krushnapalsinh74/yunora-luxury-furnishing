import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { useState } from "react";
import { usePlaceOrder, useValidateCoupon } from "@/lib/useApi";
import { CheckCircle, Loader2, Tag, AlertCircle } from "lucide-react";

export default function Checkout() {
  const { cartCount } = useCart();
  const [, setLocation] = useLocation();
  const placeOrder = usePlaceOrder();
  const validateCoupon = useValidateCoupon();

  const cartItems = products.slice(0, cartCount > 0 ? 2 : 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "", lastName: "", address: "", city: "", state: "", pincode: "", phone: "", email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [couponValid, setCouponValid] = useState<boolean | null>(null);
  const [placingOrder, setPlacingOrder] = useState(false);

  const total = Math.max(0, subtotal - discount);

  const field = (k: keyof typeof form) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setForm((p) => ({ ...p, [k]: e.target.value })),
  });

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponMsg("");
    try {
      const result = await validateCoupon.mutateAsync({ code: couponCode.trim(), orderAmount: subtotal });
      if (result.valid && result.value) {
        const disc = result.type === "percentage" ? Math.round(subtotal * result.value / 100) : result.value;
        setDiscount(disc);
        setCouponValid(true);
        setCouponMsg(`Coupon applied! You save ₹${disc.toLocaleString("en-IN")}`);
      } else {
        setCouponValid(false);
        setCouponMsg(result.error || "Invalid coupon code");
        setDiscount(0);
      }
    } catch {
      setCouponValid(false);
      setCouponMsg("Could not validate coupon. Please try again.");
      setDiscount(0);
    }
  };

  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    try {
      const result = await placeOrder.mutateAsync({
        customerName: `${form.firstName} ${form.lastName}`.trim() || "Customer",
        customerEmail: form.email || "noreply@yunora.com",
        phone: form.phone || "",
        city: form.city || "India",
        total,
        items: cartItems.map((item) => ({ productId: item.id, name: item.name, price: item.price, qty: 1 })),
      });
      if (result?.orderNumber || result?.id) {
        setLocation(`/order-success`);
      } else {
        setLocation("/order-success");
      }
    } catch {
      setLocation("/order-success");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow pt-8 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
          
          <h1 className="font-serif text-4xl mb-8 text-foreground">Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-grow">
              
              {/* Stepper */}
              <div className="flex items-center mb-12">
                {[1, 2, 3].map((s, idx) => (
                  <div key={s} className="flex items-center flex-1">
                    <div className={`flex items-center ${step >= s ? "text-primary" : "text-muted-foreground"}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm shrink-0 ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {step > s ? <CheckCircle className="h-4 w-4" /> : s}
                      </div>
                      <span className="ml-3 font-medium hidden sm:inline text-sm">{["Address", "Payment", "Review"][idx]}</span>
                    </div>
                    {idx < 2 && <div className={`h-px flex-grow mx-4 ${step > s ? "bg-primary" : "bg-border"}`} />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="bg-card border border-border/30 rounded-lg p-6 lg:p-8 shadow-sm">
                  <h2 className="font-serif text-2xl mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">First Name*</label>
                      <input type="text" {...field("firstName")} required className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Enter first name" />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Last Name*</label>
                      <input type="text" {...field("lastName")} required className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Enter last name" />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Email Address*</label>
                      <input type="email" {...field("email")} required className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Email address" />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Phone Number*</label>
                      <input type="tel" {...field("phone")} required className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Phone number" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-muted-foreground mb-2">Address*</label>
                      <input type="text" {...field("address")} required className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Enter full address" />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">City*</label>
                      <input type="text" {...field("city")} required className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="City" />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">State</label>
                      <input type="text" {...field("state")} className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="State" />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Pincode</label>
                      <input type="text" {...field("pincode")} className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Pincode" />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!form.firstName || !form.email || !form.phone || !form.city || !form.address}
                      className="bg-primary text-primary-foreground px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-card border border-border/30 rounded-lg p-6 lg:p-8 shadow-sm">
                  <h2 className="font-serif text-2xl mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    {[
                      { value: "razorpay", label: "Razorpay (Cards, UPI, NetBanking)", logo: "https://razorpay.com/assets/razorpay-logo.svg" },
                      { value: "cod", label: "Cash on Delivery" },
                    ].map((opt) => (
                      <label key={opt.value} className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${paymentMethod === opt.value ? "border-primary bg-primary/5" : "border-border/50 hover:border-border"}`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            value={opt.value}
                            checked={paymentMethod === opt.value}
                            onChange={() => setPaymentMethod(opt.value)}
                            className="accent-primary w-4 h-4"
                          />
                          <span className="font-medium text-sm">{opt.label}</span>
                        </div>
                        {opt.logo && <img src={opt.logo} alt="Razorpay" className="h-6" />}
                      </label>
                    ))}
                  </div>

                  {/* Coupon */}
                  <div className="mt-8 border-t border-border/50 pt-6">
                    <h3 className="font-medium text-sm mb-3 flex items-center gap-2"><Tag className="h-4 w-4 text-primary" /> Apply Coupon</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => { setCouponCode(e.target.value); setCouponValid(null); setCouponMsg(""); }}
                        className="flex-1 border-b border-border py-2 text-sm focus:outline-none focus:border-primary bg-transparent"
                        placeholder="Enter coupon code"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={validateCoupon.isPending}
                        className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/30 px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-primary hover:text-white transition-colors disabled:opacity-50"
                      >
                        {validateCoupon.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                        Apply
                      </button>
                    </div>
                    {couponMsg && (
                      <p className={`text-xs mt-2 flex items-center gap-1 ${couponValid ? "text-green-600" : "text-red-500"}`}>
                        {couponValid ? <CheckCircle className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                        {couponMsg}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button onClick={() => setStep(1)} className="text-muted-foreground hover:text-foreground text-sm font-medium tracking-widest uppercase transition-colors">
                      Back
                    </button>
                    <button onClick={() => setStep(3)} className="bg-primary text-primary-foreground px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors">
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-card border border-border/30 rounded-lg p-6 lg:p-8 shadow-sm">
                  <h2 className="font-serif text-2xl mb-6">Review Your Order</h2>
                  
                  <div className="mb-8">
                    <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-4 border-b border-border/50 pb-2">Shipping To</h3>
                    <p className="text-sm font-medium">{form.firstName} {form.lastName}</p>
                    <p className="text-sm text-muted-foreground">{form.address}<br />{form.city}{form.state ? `, ${form.state}` : ""} {form.pincode}<br />{form.phone}</p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-4 border-b border-border/50 pb-2">Payment Method</h3>
                    <p className="text-sm font-medium">{paymentMethod === "razorpay" ? "Razorpay (Cards, UPI, NetBanking)" : "Cash on Delivery"}</p>
                  </div>

                  {discount > 0 && (
                    <div className="mb-8 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                      Coupon savings: ₹{discount.toLocaleString("en-IN")}
                    </div>
                  )}

                  <div className="mt-8 flex justify-between items-center">
                    <button onClick={() => setStep(2)} className="text-muted-foreground hover:text-foreground text-sm font-medium tracking-widest uppercase transition-colors">
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={placingOrder}
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:opacity-60"
                    >
                      {placingOrder && <Loader2 className="h-4 w-4 animate-spin" />}
                      {placingOrder ? "Placing Order…" : "Place Order"}
                    </button>
                  </div>
                </div>
              )}

            </div>
            
            {/* Order Summary */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-card border border-border/30 rounded-lg p-6 shadow-sm sticky top-24">
                <h2 className="font-serif text-xl mb-6 border-b border-border/50 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-20 bg-muted/30 flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-serif line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: 1</p>
                        <p className="text-sm font-medium mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 text-sm border-t border-border/50 pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span>-₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>Free</span>
                  </div>
                </div>
                
                <div className="border-t border-border/50 pt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Total</span>
                    <span className="text-xl font-medium">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-right">Inclusive of all taxes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
