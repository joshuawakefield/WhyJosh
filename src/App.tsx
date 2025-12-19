import { ExternalLink, Linkedin, Github, Mail, ChevronDown, ChevronUp, Terminal, X, Zap, Cpu, Palette, Hammer, Shield, Trophy, Activity, Radio, Play, DollarSign, LucideIcon, Network, Brain, Layers, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// --- TYPES ---
interface TerminalBlock {
  id: number;
  command: string;
  output: string[];
  timestamp: string;
}

type ColorTheme = 'amber' | 'indigo';

// --- VISUAL COMPONENTS ---

// Fade In Observer (The "Loading Opacity" effect)
const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      {children}
    </div>
  );
};

// Typing Text Effect
const TypingText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    setDisplayed(''); // Reset on text change
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40); // Typing speed
    return () => clearInterval(interval);
  }, [text]);

  return (
    <>
      {displayed}
      <span className="animate-blink text-amber-400 ml-1">_</span>
    </>
  );
};

// --- UI COMPONENTS ---

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
    <div className="flex items-center gap-6 relative group">
      <div className={`p-4 rounded-xl transition-all duration-700 transform group-hover:scale-110 shadow-xl bg-opacity-10 group-hover:bg-opacity-30 ${isAmber ? 'bg-amber-500 text-amber-400 shadow-amber-500/30' : 'bg-indigo-500 text-indigo-400 shadow-indigo-500/30'}`}>
        <Icon size={36} />
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-gray-100 tracking-tight glitch-hover transition-transform duration-700 ease-out origin-left group-hover:scale-[1.05]">
        {title}
      </h2>
    </div>
  );
};

const GlowButton = ({ href, icon: Icon, text, color = 'amber', newTab = false }: { href: string; icon: LucideIcon; text: string; color?: ColorTheme; newTab?: boolean }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    buttonRef.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) buttonRef.current.style.transform = 'translate(0, 0) scale(1)';
  };

  const styles = {
    amber: {
      btn: 'bg-amber-500 text-slate-900 shadow-[0_0_60px_-10px_rgba(251,191,36,0.5)] hover:shadow-[0_0_80px_-5px_rgba(251,191,36,0.8)]',
      glow: 'bg-amber-400',
      ping: 'bg-amber-500'
    },
    indigo: {
      btn: 'bg-indigo-500 text-white shadow-[0_0_60px_-10px_rgba(99,102,241,0.5)] hover:shadow-[0_0_80px_-5px_rgba(99,102,241,0.8)]',
      glow: 'bg-indigo-400',
      ping: 'bg-indigo-500'
    }
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={`group relative inline-flex items-center justify-center px-10 py-5 font-bold text-lg rounded-full transition-all duration-300 ${styles[color].btn}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className="relative z-10 flex items-center gap-3">
        <Icon size={24} /> {text}
      </span>
      <div className={`absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl ${styles[color].glow}`} />
      <div className={`absolute -inset-0 rounded-full animate-ping opacity-30 ${styles[color].ping}`} style={{ animationDuration: '2.5s' }} />
    </a>
  );
};

const SpotlightCard = ({ children, className = '', glowColor = 'amber' }: { children: React.ReactNode; className?: string; glowColor?: ColorTheme }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotlightRef.current || !innerRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight
    spotlightRef.current.style.opacity = '0.7';
    spotlightRef.current.style.left = `${x - 100}px`;
    spotlightRef.current.style.top = `${y - 100}px`;

    // 3D Tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 4; // Subtle tilt
    const rotateX = ((centerY - y) / centerY) * 4;
    cardRef.current.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Parallax inner content
    innerRef.current.style.transform = `translate(${rotateY * 0.5}px, ${rotateX * 0.5}px)`;
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1400px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    if (innerRef.current) innerRef.current.style.transform = 'translate(0, 0)';
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-container relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur-sm transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        ref={spotlightRef}
        className={`spotlight w-56 h-56 absolute pointer-events-none rounded-full blur-[80px] transition-opacity duration-200 ${glowColor === 'amber' ? 'bg-amber-400/30' : 'bg-indigo-500/30'}`}
        style={{ opacity: 0 }}
      />
      <div ref={innerRef} className="relative z-10 transition-transform duration-200">
        {children}
      </div>
    </div>
  );
};

const TimelineItem = ({ title, date, color, children, expandedContent }: { title: string; date: string; color: ColorTheme; children: React.ReactNode; expandedContent?: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative pl-12 group/item transition-all duration-300 ${expandedContent ? 'cursor-pointer' : ''}`} onClick={() => expandedContent && setIsExpanded(!isExpanded)}>
      <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 transition-all duration-300 group-hover/item:scale-125 ${color === 'amber' ? 'border-amber-500 group-hover/item:bg-amber-500' : 'border-indigo-500 group-hover/item:bg-indigo-500'}`}></div>
      <div className="flex items-center gap-3">
        <h3 className="text-xl font-bold text-gray-100">{title}</h3>
        <span className={`font-mono text-sm ${color === 'amber' ? 'text-amber-400' : 'text-indigo-400'}`}>{date}</span>
        {expandedContent && (
          <ChevronRight className={`ml-auto text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-90 text-amber-400' : ''}`} size={20} />
        )}
      </div>
      <div className="text-gray-400 leading-relaxed mt-2">
        {children}
      </div>
      {expandedContent && isExpanded && (
        <div className="mt-4 pl-6 border-l-2 border-slate-800 text-gray-500 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
          {expandedContent}
        </div>
      )}
    </div>
  );
};

const WinCard = ({ title, refCode, icon: Icon, theme, children }: { title: string; refCode: string; icon: LucideIcon; theme: ColorTheme; children: React.ReactNode }) => {
  const isAmber = theme === 'amber';
  return (
    <SpotlightCard glowColor="amber" className={`p-0 flex flex-col ${isAmber ? 'hover:border-amber-500/50' : 'hover:border-indigo-500/50'}`}>
      <div className={`p-4 border-b border-slate-700/50 flex justify-between items-center ${isAmber ? 'bg-amber-950/20' : 'bg-indigo-950/20'}`}>
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
  const [velocity, setVelocity] = useState(0);
  const [showShortcuts, setShowShortcuts] = useState(false);

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
    const currentIndex = sections.indexOf(activeSection);
    const targetIdx = direction === 'down' ? Math.min(currentIndex + 1, sections.length - 1) : Math.max(currentIndex - 1, 0);
    scrollToSection(sections[targetIdx]);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsTerminalOpen(true);
      }
      if (e.key === 'ArrowDown') jumpSection('down');
      if (e.key === 'ArrowUp') jumpSection('up');
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeSection]);

  useEffect(() => {
    let prevScroll = window.scrollY;
    let prevTime = performance.now();

    const handleScroll = () => {
      const current = window.scrollY;
      const time = performance.now();
      const deltaTime = time - prevTime || 1;
      const deltaScroll = Math.abs(current - prevScroll);
      const currentVelocity = (deltaScroll / deltaTime) * 1000;
      setVelocity(currentVelocity);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = winHeight <= 0 ? 0 : (current / winHeight) * 100;
      setScrollProgress(progress);

      const threshold = window.innerHeight * 0.3; 
      let currentSection = sections[0];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= threshold) {
          currentSection = section;
        }
      }
      setActiveSection(currentSection);

      prevScroll = current;
      prevTime = time;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const terminalIntensity = 0.3 + Math.pow(scrollProgress / 100, 2) * 0.9;
  const scanDuration = Math.max(2, 12 - velocity / 50);

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 font-sans antialiased transition-colors duration-700 relative pb-20">
      
      {/* Overlays */}
      <div className="fixed inset-0 pointer-events-none z-40 opacity-20 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="fixed inset-0 pointer-events-none z-40 bg-gradient-to-b from-transparent via-transparent to-slate-950/60" />
      <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(15,23,42,0.9)_100%)]" />
      <div className="fixed-scanlines z-40" style={{ '--scan-duration': `${scanDuration}s` } as React.CSSProperties} />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-1.5 z-50 w-full bg-slate-800">
        <div className="h-full bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.9)] transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Floating Dock & Terminal */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-4">
        {/* Nav Buttons (Mobile/Desktop) */}
        <div className="flex flex-col gap-2 p-2 bg-slate-900/90 backdrop-blur rounded-full border border-slate-700 shadow-xl">
           <button onClick={() => jumpSection('up')} className="p-2 text-slate-400 hover:text-amber-400 transition-colors"><ChevronUp size={20} /></button>
           <button onClick={() => jumpSection('down')} className="p-2 text-slate-400 hover:text-amber-400 transition-colors"><ChevronDown size={20} /></button>
        </div>

        {/* Terminal Button */}
        <div className="relative" onMouseEnter={() => setShowShortcuts(true)} onMouseLeave={() => setShowShortcuts(false)}>
          <button 
            onClick={() => setIsTerminalOpen(true)} 
            className="cursor-hover relative p-5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-2xl transition-all duration-500 hover:scale-110 group"
            style={{ boxShadow: `0 0 ${60 * terminalIntensity}px rgba(251,191,36,${terminalIntensity})` }}
          >
            <Terminal size={32} className="text-amber-400 relative z-10" />
            <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-900 text-xs font-mono rounded border border-amber-500/30 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">CMD+K</span>
          </button>
          {showShortcuts && (
            <div className="absolute bottom-full right-0 mb-4 p-4 bg-slate-900/95 backdrop-blur border border-slate-700 rounded-lg shadow-2xl text-xs font-mono text-gray-300 whitespace-nowrap hidden md:block">
              <div>⌘ K → Terminal</div>
              <div>↑ ↓ → Jump sections</div>
            </div>
          )}
        </div>
      </div>

      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

      {/* HERO SECTION */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10 scroll-mt-32">
        <FadeInSection>
          <div className="inline-block px-3 py-1 rounded-full border text-sm font-mono mb-6 border-amber-500/50 bg-amber-500/10 text-amber-400 animate-pulse">
             SYSTEM STATE: HIGH BANDWIDTH // READY
          </div>
          <h1 className="text-5xl md:text-8xl font-bold text-gray-100 mb-8 tracking-tighter glitch-hover">
            JOSHUA WAKEFIELD
          </h1>
          <p className="text-2xl md:text-5xl text-amber-400 mb-6 font-light">
             High-Bandwidth Generalist
          </p>
          <p className="text-xl md:text-4xl text-gray-300 max-w-5xl leading-relaxed mx-auto">
            <TypingText text="Bridging WPI Physics, Operational Grit, and AI Orchestration." />
          </p>
          <div className="mt-12 flex justify-center">
            <GlowButton href="mailto:joshua.wakefield@gmail.com" icon={Mail} text="Contact Me" color="amber" />
          </div>
          <div className="mt-20 flex justify-center">
            <ChevronDown size={48} className="text-amber-400 animate-bounce cursor-pointer cursor-hover opacity-50 hover:opacity-100 transition-opacity" onClick={() => scrollToSection('manifesto')} />
          </div>
        </FadeInSection>
      </section>

      {/* MAIN CONTENT WRAPPER */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-10 space-y-48 relative z-10">

        {/* MANIFESTO */}
        <FadeInSection>
          <section id="manifesto" className="space-y-12 group scroll-mt-32">
            <div className="space-y-4 border-l-4 pl-6 relative border-amber-500 transition-all duration-700">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-100 tracking-tight">The Two Shapes of Value</h2>
              <p className="text-amber-400 font-mono text-lg">/Deep Specialist vs. AI Generalist/</p>
            </div>
            <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-6">
              <p>The future of work is bifurcating into two distinct shapes. There is the <strong className="text-indigo-400">Deep Specialist</strong> (the PhD researcher building the model) and the <strong className="text-amber-400">AI-Amplified Generalist</strong> (the operator wielding it).</p>
              <p><strong className="text-white">I am the Generalist.</strong></p>
              <p>I possess a topological understanding of 10+ distinct domains—from Signal Processing and Control Theory to Industrial Logistics and Crisis Negotiation. Before AI, this was called "scattered." <strong className="text-amber-400">With AI, it is called "Hyper-Navigation."</strong></p>
              <SpotlightCard className="p-8 mt-8 border-slate-800">
                <p className="text-amber-400 font-mono text-sm mb-4">// THE SYNTHESIS ENGINE</p>
                <p className="italic text-gray-300 text-lg">"I use Artificial Intelligence as a universal glue. I don't need to memorize the syntax of every library because I understand the architecture of the system. I use AI to execute the 'How' so I can focus entirely on the 'Why'."</p>
              </SpotlightCard>
            </div>
          </section>
        </FadeInSection>

        {/* LOOM */}
        <FadeInSection>
          <section id="loom" className="space-y-12 group scroll-mt-32">
            <SectionHeader title="Vibration Control" icon={Play} color="amber" />
            <SpotlightCard className="w-full aspect-video bg-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-2xl flex items-center justify-center group/video cursor-hover">
              <div className="text-center space-y-6 p-8">
                <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover/video:bg-amber-500 group-hover/video:text-slate-900 transition-colors duration-300 text-amber-400 transform group-hover/video:scale-110">
                  <Play size={40} className="ml-1" />
                </div>
                <p className="text-gray-400 font-mono text-sm">[LOOM_VIDEO_PLACEHOLDER]</p>
                <p className="text-gray-500 text-sm max-w-md mx-auto">"I'm Joshua. I'm currently working construction in Newport, RI, but I'm an engineer at heart. I built this site to show you that I don't just close tickets—I build trust."</p>
              </div>
            </SpotlightCard>
          </section>
        </FadeInSection>

        {/* JAMCAMPING */}
        <FadeInSection>
          <section id="jamcamping" className="space-y-12 group scroll-mt-32">
            <SectionHeader title="Case Study: Zero-Latency Adaptation" icon={Activity} color="indigo" />
            <div className="space-y-8">
              <p className="text-xl text-gray-300 leading-relaxed">The value of JamCamping.com isn't the app itself; it's the <Highlight color="amber">Velocity</Highlight>. I am not a native React developer—I am a Systems Thinker. I used an "External Reasoner" workflow to bridge the gap between intent and execution. <strong className="text-white">I don't need 6 months to learn your stack. I need 48 hours and a clear objective.</strong></p>
              
              <SpotlightCard className="p-8 border-slate-800 relative group/workflow">
                <div className="absolute top-0 right-0 p-3 text-xs font-mono text-amber-500/50 border-b border-l border-amber-500/20 rounded-bl-lg bg-amber-500/5">WORKFLOW_ID: ZERO_LATENCY</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-8">
                    <div className="flex flex-col gap-6">
                      {[
                        { id: '01', title: 'GitIngest (Context)', desc: 'Serialized repo into context stream.', color: 'text-amber-400' },
                        { id: '02', title: 'External Reasoner', desc: 'O1/Claude Sonnet for architecture logic.', color: 'text-indigo-400' },
                        { id: '03', title: 'Bolt.new (Execution)', desc: 'IDE/Compiler to implement logic.', color: 'text-green-400' }
                      ].map((step, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row gap-3">
                          <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center text-gray-400 font-mono text-sm border border-slate-700">{step.id}</div>
                              <div><h4 className={`font-bold text-lg ${step.color}`}>{step.title}</h4><p className="text-sm text-gray-500">{step.desc}</p></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative h-full min-h-[200px] flex items-center justify-center">
                    <div className="relative w-full aspect-video bg-indigo-950/30 rounded-xl border border-indigo-500/30 flex flex-col items-center justify-center transition-all duration-500 group-hover/workflow:scale-105 group-hover/workflow:border-amber-500 group-hover/workflow:shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-3">JamCamping</div>
                        <div className="text-xs font-mono text-indigo-300 bg-indigo-900/50 px-3 py-1 rounded">V 1.0.0 // PRODUCTION</div>
                        <a href="https://jamcamping.com" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 cursor-hover"></a>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
              
              <div className="flex justify-center mt-8">
                <GlowButton href="https://jamcamping.com" icon={ExternalLink} text="View Proof of Velocity" color="indigo" newTab={true} />
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* TIMELINE */}
        <FadeInSection>
          <section id="timeline" className="space-y-12 group scroll-mt-32">
            <SectionHeader title="The Convergence" icon={Terminal} color="amber" />
            <div className="relative border-l-2 border-slate-800 ml-4 space-y-12 pb-8">
              <TimelineItem title="The Source Code: From Armatron to NuMega" date="1985-1999" color="amber" 
                expandedContent="Deep dive into early hardware tinkering and professional coding at NuMega Labs alongside senior engineers.">
                  My path began with a Radio Shack Armatron in 1985 and evolved through learning to code in Logo in 1989, DOS and BASIC in 1990, and Linux in 1995. This culminated in a professional role at <Highlight color="indigo">NuMega Labs (1998)</Highlight> coding alongside senior engineers. I entered WPI not as a novice, but with deep roots in the history of the machine.
              </TimelineItem>
              <TimelineItem title="The Hard Foundation: WPI Engineering" date="1999-2003" color="indigo"
                expandedContent="Specilized coursework in Signals & Systems and Control Theory.">
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
        </FadeInSection>

        {/* DOMAINS */}
        <FadeInSection>
          <section id="domains" className="space-y-12 group scroll-mt-32">
            <SectionHeader title="The Synthesis" icon={Network} color="indigo" />
            <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
              <p>I don't just "know" these domains; I understand the universal patterns that connect them. AI is the high-bandwidth cable that allows me to transfer the logic of one domain into the execution of another instantly.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SpotlightCard className="p-6 border-slate-800 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-amber-400"><Zap size={24} /><h3 className="text-xl font-bold text-white">The Metal</h3></div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  <Highlight color="indigo">WPI Physics & Trades.</Highlight> My foundation isn't syntax; it is the Math of the Universe. I possess the literacy to consume <Highlight color="indigo">Robotics & AI white papers</Highlight> because I speak their native tongue: <Highlight color="indigo">Fourier Transforms</Highlight> and <Highlight color="indigo">Control Theory</Highlight>. I understand the deep physics that high-level APIs abstract away.
                </p>
              </SpotlightCard>
              <SpotlightCard glowColor="indigo" className="p-6 border-slate-800 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-indigo-400"><Brain size={24} /><h3 className="text-xl font-bold text-white">The Mind</h3></div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  <Highlight color="amber">Systematic Creativity.</Highlight> To me, the Circle of Fifths is a circuit diagram. I apply <Highlight color="amber">Jazz Theory</Highlight> to improvisational guitar, treating music as real-time conversational logic. I study <Highlight color="amber">Stand-Up Comedy</Highlight> to master the ultimate feedback loop: controlling the timing, tension, and release of a room's energy.
                </p>
              </SpotlightCard>
              <SpotlightCard className="p-6 border-slate-800 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-amber-400"><Layers size={24} /><h3 className="text-xl font-bold text-white">The Glue</h3></div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  <Highlight color="indigo">AI Orchestration.</Highlight> This is the lever. I use Artificial Intelligence to synthesize the rigorous logic of "The Metal" with the creative intuition of "The Mind." It allows me to be a <Highlight color="indigo">Hyper-Navigator</Highlight>, solving problems that cross the boundaries of Engineering, Operations, and Human Dynamics.
                </p>
              </SpotlightCard>
            </div>
          </section>
        </FadeInSection>

        {/* WINS */}
        <FadeInSection>
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
        </FadeInSection>

        {/* ROI */}
        <FadeInSection>
          <section id="roi" className="space-y-8 group scroll-mt-32">
            <SectionHeader title="The ROI of Synthesis" icon={DollarSign} color="indigo" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Systemic Translation (Indigo Theme / Amber Bold) */}
              <SpotlightCard glowColor="indigo" className="p-8 border-slate-800">
                  <h3 className="text-xl font-bold text-gray-200 mb-4">Systemic Translation</h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    Startups hemorrhage value in the "air gaps" between departments. The Engineer speaks in rigid syntax; the User speaks in raw emotion; the Manager speaks in metrics. As a Generalist, <strong className="text-amber-400">I act as the universal translator.</strong> I use AI to normalize these disparate signals, turning vague user frustration into actionable engineering specs and converting technical limitations into empathetic customer narratives.
                  </p>
              </SpotlightCard>

              {/* Card 2: Engineering Shielding (Amber Theme / Indigo Bold) */}
              <SpotlightCard glowColor="amber" className="p-8 border-slate-800">
                  <h3 className="text-xl font-bold text-gray-200 mb-4">Engineering Shielding</h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    Your Senior Engineers are your most expensive assets, and every support escalation taxes their bandwidth. I function as a <strong className="text-indigo-400">Tier-3 Firewall.</strong> Because I possess the "Electron-to-Cloud" literacy to debug the root cause myself, I filter out the noise. I protect your roadmap from context-switching costs, ensuring your core team focuses on shipping features, not fixing history.
                  </p>
              </SpotlightCard>

              {/* Card 3: Zero-Latency Elasticity (Amber Theme / Indigo Bold) */}
              <SpotlightCard glowColor="amber" className="p-8 border-slate-800">
                  <h3 className="text-xl font-bold text-gray-200 mb-4">Zero-Latency Elasticity</h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    Specialists break when the domain changes; Generalists adapt. I proved this with JamCamping.com: I am not a native React developer, yet I shipped a production PWA in 48 hours using an Agentic Workflow. <strong className="text-indigo-400">I don't need a 6-month ramp-up.</strong> I use AI to compress the learning curve, meaning I can pivot from Support to QA to Technical Writing instantly as the company scales.
                  </p>
              </SpotlightCard>

              {/* Card 4: Net Dollar Defense (Indigo Theme / Amber Bold) */}
              <SpotlightCard glowColor="indigo" className="p-8 border-slate-800">
                  <h3 className="text-xl font-bold text-gray-200 mb-4">Net Dollar Defense</h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    I view Support not as a cost center, but as a Revenue Defense unit. In the AI era, users churn when they feel stupid or ignored. I apply <strong className="text-amber-400">"Vibration Control"</strong>—a synthesis of radical empathy and technical authority—to turn cancellation events into loyalty events. I aim to save the company more capital than I cost by defending Net Dollar Retention (NDR) at the source.
                  </p>
              </SpotlightCard>

            </div>
          </section>
        </FadeInSection>

        {/* CONTACT */}
        <FadeInSection>
          <section id="contact" className="text-center space-y-12 py-20 scroll-mt-32">
            <p className="text-3xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
               Support is the only department that touches every other department. It is the natural home for the Generalist. I am applying for this role because it is the "Central Nervous System" of the company. Let's build the Trust Department.
            </p>
            <div className="flex justify-center">
               <GlowButton href="mailto:joshua.wakefield@gmail.com" icon={Mail} text="Let's Talk" color="amber" />
            </div>
          </section>
        </FadeInSection>

      </div>

      <footer className="border-t border-slate-900 mt-40 bg-slate-950/95 backdrop-blur z-10 relative">
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
                  className="group flex flex-col items-center gap-3 transition-all duration-300 text-gray-500 hover:text-amber-400"
                >
                  <div className="p-4 rounded-full bg-slate-900 border border-slate-800 group-hover:border-amber-500/50 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-amber-500/20 cursor-hover">
                    <link.icon size={28} />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
            <div className="text-center space-y-3">
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
2. src/index.css
code
CSS
download
content_copy
expand_less
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary-glow: #fbbf24; /* Amber-400 */
  --secondary-glow: #4f46e5; /* Indigo-600 */
}

@keyframes grid-pulse {
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.12; }
}

@keyframes scanlines {
  0% { background-position: 0 0; }
  100% { background-position: 0 100vh; }
}

@keyframes glow-header {
  0%, 100% { text-shadow: 0 0 10px currentColor; }
  50% { text-shadow: 0 0 20px currentColor; }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes glitch1 {
  0% { transform: translate(0); }
  20% { transform: translate(-3px, 3px); }
  40% { transform: translate(-3px, -3px); }
  60% { transform: translate(3px, 3px); }
  80% { transform: translate(3px, -3px); }
  100% { transform: translate(0); }
}

@keyframes glitch2 {
  0% { transform: translate(0); }
  20% { transform: translate(3px, -3px); }
  40% { transform: translate(-3px, 3px); }
  60% { transform: translate(3px, -3px); }
  80% { transform: translate(-3px, 3px); }
  100% { transform: translate(0); }
}

.animate-blink { animation: blink 1s step-end infinite; }
.grid-pulse { animation: grid-pulse 4s ease-in-out infinite; }

.fixed-scanlines {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(251,191,36,0.04) 3px, rgba(251,191,36,0.04) 6px);
  background-size: 100% 6px;
  animation: scanlines linear infinite;
  animation-duration: var(--scan-duration, 8s);
  opacity: 0.25;
}

.glow-header { animation: glow-header 3s ease-in-out infinite; }

.spotlight-container {
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
}

.glitch-hover:hover {
  animation: glitch1 0.35s linear infinite, glitch2 0.35s linear infinite;
  text-shadow: 0.05em 0 0 rgba(255,0,0,0.75),
               -0.05em -0.05em 0 rgba(0,255,255,0.75),
               0.05em 0.05em 0 rgba(0,255,0,0.75);
}

/* Global Selection */
::selection {
  background-color: rgba(251, 191, 36, 0.3);
  color: #fbbf24;
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Mobile adjustments */
@media (max-width: 768px) {
  .space-y-40 { @apply space-y-32; }
  .px-6 { @apply px-4; }
}