import React, { useState, useEffect } from "react";
import { 
  X, Minus, Square, ArrowLeft, RefreshCw, Star, 
  Printer, Play, FileText, BarChart2, Search, PlusCircle, 
  Settings, Folder, BookOpen, Trash2, Edit2, AlertCircle, 
  Check, Info, Users, ChevronDown, Monitor, Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Question {
  id: number;
  subject: "Java" | "Python" | "C++";
  chapter: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Difficulty";
  text: string;
  marks: 3 | 8 | 10;
}

const INITIAL_QUESTIONS: Question[] = [
  // Java Questions
  { id: 101, subject: "Java", chapter: "AWT & Applets", topic: "Event Handling", difficulty: "Medium", text: "What is the use of WindowListener?", marks: 3 },
  { id: 102, subject: "Java", chapter: "OOPS Concepts", topic: "Inheritance", difficulty: "Difficulty", text: "What is access protection in Java?", marks: 3 },
  { id: 103, subject: "Java", chapter: "Classes & Methods", topic: "Overriding", difficulty: "Medium", text: "Write a program for sum of two numbers using Method Overriding?", marks: 8 },
  { id: 104, subject: "Java", chapter: "Collections", topic: "ArrayList", difficulty: "Easy", text: "How would you convert an ArrayList to Array and vice versa?", marks: 3 },
  { id: 105, subject: "Java", chapter: "Collections", topic: "Frameworks", difficulty: "Easy", text: "What do you understand by Collection Framework in Java?", marks: 8 },
  { id: 106, subject: "Java", chapter: "Multithreading", topic: "Synchronization", difficulty: "Difficulty", text: "Explain the concept of thread synchronization in Java.", marks: 8 },
  { id: 107, subject: "Java", chapter: "AWT & Applets", topic: "GUI Components", difficulty: "Easy", text: "Describe the Graphics class methods such as update(), paint(), and drawLine().", marks: 10 },
  { id: 108, subject: "Java", chapter: "AWT & Applets", topic: "Container Classes", difficulty: "Difficulty", text: "Explain APPLETS, AWT and EVENT HANDLING in detail.", marks: 10 },
  // Python Questions
  { id: 201, subject: "Python", chapter: "Data Structures", topic: "Comprehensions", difficulty: "Easy", text: "What is list comprehension in Python with example?", marks: 3 },
  { id: 202, subject: "Python", chapter: "OOPS", topic: "Classes", difficulty: "Medium", text: "Define constructor initialization with clean code example.", marks: 8 },
  { id: 203, subject: "Python", chapter: "File Handling", topic: "Exception Context", difficulty: "Difficulty", text: "Explain try-except-finally block with file operations.", marks: 10 },
  // C++ Questions
  { id: 301, subject: "C++", chapter: "Inheritance", topic: "Multiple Inheritance", difficulty: "Difficulty", text: "Explain the diamond problem in multiple inheritance and how it is resolved.", marks: 8 },
  { id: 302, subject: "C++", chapter: "Polymorphism", topic: "Virtual Functions", difficulty: "Medium", text: "Describe pure virtual functions and abstract classes with a demo code.", marks: 10 },
  { id: 303, subject: "C++", chapter: "Basics", topic: "Encapsulation", difficulty: "Easy", text: "How does C++ achieve encapsulation and data hiding?", marks: 3 }
];

export default function AppSimulator() {
  const [activeTab, setActiveTab] = useState<
    "installer" | "login" | "dashboard" | "chapters-form" | "generated-paper" | "stats" | "add-question" | "manage" | "about"
  >("installer");
  
  // Installer States
  const [installerStep, setInstallerStep] = useState<"extracting" | "completed">("extracting");
  const [installerProgress, setInstallerProgress] = useState(0);
  
  // Login State
  const [username, setUsername] = useState("qpg.faculty@institute.edu");
  const [password, setPassword] = useState("••••••••");
  
  // Config States
  const [selectedAssessment, setSelectedAssessment] = useState<"Assignment" | "Unit Test" | "Semester" | "Lab Practicals">("Assignment");
  const [selectedSubject, setSelectedSubject] = useState<"Java" | "Python" | "C++">("Java");
  const [selectedChapter, setSelectedChapter] = useState("<All Chapters>");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Difficulty">("Medium");
  const [num3m, setNum3m] = useState(4);
  const [num8m, setNum8m] = useState(3);
  
  // Paper States
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const [historyFiles, setHistoryFiles] = useState<string[]>([
    "2024-10-28_18-06-15.pdf",
    "2024-10-29_11-30-22.pdf"
  ]);
  const [viewedPdf, setViewedPdf] = useState<string | null>(null);
  
  // Interactive Menu System
  const [activeMenu, setActiveMenu] = useState<"file" | "qbank" | null>(null);

  // Question Management
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [newQuestionText, setNewQuestionText] = useState("");

  // Statistics counters
  const totalQuestionsRegistered = questions.length + 1945; // Based on screenshot 1959

  // Start Installer progress loop on mount
  useEffect(() => {
    if (activeTab === "installer" && installerStep === "extracting") {
      const interval = setInterval(() => {
        setInstallerProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setInstallerStep("completed"), 400);
            return 100;
          }
          return prev + Math.floor(Math.random() * 8) + 4;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [activeTab, installerStep]);

  // Click handler to bypass installer
  const finishInstaller = () => {
    setActiveTab("login");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab("dashboard");
  };

  const generatePaper = () => {
    // Filter questions by subject
    const subjectQuestions = questions.filter(q => q.subject === selectedSubject);
    
    // Sort & shuffle
    const shuffle = (array: Question[]) => [...array].sort(() => Math.random() - 0.5);
    const low3m = shuffle(subjectQuestions.filter(q => q.marks === 3));
    const high8m = shuffle(subjectQuestions.filter(q => q.marks === 8 || q.marks === 10));

    // Choose specified quantities or grab whatever matches
    const selected3m = low3m.slice(0, num3m);
    const selected8m = high8m.slice(0, num8m);

    setGeneratedQuestions([...selected3m, ...selected8m]);
    setActiveTab("generated-paper");
    
    // Add file history entry
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}.pdf`;
    setHistoryFiles(prev => [dateStr, ...prev]);
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const startEdit = (q: Question) => {
    setEditingQuestion(q);
    setNewQuestionText(q.text);
  };

  const saveEdit = () => {
    if (editingQuestion) {
      setQuestions(questions.map(q => q.id === editingQuestion.id ? { ...q, text: newQuestionText } : q));
      setEditingQuestion(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-3xl text-white relative flex flex-col min-h-[600px] h-[650px] font-sans">
      
      {/* 1. INTERFACE FRAME HEADER (Like an active software terminal window) */}
      <div className="bg-zinc-900 border-b border-white/10 px-4 py-3 flex items-center justify-between pointer-events-auto select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" onClick={() => setActiveTab("installer")} title="Restart Simulator" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-xs tracking-wide text-zinc-400 font-mono ml-3 flex items-center gap-1.5 font-bold">
            <Monitor size={12} className="text-accent-cyan" /> QUESTION_PAPER_GENERATOR.EXE_V1.0
          </span>
        </div>
        <div className="text-xs font-mono text-zinc-500">
          Status: <span className="text-accent-mint font-semibold">Live Sandbox Emulator</span>
        </div>
      </div>

      {/* SECTION NAV MENU BAR (Only visible once logged-in to the application workspace) */}
      {activeTab !== "installer" && activeTab !== "login" && (
        <div className="bg-zinc-950 border-b border-white/5 py-1 px-4 flex items-center justify-between relative pointer-events-auto z-50">
          <div className="flex gap-1">
            <button 
              onClick={() => setActiveTab("dashboard")} 
              className={`px-3 py-1.5 rounded text-xs select-none ${activeTab === "dashboard" ? "bg-zinc-800 text-accent-cyan" : "text-zinc-400 hover:bg-zinc-900"}`}
            >
              Home
            </button>
            
            {/* File Menu Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setActiveMenu(activeMenu === "file" ? null : "file")} 
                className={`px-3 py-1.5 rounded text-xs flex items-center gap-1 ${activeMenu === "file" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-900"}`}
              >
                File <ChevronDown size={10} />
              </button>
              {activeMenu === "file" && (
                <div className="absolute left-0 mt-1 w-44 bg-zinc-900 border border-white/10 rounded-lg shadow-xl py-1 z-50 text-xs">
                  <button onClick={() => { setActiveTab("dashboard"); setActiveMenu(null); }} className="w-full text-left px-3 py-2 hover:bg-accent-cyan/10 hover:text-accent-cyan flex gap-2"><PlusCircle size={13} /> New Workspace</button>
                  <button onClick={() => { setActiveTab("dashboard"); setActiveMenu(null); }} className="w-full text-left px-3 py-2 hover:bg-accent-cyan/10 hover:text-accent-cyan flex gap-2"><Folder size={13} /> Import Questions</button>
                  <button onClick={() => { setActiveTab("manage"); setActiveMenu(null); }} className="w-full text-left px-3 py-2 hover:bg-accent-cyan/10 hover:text-accent-cyan flex gap-2"><Star size={13} /> Favourites</button>
                  <div className="border-t border-white/5 my-1" />
                  <button onClick={() => { setActiveTab("login"); setActiveMenu(null); }} className="w-full text-left px-3 py-2 hover:bg-red-500/10 text-red-400 flex gap-2"><X size={13} /> Lock Window</button>
                </div>
              )}
            </div>

            {/* Question Bank Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setActiveMenu(activeMenu === "qbank" ? null : "qbank")} 
                className={`px-3 py-1.5 rounded text-xs flex items-center gap-1 ${activeMenu === "qbank" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-900"}`}
              >
                Question Bank <ChevronDown size={10} />
              </button>
              {activeMenu === "qbank" && (
                <div className="absolute left-0 mt-1 w-48 bg-zinc-900 border border-white/10 rounded-lg shadow-xl py-1 z-50 text-xs">
                  <button onClick={() => { setActiveTab("stats"); setActiveMenu(null); }} className="w-full text-left px-3 py-2 hover:bg-accent-purple/10 hover:text-accent-purple flex gap-2"><BarChart2 size={13} /> View Statistics</button>
                  <button onClick={() => { setActiveTab("add-question"); setActiveMenu(null); }} className="w-full text-left px-3 py-2 hover:bg-accent-purple/10 hover:text-accent-purple flex gap-2"><PlusCircle size={13} /> Add a Question</button>
                  <button onClick={() => { setActiveTab("manage"); setActiveMenu(null); }} className="w-full text-left px-3 py-2 hover:bg-accent-purple/10 hover:text-accent-purple flex gap-2"><Settings size={13} /> Manage Question Bank</button>
                  <button onClick={() => { setActiveTab("manage"); setActiveMenu(null); }} className="w-full text-left px-3 py-2 hover:bg-accent-purple/10 hover:text-accent-purple flex gap-2"><Search size={13} /> Search and Filter</button>
                </div>
              )}
            </div>

            <button 
              onClick={() => setActiveTab("about")} 
              className={`px-3 py-1.5 rounded text-xs ${activeTab === "about" ? "bg-zinc-800 text-accent-cyan" : "text-zinc-400 hover:bg-zinc-900"}`}
            >
              About
            </button>
          </div>
          
          <div className="text-[10px] bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/25 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
            <Cpu size={10} strokeWidth={2.5} /> Connected to SQLite
          </div>
        </div>
      )}

      {/* MAIN CONTAINER CONTENT VIEWPORT */}
      <div 
        className="flex-1 overflow-auto p-4 select-none bg-dark-bg relative tech-grid flex items-center justify-center"
        onClick={() => setActiveMenu(null)}
      >
        <AnimatePresence mode="wait">
          
          {/* ==================== SCREEN 1 & 2: SETUP WIZARD INSTALLER ==================== */}
          {activeTab === "installer" && (
            <motion.div 
              key="installer-view"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-zinc-900 border border-white/15 rounded-xl shadow-2xl p-6 font-sans text-zinc-300 pointer-events-auto"
            >
              {installerStep === "extracting" ? (
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <h3 className="text-sm font-semibold tracking-wide text-white">Setup - Question Paper Generator</h3>
                    <span className="text-[10px] text-zinc-500 font-mono">v1.0</span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-zinc-400">Extracting libraries and launching application module...</p>
                    <p className="text-xs font-mono text-accent-cyan mt-1">C:\QPG\libcef.dll</p>
                  </div>

                  {/* Windows styled progress bar */}
                  <div className="w-full bg-zinc-800 h-6 border border-white/5 rounded overflow-hidden p-1">
                    <div 
                      className="bg-accent-cyan h-full rounded transition-all duration-75 flex items-center justify-end pr-2 text-[10px] text-black font-extrabold"
                      style={{ width: `${installerProgress}%` }}
                    >
                      {installerProgress}%
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6 text-[10px] text-zinc-500 font-mono">
                    <span>Compressing resource database...</span>
                    <span>Host: Win32 Wrapper</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-mint/10 border border-accent-mint/30 flex items-center justify-center text-accent-mint">
                      <Check size={20} strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="text-sm tracking-wide font-extrabold text-white">Completing Setup Wizard</h3>
                      <p className="text-xs text-zinc-400">Installation successfully finalized.</p>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-3 rounded border border-white/5">
                    Question Paper Generator has been extracted onto your sandbox filesystem directory. Click finish to launch the secure portal dashboard.
                  </p>

                  <div className="flex items-center gap-2 mt-2 bg-zinc-950/40 p-2.5 rounded border border-white/5">
                    <input type="checkbox" id="launch" defaultChecked className="accent-accent-cyan" />
                    <label htmlFor="launch" className="text-xs text-zinc-400 cursor-pointer">Launch Question Paper Generator immediately</label>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button 
                      onClick={finishInstaller}
                      className="px-5 py-2 text-xs font-bold bg-accent-cyan text-black hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all rounded"
                    >
                      Finish
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ==================== SCREEN 3: GLASSMORPHISM LOGIN ==================== */}
          {activeTab === "login" && (
            <motion.div 
              key="login-view"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-black/60 border border-white/10 glow-card rounded-2xl p-6 pointer-events-auto shadow-2xl relative overflow-hidden"
            >
              {/* Floating blobs inside preview box */}
              <div className="absolute top-[-20%] left-[-20%] w-36 h-36 rounded-full bg-blue-600/20 blur-[30px]" />
              <div className="absolute bottom-[-20%] right-[-10%] w-36 h-36 rounded-full bg-orange-500/20 blur-[35px]" />

              <form onSubmit={handleLogin} className="space-y-5 relative z-10">
                <div className="text-center space-y-1.5 pb-2">
                  <h3 className="text-xl tracking-tight text-white font-display font-extrabold">Question Paper Generator</h3>
                  <p className="text-xs text-zinc-400">Faculty Secure Login System</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-zinc-400">Username</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-cyan" 
                      placeholder="Email or Phone"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-zinc-400">Password</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-cyan" 
                      placeholder="Enter Password"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-2.5 bg-white text-zinc-950 font-extrabold text-xs tracking-wide rounded-md hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all cursor-pointer"
                >
                  Log In
                </button>
                
                <div className="text-center pt-1">
                  <button 
                    type="button" 
                    onClick={() => setActiveTab("dashboard")} 
                    className="text-[11px] text-accent-cyan hover:underline hover:text-cyan-300"
                  >
                    Bypass / Guest Sign In
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ==================== SCREEN 4 & 10: APP HOME WORKSPACE ==================== */}
          {activeTab === "dashboard" && (
            <motion.div 
              key="dashboard-view"
              className="w-full h-full flex flex-col md:flex-row gap-4 align-stretch pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* SIDEBAR FILE DRAWER PANEL (Screen 8 / 9) */}
              <div className="w-full md:w-56 bg-zinc-950 border border-white/5 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-2 border-b border-white/5 pb-1 flex items-center justify-between">
                    <span>Generated History</span>
                    <RefreshCw size={10} className="text-zinc-600 animate-spin" />
                  </h4>
                  <div className="space-y-1.5 overflow-y-auto max-h-[300px]">
                    {historyFiles.map((file, idx) => (
                      <button 
                        key={idx}
                        onClick={() => {
                          setViewedPdf(file);
                          // Generate simulated questions for PDF loading state
                          generatePaper();
                        }}
                        className="w-full text-left p-2 rounded bg-zinc-900 border border-white/5 text-[11px] hover:border-accent-cyan/40 hover:text-accent-cyan transition-all flex items-center gap-1.5 font-mono group"
                      >
                        <FileText size={12} className="text-zinc-500 group-hover:text-accent-cyan flex-shrink-0" />
                        <span className="truncate">{file}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2 border-t border-white/5">
                  <div className="bg-accent-cyan/5 border border-accent-cyan/15 rounded p-2.5">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-accent-cyan block">Active Config</span>
                    <span className="text-[11px] text-white block font-bold truncate mt-0.5">{selectedSubject} Master File</span>
                  </div>
                </div>
              </div>

              {/* CORE DASHBOARD AREA WITH ASSESSMENT MODALS */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <h3 className="text-base tracking-tight font-extrabold text-white flex items-center gap-2">
                      <BookOpen size={16} className="text-accent-cyan" /> Select Subject & Format
                    </h3>
                    <p className="text-xs text-zinc-400">Select standard parameters below to proceed to the question criteria form.</p>
                  </div>

                  {/* Subject selector tabs */}
                  <div className="grid grid-cols-3 gap-2.5 mb-5">
                    {(["Java", "Python", "C++"] as const).map((subject) => (
                      <button
                        key={subject}
                        onClick={() => setSelectedSubject(subject)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          selectedSubject === subject 
                          ? "bg-accent-cyan/15 border-accent-cyan text-white shadow-[0_0_15px_rgba(0,212,255,0.1)]" 
                          : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:border-white/15 hover:text-white"
                        }`}
                      >
                        <div className="text-xs font-mono font-bold tracking-widest">{subject.toUpperCase()}</div>
                        <span className="text-[9px] text-zinc-500 block">Syllabus Class Active</span>
                      </button>
                    ))}
                  </div>

                  {/* Screen 4 Assessment Category Selection */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">Select Assessment Context</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                      {([
                        { name: "Assignment", label: "ASSIGNMENT", accent: "rgba(0, 212, 255, 0.4)" },
                        { name: "Unit Test", label: "UNIT TEST", accent: "rgba(123, 97, 255, 0.4)" },
                        { name: "Semester", label: "SEMESTER", accent: "rgba(0, 255, 179, 0.4)" },
                        { name: "Lab Practicals", label: "LAB PRACTICALS", accent: "rgba(251, 191, 36, 0.4)" }
                      ] as const).map((asmt) => (
                        <button
                          key={asmt.name}
                          onClick={() => {
                            setSelectedAssessment(asmt.name);
                            setActiveTab("chapters-form");
                          }}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2.5 transition-all text-center glow-card ${
                            selectedAssessment === asmt.name && activeTab === "chapters-form"
                            ? "border-accent-cyan shadow-md"
                            : "bg-zinc-900/60 border-white/5"
                          }`}
                        >
                          {/* Simulated SVG dynamic badges mimicking actual screenshot icons layout */}
                          <div className="w-10 h-10 rounded-full flex items-center justify-center p-1 font-extrabold text-[9px]" style={{ background: asmt.accent }}>
                            🏁
                          </div>
                          <span className="text-[9px] font-mono tracking-widest text-zinc-200 uppercase">{asmt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-xs text-zinc-400">
                  <span className="flex items-center gap-1"><Info size={13} className="text-accent-cyan" /> Selected: <strong className="text-white">{selectedSubject}</strong> &bull; Database matches</span>
                  <button 
                    onClick={() => setActiveTab("manage")} 
                    className="text-accent-cyan hover:underline text-xs block"
                  >
                    Question Bank Options &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== SCREEN 5: CHAPTERS & QUESTION SPECIFICATION FORM ==================== */}
          {activeTab === "chapters-form" && (
            <motion.div 
              key="chapters-form-view"
              className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-xl p-5 pl-7 pr-7 pointer-events-auto space-y-4"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <button onClick={() => setActiveTab("dashboard")} className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer">
                  <ArrowLeft size={13} /> Back
                </button>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{selectedSubject} &bull; {selectedAssessment}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">List of Chapters</label>
                  <select 
                    value={selectedChapter} 
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-accent-cyan"
                  >
                    <option value="All">&bull; &bull; Choose Chapter (All Slaybbus) &bull; &bull;</option>
                    <option value="AWT">Chapter 1: Abstract Window Toolkits (AWT)</option>
                    <option value="OOPS">Chapter 2: Classes, Namespaces & Modularity</option>
                    <option value="DataStructures">Chapter 3: Memory Structures & Collections</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">Select Difficulty Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Easy", "Medium", "Difficulty"] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setDifficulty(level)}
                        className={`py-1.5 rounded text-xs font-mono font-bold border transition-all ${
                          difficulty === level
                          ? "bg-accent-purple/25 border-accent-purple text-white shadow-sm"
                          : "bg-zinc-950 border-white/5 text-zinc-400 hover:border-white/10"
                        }`}
                      >
                        {level === "Difficulty" ? "DIFFICULT" : level.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">Number of short questions (3 Marks)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="10"
                      value={num3m}
                      onChange={(e) => setNum3m(parseInt(e.target.value) || 1)}
                      className="w-full bg-zinc-950 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-accent-cyan"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-zinc-400 block mb-1">Number of long questions (8 Marks)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="10"
                      value={num8m}
                      onChange={(e) => setNum8m(parseInt(e.target.value) || 1)}
                      className="w-full bg-zinc-950 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-accent-cyan"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button 
                    onClick={generatePaper}
                    className="w-full py-2.5 bg-accent-cyan text-black font-extrabold text-xs uppercase tracking-widest rounded-md hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <RefreshCw size={12} /> Generate Balanced Paper
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== SCREEN 6, 7 & 9: PAPER PREVIEW WITH GLOW AND PRINT OVERLAY ==================== */}
          {activeTab === "generated-paper" && (
            <motion.div 
              key="generated-paper-view"
              className="w-full h-full flex flex-col justify-between pointer-events-auto relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Main control toolbar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-2">
                <button onClick={() => setActiveTab("dashboard")} className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer">
                  <ArrowLeft size={13} /> Back to Dashboard
                </button>
                <div className="flex gap-2">
                  <button onClick={() => generatePaper()} className="px-2.5 py-1 text-[11px] bg-zinc-900 hover:bg-zinc-850 rounded border border-white/10 flex items-center gap-1 class">
                    <RefreshCw size={11} /> Re-Generate
                  </button>
                  <button onClick={() => setShowPrintDialog(true)} className="px-2.5 py-1 text-[11px] bg-accent-cyan text-black hover:bg-cyan-400 rounded flex items-center gap-1 font-bold">
                    <Printer size={11} /> Print / Export PDF
                  </button>
                </div>
              </div>

              {/* Printable Document Box - framed with glowing accent like in the screenshots */}
              <div className="flex-1 overflow-auto rounded-lg border-2 border-accent-purple shadow-[0_0_25px_rgba(123,97,255,0.15)] bg-white p-6 pl-8 pr-8 text-black relative select-text">
                <div className="text-center space-y-1 border-b-2 border-zinc-300 pb-3 mb-4">
                  <h2 className="text-lg font-bold uppercase tracking-tight text-zinc-800">Andhra Polytechnic Institute</h2>
                  <p className="text-xs text-zinc-600 font-semibold">{selectedSubject} Assessment - {selectedAssessment}</p>
                  <p className="text-[10px] text-zinc-500 font-mono">Difficulty Weight: {difficulty} | Duration: 45 Mins</p>
                </div>

                <div className="text-xs space-y-1 font-bold mb-4">
                  <p className="text-zinc-700">Instructions: 1. Answer all requested questions. 2. Equal weightage allotted based on category points.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-zinc-400 border-b border-zinc-200 pb-1 mb-2">Section A (3 Marks Questions)</h4>
                    <ol className="list-decimal list-inside space-y-1.5 text-xs text-zinc-800">
                      {generatedQuestions.filter(q => q.marks === 3).map((q, idx) => (
                        <li key={idx} className="leading-relaxed pl-1 py-0.5">{q.text}</li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-zinc-400 border-b border-zinc-200 pb-1 mb-2">Section B ({num8m > 0 && generatedQuestions.some(q => q.marks >= 8) ? "8/10" : "8"} Marks Questions)</h4>
                    <ol className="list-decimal list-inside space-y-2 text-xs text-zinc-800">
                      {generatedQuestions.filter(q => q.marks >= 8).map((q, idx) => (
                        <li key={idx} className="leading-relaxed pl-1 py-0.5">{q.text}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Footer credit simulated watermark */}
                <div className="border-t border-zinc-200 pt-3 mt-6 text-center text-[9px] text-zinc-400 font-mono">
                  Question Paper dynamically composed via SQLite Query Randomization &bull; Secure QPG Wrapper v1.0
                </div>
              </div>

              {/* Simulated WIN32 Windows Print System Overlay (Screen 7) */}
              {showPrintDialog && (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="w-full max-w-sm bg-zinc-900 border border-white/20 rounded-xl shadow-2xl p-4 text-xs">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                      <span className="font-bold text-white flex items-center gap-1.5"><Printer size={13} className="text-accent-cyan" /> Win32 Spooler System</span>
                      <button onClick={() => setShowPrintDialog(false)} className="text-zinc-400 hover:text-white"><X size={14} /></button>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <span className="text-[10px] text-zinc-400 block mb-1">Target Printer</span>
                        <div className="bg-zinc-950 p-2 rounded border border-white/5 text-white font-mono flex items-center justify-between">
                          <span>Microsoft Print to PDF</span>
                          <Check size={12} className="text-accent-mint" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] text-zinc-400 block mb-1">Orientation</span>
                          <span className="bg-zinc-950 p-1.5 rounded block text-center border border-white/5 font-mono text-zinc-300">Portrait</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-zinc-400 block mb-1">Pages</span>
                          <span className="bg-zinc-950 p-1.5 rounded block text-center border border-white/5 font-mono text-zinc-300">All (1 of 1)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                      <button onClick={() => setShowPrintDialog(false)} className="px-3.5 py-1.5 bg-zinc-800 text-zinc-300 hover:bg-zinc-750 rounded">Cancel</button>
                      <button 
                        onClick={() => {
                          setShowPrintDialog(false);
                          alert("Export Successful! Simulated file saved as pdf.");
                        }} 
                        className="px-4 py-1.5 bg-accent-cyan text-black hover:bg-cyan-400 rounded font-bold"
                      >
                        Print Now
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ==================== SCREEN 17: STATISTICS DASHBOARD VIEW ==================== */}
          {activeTab === "stats" && (
            <motion.div 
              key="stats-view"
              className="w-full h-full flex flex-col justify-between pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                <button onClick={() => setActiveTab("dashboard")} className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer">
                  <ArrowLeft size={13} /> Back to Dashboard
                </button>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#fbbf24]">SQLite Database Dashboard</span>
              </div>

              {/* Statistics counter displays (Screen 17) */}
              <div className="space-y-4">
                <div className="bg-zinc-950 border-2 border-[#fbbf24] p-3 rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-bold block">REGISTERED SYLLABUS BANK QUESTIONS</span>
                    <h2 className="text-2xl font-black font-mono text-zinc-100 tracking-tight">{totalQuestionsRegistered} Questions</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-accent-cyan font-bold block">100% Secure Index</span>
                    <span className="text-[9px] text-zinc-500 font-mono">SQLite Core Instance</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Left Chart: Category Distribution */}
                  <div className="bg-zinc-900 border border-white/5 p-3 rounded-lg flex flex-col justify-between h-[180px]">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono font-bold block mb-1">Donut Split / Category Contribution</span>
                    <div className="flex-1 flex items-center justify-around">
                      {/* Simple high contrast SVG pie rendering exactly like screenshot 17 */}
                      <svg className="w-24 h-24" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="30 70" strokeDashoffset="25"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#dc2626" strokeWidth="3" strokeDasharray="25 75" strokeDashoffset="95"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#059669" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="120"></circle>
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="25 75" strokeDashoffset="145"></circle>
                      </svg>
                      <div className="text-[10px] space-y-1">
                        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-blue-600 block rounded-full" /> <span>Java Class (30%)</span></div>
                        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-red-600 block rounded-full" /> <span>Python Class (25%)</span></div>
                        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-600 block rounded-full" /> <span>C++ Core (20%)</span></div>
                        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-yellow-500 block rounded-full" /> <span>Others (25%)</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Right Chart: Level Variation */}
                  <div className="bg-zinc-900 border border-white/5 p-3 rounded-lg flex flex-col justify-between h-[180px]">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono font-bold block mb-1">Level Varians (Difficulty distribution)</span>
                    <div className="flex-grow flex items-end justify-between px-6 pt-4 h-full">
                      {/* Interactive responsive SVG styled bars mimicking the SQLite chart */}
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <div className="w-10 bg-accent-cyan/80 hover:bg-accent-cyan transition-colors rounded-t h-28 flex items-end justify-center text-[9px] text-black font-bold pb-1">750</div>
                        <span className="text-[9px] font-mono text-zinc-500">Easy</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <div className="w-10 bg-accent-purple/80 hover:bg-accent-purple transition-colors rounded-t h-32 flex items-end justify-center text-[9px] text-black font-bold pb-1">940</div>
                        <span className="text-[9px] font-mono text-zinc-500">Medium</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <div className="w-10 bg-[#fbbf24]/80 hover:bg-[#fbbf24] transition-colors rounded-t h-20 flex items-end justify-center text-[9px] text-black font-bold pb-1">269</div>
                        <span className="text-[9px] font-mono text-zinc-500">Difficulty</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="text-[9px] text-zinc-500 font-mono text-center border-t border-white/5 pt-3 mt-4">
                Stats dynamically indexed from offline SQLite main index bank.
              </div>
            </motion.div>
          )}

          {/* ==================== SCREEN 18: ADD A QUESTION FORM ==================== */}
          {activeTab === "add-question" && (
            <motion.div 
              key="add-question-view"
              className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-xl p-5 pl-7 pr-7 pointer-events-auto space-y-4"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <button onClick={() => setActiveTab("dashboard")} className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer">
                  <ArrowLeft size={13} /> Back
                </button>
                <div className="text-right">
                  <span className="text-[10px] text-[#fbbf24] font-mono uppercase tracking-widest font-bold">Write to SQLite Database</span>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-400">Target Mark Type</label>
                    <select className="w-full bg-zinc-950 border border-white/10 rounded p-2 text-xs text-white focus:outline-none">
                      <option>&bull; 3 Marks (Short Form)</option>
                      <option>&bull; 8 Marks (Long Form)</option>
                      <option>&bull; 10 Marks (Detailed Assessment)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-400">Target Syllabus Component</label>
                    <select className="w-full bg-zinc-950 border border-white/10 rounded p-2 text-xs text-white focus:outline-none">
                      <option>Java Programming</option>
                      <option>Python Scripting</option>
                      <option>C++ Object-Oriented</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-400">Chapter</label>
                    <input type="text" className="w-full bg-zinc-950 border border-white/10 rounded p-1.5 text-xs focus:outline-none focus:border-accent-cyan" placeholder="e.g. Chapter 2" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-400">Topic</label>
                    <input type="text" className="w-full bg-zinc-950 border border-white/10 rounded p-1.5 text-xs focus:outline-none focus:border-accent-cyan" placeholder="e.g. Memory allocation" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-400">Difficulty</label>
                    <select className="w-full bg-zinc-950 border border-white/10 rounded p-1.5 text-xs focus:outline-none text-white">
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Difficulty</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">Enter Question Text String</label>
                  <textarea 
                    className="w-full bg-zinc-950 border border-white/10 rounded p-2.5 text-xs h-16 focus:outline-none focus:border-accent-cyan text-white leading-relaxed"
                    placeholder="Enter full specific examination question text details here..."
                  />
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => {
                      alert("Question successfully registered into sandbox database!");
                      setActiveTab("dashboard");
                    }}
                    className="w-full py-2 bg-accent-cyan hover:bg-cyan-400 font-extrabold text-xs text-black uppercase tracking-widest rounded transition-all cursor-pointer"
                  >
                    Register Question to Database
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== SCREEN 19 & 21: MANAGE AND SEARCH QUESTIONS TABLE ==================== */}
          {activeTab === "manage" && (
            <motion.div 
              key="manage-view"
              className="w-full h-full flex flex-col justify-between pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                <button onClick={() => setActiveTab("dashboard")} className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer">
                  <ArrowLeft size={13} /> Back to Dashboard
                </button>
                
                <div className="flex items-center gap-2 bg-zinc-950 p-1 border border-white/5 rounded w-52 md:w-64">
                  <Search size={12} className="text-zinc-500 ml-1 flex-shrink-0" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter SQLite questions..." 
                    className="bg-transparent text-xs w-full text-white focus:outline-none py-0.5"
                  />
                </div>
              </div>

              {/* Edit Question Dialog Overlay */}
              {editingQuestion && (
                <div className="absolute inset-x-4 top-16 bottom-4 bg-black/95 z-50 rounded-xl p-4 flex flex-col justify-between border border-white/10 shadow-2xl">
                  <div>
                    <h4 className="text-sm tracking-wide font-extrabold text-accent-cyan flex gap-1.5 items-center"><Edit2 size={13} /> Edit Question Entry # {editingQuestion.id}</h4>
                    <p className="text-[11px] text-zinc-500 font-mono uppercase mt-1">Subject Scope: {editingQuestion.subject} | Marks: {editingQuestion.marks}M</p>
                    
                    <div className="mt-4">
                      <label className="text-[10px] text-zinc-400 block mb-1 uppercase tracking-wider font-mono">Question Text</label>
                      <textarea
                        value={newQuestionText}
                        onChange={(e) => setNewQuestionText(e.target.value)}
                        className="w-full bg-zinc-950 border border-white/10 rounded p-3 text-xs leading-relaxed text-white focus:outline-none focus:border-accent-cyan h-28"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2.5 pt-3 border-t border-white/5">
                    <button onClick={() => setEditingQuestion(null)} className="px-4 py-1.5 bg-zinc-800 text-zinc-300 hover:bg-zinc-750 text-xs rounded">Cancel</button>
                    <button onClick={saveEdit} className="px-5 py-1.5 bg-accent-cyan text-zinc-950 text-xs font-bold hover:bg-cyan-400 rounded">Save & Commit</button>
                  </div>
                </div>
              )}

              {/* Questions table viewport (Screen 19) */}
              <div className="flex-1 overflow-auto bg-zinc-950/80 rounded-lg border border-white/5 p-2 table-container font-mono no-scrollbar">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-zinc-500 uppercase tracking-wider text-[10px]">
                      <th className="p-2 select-none">&bull; ID</th>
                      <th className="p-2 select-none">Questions text</th>
                      <th className="p-2 select-none text-center">Difficulty</th>
                      <th className="p-2 select-none text-center">Marks</th>
                      <th className="p-2 text-right select-none">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions
                      .filter(q => q.text.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((q) => (
                        <tr key={q.id} className="border-b border-white/5 hover:bg-white/5 group text-zinc-300">
                          <td className="p-2 text-zinc-500">#{q.id}</td>
                          <td className="p-2 max-w-sm truncate text-zinc-200 group-hover:text-white">{q.text}</td>
                          <td className="p-2 text-center text-zinc-400 text-[11px]">{q.difficulty}</td>
                          <td className="p-2 text-center text-accent-cyan font-bold font-mono">{q.marks}M</td>
                          <td className="p-2 text-right space-x-1 flex justify-end items-center">
                            <button onClick={() => startEdit(q)} className="p-1 text-zinc-400 hover:text-accent-cyan hover:bg-white/5 rounded cursor-pointer" title="Edit Question">
                              <Edit2 size={12} />
                            </button>
                            <button onClick={() => deleteQuestion(q.id)} className="p-1 text-zinc-400 hover:text-red-400 hover:bg-white/5 rounded cursor-pointer" title="Delete Question">
                              <Trash2 size={12} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="text-[10px] text-zinc-500 font-mono mt-3 border-t border-white/5 pt-2 flex justify-between items-center bg-zinc-950/40 p-1.5 rounded">
                <span>Database Index: SQLite local copy</span>
                <span>Active records in loop: {questions.length} questions</span>
              </div>
            </motion.div>
          )}

          {/* ==================== SCREEN 22: ABOUT THE PROJECT & SEED TEAM ==================== */}
          {activeTab === "about" && (
            <motion.div 
              key="about-view"
              className="w-full h-full flex flex-col justify-between pointer-events-auto overflow-y-auto font-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                <button onClick={() => setActiveTab("dashboard")} className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer">
                  <ArrowLeft size={13} /> Back to Dashboard
                </button>
                <span className="text-[10px] uppercase font-mono text-accent-mint tracking-wider">Project Overview Metadata</span>
              </div>

              {/* Section replicating Screen 22 content detailing the diploma program team */}
              <div className="flex-1 space-y-4">
                <div className="bg-[#7b61ff]/10 border border-[#7b61ff]/30 p-3.5 rounded-xl">
                  <h4 className="text-zinc-100 font-extrabold text-sm tracking-tight mb-1">Welcome to Question Paper Generator</h4>
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    An innovative offline desktop application designed to streamline the compilation of examination sheets for core Computer Science and Engineering (CSE) subjects. Built as our final-year diploma project to solve real-world faculty workloads.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Scope of Features summary */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-accent-cyan uppercase tracking-wider font-mono">Our Project Objectives</h5>
                    <ul className="text-xs text-zinc-400 space-y-2 list-disc list-inside">
                      <li>Minimize manual exam typesetting workload.</li>
                      <li>Eliminate recurring question repetition via clever shuffle randomizing.</li>
                      <li>Establish proper balance between Easy, Medium and Difficult syllabus objectives.</li>
                      <li>Preserve consistent examination formats (Assignments, Unit Tests, Semester exams).</li>
                    </ul>
                  </div>

                  {/* Seed Team Credits (Screen 22) */}
                  <div className="space-y-2 bg-zinc-900 border border-white/5 p-3 rounded-lg">
                    <h5 className="text-xs font-bold text-[#fbbf24] uppercase tracking-wider font-mono flex items-center gap-1"><Users size={12} /> Seed Team of Eight Students</h5>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Specializing in Computer Science and Engineering. Under the diligent guidance and advisory of our honored madam, <strong className="text-zinc-200">Mrs. Anasuya</strong>, we joined efforts to translate theoretical engineering into local application modules.
                    </p>
                    <div className="border-t border-white/5 pt-2 flex flex-wrap gap-1.5 text-[9px] font-mono text-zinc-500">
                      <span>#DiplomaDevs</span> <span>#CseProject</span> <span>#AndhraPolytechnic</span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="text-[10px] text-zinc-500 text-center border-t border-white/5 pt-3 mt-4">
                Version 1.0.0 &bull; Licensed for Academic Institutional Evaluation 2024
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      
    </div>
  );
}
