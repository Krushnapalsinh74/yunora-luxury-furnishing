import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { products, categories } from "@/data/products";
import {
  LayoutDashboard, User, ShoppingBag, MapPin, Heart, ShieldCheck,
  MessageSquare, Gift, Lock, LogOut, Star, Package, ChevronRight,
  Edit2, Camera, Phone, Mail, Calendar, Plus, Trash2, Check,
  Download, RotateCcw, Ticket, Bell, Eye, EyeOff, Award,
  TrendingUp, Clock, AlertCircle, CheckCircle2, Truck, X, Tag
} from "lucide-react";

type Section =
  | "dashboard" | "profile" | "orders" | "track"
  | "wishlist" | "saved" | "warranty" | "feedback"
  | "addresses" | "coupons" | "rewards" | "security";

const mockOrders = [
  { id: "YUN12345", date: "28 May 2024", status: "Delivered", statusColor: "bg-green-100 text-green-700", amount: 85999, product: products[0], size: "Large" },
  { id: "YUN12346", date: "26 May 2024", status: "Shipped", statusColor: "bg-blue-100 text-blue-700", amount: 45499, product: products[1], size: "King" },
  { id: "YUN12347", date: "24 May 2024", status: "Processing", statusColor: "bg-amber-100 text-amber-700", amount: 22999, product: products[2], size: "Medium" },
];

const mockAddresses = [
  { id: 1, label: "Home", name: "Arjun Mehta", line1: "402, Skyline Towers, Bandra West", city: "Mumbai", state: "Maharashtra", pin: "400050", phone: "+91 98765 43210", isDefault: true },
  { id: 2, label: "Work", name: "Arjun Mehta", line1: "21st Floor, One BKC, G Block", city: "Mumbai", state: "Maharashtra", pin: "400051", phone: "+91 98765 43210", isDefault: false },
];

const mockCoupons = [
  { code: "YUNORA20", discount: "20% OFF", min: "₹3,000", expires: "30 Jun 2024", used: false },
  { code: "NEWUSER15", discount: "15% OFF", min: "₹1,500", expires: "31 Jul 2024", used: false },
  { code: "FESTIVE30", discount: "30% OFF", min: "₹5,000", expires: "15 Jun 2024", used: true },
];

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "profile", label: "My Profile", icon: User },
  { key: "orders", label: "My Orders", icon: ShoppingBag },
  { key: "track", label: "Track Orders", icon: Truck },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "saved", label: "Saved Products", icon: Tag },
  { key: "warranty", label: "Warranty Center", icon: ShieldCheck },
  { key: "feedback", label: "Feedback & Reviews", icon: MessageSquare },
  { key: "addresses", label: "Saved Addresses", icon: MapPin },
  { key: "coupons", label: "Rewards & Coupons", icon: Gift },
  { key: "rewards", label: "Reward Points", icon: Award },
  { key: "security", label: "Security Settings", icon: Lock },
];

function StatusBadge({ status, color }: { status: string; color: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${color}`}>
      {status}
    </span>
  );
}

/* ─── SECTIONS ─── */

function DashboardSection({ setSection }: { setSection: (s: Section) => void }) {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="font-serif text-3xl lg:text-4xl text-foreground">Welcome back, Arjun</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your account today.</p>
      </div>

      {/* User Info + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {/* User card */}
        <div className="lg:col-span-2 bg-card border border-border/30 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center border-2 border-primary/30 overflow-hidden">
              <User className="h-9 w-9 text-primary" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-serif text-xl text-foreground truncate">Arjun Mehta</p>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs mt-1"><Mail className="h-3 w-3 shrink-0" /><span className="truncate">arjun.mehta@email.com</span></div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs mt-0.5"><Phone className="h-3 w-3 shrink-0" /><span>+91 98765 43210</span></div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs mt-0.5"><Calendar className="h-3 w-3 shrink-0" /><span>Member since May 2023</span></div>
            <button onClick={() => setSection("profile")} className="mt-3 inline-flex items-center gap-1.5 bg-primary text-white text-xs px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors">
              <Edit2 className="h-3 w-3" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Stat cards */}
        {[
          { icon: ShoppingBag, label: "Orders", value: "24", link: "orders" as Section, color: "text-blue-500 bg-blue-50" },
          { icon: Heart, label: "Wishlist", value: "12", link: "wishlist" as Section, color: "text-rose-500 bg-rose-50" },
          { icon: ShieldCheck, label: "Warranty Products", value: "5", link: "warranty" as Section, color: "text-emerald-500 bg-emerald-50" },
          { icon: Award, label: "Reward Points", value: "1,250", link: "rewards" as Section, color: "text-amber-500 bg-amber-50" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border/30 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-primary/40 transition-colors group">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color} mb-3`}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{s.label}</p>
            <p className="font-serif text-3xl text-foreground">{s.value}</p>
            <button onClick={() => setSection(s.link)} className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-medium hover:gap-2 transition-all">
              View all <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Recent Orders + Warranty Status side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Recent Orders */}
        <div className="lg:col-span-3 bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
            <h3 className="font-serif text-lg">Recent Orders</h3>
            <button onClick={() => setSection("orders")} className="text-xs text-primary font-medium hover:underline underline-offset-2">View All Orders →</button>
          </div>
          <div className="p-4 space-y-3">
            {mockOrders.map((o) => (
              <div key={o.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors group">
                <div className="w-14 h-16 bg-muted/30 rounded-lg overflow-hidden shrink-0">
                  <img src={o.product.image} alt={o.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{o.product.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Order #{o.id} • {o.date}</p>
                  <StatusBadge status={o.status} color={o.statusColor} />
                </div>
                <div className="text-right shrink-0">
                  <p className="font-serif text-base font-medium">₹{o.amount.toLocaleString("en-IN")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warranty Status */}
        <div className="lg:col-span-2 bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
            <h3 className="font-serif text-lg">Warranty Status</h3>
            <button onClick={() => setSection("warranty")} className="text-xs text-primary font-medium hover:underline underline-offset-2">View All →</button>
          </div>
          <div className="p-5 flex-1">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-20 h-20 bg-muted/30 rounded-xl overflow-hidden shrink-0">
                <img src={products[0].image} alt="Sofa Set" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-medium text-sm">Royal Velvet Curtain Set</p>
                <p className="text-xs text-muted-foreground mt-0.5">Warranty ID: WAR12345</p>
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-medium mt-1.5">
                  <Check className="h-3 w-3" /> Active
                </span>
              </div>
              <div className="ml-auto w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground border-t border-border/30 pt-4">
              <p>Valid till <span className="text-foreground font-medium">28 May 2026</span></p>
              <p>2 Years Warranty Coverage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Products + Promo */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
            <h3 className="font-serif text-lg">Saved Products</h3>
            <button onClick={() => setSection("wishlist")} className="text-xs text-primary font-medium hover:underline underline-offset-2">View Wishlist →</button>
          </div>
          <div className="p-4 grid grid-cols-4 gap-3">
            {products.slice(0, 4).map((p) => (
              <Link key={p.id} href={`/product/${p.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden mb-2">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="text-xs font-medium truncate leading-tight">{p.name}</p>
                  <p className="text-xs text-primary font-medium">₹{p.price.toLocaleString("en-IN")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Promo banner */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden relative min-h-40">
          <img src={products[2].image} alt="New Collection" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="relative p-6 h-full flex flex-col justify-center">
            <p className="text-white/70 text-xs tracking-widest uppercase mb-1">Premium Collection</p>
            <h4 className="font-serif text-white text-xl leading-tight mb-2">Elevate Your Space<br />With YUNORA</h4>
            <p className="text-white/70 text-xs mb-4">Discover timeless pieces crafted for a life well-lived.</p>
            <Link href="/collections">
              <button className="inline-flex bg-primary text-white text-xs px-5 py-2.5 font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm w-fit">
                Explore Collection
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyProfileSection() {
  const [formData, setFormData] = useState({
    firstName: "Arjun", lastName: "Mehta", email: "arjun.mehta@email.com",
    phone: "+91 98765 43210", address: "402, Skyline Towers, Bandra West",
    city: "Mumbai", state: "Maharashtra", pin: "400050",
  });
  const [saved, setSaved] = useState(false);

  const update = (k: string, v: string) => setFormData((p) => ({ ...p, [k]: v }));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const Field = ({ label, k, type = "text" }: { label: string; k: keyof typeof formData; type?: string }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={formData[k]}
        onChange={(e) => update(k, e.target.value)}
        className="border-b border-border bg-transparent py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40"
        data-testid={`input-profile-${k}`}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl">My Profile</h2>
        <p className="text-muted-foreground mt-1">Manage your personal information</p>
      </div>

      <div className="bg-card border border-border/30 rounded-2xl p-8 shadow-sm">
        {/* Avatar */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/30">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center border-2 border-primary/30">
              <User className="h-11 w-11 text-primary" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors" data-testid="button-change-avatar">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <p className="font-serif text-xl">Arjun Mehta</p>
            <p className="text-muted-foreground text-sm mt-0.5">Member since May 2023</p>
            <p className="text-xs text-primary mt-1.5 font-medium">Click camera icon to change photo</p>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <Field label="First Name" k="firstName" />
          <Field label="Last Name" k="lastName" />
          <Field label="Email Address" k="email" type="email" />
          <Field label="Phone Number" k="phone" type="tel" />
          <div className="sm:col-span-2">
            <Field label="Address" k="address" />
          </div>
          <Field label="City" k="city" />
          <Field label="State" k="state" />
          <Field label="PIN Code" k="pin" />
        </div>

        <button
          onClick={handleSave}
          className={`inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium tracking-wider uppercase transition-all ${saved ? "bg-green-500 text-white" : "bg-primary text-white hover:bg-primary/90"}`}
          data-testid="button-save-profile"
        >
          {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved!</> : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function OrdersSection() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl">My Orders</h2>
        <p className="text-muted-foreground mt-1">Track and manage all your orders</p>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1 bg-muted/30 rounded-xl p-1">
        {tabs.map((t) => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === t ? "bg-card text-primary shadow-sm border border-border/30" : "text-muted-foreground hover:text-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {mockOrders.filter((o) => activeTab === "All" || o.status === activeTab).map((order) => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex flex-wrap gap-6 justify-between items-center px-6 py-4 bg-muted/10 border-b border-border/30">
              <div className="flex gap-8">
                <div><p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Order Placed</p><p className="text-sm font-medium">{order.date}</p></div>
                <div><p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Total</p><p className="text-sm font-medium">₹{order.amount.toLocaleString("en-IN")}</p></div>
                <div><p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Order #</p><p className="text-sm font-medium">{order.id}</p></div>
              </div>
              <StatusBadge status={order.status} color={order.statusColor} />
            </div>
            <div className="p-6">
              <div className="flex gap-5 items-start">
                <div className="w-20 h-24 bg-muted/30 rounded-xl overflow-hidden shrink-0">
                  <img src={order.product.image} alt={order.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-serif text-lg">{order.product.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">Size: {order.size} • Qty: 1 • Category: {order.product.category}</p>
                  <p className="font-medium mt-2">₹{order.product.price.toLocaleString("en-IN")}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Link href="/track-order">
                    <button className="flex items-center gap-1.5 border border-border rounded-lg px-4 py-2 text-xs font-medium hover:border-primary hover:text-primary transition-colors" data-testid={`button-track-${order.id}`}>
                      <Truck className="h-3.5 w-3.5" /> Track
                    </button>
                  </Link>
                  <button className="flex items-center gap-1.5 border border-border rounded-lg px-4 py-2 text-xs font-medium hover:border-primary hover:text-primary transition-colors" data-testid={`button-invoice-${order.id}`}>
                    <Download className="h-3.5 w-3.5" /> Invoice
                  </button>
                  <button className="flex items-center gap-1.5 border border-border rounded-lg px-4 py-2 text-xs font-medium hover:border-primary hover:text-primary transition-colors" data-testid={`button-reorder-${order.id}`}>
                    <RotateCcw className="h-3.5 w-3.5" /> Reorder
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {mockOrders.filter((o) => activeTab === "All" || o.status === activeTab).length === 0 && (
          <div className="bg-card border border-border/30 rounded-2xl p-16 text-center shadow-sm">
            <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="font-serif text-xl text-foreground mb-2">No {activeTab} orders</p>
            <p className="text-muted-foreground text-sm">Orders with {activeTab.toLowerCase()} status will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TrackSection() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [tracked, setTracked] = useState(false);

  const steps = [
    { label: "Order Placed", date: "24 May 2024, 10:30 AM", done: true },
    { label: "Processing", date: "25 May 2024, 2:00 PM", done: true },
    { label: "Shipped", date: "26 May 2024, 9:00 AM", done: true },
    { label: "Out for Delivery", date: "28 May 2024, 8:00 AM", done: false },
    { label: "Delivered", date: "Expected 28 May 2024", done: false },
  ];

  return (
    <div className="space-y-6">
      <div><h2 className="font-serif text-3xl">Track Order</h2><p className="text-muted-foreground mt-1">Enter your order details to track</p></div>
      <div className="bg-card border border-border/30 rounded-2xl p-8 shadow-sm">
        <div className="grid sm:grid-cols-2 gap-5 mb-6">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">Order ID</label>
            <input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="e.g. YUN12345" className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-primary transition-colors" data-testid="input-track-orderid" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">Phone Number</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-primary transition-colors" data-testid="input-track-phone" />
          </div>
        </div>
        <button onClick={() => setTracked(true)} className="bg-primary text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm" data-testid="button-track-order">
          Track Order
        </button>
      </div>

      {tracked && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-border/30 flex items-center justify-between">
            <div><p className="font-serif text-lg">Order #YUN12345</p><p className="text-sm text-muted-foreground mt-0.5">Estimated delivery: 28 May 2024</p></div>
            <StatusBadge status="Shipped" color="bg-blue-100 text-blue-700" />
          </div>
          <div className="p-8">
            <div className="relative">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-5 mb-6 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 shrink-0 z-10 ${step.done ? "bg-primary border-primary text-white" : "bg-card border-border/40 text-muted-foreground"}`}>
                      {step.done ? <Check className="h-4 w-4" /> : <div className="w-2 h-2 rounded-full bg-border" />}
                    </div>
                    {i < steps.length - 1 && <div className={`w-0.5 flex-1 mt-1 ${step.done ? "bg-primary" : "bg-border/40"}`} style={{ minHeight: "32px" }} />}
                  </div>
                  <div className="pb-6 last:pb-0">
                    <p className={`font-medium text-sm ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function WishlistSection() {
  const [items, setItems] = useState(products.slice(0, 6));
  const remove = (id: number) => setItems((p) => p.filter((x) => x.id !== id));

  return (
    <div className="space-y-6">
      <div><h2 className="font-serif text-3xl">Wishlist</h2><p className="text-muted-foreground mt-1">{items.length} saved items</p></div>
      {items.length === 0 ? (
        <div className="bg-card border border-border/30 rounded-2xl p-16 text-center shadow-sm">
          <Heart className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="font-serif text-xl mb-2">Your wishlist is empty</p>
          <Link href="/shop"><button className="bg-primary text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors">Explore Collection</button></Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p) => (
            <motion.div key={p.id} layout className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden group">
              <div className="relative aspect-square overflow-hidden bg-muted/20">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button onClick={() => remove(p.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center text-destructive hover:bg-destructive hover:text-white transition-colors" data-testid={`button-remove-wish-${p.id}`}>
                  <X className="h-3.5 w-3.5" />
                </button>
                {p.badge && <span className="absolute top-3 left-3 bg-card text-foreground text-[10px] font-medium tracking-widest px-2 py-1 uppercase shadow-sm">{p.badge}</span>}
              </div>
              <div className="p-4">
                <p className="font-serif text-base leading-tight mb-1">{p.name}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-medium text-sm">₹{p.price.toLocaleString("en-IN")}</span>
                  {p.originalPrice && <span className="text-muted-foreground text-xs line-through">₹{p.originalPrice.toLocaleString("en-IN")}</span>}
                </div>
                <button className="w-full bg-primary/10 text-primary border border-primary/30 py-2.5 text-xs font-medium tracking-wider uppercase hover:bg-primary hover:text-white transition-all" data-testid={`button-move-cart-${p.id}`}>Move to Cart</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function SavedSection() {
  return (
    <div className="space-y-6">
      <div><h2 className="font-serif text-3xl">Saved Products</h2><p className="text-muted-foreground mt-1">Products you've saved for later</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`}>
            <div className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden group cursor-pointer hover:border-primary/40 transition-colors">
              <div className="aspect-square bg-muted/20 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <p className="text-xs font-medium leading-tight truncate">{p.name}</p>
                <p className="text-xs text-primary font-medium mt-1">₹{p.price.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function WarrantySection() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div><h2 className="font-serif text-3xl">Warranty Center</h2><p className="text-muted-foreground mt-1">Register and manage your product warranties</p></div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm" data-testid="button-register-warranty">
          <Plus className="h-3.5 w-3.5" /> Register Product
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border/30 rounded-2xl p-8 shadow-sm">
          <h3 className="font-serif text-xl mb-6">Register New Warranty</h3>
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            {[["Product Name", "text"], ["Order ID", "text"], ["Purchase Date", "date"], ["Invoice Number", "text"]].map(([l]) => (
              <div key={l}><label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{l}</label><input className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" /></div>
            ))}
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">Upload Invoice</label>
              <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Download className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Drag & drop or <span className="text-primary font-medium">browse files</span></p>
                <p className="text-xs text-muted-foreground/60 mt-1">PDF, JPG, PNG up to 5MB</p>
              </div>
            </div>
          </div>
          <button className="bg-primary text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm">Verify & Register</button>
        </motion.div>
      )}

      <div className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border/30"><h3 className="font-serif text-lg">Active Warranties</h3></div>
        <div className="p-5 space-y-4">
          {products.slice(0, 3).map((p, i) => (
            <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl border border-border/20 hover:border-primary/30 transition-colors">
              <div className="w-16 h-16 bg-muted/30 rounded-xl overflow-hidden shrink-0"><img src={p.image} alt={p.name} className="w-full h-full object-cover" /></div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Warranty ID: WAR{12345 + i}</p>
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-medium mt-1"><Check className="h-2.5 w-2.5" /> Active</span>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-muted-foreground">Valid till</p>
                <p className="text-sm font-medium">May 2026</p>
                <p className="text-xs text-muted-foreground">2 Years</p>
              </div>
              <button className="ml-2 border border-border rounded-lg p-2 hover:border-primary hover:text-primary transition-colors" data-testid={`button-download-warranty-${p.id}`}><Download className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeedbackSection() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-6">
      <div><h2 className="font-serif text-3xl">Feedback & Reviews</h2><p className="text-muted-foreground mt-1">Share your experience with us</p></div>
      <div className="bg-card border border-border/30 rounded-2xl p-8 shadow-sm">
        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="font-serif text-2xl mb-2">Thank You!</h3>
            <p className="text-muted-foreground">Your feedback has been submitted successfully.</p>
          </div>
        ) : (
          <>
            <h3 className="font-serif text-xl mb-6">Rate Your Experience</h3>
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => setRating(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} className="transition-transform hover:scale-110" data-testid={`button-star-${s}`}>
                  <Star className={`h-9 w-9 transition-colors ${s <= (hover || rating) ? "text-amber-400 fill-amber-400" : "text-border"}`} />
                </button>
              ))}
              {rating > 0 && <span className="ml-3 text-sm text-muted-foreground self-center">({["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]})</span>}
            </div>
            <div className="space-y-5 mb-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div><label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">Your Name</label><input className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="Arjun Mehta" /></div>
                <div><label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">Email</label><input className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" placeholder="arjun@email.com" /></div>
              </div>
              <div><label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">Your Feedback</label><textarea rows={5} className="w-full border border-border rounded-xl bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Share your experience with YUNORA..." /></div>
            </div>
            <button onClick={() => setSubmitted(true)} className="bg-primary text-white px-8 py-3.5 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm" data-testid="button-submit-feedback">Submit Feedback</button>
          </>
        )}
      </div>
    </div>
  );
}

function AddressesSection() {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [showAdd, setShowAdd] = useState(false);
  const remove = (id: number) => setAddresses((p) => p.filter((a) => a.id !== id));
  const setDefault = (id: number) => setAddresses((p) => p.map((a) => ({ ...a, isDefault: a.id === id })));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div><h2 className="font-serif text-3xl">Saved Addresses</h2><p className="text-muted-foreground mt-1">Manage your delivery addresses</p></div>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm" data-testid="button-add-address">
          <Plus className="h-3.5 w-3.5" /> Add Address
        </button>
      </div>

      {showAdd && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border/30 rounded-2xl p-8 shadow-sm">
          <h3 className="font-serif text-xl mb-6">New Address</h3>
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            {["Label (Home/Work)", "Full Name", "Address Line 1", "City", "State", "PIN Code", "Phone Number"].map((l) => (
              <div key={l} className={l.startsWith("Address") ? "sm:col-span-2" : ""}>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{l}</label>
                <input className="w-full border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
            ))}
          </div>
          <button onClick={() => setShowAdd(false)} className="bg-primary text-white px-8 py-3 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm">Save Address</button>
        </motion.div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div key={addr.id} className={`bg-card border rounded-2xl p-6 shadow-sm relative ${addr.isDefault ? "border-primary/50 bg-primary/5" : "border-border/30"}`}>
            {addr.isDefault && <span className="absolute top-4 right-4 bg-primary/10 text-primary text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider">Default</span>}
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold tracking-wider uppercase text-foreground">{addr.label}</span>
            </div>
            <p className="font-medium text-sm mb-1">{addr.name}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{addr.line1}, {addr.city}, {addr.state} – {addr.pin}</p>
            <p className="text-sm text-muted-foreground mt-1">{addr.phone}</p>
            <div className="flex gap-2 mt-4">
              <button className="flex items-center gap-1.5 border border-border rounded-lg px-4 py-2 text-xs font-medium hover:border-primary hover:text-primary transition-colors" data-testid={`button-edit-addr-${addr.id}`}><Edit2 className="h-3 w-3" /> Edit</button>
              <button onClick={() => remove(addr.id)} className="flex items-center gap-1.5 border border-border rounded-lg px-4 py-2 text-xs font-medium hover:border-destructive hover:text-destructive transition-colors" data-testid={`button-delete-addr-${addr.id}`}><Trash2 className="h-3 w-3" /> Delete</button>
              {!addr.isDefault && (
                <button onClick={() => setDefault(addr.id)} className="flex items-center gap-1.5 border border-border rounded-lg px-4 py-2 text-xs font-medium hover:border-primary hover:text-primary transition-colors" data-testid={`button-default-addr-${addr.id}`}><Check className="h-3 w-3" /> Set Default</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CouponsSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (code: string) => { navigator.clipboard?.writeText(code); setCopied(code); setTimeout(() => setCopied(null), 2000); };

  return (
    <div className="space-y-6">
      <div><h2 className="font-serif text-3xl">Rewards & Coupons</h2><p className="text-muted-foreground mt-1">Your exclusive discounts and offers</p></div>
      <div className="space-y-4">
        {mockCoupons.map((c) => (
          <div key={c.code} className={`bg-card border rounded-2xl shadow-sm overflow-hidden ${c.used ? "opacity-60 border-border/20" : "border-border/30"}`}>
            <div className="flex items-center">
              <div className={`flex-shrink-0 w-28 flex flex-col items-center justify-center py-6 px-4 ${c.used ? "bg-muted/30" : "bg-primary/10"}`}>
                <Tag className={`h-6 w-6 mb-1.5 ${c.used ? "text-muted-foreground" : "text-primary"}`} />
                <p className={`font-bold text-lg text-center leading-tight ${c.used ? "text-muted-foreground" : "text-primary"}`}>{c.discount}</p>
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 bg-muted/40 rounded-lg px-4 py-2">
                    <code className="font-mono text-sm font-bold tracking-widest">{c.code}</code>
                  </div>
                  {!c.used && (
                    <button onClick={() => copy(c.code)} className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-all ${copied === c.code ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary hover:bg-primary hover:text-white"}`} data-testid={`button-copy-${c.code}`}>
                      {copied === c.code ? <><Check className="h-3 w-3" /> Copied</> : "Copy Code"}
                    </button>
                  )}
                  {c.used && <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Used</span>}
                </div>
                <p className="text-xs text-muted-foreground">Min. purchase: {c.min} • Expires: {c.expires}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RewardsSection() {
  const tiers = [{ name: "Silver", min: 0, max: 999, color: "bg-slate-200" }, { name: "Gold", min: 1000, max: 4999, color: "bg-amber-200" }, { name: "Platinum", min: 5000, max: 9999, color: "bg-purple-200" }];
  const points = 1250;
  const history = [
    { desc: "Purchase: Royal Velvet Curtain", date: "28 May 2024", pts: "+120", plus: true },
    { desc: "Purchase: Cotton Bedsheet", date: "20 May 2024", pts: "+95", plus: true },
    { desc: "Redeemed for discount", date: "15 May 2024", pts: "-200", plus: false },
    { desc: "Referral Bonus", date: "10 May 2024", pts: "+500", plus: true },
  ];

  return (
    <div className="space-y-6">
      <div><h2 className="font-serif text-3xl">Reward Points</h2><p className="text-muted-foreground mt-1">Earn points on every purchase</p></div>

      <div className="bg-gradient-to-br from-primary to-primary/70 rounded-2xl p-8 text-white">
        <p className="text-white/70 text-sm uppercase tracking-widest mb-2">Your Balance</p>
        <p className="font-serif text-6xl font-light mb-1">{points.toLocaleString()}</p>
        <p className="text-white/80 text-sm">Reward Points</p>
        <div className="mt-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center"><Award className="h-4 w-4 text-amber-800" /></div>
          <span className="text-white font-medium">Gold Member</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {tiers.map((t) => (
          <div key={t.name} className={`bg-card border rounded-xl p-4 text-center ${points >= t.min && points <= t.max ? "border-primary/50 ring-1 ring-primary/30" : "border-border/30"}`}>
            <div className={`w-8 h-8 rounded-full ${t.color} mx-auto mb-2 flex items-center justify-center`}><Award className="h-4 w-4 text-foreground/60" /></div>
            <p className="font-medium text-sm">{t.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{t.min.toLocaleString()}+ pts</p>
            {points >= t.min && points <= t.max && <span className="inline-block mt-1.5 bg-primary/10 text-primary text-[10px] font-medium px-2 py-0.5 rounded-full">Current</span>}
          </div>
        ))}
      </div>

      <div className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border/30"><h3 className="font-serif text-lg">Points History</h3></div>
        <div className="divide-y divide-border/30">
          {history.map((h, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4">
              <div><p className="text-sm font-medium">{h.desc}</p><p className="text-xs text-muted-foreground mt-0.5">{h.date}</p></div>
              <span className={`font-serif text-lg font-medium ${h.plus ? "text-green-600" : "text-destructive"}`}>{h.pts}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecuritySection() {
  const [showPw, setShowPw] = useState({ curr: false, newp: false, conf: false });
  const [pwSaved, setPwSaved] = useState(false);

  return (
    <div className="space-y-6">
      <div><h2 className="font-serif text-3xl">Security Settings</h2><p className="text-muted-foreground mt-1">Manage your account security</p></div>

      <div className="bg-card border border-border/30 rounded-2xl p-8 shadow-sm space-y-6">
        <h3 className="font-serif text-xl border-b border-border/30 pb-4">Change Password</h3>
        {[
          { label: "Current Password", k: "curr" as const },
          { label: "New Password", k: "newp" as const },
          { label: "Confirm New Password", k: "conf" as const },
        ].map(({ label, k }) => (
          <div key={k}>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">{label}</label>
            <div className="flex items-center border-b border-border focus-within:border-primary transition-colors">
              <input type={showPw[k] ? "text" : "password"} className="flex-1 bg-transparent py-2.5 text-sm focus:outline-none" placeholder="••••••••" data-testid={`input-pw-${k}`} />
              <button onClick={() => setShowPw((p) => ({ ...p, [k]: !p[k] }))} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                {showPw[k] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        ))}
        <button onClick={() => { setPwSaved(true); setTimeout(() => setPwSaved(false), 2500); }} className={`px-8 py-3.5 text-sm font-medium tracking-wider uppercase transition-all rounded-sm ${pwSaved ? "bg-green-500 text-white" : "bg-primary text-white hover:bg-primary/90"}`} data-testid="button-change-password">
          {pwSaved ? "Password Updated!" : "Update Password"}
        </button>
      </div>

      <div className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border/30"><h3 className="font-serif text-lg">Active Sessions</h3></div>
        <div className="divide-y divide-border/30">
          {[
            { device: "Chrome on Windows", location: "Mumbai, IN", time: "Current session", current: true },
            { device: "Safari on iPhone", location: "Mumbai, IN", time: "2 hours ago", current: false },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.current ? "bg-primary/10" : "bg-muted/30"}`}>
                  <Lock className={`h-5 w-5 ${s.current ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="text-sm font-medium">{s.device}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.location} • {s.time}</p>
                </div>
              </div>
              {s.current ? (
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Active</span>
              ) : (
                <button className="text-xs text-destructive border border-destructive/30 px-3 py-1.5 rounded-lg hover:bg-destructive hover:text-white transition-colors" data-testid={`button-logout-session-${i}`}>Logout</button>
              )}
            </div>
          ))}
        </div>
        <div className="px-6 py-4 bg-muted/10 border-t border-border/30">
          <button className="flex items-center gap-2 text-sm text-destructive font-medium hover:underline underline-offset-2" data-testid="button-logout-all">
            <AlertCircle className="h-4 w-4" /> Logout from all devices
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */

export default function Profile() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");

  const sectionMap: Record<Section, React.ReactNode> = {
    dashboard: <DashboardSection setSection={setActiveSection} />,
    profile: <MyProfileSection />,
    orders: <OrdersSection />,
    track: <TrackSection />,
    wishlist: <WishlistSection />,
    saved: <SavedSection />,
    warranty: <WarrantySection />,
    feedback: <FeedbackSection />,
    addresses: <AddressesSection />,
    coupons: <CouponsSection />,
    rewards: <RewardsSection />,
    security: <SecuritySection />,
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

            {/* ─── Sidebar ─── */}
            <aside className="w-full lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-24">
              <div className="bg-card border border-border/30 rounded-2xl shadow-sm overflow-hidden">
                {/* User mini header */}
                <div className="p-5 bg-gradient-to-br from-primary/10 to-primary/5 border-b border-border/20 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/30 to-primary/60 flex items-center justify-center border border-primary/20 shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">Arjun Mehta</p>
                    <p className="text-xs text-muted-foreground truncate">arjun.mehta@email.com</p>
                  </div>
                </div>

                {/* Nav links */}
                <nav className="py-2">
                  {navItems.map(({ key, label, icon: Icon }) => {
                    const isActive = activeSection === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveSection(key as Section)}
                        className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm transition-all text-left ${isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "text-foreground hover:bg-muted/40 hover:text-primary border-r-2 border-transparent"}`}
                        data-testid={`nav-${key}`}
                      >
                        <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} style={{ width: "18px", height: "18px" }} />
                        {label}
                      </button>
                    );
                  })}

                  <div className="mx-5 my-2 border-t border-border/30" />

                  <Link href="/">
                    <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-destructive hover:bg-destructive/5 transition-colors text-left border-r-2 border-transparent" data-testid="nav-logout">
                      <LogOut className="shrink-0 text-destructive" style={{ width: "18px", height: "18px" }} />
                      Logout
                    </button>
                  </Link>
                </nav>

                {/* Promo card */}
                <div className="m-4 rounded-xl overflow-hidden relative">
                  <img src={categories[0].image} alt="New Collection" className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-serif text-sm leading-tight">New Collection</p>
                    <p className="text-white/70 text-[10px]">Minimal. Modern. Yours.</p>
                    <Link href="/collections">
                      <button className="mt-2 bg-primary text-white text-[10px] px-3 py-1.5 rounded-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors">EXPLORE NOW</button>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* ─── Content Area ─── */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {sectionMap[activeSection]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
