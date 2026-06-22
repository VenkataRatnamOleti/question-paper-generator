import React, { ReactNode } from "react";
import { Database, HardDrive, Cpu, Layers, Braces, Code2 } from "lucide-react";
import { motion } from "motion/react";

interface TechDetails {
  title: string;
  category: string;
  desc: string;
  icon: ReactNode;
  glow: string;
  badge: string;
}

export default function Technologies() {
  const techStack: TechDetails[] = [
    {
      title: "PHP Runtime",
      category: "Desktop Application Core",
      desc: "Serves as the compiled local back-end interpreter, executing template assembly commands and managing local script interactions.",
      icon: <Cpu size={24} className="text-blue-400" />,
      glow: "hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
      badge: "Version 8.0"
    },
    {
      title: "SQLite Database",
      category: "Embedded Relational Store",
      desc: "The lightning-quick embedded dataset used to encrypt, index, categorize, search, and store thousands of CS syllabus questions offline.",
      icon: <Database size={24} className="text-cyan-400" />,
      glow: "hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]",
      badge: "Local Index"
    },
    {
      title: "JavaScript Engine",
      category: "Interactive Core UI",
      desc: "Powers form validations, interactive dialog setups, PDF preview renders, and responsive transitions within the application window.",
      icon: <Braces size={24} className="text-yellow-400" />,
      glow: "hover:border-yellow-500/40 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]",
      badge: "Client Actions"
    },
    {
      title: "HTML5 Layouts",
      category: "Document Structure Standard",
      desc: "Dictates structural layers for both the operational dashboard screens and the dynamically printed examination sheets.",
      icon: <Code2 size={24} className="text-orange-400" />,
      glow: "hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]",
      badge: "W3C Spec"
    },
    {
      title: "CSS3 Styling",
      category: "Display Canvas Styling",
      desc: "Brings the dark mode glassmorphic UI, custom neon glows, and rounded visual grids to life throughout the operational dashboard.",
      icon: <Layers size={24} className="text-purple-400" />,
      glow: "hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
      badge: "Visual Theme"
    },
    {
      title: "Bootstrap Grid",
      category: "Sleek Layout Framework",
      desc: "Provides clean, solid templates for tabular listings, modal overlays, statistics screens, and grid alignments across modules.",
      icon: <HardDrive size={24} className="text-[#7952b3]" />,
      glow: "hover:border-[#7952b3]/50 hover:shadow-[0_0_20px_rgba(121,82,179,0.15)]",
      badge: "Responsive v5"
    }
  ];

  return (
    <section id="technologies" className="py-20 px-4 md:px-8 bg-zinc-950/60 relative z-10 border-t border-b border-white/5 scroll-mt-12 select-none">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#00ffb3] bg-[#00ffb3]/10 border border-[#00ffb3]/20 px-3 py-1 rounded-full">
          TECHNOLOGY MATRIX
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
          What Powers the Question Paper Generator
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          The software is built using a highly optimized, lightweight, and completely local offline tech stack designed to operate smoothly on institutional infrastructure.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techStack.map((tech, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className={`bg-zinc-900/40 border border-white/5 rounded-2xl p-5 text-left flex flex-col justify-between align-stretch min-h-[200px] transition-all duration-300 relative overflow-hidden group ${tech.glow}`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-zinc-950 rounded-xl border border-white/5">
                  {tech.icon}
                </div>
                <span className="text-[9px] font-mono tracking-wider text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  {tech.badge}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-white tracking-tight leading-none">
                  {tech.title}
                </h3>
                <span className="text-[10px] text-zinc-500 font-semibold block uppercase font-mono tracking-wider">
                  {tech.category}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-3">
              {tech.desc}
            </p>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
