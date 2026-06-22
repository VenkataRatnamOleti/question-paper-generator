import { BookOpen, Github, GraduationCap, Link2 } from "lucide-react";

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 py-16 px-4 md:px-8 relative z-10 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        
        {/* Bio segment */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-accent-cyan to-accent-purple">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="font-display font-black tracking-tight text-white text-sm">QPG SYSTEM</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed font-sans max-w-xs">
            An intelligent assessment compilation tool tailored for academic structures. Engineered to relieve faculty burdens while keeping question indexes balanced.
          </p>
        </div>

        {/* Quick Links segments */}
        <div className="space-y-3.5 text-left">
          <h4 className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-bold">Quick Navegation</h4>
          <ul className="space-y-1.5 text-xs">
            {[
              { label: "Home Base", id: "home" },
              { label: "Features", id: "features" },
              { label: "Simulator Showcase", id: "screenshots" },
              { label: "Workflow Chart", id: "workflow" }
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => onScrollTo(link.id)}
                  className="text-zinc-500 hover:text-white transition-colors cursor-pointer text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Secondary Links segments */}
        <div className="space-y-3.5 text-left">
          <h4 className="text-[10px] uppercase font-mono tracking-widest text-[#7b61ff] font-bold">Metadata Jumps</h4>
          <ul className="space-y-1.5 text-xs">
            {[
              { label: "Technologies used", id: "technologies" },
              { label: "Project overview", id: "about" },
              { label: "Capacity stats", id: "statistics" },
              { label: "Explore live demo", id: "demo" }
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => onScrollTo(link.id)}
                  className="text-zinc-500 hover:text-white transition-colors cursor-pointer text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* External Links segments */}
        <div className="space-y-3.5 text-left">
          <h4 className="text-[10px] uppercase font-mono tracking-widest text-accent-cyan font-bold">Online Links</h4>
          <ul className="space-y-1.5 text-xs font-mono">
            <li>
              <a
                href="https://keric.fwh.is"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-accent-cyan transition-colors flex items-center gap-1.5"
              >
                <Link2 size={12} /> keric.fwh.is
              </a>
            </li>
            <li>
              <span className="text-zinc-500 flex items-center gap-1.5 select-none">
                <GraduationCap size={12} /> Andhra Polytechnic
              </span>
            </li>
            <li>
              <span className="text-zinc-500 flex items-center gap-1.5 select-none text-[10px]">
                Advisor: Mrs. Anasuya
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Baseline copyright row */}
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-600 font-mono">
        <div>
          &copy; {new Date().getFullYear()} Question Paper Generator Core. All rights reserved.
        </div>
        <div className="flex gap-4">
          <span>Final Year CSE Capstone project</span>
          <span>&bull;</span>
          <span>Academic Sandbox</span>
        </div>
      </div>
    </footer>
  );
}
