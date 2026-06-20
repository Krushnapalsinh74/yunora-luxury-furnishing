import { Link } from "wouter";
import logo from "@assets/02_1781943228013.png";

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-8">
        <Link href="/">
          <img src={logo} alt="YUNORA" className="h-8" />
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card border border-border/30 p-8 md:p-12 rounded-lg shadow-sm text-center">
          <h1 className="font-serif text-3xl mb-4">Reset Password</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Please enter your new password below.
          </p>

          <form className="space-y-6 text-left" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">New Password</label>
              <input type="password" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Confirm New Password</label>
              <input type="password" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="••••••••" />
            </div>

            <button className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors mt-4">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
