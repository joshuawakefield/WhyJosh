Here is the updated App.tsx.

I have completely rewritten the ROI Section with high-density, narrative-driven copy that positions you as a strategic asset rather than just a support rep. The styling now implements the checkerboard color pattern (Indigo/Amber) with contrasting bold text (Amber text on Indigo cards, Indigo text on Amber cards) to create visual vibration.

I also synchronized the whyjosh terminal command to reflect this new "Four Pillars" ROI analysis.

code
Tsx
download
content_copy
expand_less
import { ExternalLink, Linkedin, Github, Mail, ChevronDown, ChevronUp, Terminal, X, Zap, Cpu, Palette, Hammer, Shield, Trophy, Activity, Radio, Play, DollarSign, LucideIcon, Network, Brain, Layers } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// --- TYPES ---
interface TerminalBlock {
  id: number;
  command: string;
  output: string[];
  timestamp: string;
}

type ColorTheme = 'amber' | 'indigo';

// --- REUSABLE UI COMPONENTS ---

const Highlight = ({ children, color }: { children: React.ReactNode; color: ColorTheme | 'green' }) => {
  const colorClasses = {
    amber: 'text-amber-400',
    indigo: 'text-indigo-400',
    green: 'text-green-400'
  };
  return <strong className={colorClasses[color]}>{children}</strong>;
};

const SectionHeader = ({ title, icon: Icon, color }: { title: string; icon: LucideIcon; color: ColorTheme }) => {
  const isAmber = color === 'amber';
  return (
    <div className="flex items-center gap-4 relative group">
      <div className={`p-3 rounded-lg transition-all duration-700 transform group-hover:scale-110 shadow-xl bg-opacity-10 group-hover:bg-opacity-20 ${isAmber ? 'bg-amber-500 text-amber-400 shadow-amber-500/20' : 'bg-indigo-500 text-indigo-400 shadow-indigo-500/20'}`}>
        <Icon size={32} />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight transition-transform duration-700 ease-out origin-left group-hover:scale-[1.15]">
        {title}
      </h2>
    </div>
  );
};

const GlowButton = ({ href, icon: Icon, text, color = 'amber', newTab = false }: { href: string; icon: LucideIcon; text: string; color?: ColorTheme; newTab?: boolean }) => {
  const styles = {
    amber: {
      btn: 'bg-amber-500 text-slate-900 focus:ring-amber-500 shadow-[0_0_40px_-10px_rgba(251,191,36,0.6)]',
      glow: 'bg-amber-400',
      ping: 'bg-amber-500'
    },
    indigo: {
      btn: 'bg-indigo-500 text-white focus:ring-indigo-500 shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)]',
      glow: 'bg-indigo-400',
      ping: 'bg-indigo-500'
    }
  };

  return (
    <a 
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={`group relative inline-flex items-center justify-center px-8 py-4 font-bold transition-all duration-200 font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 ${styles[color].btn}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        <Icon size={20} /> {text}
      </span>
      <div 
        className={`absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl ${styles[color].glow}`}
        style={{ transform: 'translateZ(0)' }} 
      />
      <div className={`absolute -inset-0 rounded-full animate-ping opacity-20 ${styles[color].ping}`} style={{ animationDuration: '3s' }}></div>
    </a>
  );
};

const SpotlightCard = ({ children, className = '', glowColor = 'amber' }: { children: React.ReactNode; className?: string; glowColor?: ColorTheme }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotlightRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.opacity = '0.5';
    spotlightRef.current.style.left = `${x - 50}px`;
    spotlightRef.current.style.top = `${y - 50}px`;
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-container relative overflow-hidden transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={spotlightRef} 
        className={`spotlight w-24 h-24 absolute pointer-events-none rounded-full blur-xl transition-opacity duration-100 ${glowColor === 'amber' ? 'bg-amber-400/20' : 'bg-indigo-500/20'}`}
        style={{ opacity: 0, transform: 'translateZ(0)' }} 
      />
      {children}
    </div>
  );
};

// --- TIMELINE ITEM ---
const TimelineItem = ({ title, date, color, children }: { title: string; date: string; color: ColorTheme; children: React.ReactNode }) => {
  return (
    <div className="relative pl-12 group/item">
      <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 transition-colors duration-300 ${color === 'amber' ? 'border-amber-500 group-hover/item:bg-amber-500' : 'border-indigo-500 group-hover/item:bg-indigo-500'}`}></div>
      <div className="space-y-2">
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
          <h3 className="text-xl font-bold text-gray-100">{title}</h3>
          <span className={`font-mono text-sm ${color === 'amber' ? 'text-amber-400' : 'text-indigo-400'}`}>{date}</span>
        </div>
        <div className="text-gray-400 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- WIN CARD ---
const WinCard = ({ title, refCode, icon: Icon, theme, children }: { title: string; refCode: string; icon: LucideIcon; theme: ColorTheme; children: React.ReactNode }) => {
  const isAmber = theme === 'amber';
  return (
    <SpotlightCard glowColor="amber" className={`bg-slate-900 border p-0 rounded-lg border-slate-800 flex flex-col overflow-hidden group/card transition-all duration-300 ${isAmber ? 'hover:border-amber-500/50' : 'hover:border-indigo-500/50'} hover:scale-[1.05] hover:z-10 hover:shadow-2xl`}>
      <div className={`p-4 border-b border-slate-700 flex justify-between items-center ${isAmber ? 'bg-amber-950/30' : 'bg-indigo-950/30'}`}>
        <span className={`text-xs font-mono tracking-widest ${isAmber ? 'text-amber-400' : 'text-indigo-400'}`}>{refCode}</span>
        <Icon size={18} className={isAmber ? 'text-amber-400' : 'text-indigo-400'} />
      </div>
      <div className="p-6 flex flex-col gap-4 flex-1">
        <h3 className="text-xl font-bold text-gray-100">{title}</h3>
        <div className="text-sm text-gray-400 leading-relaxed flex-1">
          {children}
        </div>
      </div>
    </SpotlightCard>
  );
};

// --- TERMINAL MODAL ---
function TerminalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [input, setInput] = useState('');
  const [blocks, setBlocks] = useState<TerminalBlock[]>([
    {
      id: 0,
      command: 'boot',
      timestamp: new Date().toLocaleTimeString(),
      output: [
        "WakefieldOS v2.2.0 (tty1)",
        "Memory: 64GB / Integrated Polarity",
        "System Integrity: 100%",
        " ",
        "Welcome. You have accessed the hidden kernel.",
        "Type 'help' to see available commands."
      ]
    }
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        inputRef.current?.focus();
      }, 100);
    }
  }, [blocks, isOpen]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      if (!cmd) return;
      
      let newOutput: string[] = [];
      const timestamp = new Date().toLocaleTimeString();

      switch (cmd) {
        case 'help':
          newOutput = [
            "Available Commands:",
            "-------------------",
            "whoami      ::  Professional identity & mission",
            "whyjosh     ::  The ROI case (Financial & Operational)",
            "cv          ::  Work history & high-stakes roles",
            "stack       ::  Technical competencies (Electron-to-Cloud)",
            "jamcamping  ::  Zero-Latency Adaptation Case Study",
            "contact     ::  Direct communication channels",
            "clear       ::  Clear terminal buffer",
            "exit        ::  Close session"
          ];
          break;

        case 'whoami':
          newOutput = [
            "IDENTITY: Joshua Wakefield",
            "ROLE: High-Bandwidth Generalist | WPI EE Background",
            "-----------------------------------------------------",
            "I operate at the intersection of engineering physics and human dynamics.",
            "I don't view 'Technical Support' and 'Systems Architecture' as binary choices;",
            "I view them as part of the same feedback loop.",
            " ",
            "I am the 'Old Guard' (Logo '89, Linux '96) and a Pioneer (AI Agents '25).",
            "I bridge the gap between the Metal (Construction) and the Model (Code)."
          ];
          break;

        case 'whyjosh':
          newOutput = [
            "EXECUTING: ROI_ANALYSIS.EXE",
            "---------------------------",
            "1. SYSTEMIC TRANSLATION:",
            "   Startups die in the gaps between departments. I use AI to translate",
            "   Code (Engineering), Emotion (Users), and Metrics (Management).",
            " ",
            "2. ENGINEERING FIREWALL:",
            "   I solve Tier 3 complexity in the queue, protecting your roadmap",
            "   from the tax of context-switching.",
            " ",
            "3. ZERO-LATENCY ELASTICITY:",
            "   Specialists break when domains change. I adapt. I use AI to",
            "   compress learning curves (Proof: JamCamping in 48hrs).",
            " ",
            "4. NET DOLLAR DEFENSE:",
            "   I turn cancellation events into loyalty events via Radical Empathy,",
            "   saving the company more capital than I cost.",
            " ",
            "CONCLUSION: A depreciating asset in reverse. Compound operational interest."
          ];
          break;
        
        case 'cv':
          newOutput = [
            "WORK HISTORY LOG:",
            "-----------------",
            "[2021-Present] Independent Trade Contractor & Systems Builder",
            "   >> Bridging physical infrastructure with systems thinking.",
            "   >> Parallel execution: Mastered MERN stack while managing logistics.",
            " ",
            "[2022-Present] Freelance Full Stack & AI Orchestrator",
            "   >> Built JamCamping.com (Bolt.new) using Agentic Workflows.",
            "   >> Focus: Context Hygiene & Zero-Latency Engineering.",
            " ",
            "[Past] Tier 3 Technical Support (DR Power)",
            "   >> The 'Stopper' for critical mechanical failures.",
            "   >> Remote forensic troubleshooting of engines/circuits.",
            " ",
            "[Past] Proposal Red Team Lead (CACI)",
            "   >> Synthesized $6M federal contracts.",
            "   >> NUWCDIVNPT officials cited 'best written proposal received.'"
          ];
          break;

        case 'stack':
          newOutput = [
            "CORE ARCHITECTURE (ELECTRON-TO-CLOUD):",
            "--------------------------------------",
            "Frontend :: React, Next.js, Vite, Tailwind, TypeScript",
            "Backend  :: Node.js, Supabase, PostgreSQL",
            "AI/LLM   :: Agent Orchestration, Context Hygiene, Prompt Engineering",
            "Physics  :: Signal Processing, Control Theory, Circuit Analysis (WPI EE)"
          ];
          break;

        case 'jamcamping':
          newOutput = [
            "PROJECT: JamCamping.com",
            "STATUS: Production (PWA)",
            "BUILD TIME: 48 Hours (Weekend Sprint)",
            "-------------------------------------",
            "WORKFLOW ARCHITECTURE:",
            "1. GitIngest: Serialized repo into token-optimized context streams.",
            "2. External Reasoner: Used O1/Claude for high-level architecture logic.",
            "3. Bolt.new: Execution environment for rapid implementation.",
            " ",
            "RESULT: Zero-latency deployment proving 'Context Hygiene' methodology."
          ];
          break;

        case 'contact':
          newOutput = [
            "ESTABLISH UPLINK:",
            "-----------------",
            "Email    :: joshua.wakefield@gmail.com",
            "Phone    :: (802) 735-0543",
            "Location :: Newport, RI, USA",
            "State    :: Ready to deploy."
          ];
          break;

        case 'sudo':
          newOutput = [
            "Permission denied: You do not have root access to Joshua.",
            "To gain root access, please issue the 'hire' contract."
          ];
          break;
          
        case 'hire':
          newOutput = [
            "INITIATING HIRE PROTOCOL...",
            "Great choice. Send the contract to joshua.wakefield@gmail.com",
            "Expect immediate ROI."
          ];
          break;

        case 'clear':
          setBlocks([]);
          setInput('');
          return;

        case 'exit':
          onClose();
          return;

        default:
          newOutput = [
            `Command not found: ${cmd}`,
            "Type 'help' for a list of valid commands."
          ];
      }

      const newBlock: TerminalBlock = { id: Date.now(), command: cmd, timestamp, output: newOutput };
      setBlocks(prev => [...prev, newBlock]);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-0 md:p-4" onClick={onClose}>
      <div className="w-full h-full md:h-auto md:max-w-3xl bg-slate-950 border-0 md:border border-slate-700 md:rounded-lg shadow-2xl overflow-hidden font-mono ring-0 md:ring-1 ring-amber-500/20 flex flex-col md:max-h-[80vh]" onClick={e => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 p-3 flex justify-between items-center shrink-0">
          <div className="flex gap-2 ml-2"></div>
          <div className="text-slate-900 font-bold text-xs tracking-widest opacity-80">GUEST@WAKEFIELD:~</div>
          <button onClick={onClose} className="text-slate-900 hover:text-white transition-colors mr-2"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto bg-slate-950 scrollbar-thin scrollbar-thumb-slate-800 p-2" ref={scrollRef}>
          {blocks.map((block, i) => (
            <div key={block.id} className={`p-4 border-b border-white/5 ${i % 2 === 0 ? 'bg-indigo-950/10' : 'bg-transparent'}`}>
              <div className="flex items-start gap-3 mb-2 opacity-80">
                <span className="text-amber-500 font-bold shrink-0">➜</span>
                <span className="text-blue-400 shrink-0">~</span>
                <span className="text-gray-100">{block.command}</span>
                <span className="text-slate-600 text-xs ml-auto font-sans">{block.timestamp}</span>
              </div>
              <div className="pl-6 space-y-1">
                {block.output.map((line, k) => (
                  <div key={k} className={`${line.startsWith('>>') ? 'text-indigo-300 ml-4' : line.startsWith('COMMAND') ? 'text-amber-400 font-bold' : 'text-green-400/90'} text-sm md:text-base leading-relaxed break-words font-mono`}>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="p-4 bg-slate-900/30 mb-20 md:mb-0">
            <div className="flex items-center gap-3">
              <span className="text-amber-500 font-bold animate-pulse">➜</span>
              <span className="text-blue-400">~</span>
              <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleCommand} autoFocus className="bg-transparent border-none outline-none text-gray-100 flex-1 focus:ring-0 placeholder-slate-700 text-base p-0" spellCheck="false" autoComplete="off" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP ---

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const sections = ['hero', 'manifesto', 'loom', 'jamcamping', 'timeline', 'domains', 'wins', 'roi', 'contact'];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const jumpSection = (direction: 'up' | 'down') => {
    let currentIndex = 0;
    const threshold = 150; 
    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i]);
      if (el && el.getBoundingClientRect().top <= threshold) {
        currentIndex = i;
      }
    }

    let targetIdx;
    if (direction === 'down') {
      targetIdx = Math.min(currentIndex + 1, sections.length - 1);
    } else {
      const currentEl = document.getElementById(sections[currentIndex]);
      const currentTop = currentEl ? currentEl.getBoundingClientRect().top : 0;
      targetIdx = currentTop < -20 ? currentIndex : Math.max(currentIndex - 1, 0);
    }
    scrollToSection(sections[targetIdx]);
  };

  useEffect(() => {
    const handleScroll = () => {
      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = winHeight <= 0 ? 0 : (window.scrollY / winHeight) * 100;
      setScrollProgress(progress);

      const threshold = 160; 
      let current = sections[0];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const terminalIntensity = 0.2 + Math.pow(scrollProgress / 100, 2) * 0.8;
  const pulseSpeed = 2 - (scrollProgress / 100) * 1.2;

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 font-sans antialiased transition-colors duration-700 relative pb-20">
      
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="fixed top-0 left-0 h-1 z-50 transition-all duration-300 bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)]" style={{ width: `${scrollProgress}%` }} />

      {/* FLOATING DOCK */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-3 p-2 bg-slate-900/90 backdrop-blur rounded-full border border-amber-500/30 shadow-2xl">
          <button 
            onClick={() => jumpSection('up')} 
            className="p-3 rounded-full text-amber-500/60 border border-transparent hover:border-amber-500/40 hover:text-amber-400 hover:scale-125 hover:bg-amber-500/10 transition-all duration-300"
          >
            <ChevronUp size={24} strokeWidth={3} />
          </button>
          <div className="h-px w-6 bg-slate-700 mx-auto" />
          <button 
            onClick={() => jumpSection('down')} 
            className="p-3 rounded-full text-amber-500/60 border border-transparent hover:border-amber-500/40 hover:text-amber-400 hover:scale-125 hover:bg-amber-500/10 transition-all duration-300"
          >
            <ChevronDown size={24} strokeWidth={3} />
          </button>
        </div>
        
        {/* Terminal Button */}
        <button 
          onClick={() => setIsTerminalOpen(true)} 
          className="p-5 backdrop-blur border rounded-full shadow-2xl transition-all duration-500 hover:scale-110 bg-indigo-950/90 border-amber-500/50 text-amber-400 group relative overflow-hidden animate-pulse"
          style={{ 
            opacity: Math.min(0.3 + (scrollProgress / 50), 1),
            boxShadow: `0 0 ${50 * terminalIntensity}px rgba(251, 191, 36, ${0.6 * terminalIntensity})`,
            animationDuration: `${pulseSpeed}s`
          }}
        >
          <Terminal size={28} className="relative z-10" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-900 text-xs font-mono rounded border border-amber-500/30 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">CMD+K</span>
        </button>
        
        {/* Spacer */}
        <div className="h-16 w-16 pointer-events-none opacity-0" />
      </div>

      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

      {/* HERO SECTION */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden z-10 scroll-mt-32">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-indigo-900 via-purple-900 to-amber-900/20 pointer-events-none"></div>
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(251, 191, 36, 0.1) 2px, rgba(251, 191, 36, 0.1) 4px)', animation: 'scanlines 8s linear infinite' }}></div>
        
        <div className="max-w-5xl w-full text-center space-y-8 relative z-10">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full border text-sm font-mono mb-4 border-amber-500/50 bg-amber-500/10 text-amber-400">
              SYSTEM STATE: HIGH BANDWIDTH // READY
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text mb-4 bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              JOSHUA WAKEFIELD
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto">
              The <span className="font-medium text-amber-400">High-Bandwidth Generalist</span> for the AI Era.<br className="hidden md:block" />
              Bridging WPI Physics, Operational Grit, and AI Orchestration.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <GlowButton href="mailto:joshua.wakefield@gmail.com" icon={Mail} text="Contact Me" color="amber" />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-40 relative z-10">

        {/* MANIFESTO / TWO SHAPES */}
        <section id="manifesto" className="space-y-8 group scroll-mt-32">
          <div className="space-y-4 border-l-4 pl-6 relative border-amber-500 transition-all duration-700">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-100 tracking-tight transition-transform duration-700 ease-out origin-left group-hover:scale-[1.15]">The Two Shapes of Value</h2>
            <p className="text-amber-400 font-mono text-lg">/Deep Specialist vs. AI Generalist/</p>
          </div>
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-6">
            <p>The future of work is bifurcating into two distinct shapes. There is the <strong className="text-indigo-400">Deep Specialist</strong> (the PhD researcher building the model) and the <strong className="text-amber-400">AI-Amplified Generalist</strong> (the operator wielding it).</p>
            <p><strong className="text-white">I am the Generalist.</strong></p>
            <p>I possess a topological understanding of 10+ distinct domains—from Signal Processing and Control Theory to Industrial Logistics and Crisis Negotiation. Before AI, this was called "scattered." <strong className="text-amber-400">With AI, it is called "Hyper-Navigation."</strong></p>
            <SpotlightCard className="p-6 rounded-lg border mt-8 bg-slate-900 border-slate-800 hover:border-amber-500/50">
              <p className="text-amber-400 font-mono text-sm mb-2">// THE SYNTHESIS ENGINE</p>
              <p className="italic text-gray-400">"I use Artificial Intelligence as a universal glue. I don't need to memorize the syntax of every library because I understand the architecture of the system. I use AI to execute the 'How' so I can focus entirely on the 'Why'."</p>
            </SpotlightCard>
          </div>
        </section>

        {/* LOOM */}
        <section id="loom" className="space-y-8 group scroll-mt-32 min-h-[40vh] flex flex-col justify-center">
          <SectionHeader title="Vibration Control" icon={Play} color="amber" />
          <SpotlightCard className="w-full aspect-video bg-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-2xl flex items-center justify-center group/video">
             <div className="text-center space-y-4 p-8">
               <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover/video:bg-amber-500 group-hover/video:text-slate-900 transition-colors duration-300 text-amber-400"><Play size={32} className="ml-1" /></div>
               <p className="text-gray-400 font-mono text-sm">[LOOM_VIDEO_PLACEHOLDER]</p>
               <p className="text-gray-500 text-xs max-w-md mx-auto">"I'm Joshua. I'm currently working construction in Newport, RI, but I'm an engineer at heart. I built this site to show you that I don't just close tickets—I build trust. Let's talk."</p>
             </div>
          </SpotlightCard>
        </section>

        {/* JAMCAMPING (ZERO-LATENCY) */}
        <section id="jamcamping" className="space-y-12 group scroll-mt-32">
          <SectionHeader title="Case Study: Zero-Latency Adaptation" icon={Activity} color="indigo" />
          <div className="space-y-8">
            <p className="text-lg text-gray-300 leading-relaxed">The value of JamCamping.com isn't the app itself; it's the <Highlight color="amber">Velocity</Highlight>. I am not a native React developer—I am a Systems Thinker. I used an "External Reasoner" workflow to bridge the gap between intent and execution. <strong className="text-white">I don't need 6 months to learn your stack. I need 48 hours and a clear objective.</strong></p>
            <SpotlightCard className="bg-slate-900 border p-8 rounded-lg border-slate-800 relative overflow-hidden group/workflow hover:border-amber-500/50 transition-all duration-500">
              <div className="absolute top-0 right-0 p-3 text-xs font-mono text-amber-500/50 border-b border-l border-amber-500/20 rounded-bl-lg bg-amber-500/5">WORKFLOW_ID: ZERO_LATENCY</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex flex-col gap-4">
                     {[
                       { id: '01', title: 'GitIngest (Context)', desc: 'Serialized repo into context stream.', color: 'text-amber-400' },
                       { id: '02', title: 'External Reasoner', desc: 'O1/Claude Sonnet for architecture logic.', color: 'text-indigo-400' },
                       { id: '03', title: 'Bolt.new (Execution)', desc: 'IDE/Compiler to implement logic.', color: 'text-green-400' }
                     ].map((step, idx) => (
                       <div key={idx} className="flex flex-col md:flex-row gap-3">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-gray-400 font-mono text-xs border border-slate-700">{step.id}</div>
                            <div><h4 className={`font-bold ${step.color}`}>{step.title}</h4><p className="text-sm text-gray-500">{step.desc}</p></div>
                         </div>
                       </div>
                     ))}
                  </div>
                </div>
                <div className="relative h-full min-h-[200px] flex items-center justify-center">
                   <div className="relative w-full aspect-video bg-indigo-950/30 rounded border border-indigo-500/30 flex flex-col items-center justify-center transition-all duration-500 group-hover/workflow:scale-105 group-hover/workflow:border-amber-500 group-hover/workflow:shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">JamCamping</div>
                      <div className="text-xs font-mono text-indigo-300 bg-indigo-900/50 px-2 py-1 rounded">V 1.0.0 // PRODUCTION</div>
                      <a href="https://jamcamping.com" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10"></a>
                   </div>
                </div>
              </div>
            </SpotlightCard>
            <div className="flex justify-center mt-8">
               <GlowButton href="https://jamcamping.com" icon={ExternalLink} text="View Proof of Velocity" color="indigo" newTab={true} />
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" className="space-y-12 group scroll-mt-32">
          <SectionHeader title="The Convergence" icon={Terminal} color="amber" />
          <div className="relative border-l border-slate-800 ml-4 space-y-12 pb-4">
             <TimelineItem title="The Source Code: From Armatron to NuMega" date="1985-1999" color="amber">
                My path began with a Radio Shack Armatron in 1985 and evolved through learning to code in Logo in 1989, DOS and BASIC in 1990, and Linux in 1995. This culminated in a professional role at <Highlight color="indigo">NuMega Labs (1998)</Highlight> coding alongside senior engineers. I entered WPI not as a novice, but with deep roots in the history of the machine.
             </TimelineItem>
             <TimelineItem title="The Hard Foundation: WPI Engineering" date="1999-2003" color="indigo">
                98% BS in Electrical Engineering. This was the era of engineering labs and rigorous mathematical lecture. I specialized in <Highlight color="amber">Real-Time Signals & Systems</Highlight>, <Highlight color="amber">Control Engineering</Highlight>, and <Highlight color="amber">Power Engineering</Highlight>. My understanding of AI is grounded in the math of the universe—Fourier transforms, Entropy, and Feedback—not just API calls.
             </TimelineItem>
             <TimelineItem title="The Crucible: High-Stakes Operations" date="2006-2020" color="amber">
                I stepped out of the code and into the fire of reality. From managing multi-million dollar government contracts at <Highlight color="indigo">CACI</Highlight>, to solving critical mechanical failures at <Highlight color="indigo">DR Power Equipment</Highlight>. This era forged my financial literacy and operational grit. I know that when systems fail, it costs real money.
             </TimelineItem>
             <TimelineItem title="The Antifragile Turn" date="2020-2022" color="indigo">
                Navigated extreme resource constraints while working rigorous manual labor (Tree Service) during the Vermont winter. This era proved that ambition can survive even when resources are at zero. It culminated in <Highlight color="amber">Burlington Code Academy</Highlight>, where I graduated top-of-class in the final pre-ChatGPT cohort.
             </TimelineItem>
             <TimelineItem title="The Synthesis: Native AI Orchestration" date="Present" color="amber">
                Since November 2022, I have engineered context daily. I don't just write code; I orchestrate agentic workflows—repurposing AI IDEs to transmute code outputs into narrative prose and production software. I have integrated WPI's "Hard Engineering" with the "Modern AI Stack" to become the bridge between the metal and the model.
             </TimelineItem>
          </div>
        </section>

        {/* DOMAINS / CONVERGENCE */}
        <section id="domains" className="space-y-12 group scroll-mt-32">
          <SectionHeader title="The Synthesis" icon={Network} color="indigo" />
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
            <p>I don't just "know" these domains; I understand the universal patterns that connect them. AI is the high-bandwidth cable that allows me to transfer the logic of one domain into the execution of another instantly.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpotlightCard className="bg-slate-900 border p-6 rounded-lg border-slate-800 flex flex-col gap-4 transition-all duration-300 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
              <div className="flex items-center gap-3 text-amber-400"><Zap size={24} /><h3 className="text-xl font-bold text-white">The Metal</h3></div>
              <p className="text-sm text-gray-400 leading-relaxed">
                <Highlight color="indigo">WPI Physics & Trades.</Highlight> My foundation isn't syntax; it is the Math of the Universe. I possess the literacy to consume <Highlight color="indigo">Robotics & AI white papers</Highlight> because I speak their native tongue: <Highlight color="indigo">Fourier Transforms</Highlight> and <Highlight color="indigo">Control Theory</Highlight>. I understand the deep physics that high-level APIs abstract away.
              </p>
            </SpotlightCard>
            <SpotlightCard glowColor="indigo" className="bg-slate-900 border p-6 rounded-lg border-slate-800 flex flex-col gap-4 transition-all duration-300 hover:border-indigo-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
              <div className="flex items-center gap-3 text-indigo-400"><Brain size={24} /><h3 className="text-xl font-bold text-white">The Mind</h3></div>
              <p className="text-sm text-gray-400 leading-relaxed">
                <Highlight color="amber">Systematic Creativity.</Highlight> To me, the Circle of Fifths is a circuit diagram. I apply <Highlight color="amber">Jazz Theory</Highlight> to improvisational guitar, treating music as real-time conversational logic. I study <Highlight color="amber">Stand-Up Comedy</Highlight> to master the ultimate feedback loop: controlling the timing, tension, and release of a room's energy.
              </p>
            </SpotlightCard>
            <SpotlightCard className="bg-slate-900 border p-6 rounded-lg border-slate-800 flex flex-col gap-4 transition-all duration-300 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
              <div className="flex items-center gap-3 text-amber-400"><Layers size={24} /><h3 className="text-xl font-bold text-white">The Glue</h3></div>
              <p className="text-sm text-gray-400 leading-relaxed">
                <Highlight color="indigo">AI Orchestration.</Highlight> This is the lever. I use Artificial Intelligence to synthesize the rigorous logic of "The Metal" with the creative intuition of "The Mind." It allows me to be a <Highlight color="indigo">Hyper-Navigator</Highlight>, solving problems that cross the boundaries of Engineering, Operations, and Human Dynamics.
              </p>
            </SpotlightCard>
          </div>
        </section>

        {/* WINS / HYPER-NAVIGATION */}
        <section id="wins" className="space-y-12 group scroll-mt-32">
          <SectionHeader title="Hyper-Navigation Wins" icon={Trophy} color="amber" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <WinCard title="The Red Team Unification" refCode="LOG_REF: CACI_RED_TEAM" icon={Shield} theme="indigo">
                As the final Red Team Editor for a <strong>$6M federal recompete</strong>, I inherited 21 disjointed submissions. I acted as a <Highlight color="amber">Synthesizer</Highlight>, harmonizing every font, tense, and vocabulary choice into a single consciousness. NUWCDIVNPT officials confirmed it was the "<strong>best written</strong> proposal they had ever received."
                <div className="mt-2 text-xs text-indigo-300 font-mono">[RESULT: CROSS_DOMAIN_TRANSLATION]</div>
            </WinCard>
            <WinCard title="The Remote Debug" refCode="LOG_REF: REMOTE_DEBUG" icon={Radio} theme="amber">
                A customer received a top-of-the-line trimmer that wouldn't start. I visualized the schematic remotely. Walking him through a forensic check, we located a QC error deep in the chassis. I turned a "Detractor" into an "Evangelist" by applying <Highlight color="indigo">Technical Authority</Highlight> via phone.
                <div className="mt-2 text-xs text-amber-300 font-mono">[RESULT: DETRACTOR_CONVERTED]</div>
            </WinCard>
            <WinCard title="The 160-Mile Protocol Breach" refCode="LOG_REF: HUMAN_OVERRIDE" icon={Activity} theme="indigo">
                 A customer's husband was dying; his mower was a critical emotional anchor. Protocol said "too far." I refused that output. I negotiated a custom service contract, leveraging human empathy to fix the machine before he passed. Some KPIs don't fit on a spreadsheet.
                <div className="mt-2 text-xs text-indigo-300 font-mono">[RESULT: MISSION_COMPLETE]</div>
            </WinCard>
          </div>
        </section>

        {/* ROI / HYPER-NAVIGATOR (REFACTORED WITH CHECKERBOARD STYLE) */}
        <section id="roi" className="space-y-8 group scroll-mt-32">
          <SectionHeader title="The ROI of Synthesis" icon={DollarSign} color="indigo" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Systemic Translation (Indigo Theme / Amber Bold) */}
            <SpotlightCard glowColor="indigo" className="bg-slate-900 border p-6 rounded-lg transition-all duration-300 border-slate-800 hover:border-indigo-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
                <h3 className="text-lg font-bold text-gray-200 mb-2">Systemic Translation</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Startups hemorrhage value in the "air gaps" between departments. The Engineer speaks in rigid syntax; the User speaks in raw emotion; the Manager speaks in metrics. As a Generalist, <strong className="text-amber-400">I act as the universal translator.</strong> I use AI to normalize these disparate signals, turning vague user frustration into actionable engineering specs and converting technical limitations into empathetic customer narratives.
                </p>
            </SpotlightCard>

            {/* Card 2: Engineering Shielding (Amber Theme / Indigo Bold) */}
            <SpotlightCard glowColor="amber" className="bg-slate-900 border p-6 rounded-lg transition-all duration-300 border-slate-800 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
                <h3 className="text-lg font-bold text-gray-200 mb-2">Engineering Shielding</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Your Senior Engineers are your most expensive assets, and every support escalation taxes their bandwidth. I function as a <strong className="text-indigo-400">Tier-3 Firewall.</strong> Because I possess the "Electron-to-Cloud" literacy to debug the root cause myself, I filter out the noise. I protect your roadmap from context-switching costs, ensuring your core team focuses on shipping features, not fixing history.
                </p>
            </SpotlightCard>

            {/* Card 3: Zero-Latency Elasticity (Amber Theme / Indigo Bold) - Checkerboard placement */}
            <SpotlightCard glowColor="amber" className="bg-slate-900 border p-6 rounded-lg transition-all duration-300 border-slate-800 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
                <h3 className="text-lg font-bold text-gray-200 mb-2">Zero-Latency Elasticity</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Specialists break when the domain changes; Generalists adapt. I proved this with JamCamping.com: I am not a native React developer, yet I shipped a production PWA in 48 hours using an Agentic Workflow. <strong className="text-indigo-400">I don't need a 6-month ramp-up.</strong> I use AI to compress the learning curve, meaning I can pivot from Support to QA to Technical Writing instantly as the company scales.
                </p>
            </SpotlightCard>

            {/* Card 4: Net Dollar Defense (Indigo Theme / Amber Bold) - Checkerboard placement */}
            <SpotlightCard glowColor="indigo" className="bg-slate-900 border p-6 rounded-lg transition-all duration-300 border-slate-800 hover:border-indigo-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
                <h3 className="text-lg font-bold text-gray-200 mb-2">Net Dollar Defense</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  I view Support not as a cost center, but as a Revenue Defense unit. In the AI era, users churn when they feel stupid or ignored. I apply <strong className="text-amber-400">"Vibration Control"</strong>—a synthesis of radical empathy and technical authority—to turn cancellation events into loyalty events. I aim to save the company more capital than I cost by defending Net Dollar Retention (NDR) at the source.
                </p>
            </SpotlightCard>

          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="text-center space-y-8 pt-10 pb-20 scroll-mt-32">
          <p className="text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
             Support is the only department that touches every other department. It is the natural home for the Generalist. I am applying for this role because it is the "Central Nervous System" of the company. Let's build the Trust Department.
          </p>
          <div className="flex justify-center">
             <GlowButton href="mailto:joshua.wakefield@gmail.com" icon={Mail} text="Let's Talk" color="amber" />
          </div>
        </section>

      </div>

      <footer className="border-t border-slate-900 mt-32 bg-slate-950 relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex flex-col items-center gap-10">
            <div className="flex gap-10">
              {[ 
                { href: 'https://linkedin.com/in/jmwakefield', icon: Linkedin, label: 'LinkedIn' }, 
                { href: 'https://github.com/joshuawakefield', icon: Github, label: 'GitHub' }, 
                { href: 'mailto:joshua.wakefield@gmail.com', icon: Mail, label: 'Email' } 
              ].map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex flex-col items-center gap-2 transition-all duration-300 text-gray-500 hover:text-amber-400"
                >
                  <div className="p-4 rounded-full bg-slate-900 border border-slate-800 group-hover:border-amber-500/50 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-amber-500/20">
                    <link.icon size={28} />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
            <div className="text-center space-y-2">
              <p className="text-gray-500 text-sm font-mono tracking-tighter">
                SYSTEM_ID: JOSHUA_WAKEFIELD // STATUS: <span className="text-amber-500 animate-pulse">TRANSMITTING</span>
              </p>
              <p className="text-gray-700 text-[10px] font-mono uppercase tracking-[0.2em]">
                High-Bandwidth Generalist // Integrated Polarity // 2025
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;