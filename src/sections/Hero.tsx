import React, { useState } from "react";
import { ExternalLink, ChevronRight, GraduationCap, CheckCircle, MousePointerClick } from "lucide-react";
import { motion } from "motion/react";

// Define direct path strings for custom generated mockups
const dashboardMockup = "/src/assets/images/dashboard_mockup_1782110592523.jpg";
const parametersMockup = "/src/assets/images/parameters_mockup_1782110611628.jpg";
const examMockup = "/src/assets/images/exam_mockup_1782110627845.jpg";

interface HeroProps {
  onScrollTo: (sectionId: string) => void;
}

const CARDS_DATA = [
  {
    id: "dashboard",
    title: "SQLITE WORKSPACE DASHBOARD",
    image: dashboardMockup,
    badge: "SQLITE DRIVEN",
    glow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] border-cyan-500/30",
  },
  {
    id: "parameters",
    title: "PARAMETERS GRID CONTROL",
    image: parametersMockup,
    badge: "RANDOM SHUFFLE",
    glow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] border-purple-500/30",
  },
  {
    id: "exam",
    title: "PRINTABLE ASSESSMENTS",
    image: examMockup,
    badge: "100% BALANCED",
    glow: "hover:shadow-[0_0_30px_rgba(52,211,153,0.3)] border-emerald-500/30",
  },
];

export default function Hero({ onScrollTo }: HeroProps) {
  // Track order indices from top (index 0) to bottom (index 2)
  // Initially, card 2 (examMockup) is top, 1 (parameters) is middle, index 0 (dashboard) is bottom
  const [cardIndices, setCardIndices] = useState<number[]>([2, 1, 0]);

  const handleCardClick = (cardIndex: number) => {
    const positionIndex = cardIndices.indexOf(cardIndex);
    if (positionIndex === 0) {
      // Cycle the top card to the back of the queue
      setCardIndices((prev) => [...prev.slice(1), prev[0]]);
    } else {
      // Bring any selected background card directly to the front
      setCardIndices((prev) => {
        const filtered = prev.filter((index) => index !== cardIndex);
        return [cardIndex, ...filtered];
      });
    }
  };

  const getCardStyles = (cardIndex: number) => {
    const pos = cardIndices.indexOf(cardIndex);
    switch (pos) {
      case 0: // Top front card
        return {
          rotate: 3,
          x: -10,
          y: -50,
          scale: 1,
          zIndex: 30,
          opacity: 1,
        };
      case 1: // Middle card
        return {
          rotate: -6,
          x: 35,
          y: 20,
          scale: 0.94,
          zIndex: 20,
          opacity: 0.92,
        };
      case 2: // Bottom back card
      default:
        return {
          rotate: -12,
          x: -35,
          y: 90,
          scale: 0.88,
          zIndex: 10,
          opacity: 0.78,
        };
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center py-16 px-4 md:px-8 select-none overflow-hidden">
      
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 via-transparent to-transparent opacity-80 pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left text column */}
        <motion.div 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-left"
        >
          {/* Badge indicator */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-xs text-accent-cyan font-mono leading-none">
            <GraduationCap size={12} /> EdTech SaaS Software Stack
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Question Paper <br />
              <span className="bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-mint bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            
            <h2 className="text-lg md:text-xl font-medium tracking-wide text-zinc-100 max-w-xl">
              Generate Smart, Balanced and Customizable Question Papers in Seconds.
            </h2>
          </div>

          <p className="text-sm md:text-base leading-relaxed text-zinc-400 max-w-lg">
            An intelligent question paper generation system designed for educational institutions. Create assignments, unit tests, semester exams and customized assessments with automation, randomization and difficulty balancing.
          </p>

          {/* Quick bullet tags */}
          <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300 font-mono py-1">
            <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-accent-cyan" /> SQLite Database Driven</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-accent-purple" /> Random Shuffle Pick</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-accent-mint" /> Balanced Difficulty Levels</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-amber-400" /> Print & Export PDF</span>
          </div>

          <div className="flex flex-wrap gap-4 pt-3">
            <a
              href="https://keric.fwh.is"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-cyan text-zinc-950 text-xs font-bold transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]"
            >
              View Live Demo
              <ExternalLink size={13} />
            </a>

            <button
              onClick={() => onScrollTo("features")}
              className="group flex items-center gap-1.5 px-6 py-3 rounded-xl border border-white/10 bg-zinc-950/40 text-xs font-bold text-white transition-colors hover:border-white/20 hover:bg-zinc-900 cursor-pointer"
            >
              Explore Features
              <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Right Interactive Card Deck stack showcase */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="relative h-[440px] md:h-[500px] w-full flex flex-col items-center justify-center pt-8"
        >
          {/* Main 3D Stage Container */}
          <div className="relative w-full max-w-[340px] md:max-w-[400px] h-[360px] flex items-center justify-center perspective-[1500px]">
            
            {/* Background floating colorful ambient circles */}
            <div className="absolute top-[10%] left-[5%] w-24 h-24 rounded-full bg-blue-600/25 blur-xl animate-float" />
            <div className="absolute bottom-[20%] right-[10%] w-28 h-28 rounded-full bg-orange-600/20 blur-xl animate-float" style={{ animationDelay: "2s" }} />
            <div className="absolute bottom-[40%] left-[60%] w-20 h-20 rounded-full bg-emerald-500/20 blur-lg animate-float" style={{ animationDelay: "4s" }} />

            {/* Render cards in stack order */}
            {CARDS_DATA.map((card, index) => {
              const pos = cardIndices.indexOf(index);
              const isTop = pos === 0;
              const styles = getCardStyles(index);
              
              return (
                <motion.div
                  key={card.id}
                  style={{ zIndex: styles.zIndex }}
                  animate={{
                    x: styles.x,
                    y: styles.y,
                    rotate: styles.rotate,
                    scale: styles.scale,
                    opacity: styles.opacity,
                  }}
                  whileHover={isTop ? { scale: 1.03, rotate: styles.rotate + 1 } : { scale: styles.scale + 0.02 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 24
                  }}
                  onClick={() => handleCardClick(index)}
                  className={`absolute w-[280px] md:w-[310px] aspect-[3/4] bg-zinc-950/95 border border-white/10 rounded-2xl shadow-2xl p-2.5 flex flex-col cursor-pointer transition-shadow duration-300 ${card.glow}`}
                >
                  {/* Web Application UI Header bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 px-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="font-mono text-[8px] text-zinc-400 font-bold uppercase tracking-wider">{card.title}</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[7px] text-accent-cyan font-bold leading-none">{card.badge}</span>
                  </div>

                  {/* Image wrapper */}
                  <div className="relative w-full flex-1 rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-full object-cover object-top select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient blur on bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Active HUD pill indicators */}
                    {isTop && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-zinc-950/85 border border-accent-cyan/40 backdrop-blur-sm text-[8px] text-accent-cyan font-sans font-bold flex items-center gap-1 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" /> ACTIVE
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interaction Trigger Cue Guide */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 mt-4 bg-zinc-900/30 px-3 py-1 bg-zinc-950/20 border border-white/5 rounded-full shadow-inner animate-pulse select-none cursor-pointer"
            onClick={() => handleCardClick(cardIndices[0])}
          >
            <MousePointerClick size={12} className="text-accent-cyan animate-bounce" />
            <span>Click cards to cycle viewport</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
