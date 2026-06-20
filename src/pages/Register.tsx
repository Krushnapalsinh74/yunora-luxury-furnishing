import { Link } from "wouter";
import logo from "@assets/02_1781943228013.png";
import catCurtains from "@/assets/cat-curtains.png";

export default function Register() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Image side */}
      <div className="hidden lg:block w-1/2 relative">
        <img src={catCurtains} alt="Luxury Curtains" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-12 left-12 text-white max-w-md">
          <h2 className="font-serif text-4xl mb-4">Join the YUNORA Family</h2>
          <p className="font-light text-white/80">Create an account to track orders, save favorites, and access exclusive collections.</p>
        </div>
      </div>
      
      {/* Form side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 py-12 lg:py-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <Link href="/">
            <img src={logo} alt="YUNORA" className="h-10 mb-12" />
          </Link>
          
          <h1 className="font-serif text-4xl mb-2">Create Account</h1>
          <p className="text-muted-foreground mb-8">Enter your details to register.</p>

          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">First Name</label>
                <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="First Name" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Last Name</label>
                <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Last Name" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Email</label>
              <input type="email" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Phone</label>
              <input type="text" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Enter phone number" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Password</label>
              <input type="password" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Confirm Password</label>
              <input type="password" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="••••••••" />
            </div>

            <button className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors mt-4">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account? <Link href="/login" className="text-primary hover:underline underline-offset-4 font-medium">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
