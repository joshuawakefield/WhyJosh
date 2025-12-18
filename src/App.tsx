import { ExternalLink, Linkedin, Github, Mail, ChevronDown, ChevronUp, Terminal, X, Zap, Cpu, Palette, Hammer, Shield, Trophy, Activity, Radio, Play, DollarSign, LucideIcon } from 'lucide-react';
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
  const theme = {
    amber: {
      wrapper: 'bg-amber-500/10 text-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] bg-amber-500/20',
      icon: 'text-amber-400'
    },
    indigo: {
      wrapper: 'bg-indigo-500/10 text-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.5)] bg-indigo-500/20',
      icon: 'text-indigo-400'
    }
  };

  return (
    <div className="flex items-center gap-4 relative group">
      <div className={`p-3 rounded-lg transition-all duration-700 transform group-hover:scale-110 ${theme[color].icon} bg-opacity-10 group-hover:shadow-xl group-hover:bg-opacity-20 ${color === 'amber' ? 'bg-amber-500 group-hover:bg-amber-500' : 'bg-indigo-500 group-hover:bg-indigo-500'}`}>
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

// --- SECTION SPECIFIC COMPONENTS ---

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

function TerminalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [input, setInput] = useState('');
  const [blocks, setBlocks] = useState<TerminalBlock[]>([
    {
      id: 0,
      command: 'boot',
      timestamp: new Date().toLocaleTimeString(),
      output: [
        "WakefieldOS v1.0.7 (tty1)",
        "Login: guest",
        "System Integrity: 100%",
        "Welcome to the System. Type 'help' for commands."
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
      const newBlock: TerminalBlock = { id: Date.now(), command: cmd, timestamp: new Date().toLocaleTimeString(), output: [] };
      
      const commands: Record<string, string[]> = {
        help: ["Available commands:", "whoami", "whyjosh", "yearlygoal", "stack", "contact", "jamcamping", "clear", "exit"],
        whoami: ["Joshua Wakefield.", "Polymathic Systems Synthesizer.", "WPI EE '03.", "Forged in DR Power.", "Currently optimizing entropy."],
        whyjosh: ["RUNNING: ROI_ANALYSIS.EXE", "---------------------------", "1. ARBITRAGE: You get Senior Architecture logic for Support cost.", "2. STABILITY: A 'Stopper' who absorbs chaos.", "3. VELOCITY: Protects Engineering bandwidth.", "CONCLUSION: Joshua is high-yield infrastructure."],
        yearlygoal: ["PRIMARY OBJECTIVE:", "To save the company more money than I am being paid.", "METHODOLOGY: Engineering Bandwidth Defense + Churn Reduction"],
        stack: ["CORE: React, Next.js, Node, TypeScript", "AI: Agent Orchestration, Context Hygiene, RAG", "HARDWARE: Signal Processing, IoT, Circuit Design"],
        contact: ["Email: joshua.wakefield@gmail.com", "Location: Newport, RI, USA"],
        jamcamping: ["JamCamping.com", "----------------", "A production-grade PWA built in one weekend on Bolt.new.", "Architecture: Dual-Stack (Vite/Next.js)", "Status: Deployed"],
      };

      if (cmd === 'clear') { setBlocks([]); setInput(''); return; }
      if (cmd === 'exit') { onClose(); return; }

      newBlock.output = commands[cmd] || [`Command not found: ${cmd}`, "Type 'help' for assistance."];
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
                {block.output.map((line, k) => <div key={k} className="text-green-400/90 text-sm md:text-base leading-relaxed break-words">{line}</div>)}
              </div>
            </div>
          ))}
          <div className="p-4 bg-slate-900/30 mb-20 md:mb-0">
            <div className="flex items-center gap-3">
              <span className="text-amber-500 font-bold animate-pulse">➜</span>
              <span className="text-blue-400">~</span>
              <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleCommand} autoFocus className="bg-transparent border-none outline-none text-gray-100 flex-1 focus:ring-0 placeholder-slate-700 text-base p-0" spellCheck="false" />
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
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

const jumpSection = (direction: 'up' | 'down') => {
  // Same reliable logic as scroll handler, but fresh calculation (no state dependency)
  const point = window.scrollY + 80;
  let currentIdx = 0;

  for (let i = 0; i < sections.length; i++) {
    const el = document.getElementById(sections[i]);
    if (el && el.offsetTop <= point) {
      currentIdx = i;
    } else {
      break;
    }
  }

  let targetIdx;
  if (direction === 'down') {
    targetIdx = Math.min(currentIdx + 1, sections.length - 1);
  } else {
    // 'up'
    targetIdx = Math.max(currentIdx - 1, 0);
  }

  scrollToSection(sections[targetIdx]);
};

  useEffect(() => {
const handleScroll = () => {
  const winHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = winHeight <= 0 ? 0 : (window.scrollY / winHeight) * 100;
  setScrollProgress(progress);

  // Reliable "furthest section we've passed the top of" logic
  // Matches the 80px offset used in scrollToSection
  const point = window.scrollY + 80;
  let current = sections[0];

  for (const section of sections) {
    const el = document.getElementById(section);
    if (el && el.offsetTop <= point) {
      current = section;
    } else {
      break;
    }
  }

  setActiveSection(current);
};
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const terminalPulseOpacity = 0.2 + (scrollProgress / 100) * 0.8;

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 font-sans antialiased transition-colors duration-700 relative pb-20">
      
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="fixed top-0 left-0 h-1 z-50 transition-all duration-300 bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)]" style={{ width: `${scrollProgress}%` }} />

      {/* FLOATING DOCK */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-3 p-2 bg-slate-900/90 backdrop-blur rounded-full border border-amber-500/30 shadow-2xl">
          <button 
            onClick={() => jumpSection('up')} 
            className="p-3 rounded-full text-amber-500/60 hover:text-amber-400 hover:scale-125 hover:bg-amber-500/10 transition-all duration-300"
          >
            <ChevronUp size={24} strokeWidth={3} />
          </button>
          <div className="h-px w-6 bg-slate-700 mx-auto" />
          <button 
            onClick={() => jumpSection('down')} 
            className="p-3 rounded-full text-amber-500/60 hover:text-amber-400 hover:scale-125 hover:bg-amber-500/10 transition-all duration-300"
          >
            <ChevronDown size={24} strokeWidth={3} />
          </button>
        </div>
        <button 
          onClick={() => setIsTerminalOpen(true)} 
          className="p-5 backdrop-blur border rounded-full shadow-2xl transition-all duration-500 hover:scale-110 bg-indigo-950/90 border-amber-500/50 text-amber-400 group relative overflow-hidden"
        >
          <Terminal size={28} className="relative z-10" />
          <div 
            className="absolute inset-0 bg-amber-500 animate-pulse pointer-events-none"
            style={{ opacity: terminalPulseOpacity * 0.3 }}
          />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-900 text-xs font-mono rounded border border-amber-500/30 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">CMD+K</span>
        </button>
        <div className="h-12 w-12 pointer-events-none opacity-0" />
      </div>

      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

      {/* HERO SECTION */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden z-10">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-indigo-900 via-purple-900 to-amber-900/20 pointer-events-none"></div>
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(251, 191, 36, 0.1) 2px, rgba(251, 191, 36, 0.1) 4px)', animation: 'scanlines 8s linear infinite' }}></div>
        
        <div className="max-w-5xl w-full text-center space-y-8 relative z-10">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full border text-sm font-mono mb-4 border-amber-500/50 bg-amber-500/10 text-amber-400">
              SYSTEM STATE: HIGH VIBRATION // READY
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text mb-4 bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              JOSHUA WAKEFIELD
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto">
              The <span className="font-medium text-amber-400">Human Hypervisor</span> for AI Communities.<br className="hidden md:block" />
              Bridging Blue-Collar Grit & White-Collar Strategy.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <GlowButton href="mailto:joshua.wakefield@gmail.com" icon={Mail} text="Contact Me" color="amber" />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-40 relative z-10">

        {/* MANIFESTO */}
        <section id="manifesto" className="space-y-8 group scroll-mt-24">
          <div className="space-y-4 border-l-4 pl-6 relative border-amber-500 transition-all duration-700">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-100 tracking-tight transition-transform duration-700 ease-out origin-left group-hover:scale-[1.15]">Integrated Polarity</h2>
            <p className="text-amber-400 font-mono text-lg">/ˈin(t)əˌɡrādəd pōˈlerədē/</p>
          </div>
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-6">
            <p>I operate beyond the standard "Soft Skills vs. Hard Skills" binary. Most professionals optimize for a single trajectory—climbing the corporate ladder or mastering a craft. <strong className="text-white"> I have deliberately integrated both.</strong></p>
            <p>I possess the engineering rigor to deconstruct the kernel (WPI EE), but the artistic intuition to read the room (Jazz/Comedy). I have the grit to handle the daily grind, but the vision to see the product roadmap. I don't just toggle between these states; I synthesize them to solve problems that single-domain experts cannot touch.</p>
            <SpotlightCard className="p-6 rounded-lg border mt-8 bg-slate-900 border-slate-800 hover:border-amber-500/50">
              <p className="text-amber-400 font-mono text-sm mb-2">// THE FORCE MULTIPLIER EFFECT</p>
              <p className="italic text-gray-400">"I am not just one person; I am a team of specialists inhabiting one body, orchestrated by a mature executive consciousness."</p>
            </SpotlightCard>
          </div>
        </section>

        {/* LOOM */}
        <section id="loom" className="space-y-8 group scroll-mt-24">
          <SectionHeader title="The Human Interface" icon={Play} color="amber" />
          <SpotlightCard className="w-full aspect-video bg-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-2xl flex items-center justify-center group/video">
             <div className="text-center space-y-4 p-8">
               <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover/video:bg-amber-500 group-hover/video:text-slate-900 transition-colors duration-300 text-amber-400"><Play size={32} className="ml-1" /></div>
               <p className="text-gray-400 font-mono text-sm">[LOOM_VIDEO_PLACEHOLDER]</p>
               <p className="text-gray-500 text-xs max-w-md mx-auto">"I'm Joshua. I’m currently working construction in Newport, RI, but I’m an engineer at heart. I built this site to show you that I don't just close tickets—I build trust. Let's talk."</p>
             </div>
          </SpotlightCard>
        </section>

        {/* JAMCAMPING */}
        <section id="jamcamping" className="space-y-12 group scroll-mt-24">
          <SectionHeader title="AI Orchestration: The Build" icon={Activity} color="indigo" />
          <div className="space-y-8">
            <p className="text-lg text-gray-300 leading-relaxed">JamCamping.com isn't just an app; it is a proof of <Highlight color="amber">Agentic Workflow</Highlight>. I built a production-grade PWA in one weekend using a "Context Hygiene" loop that treats AI models not as chatbots, but as distinct processing units in a signal chain.</p>
            <SpotlightCard className="bg-slate-900 border p-8 rounded-lg border-slate-800 relative overflow-hidden group/workflow hover:border-amber-500/50 transition-all duration-500">
              <div className="absolute top-0 right-0 p-3 text-xs font-mono text-amber-500/50 border-b border-l border-amber-500/20 rounded-bl-lg bg-amber-500/5">WORKFLOW_ID: RECURSIVE_SYNTHESIS</div>
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
               <GlowButton href="https://jamcamping.com" icon={ExternalLink} text="View Proof of Work" color="indigo" newTab={true} />
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" className="space-y-12 group scroll-mt-24">
          <SectionHeader title="The Electron-to-Cloud Graph" icon={Terminal} color="amber" />
          <div className="relative border-l border-slate-800 ml-4 space-y-12 pb-4">
             <TimelineItem title="The Source Code: From Armatron to NuMega" date="1985-1999" color="amber">
                My path began with a Radio Shack Armatron in 1985 and evolved through Logo, DOS, and Linux. By 1996, I was attending college night school for C/C++ while still in Catholic high school. This culminated in a professional role at <Highlight color="indigo">NuMega Labs (1998)</Highlight> coding alongside senior engineers and competing in US FIRST Robotics. I entered WPI not as a novice, but as a seasoned practitioner.
             </TimelineItem>
             <TimelineItem title="The Hard Foundation: WPI Engineering" date="1999-2003" color="indigo">
                98% BS in Electrical Engineering. This was the era of "Hard Robotics" and rigorous Control Theory. I specialized in <Highlight color="amber">Real-Time Signals & Systems</Highlight>, <Highlight color="amber">Control Engineering</Highlight>, and <Highlight color="amber">Analog Circuits and Motors</Highlight>. I was building autonomous feedback loops and optimizing assembly for embedded architectures. My understanding of AI is grounded in the math of the universe—Fourier transforms, Entropy, and Feedback—not just API calls.
             </TimelineItem>
             <TimelineItem title="The Crucible: High-Stakes Operations" date="2006-2020" color="amber">
                I stepped out of the code and into the fire of reality. From managing multi-million dollar government contracts at <Highlight color="indigo">CACI</Highlight> (Budgeting, BD, Financial), to running Tech Support at <Highlight color="indigo">Daft Labs</Highlight>, to solving critical mechanical failures at <Highlight color="indigo">DR Power Equipment</Highlight>. This era forged my financial literacy and operational grit. I know that when systems fail, it costs real money—whether it's an SAP error or a blown actuator.
             </TimelineItem>
             <TimelineItem title="The Antifragile Turn" date="2020-2022" color="indigo">
                Navigated extreme resource constraints while working rigorous manual labor (Tree Service) during a Vermont winter. This era proved that ambition can survive even when resources are at zero. It culminated in my return to the <Highlight color="amber">Burlington Code Academy</Highlight>, where I graduated top-of-class in the industry's <Highlight color="amber">final pre-ChatGPT cohort</Highlight>, re-igniting my entrance back into tech.
             </TimelineItem>
             <TimelineItem title="The Synthesis: Native AI Orchestration" date="Present" color="amber">
                I graduated the bootcamp weeks before <Highlight color="indigo">ChatGPT</Highlight> launched, making me a native of the <Highlight color="indigo">Generative Era</Highlight>. Since November 2022, I have engineered context daily across <Highlight color="indigo">Claude, Grok, and Gemini</Highlight>. I don't just write code; I orchestrate agentic workflows—repurposing AI IDEs to transmute code outputs into narrative prose for ebooks. I have integrated WPI's "Hard Engineering" with the "Modern AI Stack" to become the bridge between the metal and the model.
             </TimelineItem>
          </div>
        </section>

        {/* DOMAINS */}
        <section id="domains" className="space-y-12 group scroll-mt-24">
          <SectionHeader title="The Domain Matrix" icon={Cpu} color="indigo" />
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
            <p>My mind is an association engine. I can poke a stick in a campfire and see embers that remind me of particle trails in a cloud chamber. To me, a jazz mode is just a frequency response; a kitchen service is just a packet-switching network. I don't just "know" these domains—I understand the universal patterns that connect them.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpotlightCard className="bg-slate-900 border p-6 rounded-lg border-slate-800 flex flex-col gap-4 transition-all duration-300 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
              <div className="flex items-center gap-3 text-amber-400"><Zap size={24} /><h3 className="text-xl font-bold">The Physics</h3></div>
              <p className="text-sm text-gray-400 leading-relaxed">
                <Highlight color="indigo">First Principles.</Highlight> My foundation isn't syntax; it is the Math of the Universe. I possess the literacy to consume <Highlight color="indigo">Robotics & AI white papers</Highlight> because I speak their native tongue: <Highlight color="indigo">Fourier Transforms</Highlight>, <Highlight color="indigo">Control Theory</Highlight>, and <Highlight color="indigo">Feedback Loops</Highlight>. From <Highlight color="indigo">Relativity</Highlight> and <Highlight color="indigo">Optics</Highlight> to <Highlight color="indigo">Algorithmic Complexity</Highlight>, I understand the deep physics that high-level APIs abstract away.
              </p>
            </SpotlightCard>
            <SpotlightCard glowColor="indigo" className="bg-slate-900 border p-6 rounded-lg border-slate-800 flex flex-col gap-4 transition-all duration-300 hover:border-indigo-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
              <div className="flex items-center gap-3 text-indigo-400"><Palette size={24} /><h3 className="text-xl font-bold">The Art</h3></div>
              <p className="text-sm text-gray-400 leading-relaxed">
                <Highlight color="amber">Systematic Creativity.</Highlight> To me, the Circle of Fifths is a circuit diagram. I apply <Highlight color="amber">Jazz Theory</Highlight> to improvisational guitar (Phish/Dead), treating music as real-time conversational logic. I create <Highlight color="amber">Sacred Geometric</Highlight> art to explore the visual syntax of nature. I study <Highlight color="amber">Stand-Up Comedy</Highlight> to master the ultimate feedback loop: controlling the timing, tension, and release of a room's energy.
              </p>
            </SpotlightCard>
            <SpotlightCard className="bg-slate-900 border p-6 rounded-lg border-slate-800 flex flex-col gap-4 transition-all duration-300 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
              <div className="flex items-center gap-3 text-amber-400"><Hammer size={24} /><h3 className="text-xl font-bold">The Grind</h3></div>
              <p className="text-sm text-gray-400 leading-relaxed">
                <Highlight color="indigo">Operational Truth.</Highlight> I have mastered the physical stack. In the <Highlight color="indigo">Trades</Highlight>, I execute Carpentry, Plumbing, Electrical, Demo, and Tree Work. In <Highlight color="indigo">Culinary</Highlight>, I am a <Highlight color="indigo">ServSafe Manager</Highlight> who has run everything from Line/Grill to Large-Scale Banquets (Colleges/Cruise Ships). Whether mudding drywall or designing a menu for an industrial kitchen build, I respect the physics of production.
              </p>
            </SpotlightCard>
          </div>

          {/* HARD SKILLS MATRIX */}
          <div className="mt-8 rounded-lg border border-slate-700 bg-slate-950 p-6 font-mono text-sm relative overflow-hidden group/matrix transition-all duration-300 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
            <div className="absolute top-0 right-0 p-2 text-xs text-slate-500 font-bold tracking-widest uppercase">Desirability Index: Perfectly suited Robotics & AI</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <h4 className="text-amber-500 mb-3 border-b border-amber-500/20 pb-1">01. THE METAL (Control & Signals)</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Highlight color="indigo">Control Theory:</Highlight> Feedback Loops, PID Tuning, Stability Analysis</li>
                  <li><Highlight color="indigo">Signal Processing:</Highlight> FFT, Filtering, Noise Reduction, ADC/DAC</li>
                  <li><Highlight color="indigo">Embedded Logic:</Highlight> Assembly, Real-Time Constraints, Interrupts</li>
                  <li><Highlight color="indigo">Physics:</Highlight> E&M, Thermodynamics, Kinematics (Robotics)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-amber-500 mb-3 border-b border-amber-500/20 pb-1">02. THE MIND (AI & Math)</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Highlight color="indigo">Mathematics:</Highlight> Linear Algebra, Calculus, Discrete Math, Probability</li>
                  <li><Highlight color="indigo">AI Context:</Highlight> RAG Architectures, Token Optimization, Agentic Workflows</li>
                  <li><Highlight color="indigo">Data Engineering:</Highlight> Python (Pandas/NumPy), ETL Pipelines, Regex</li>
                  <li><Highlight color="indigo">Pattern Rec:</Highlight> High-Dimensional Data Synthesis, Anomaly Detection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WINS */}
        <section id="wins" className="space-y-12 group scroll-mt-24">
          <SectionHeader title="Selected Wins" icon={Trophy} color="amber" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <WinCard title="The Red Team Unification" refCode="LOG_REF: CACI_RED_TEAM" icon={Shield} theme="indigo">
                As the final Red Team Editor for a <strong>$6M federal recompete</strong>, I inherited 21 disjointed submissions with clashing voices and formatting. I spent days synthesizing them into a "single consciousness," harmonizing every font, tense, and vocabulary choice. NUWCDIVNPT officials later confirmed it was the "<strong>best written</strong> proposal they had ever received," even though we lost on cost (#2).
                <div className="mt-2 text-xs text-indigo-300 font-mono">[RESULT: QUALITY_BENCHMARK_SET]</div>
            </WinCard>
            <WinCard title="The Remote Debug" refCode="LOG_REF: REMOTE_DEBUG" icon={Radio} theme="amber">
                A customer received a top-of-the-line trimmer that wouldn't start. He was irate, swearing at me. I didn't react; I visualized the schematic. Walking him through a forensic check, we located a one-off QC error: a crimped throttle cable deep in the chassis. I heard the engine fire live on the call. He went from swearing to apologizing, turning a DOA unit into a lifelong brand advocate.
                <div className="mt-2 text-xs text-amber-300 font-mono">[RESULT: DETRACTOR_CONVERTED]</div>
            </WinCard>
            <WinCard title="The 160-Mile Protocol Breach" refCode="LOG_REF: HUMAN_OVERRIDE" icon={Activity} theme="indigo">
                 A customer's husband was dying at home; his mower was a critical emotional anchor. The nearest dealer was 80 miles away. Protocol said "too far." I refused that output. I negotiated a custom service contract, leveraging human empathy to convince the dealer to drive 160 miles round-trip. The machine was fixed before he passed. Some KPIs don't fit on a spreadsheet.
                <div className="mt-2 text-xs text-indigo-300 font-mono">[RESULT: MISSION_COMPLETE]</div>
            </WinCard>
          </div>
        </section>

        {/* ROI */}
        <section id="roi" className="space-y-8 group scroll-mt-24">
          <SectionHeader title="The Financial Arbitrage" icon={DollarSign} color="indigo" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "OpEx Defense (Engineering Shield)", desc: "Every ticket I solve is an interruption your Senior Engineers don't have to handle. I protect your most expensive payroll assets from context-switching costs, effectively subsidizing my own salary by preserving high-value engineering hours." },
              { title: "NDR Protection (Churn Defense)", desc: "Support is the frontline of revenue retention. We are the face of the company to those who need us most. I convert 'Cancellation Events' into 'Loyalty Events' through radical empathy and forensic technical competence, directly defending your Net Dollar Retention (NDR) and reducing churn." },
              { title: "Capital Efficiency (Token Hygiene)", desc: "I don't just use AI; I orchestrate it. My JamCamping workflow proves I can teach your users how to be Hypervisors of their own code, reducing frustration and maximizing the value they get from every token they pay for." },
              { title: "Zero Latency (Immediate Yield)", desc: "I built a production app on a new stack in 48 hours. I don't need a 3-month ramp. I am a depreciating asset in reverse: I become exponentially more valuable every week as I synthesize the platform's edge cases into documentation." }
            ].map((roi, idx) => (
              <SpotlightCard key={idx} className="bg-slate-900 border p-6 rounded-lg transition-all duration-300 border-slate-800 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
                <h3 className="text-lg font-bold text-gray-200 mb-2">{roi.title}</h3>
                <p className="text-gray-400 text-sm" dangerouslySetInnerHTML={{ __html: roi.desc.replace(/don't/g, "<em>don't</em>").replace(/the face/g, "<strong>the face</strong>") }} />
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="text-center space-y-8 pt-10 pb-20 scroll-mt-24">
          <p className="text-2xl text-gray-300 font-light max-w-2xl mx-auto">
             I don't just want to close tickets; I want to build the division that eliminates them. My trajectory is vertical. I am looking for the role where I can prove my value in the queue, and eventually lead your entire Customer Experience function.
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
                Electron-to-Cloud // Integrated Polarity // 2025
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;