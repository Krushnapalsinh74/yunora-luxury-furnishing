import { Link } from "wouter";
import logo from "@assets/02_1781943228013.png";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-8">
        <Link href="/">
          <img src={logo} alt="YUNORA" className="h-8" />
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card border border-border/30 p-8 md:p-12 rounded-lg shadow-sm text-center">
          <h1 className="font-serif text-3xl mb-4">Forgot Password?</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Enter the email address associated with your account and we'll send you a link to reset your password.
          </p>

          <form className="space-y-6 text-left" onSubmit={e => e.preventDefault()}>
            <div>
              <input type="email" className="w-full border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" placeholder="Enter your email" />
            </div>

            <button className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors">
              Send Reset Link
            </button>
          </form>

          <div className="mt-8">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
