import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { BookOpen, FolderOpen, Sliders, Cpu, Monitor, Download } from "lucide-react";

interface WorkflowStep {
  num: string;
  title: string;
  description: string;
  icon: ReactNode;
  accent: string;
}

export default function Workflow() {
  const steps: WorkflowStep[] = [
    {
      num: "01",
      title: "Select Course Subject",
      description: "Faculty selects the examination scope, loading default parameters from Java, Python, or C++ syllabi indexes.",
      icon: <BookOpen size={16} />,
      accent: "border-accent-cyan text-accent-cyan shadow-accent-cyan/10"
    },
    {
      num: "02",
      title: "Set Assessment Target",
      description: "Select the specific format required for the evaluation, choosing from Assignment, Unit Test, Lab, or Semester Paper.",
      icon: <FolderOpen size={16} />,
      accent: "border-accent-purple text-accent-purple shadow-accent-purple/10"
    },
    {
      num: "03",
      title: "Calibrate Difficulty Level",
      description: "Input specific ratios for Easy, Medium, and Difficult syllabus weights or input particular marks limits.",
      icon: <Sliders size={16} />,
      accent: "border-accent-mint text-accent-mint shadow-accent-mint/10"
    },
    {
      num: "04",
      title: "Instantly Compile Questions",
      description: "Our proprietary SQLite random-order query triggers, assembling fully cohesive, balanced examination structures.",
      icon: <Cpu size={16} />,
      accent: "border-amber-400 text-amber-400 shadow-amber-400/10"
    },
    {
      num: "05",
      title: "Preview & Fine-tune",
      description: "Check generated questions inside our desktop interactive emulator. Adjust questions and customize wording as needed.",
      icon: <Monitor size={16} />,
      accent: "border-red-400 text-red-400 shadow-red-400/10"
    },
    {
      num: "06",
      title: "Print or Export Native PDF",
      description: "Spool files directly onto standard paper layouts or render high-fidelity, printable PDF documents on the fly.",
      icon: <Download size={16} />,
      accent: "border-blue-400 text-blue-400 shadow-blue-400/10"
    }
  ];

  return (
    <section id="workflow" className="py-20 px-4 md:px-8 bg-dark-bg relative z-10 scroll-mt-12 select-none">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#7b61ff] bg-accent-purple/10 border border-accent-purple/20 px-3 py-1 rounded-full">
          PROCESS WORKFLOW
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
          How Question Paper Compilation Works
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Six straightforward stages combining randomized offline database selection with strict academic structure rules to formulate high-standard documents.
        </p>
      </div>

      {/* Timeline List */}
      <div className="max-w-6xl mx-auto relative">
        
        {/* Continuous Neon Connecting line behind steps */}
        <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-mint transform md:translate-x-[-1px] pointer-events-none" />

        <div className="space-y-12">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row items-stretch ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                
                {/* Timeline Node dot */}
                <div className="absolute left-0 md:left-1/2 top-2 w-[40px] h-[40px] rounded-full bg-zinc-950 border-2 border-white/10 flex items-center justify-center transform translate-x-0 md:translate-x-[-20px] z-20 shadow-lg group-hover:border-accent-cyan transition-colors">
                  <div className="text-[10px] grid place-items-center font-mono font-bold text-zinc-400">
                    {step.icon}
                  </div>
                </div>

                {/* Left Card column (or empty spacing depending on indexing) */}
                <div className="w-full md:w-1/2 flex justify-start md:justify-end md:pr-12 pl-12 md:pl-0">
                  {!isEven ? (
                    <div className="w-full max-w-md bg-zinc-900/60 border border-white/5 rounded-2xl p-5 text-left shadow-lg hover:border-white/15 transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-mono font-bold text-accent-cyan">{step.num}</span>
                        <h3 className="text-sm font-extrabold text-white tracking-tight">{step.title}</h3>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{step.description}</p>
                    </div>
                  ) : <div className="hidden md:block w-full" />}
                </div>

                {/* Center marker spacer representing column spacing alignment */}
                <div className="hidden md:block w-[40px]" />

                {/* Right Card column */}
                <div className="w-full md:w-1/2 flex justify-start md:pl-12 pl-12">
                  {isEven ? (
                    <div className="w-full max-w-md bg-zinc-900/60 border border-white/5 rounded-2xl p-5 text-left shadow-lg hover:border-white/15 transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-mono font-bold text-accent-cyan">{step.num}</span>
                        <h3 className="text-sm font-extrabold text-white tracking-tight">{step.title}</h3>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{step.description}</p>
                    </div>
                  ) : <div className="hidden md:block w-full" />}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
