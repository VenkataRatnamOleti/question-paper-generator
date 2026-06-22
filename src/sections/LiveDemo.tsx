import { ExternalLink, Layers, Shield } from "lucide-react";
import { motion } from "motion/react";

export default function LiveDemo() {
  return (
    <section id="demo" className="py-24 px-4 md:px-8 bg-dark-bg relative z-10 scroll-mt-12 select-none overflow-hidden">
      
      {/* Background neon flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-accent-cyan/10 rounded-full blur-[80px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-accent-purple/15 rounded-full blur-[90px]" style={{ animationDelay: "2s" }} />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-xs text-accent-cyan font-mono leading-none">
          <Layers size={12} className="animate-spin" style={{ animationDuration: "10s" }} /> Live Software Link Sandbox
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Experience the <br />
            <span className="bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-mint bg-clip-text text-transparent">
              Question Paper Generator
            </span>
          </h2>
          
          <p className="text-xs md:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
            The software is compiled and online at our dedicated live host. Spin up the setup client, navigate parameters, and test out final compiling algorithms on our live portal.
          </p>
        </div>

        {/* Dynamic CTA button with hovering layered effects */}
        <div className="flex flex-col items-center justify-center gap-3">
          <motion.a
            href="https://keric.fwh.is"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-mint px-8 py-4 text-xs font-black text-black transition-all hover:shadow-[0_0_25px_rgba(0,212,255,0.45)] uppercase tracking-widest cursor-pointer"
          >
            Launch Live Demo
            <ExternalLink size={14} className="text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>

          {/* Core URL indicator */}
          <span className="text-[11px] text-zinc-500 font-mono">
            Host URL: <a href="https://keric.fwh.is" target="_blank" rel="noopener noreferrer" className="text-zinc-450 hover:text-white transition-colors underline">https://keric.fwh.is</a>
          </span>
        </div>

        {/* Floating security indicators */}
        <div className="pt-6 flex justify-center gap-6 text-[10px] text-zinc-500 font-mono">
          <span className="flex items-center gap-1.5"><Shield size={12} className="text-accent-mint" /> No Setup Key Required</span>
          <span className="flex items-center gap-1.5"><Shield size={12} className="text-accent-cyan" /> Preloaded SQLite Databases</span>
        </div>

      </div>

    </section>
  );
}
