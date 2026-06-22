import React, { useState, useEffect, useRef, ReactNode } from "react";
import { Database, FileSpreadsheet, Layers, ShieldCheck } from "lucide-react";

interface StatItem {
  id: number;
  icon: ReactNode;
  value: number;
  suffix: string;
  label: string;
  desc: string;
  color: string;
}

export default function Statistics() {
  const [questionsCount, setQuestionsCount] = useState(0);
  const [formatsCount, setFormatsCount] = useState(0);
  const [levelsCount, setLevelsCount] = useState(0);
  const [securityCount, setSecurityCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Trigger animations
          let startQ = 0;
          let startF = 0;
          let startL = 0;
          let startS = 0;

          const intervalQ = setInterval(() => {
            if (startQ >= 1959) {
              setQuestionsCount(1959);
              clearInterval(intervalQ);
            } else {
              startQ += Math.floor(Math.random() * 45) + 35;
              setQuestionsCount(Math.min(1959, startQ));
            }
          }, 20);

          const intervalF = setInterval(() => {
            if (startF >= 4) {
              setFormatsCount(4);
              clearInterval(intervalF);
            } else {
              startF += 1;
              setFormatsCount(startF);
            }
          }, 150);

          const intervalL = setInterval(() => {
            if (startL >= 3) {
              setLevelsCount(3);
              clearInterval(intervalL);
            } else {
              startL += 1;
              setLevelsCount(startL);
            }
          }, 200);

          const intervalS = setInterval(() => {
            if (startS >= 100) {
              setSecurityCount(100);
              clearInterval(intervalS);
            } else {
              startS += 5;
              setSecurityCount(Math.min(100, startS));
            }
          }, 30);

          // Stop observing once triggered
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = [
    {
      id: 1,
      icon: <Database className="text-accent-cyan" size={24} />,
      value: questionsCount,
      suffix: " Questions",
      label: "Managed Question Core",
      desc: "Robust volume of prefilled Computer Engineering queries indexed inside the SQLite pool.",
      color: "group-hover:border-accent-cyan/30"
    },
    {
      id: 2,
      icon: <FileSpreadsheet className="text-accent-purple" size={24} />,
      value: formatsCount,
      suffix: " Formats",
      label: "Assessment Models",
      desc: "Instant templates ready for Assignments, Unit Tests, Semester Exams, and Laboratory guides.",
      color: "group-hover:border-accent-purple/30"
    },
    {
      id: 3,
      icon: <Layers className="text-accent-mint" size={24} />,
      value: levelsCount,
      suffix: " Parameters",
      label: "Difficulty Scales",
      desc: "Rigorous sorting categories: Easy, Medium, and Hard syllabus difficulty calibrations.",
      color: "group-hover:border-accent-mint/30"
    },
    {
      id: 4,
      icon: <ShieldCheck className="text-amber-400" size={24} />,
      value: securityCount,
      suffix: "% Secure",
      label: "Offline Containerization",
      desc: "100% offline database execution that completely bypasses digital leakage vectors.",
      color: "group-hover:border-amber-400/30"
    }
  ];

  return (
    <section id="statistics" ref={containerRef} className="py-20 px-4 md:px-8 bg-zinc-950/60 relative z-10 border-t border-b border-white/5 scroll-mt-12 select-none">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#00d4ff] bg-[#00d4ff]/10 border border-[#00d4ff]/20 px-3 py-1 rounded-full">
          METRIC STATS
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
          Rigid System Metrics & Capacity
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Designed with standard database structures to withstand heavy institutional workloads without lags or dependencies.
        </p>
      </div>

      {/* Grid of counters */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`glow-card rounded-2xl p-6 text-left flex flex-col justify-between align-stretch min-h-[220px] group border border-white/5 transition-all duration-300 ${stat.color}`}
          >
            <div className="space-y-4">
              <div className="p-2.5 bg-zinc-950 rounded-xl border border-white/5 w-fit">
                {stat.icon}
              </div>

              <div>
                {/* Micro counting value display */}
                <h3 className="text-2xl md:text-3xl font-mono font-black text-white tracking-tight">
                  {stat.value}{stat.suffix}
                </h3>
                <span className="text-[11px] text-zinc-400 font-mono block uppercase tracking-wider mt-1">
                  {stat.label}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed font-sans mt-3">
              {stat.desc}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
