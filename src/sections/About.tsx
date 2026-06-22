import { Target, Landmark, Award, BookOpen, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-dark-bg relative z-10 scroll-mt-12 select-none">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Editorial breakdown & Objectives list */}
        <div className="space-y-6 text-left">
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#fbbf24] bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">
              ABOUT THE PROJECT
            </span>
            
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
              Simplifying Academic Assessment For Educators
            </h2>
          </div>

          <p className="text-xs md:text-sm leading-relaxed text-zinc-400">
            The **Question Paper Generator** was conceptualized and engineered to address the excessive workloads faced by educators in compiling fresh, non-repetitive assessment papers. By replacing manual compiling with local SQLite query randomization, staff can construct high-standard materials within seconds.
          </p>

          <div className="space-y-4 pt-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Core Goals & Achievements</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan">
                  <Target size={14} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white tracking-tight">Save Faculty Time</h5>
                  <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">Empowers course mentors to generate unit tests, labs, and assignment papers in a single click.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple">
                  <BookOpen size={14} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white tracking-tight">Ensure Balanced Ratio</h5>
                  <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">Calibrates precise ratios of Easy, Medium, and Difficult syllabus vectors automatically.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-mint/10 border border-accent-mint/20 flex items-center justify-center text-accent-mint">
                  <Award size={14} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white tracking-tight">Eliminate Repetition</h5>
                  <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">Clever local SQLite sorting keeps question patterns fresh and robust for every session.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Landmark size={14} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white tracking-tight">Academic Prestige</h5>
                  <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">A clean, secure offline desktop wrapper suitable for academic evaluations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Showcase Academic Team Card */}
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl border border-white/10 overflow-hidden bg-zinc-900/40 p-6 shadow-xl text-left"
        >
          {/* Neon vertical overlay bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-purple to-accent-cyan" />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-950 rounded-xl border border-white/5 text-accent-purple">
                <GraduationCap size={22} />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white tracking-tight">CSE Diploma Capstone Project</h4>
                <p className="text-[10px] text-zinc-500 font-mono">Department of Computer Engineering</p>
              </div>
            </div>

            <blockquote className="text-xs text-zinc-350 italic border-l-2 border-white/10 pl-3 leading-relaxed">
              &ldquo;This tool stands as the culmination of our engineering studies, aiming to address critical organizational workloads in local colleges. Each module was formatted and compiled to reflect actual academic standards.&rdquo;
            </blockquote>

            <div className="pt-2">
              <span className="text-[10px] text-zinc-500 font-bold block uppercase tracking-wider font-mono">Academic Project Advisor</span>
              <span className="text-xs text-white font-extrabold block mt-0.5">Mrs. Anasuya</span>
              <span className="text-[11px] text-zinc-400 block mt-0.5">Department of Computer Science & Engineering</span>
            </div>

            <div className="border-t border-white/5 pt-3 mt-3 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
              <span>Coordinated by 8 Final-Year Students</span>
              <span className="text-accent-cyan font-bold">Andhra Polytechnic</span>
            </div>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
