import NetworkBackground from "./components/NetworkBackground";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import AppSimulator from "./components/AppSimulator";
import Workflow from "./sections/Workflow";
import Technologies from "./sections/Technologies";
import About from "./sections/About";
import Statistics from "./sections/Statistics";
import LiveDemo from "./sections/LiveDemo";
import Footer from "./sections/Footer";
import { Laptop, Smartphone, Eye, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  // Smooth scroll helper
  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white relative flex flex-col font-sans overflow-x-hidden selection:bg-accent-cyan selection:text-black">
      
      {/* Dynamic Animated Constellation Background */}
      <NetworkBackground />

      {/* Sticky Main Header */}
      <Navbar onScrollTo={handleScrollTo} />

      {/* Main Core Layout Sections */}
      <main className="flex-1 w-full flex flex-col relative z-20">
        
        {/* 1. HERO SECTION */}
        <Hero onScrollTo={handleScrollTo} />

        {/* 2. FEATURES GRID bento */}
        <Features />

        {/* 3. SCREENSHOTS & DEVICE EMULATION SECTION (The core interactive mock frame showcasing all views) */}
        <section id="screenshots" className="py-20 px-4 md:px-8 bg-dark-bg relative z-10 scroll-mt-12 select-none">
          <div className="max-w-7xl mx-auto">
            
            {/* Sector Header with badge */}
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#7b61ff] bg-accent-purple/10 border border-accent-purple/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5 align-center">
                <Sparkles size={11} className="text-accent-purple" /> SOFTWARE INTERACTIVE SCREENSHOTS SHOWCASE
              </span>
              
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                Live Interactive Application Simulator
              </h2>
              
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                No static screenshots can capture the speed of compiling. Use this live desktop sandbox emulator to step through the Win32 extractor wizard, load faculty portals, query sample Python/Java banks, calibrate questions difficulty weights, adjust SQLite records, and preview dynamic print layouts.
              </p>
            </div>

            {/* Desktop Mockup Border Frame containing our live emulator */}
            <div className="relative max-w-5xl mx-auto rounded-3xl p-2.5 bg-gradient-to-tr from-accent-cyan/15 via-white/5 to-accent-purple/15 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              
              {/* Decorative top dot sensors */}
              <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 bg-zinc-950 border border-white/15 rounded-full shadow-md z-45">
                <div className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-ping" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 font-bold">Interactive Deck Simulation Mode</span>
              </div>

              {/* The Live Interactive Appet Simulator itself */}
              <AppSimulator />

            </div>

            {/* Simulated Desktop / Mobile layout triggers */}
            <div className="mt-8 flex justify-center gap-4 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1"><Laptop size={14} className="text-accent-cyan" /> Tested for offline Desktop screens</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1"><Smartphone size={14} className="text-accent-purple" /> Dynamic scale resolution</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1"><Eye size={14} className="text-accent-mint" /> 8 modules emulated</span>
            </div>

          </div>
        </section>

        {/* 4. WORKFLOW PROCESS CHRONOLOGY */}
        <Workflow />

        {/* 5. METRIC COUNTING DATA STATISTICS */}
        <Statistics />

        {/* 6. ORIGINAL DEVELOPER TECH STACK */}
        <Technologies />

        {/* 7. ACADEMIC OVERVIEW & CREDIT BANNER */}
        <About />

        {/* 8. LAUNCH LIVE DEMO BANNER WITH CTA */}
        <LiveDemo />

      </main>

      {/* FOOTER SECTION */}
      <Footer onScrollTo={handleScrollTo} />

    </div>
  );
}
