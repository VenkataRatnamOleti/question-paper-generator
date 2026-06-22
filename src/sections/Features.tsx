import React, { ReactNode } from "react";
import { 
  Zap, Sliders, Shuffle, Server, Code, ShieldCheck, FileEdit, Printer 
} from "lucide-react";
import { motion } from "motion/react";

interface FeatureCard {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
  badge: string;
}

export default function Features() {
  const list: FeatureCard[] = [
    {
      icon: <Zap size={22} />,
      title: "Automated Paper Generation",
      description: "Generate complete assessments, assignments, or semester exams instantaneously. No manual compiling or copy-pasting required.",
      color: "text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20",
      badge: "Fast Compile"
    },
    {
      icon: <Sliders size={22} />,
      title: "Difficulty Balancing",
      description: "Balance exams using custom settings. Select ratios of Easy, Medium, and Difficult questions to match academic structures.",
      color: "text-accent-purple bg-accent-purple/10 border-accent-purple/20",
      badge: "Syllabus Compliant"
    },
    {
      icon: <Shuffle size={22} />,
      title: "Randomized Selection",
      description: "An offline shuffle algorithm picks unrelated questions. This ensures diverse examination templates for repeating cohorts.",
      color: "text-accent-mint bg-accent-mint/10 border-accent-mint/20",
      badge: "Antitheft Shrew"
    },
    {
      icon: <Server size={22} />,
      title: "Multiple Assessment Formats",
      description: "Full configuration for Assignments, Lab Practicals, Unit Tests, or final Semester Exams, each with standardized guidelines.",
      color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      badge: "4 Formats"
    },
    {
      icon: <Code size={22} />,
      title: "Subject Support Slaybbus",
      description: "Pre-indexed core topics: Java programming, Python scripting, C++, Data structures, DBMS, and Operating Systems.",
      color: "text-red-400 bg-red-400/10 border-red-400/20",
      badge: "Core CSE"
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "Secure Management Database",
      description: "Utilizes an offline SQLite database configuration. Protects your institution's question database pool from direct web vectors.",
      color: "text-orange-400 bg-orange-400/10 border-orange-400/20",
      badge: "Local Protection"
    },
    {
      icon: <FileEdit size={22} />,
      title: "Customized Question Setup",
      description: "Easily modify question text, subject tags, marks weights, and topics. Re-add directly into the local SQLite pool.",
      color: "text-blue-450 bg-blue-500/10 border-blue-500/20",
      badge: "Dynamic Schema"
    },
    {
      icon: <Printer size={22} />,
      title: "Print & Export PDF",
      description: "Seamlessly export printed layouts into native PDF documents or spool directly to physical institute printers.",
      color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      badge: "Spool & Export"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="features" className="py-20 px-4 md:px-8 bg-zinc-950/60 relative z-10 border-t border-b border-white/5 scroll-mt-12 select-none">
      
      {/* Centered Heading */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
        <span className="text-[10px] uppercase font-mono tracking-widest text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-3 py-1 rounded-full">
          FEATURES ENGINE
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
          Sophisticated Assessment Management
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          The software isn&apos;t just a simple selection tool. It&apos;s a cohesive software environment designed to relieve faculty stress while enforcing rigorous pedagogical blueprints.
        </p>
      </div>

      {/* Bento Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {list.map((item, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            className="glow-card rounded-2xl p-5 text-left flex flex-col justify-between align-stretch min-h-[220px] relative overflow-hidden group border border-white/10"
          >
            {/* Top row */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl border flex items-center justify-center ${item.color}`}>
                  {item.icon}
                </div>
                <span className="text-[9px] font-mono tracking-widest text-zinc-500 group-hover:text-white uppercase transition-colors">
                  {item.badge}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white tracking-tight group-hover:text-accent-cyan transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-3">
              {item.description}
            </p>

            {/* Glowing trace line at bottom */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
