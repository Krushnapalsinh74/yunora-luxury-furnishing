import { Link } from "wouter";
import logo from "@assets/02_1781943228013.png";
import hero1 from "@/assets/hero-1.png";

export default function Login() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Image side */}
      <div className="hidden lg:block w-1/2 relative">
        <img src={hero1} alt="Luxury Interior" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-12 left-12 text-white max-w-md">
          <h2 className="font-serif text-4xl mb-4">Welcome to Your Luxury Home</h2>
          <p className="font-light text-white/80">Log in to discover exclusive pieces and manage your premium experience.</p>
        </div>
      </div>
      
      {/* Form side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/">
            <img src={logo} alt="YUNORA" className="h-10 mb-12" />
          </Link>
          
          <h1 className="font-serif text-4xl mb-2">Welcome Back</h1>
          <p className="text-muted-foreground mb-8">Please enter your details to sign in.</p>

          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Email</label>
              <input type="email" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Enter your email" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm text-muted-foreground">Password</label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline underline-offset-4">Forgot Password?</Link>
              </div>
              <input type="password" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="••••••••" />
            </div>

            <button className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors mt-4">
              Sign In
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px bg-border flex-1"></div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">or</span>
            <div className="h-px bg-border flex-1"></div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account? <Link href="/register" className="text-primary hover:underline underline-offset-4 font-medium">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
