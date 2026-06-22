import { useState } from "react";
import { BookOpen, Menu, X, ExternalLink } from "lucide-react";

interface NavbarProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Navbar({ onScrollTo }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Features", id: "features" },
    { label: "Screenshots & Demo", id: "screenshots" },
    { label: "Workflow", id: "workflow" },
    { label: "Technologies", id: "technologies" },
    { label: "About Project", id: "about" },
    { label: "Statistics", id: "statistics" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-dark-bg/80 backdrop-blur-md select-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 md:px-6">
        {/* Brand Logo */}
        <div 
          onClick={() => onScrollTo("home")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-accent-cyan to-accent-purple shadow-lg shadow-accent-cyan/15 group-hover:scale-105 transition-transform">
            <BookOpen size={18} className="text-white" />
          </div>
          <div>
            <span className="font-display text-sm font-black tracking-tight text-white block">QPG SYSTEM</span>
            <span className="text-[9px] text-accent-cyan font-mono block tracking-widest mt-[-2px]">LANDING HUB</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1.5 bg-zinc-950/40 border border-white/5 px-2.5 py-1 rounded-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onScrollTo(item.id)}
              className="px-3.5 py-1.5 text-xs text-zinc-400 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://keric.fwh.is"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition-all hover:bg-zinc-100 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          >
            Try Live Demo
            <ExternalLink size={12} className="text-zinc-950 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-zinc-900/60 hover:bg-zinc-900 text-white transition-colors"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/5 bg-zinc-950/95 backdrop-blur-xl absolute top-full left-0 w-full p-5 space-y-4 shadow-2xl flex flex-col items-stretch">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onScrollTo(item.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="pt-3 border-t border-white/5">
            <a
              href="https://keric.fwh.is"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-accent-cyan p-3 text-xs font-bold text-zinc-950 hover:bg-cyan-400 w-full"
            >
              Try Live Demo
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
