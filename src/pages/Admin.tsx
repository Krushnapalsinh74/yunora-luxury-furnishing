import { Link } from "wouter";
import logo from "@assets/02_1781943228013.png";
import { LayoutDashboard, Package, Users, Tag, Settings, BarChart2, TrendingUp, TrendingDown } from "lucide-react";

export default function Admin() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1A1A] text-white flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-white/10">
          <Link href="/">
            <img src={logo} alt="YUNORA" className="h-8 brightness-0 invert" />
          </Link>
          <span className="text-xs uppercase tracking-widest text-white/50 mt-2 block">Admin Panel</span>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-md transition-colors"><LayoutDashboard className="h-5 w-5" /> Dashboard</a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"><Package className="h-5 w-5" /> Products</a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"><Tag className="h-5 w-5" /> Orders</a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"><Users className="h-5 w-5" /> Customers</a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"><BarChart2 className="h-5 w-5" /> Analytics</a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-md transition-colors"><Settings className="h-5 w-5" /> Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-card border-b border-border/30 h-16 flex items-center px-8 justify-between sticky top-0 z-10">
          <h1 className="font-serif text-xl">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">AD</div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card p-6 rounded-lg border border-border/30 shadow-sm">
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-3xl font-serif mb-2">₹12,45,000</h3>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4" /> <span>+12.5% from last month</span>
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border/30 shadow-sm">
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider">Orders Today</p>
              <h3 className="text-3xl font-serif mb-2">48</h3>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4" /> <span>+5.2% from yesterday</span>
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border/30 shadow-sm">
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider">Active Products</p>
              <h3 className="text-3xl font-serif mb-2">1,204</h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <span>12 out of stock</span>
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border/30 shadow-sm">
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider">Total Customers</p>
              <h3 className="text-3xl font-serif mb-2">8,540</h3>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4" /> <span>+18.2% from last month</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Chart placeholder */}
            <div className="bg-card p-6 rounded-lg border border-border/30 shadow-sm lg:col-span-2">
              <h3 className="font-serif text-xl mb-6">Revenue Trend</h3>
              <div className="h-64 w-full border-b border-l border-border relative">
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible preserve-3d" preserveAspectRatio="none">
                  <path d="M0,45 L10,35 L20,38 L30,25 L40,30 L50,15 L60,20 L70,10 L80,15 L90,5 L100,0" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M0,50 L0,45 L10,35 L20,38 L30,25 L40,30 L50,15 L60,20 L70,10 L80,15 L90,5 L100,0 L100,50 Z" fill="hsl(var(--primary))" fillOpacity="0.1" />
                </svg>
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-card p-6 rounded-lg border border-border/30 shadow-sm">
              <h3 className="font-serif text-xl mb-6">Top Products</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted/30 rounded"></div>
                      <div>
                        <p className="text-sm font-medium">Premium Linen Curtain</p>
                        <p className="text-xs text-muted-foreground">120 sales</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-primary">₹{Math.floor(Math.random() * 5000 + 1000).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-card rounded-lg border border-border/30 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border/50 flex justify-between items-center">
              <h3 className="font-serif text-xl">Recent Orders</h3>
              <button className="text-sm text-primary hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/10 border-b border-border/50 text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Order #</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Customer</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Product</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Amount</th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-muted/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-primary">#YUN12345{i}</td>
                      <td className="px-6 py-4">John Doe</td>
                      <td className="px-6 py-4">Royal Velvet Curtain</td>
                      <td className="px-6 py-4 font-medium">₹2,499</td>
                      <td className="px-6 py-4">
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium tracking-wide">Processing</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
