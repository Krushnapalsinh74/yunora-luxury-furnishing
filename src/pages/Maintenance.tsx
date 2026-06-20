import { useState, useEffect } from "react";
import logo from "@assets/02_1781943228013.png";

export default function Maintenance() {
  const [timeLeft, setTimeLeft] = useState({ h: 48, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) {
          s--;
        } else if (m > 0) {
          m--;
          s = 59;
        } else if (h > 0) {
          h--;
          m = 59;
          s = 59;
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      <img src={logo} alt="YUNORA" className="h-12 mb-12" />
      
      <h1 className="font-serif text-5xl md:text-6xl mb-4">We'll Be Back!</h1>
      <p className="text-muted-foreground text-lg mb-12 font-light max-w-md mx-auto">
        We are currently upgrading our digital experience. We will be back online shortly.
      </p>

      <div className="flex gap-4 sm:gap-8 mb-16">
        <div className="bg-card border border-border/30 rounded-lg p-6 shadow-sm min-w-[100px]">
          <span className="font-serif text-4xl block text-primary">{timeLeft.h.toString().padStart(2, '0')}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Hours</span>
        </div>
        <div className="bg-card border border-border/30 rounded-lg p-6 shadow-sm min-w-[100px]">
          <span className="font-serif text-4xl block text-primary">{timeLeft.m.toString().padStart(2, '0')}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Minutes</span>
        </div>
        <div className="bg-card border border-border/30 rounded-lg p-6 shadow-sm min-w-[100px]">
          <span className="font-serif text-4xl block text-primary">{timeLeft.s.toString().padStart(2, '0')}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Seconds</span>
        </div>
      </div>

      <div className="max-w-md w-full">
        <p className="text-sm font-medium tracking-widest uppercase mb-4">Get Notified</p>
        <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
          <input 
            type="email" 
            className="flex-1 border-b border-border py-3 text-sm focus:outline-none focus:border-primary bg-transparent" 
            placeholder="Enter your email" 
            required 
          />
          <button className="bg-foreground text-background px-6 py-3 text-sm font-medium tracking-widest uppercase hover:bg-foreground/90 transition-colors">
            Notify Me
          </button>
        </form>
      </div>
    </div>
  );
}
