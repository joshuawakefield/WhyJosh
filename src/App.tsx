import { ExternalLink, Linkedin, Github, Mail, ChevronDown, Terminal, X, Zap } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// --- TYPES ---
interface TerminalBlock {
  id: number;
  command: string; // The command typed (e.g., "help")
  output: string[]; // The lines returned by the system
  timestamp: string;
}

// --- COMPONENTS ---

function SpotlightCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
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
        className="spotlight w-24 h-24 absolute pointer-events-none rounded-full blur-xl transition-opacity duration-100 bg-amber-400/20" 
        style={{ opacity: 0, transform: 'translateZ(0)' }} 
      />
      {children}
    </div>
  );
}

function TerminalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [input, setInput] = useState('');
  const [blocks, setBlocks] = useState<TerminalBlock[]>([
    {
      id: 0,
      command: 'boot',
      timestamp: new Date().toLocaleTimeString(),
      output: [
        "WakefieldOS v1.0.5 (tty1)",
        "Login: guest",
        "System Integrity: 100%",
        "Welcome to the System. Type 'help' for commands."
      ]
    }
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when blocks change
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      inputRef.current?.focus();
    }
  }, [blocks, isOpen]);

  // Focus input when clicking anywhere in terminal
  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      if (!cmd) return;

      const newBlock: TerminalBlock = {
        id: Date.now(),
        command: cmd,
        timestamp: new Date().toLocaleTimeString(),
        output: []
      };

      switch (cmd) {
        case 'help':
          newBlock.output = ["Available commands:", "whoami", "stack", "contact", "jamcamping", "clear", "exit"];
          break;
        case 'whoami':
          newBlock.output = ["Joshua Wakefield.", "Polymathic Systems Synthesizer.", "WPI EE '03.", "Forged in DR Power.", "Currently optimizing entropy."];
          break;
        case 'stack':
          newBlock.output = [
            "CORE: React, Next.js, Node, TypeScript",
            "AI: Agent Orchestration, Context Hygiene, RAG",
            "HARDWARE: Signal Processing, IoT, Circuit Design"
          ];
          break;
        case 'contact':
          newBlock.output = ["Email: joshua.wakefield@gmail.com", "Location: Newport, RI, USA"];
          break;
        case 'jamcamping':
          newBlock.output = [
            "JamCamping.com",
            "----------------",
            "A production-grade PWA built in one weekend on Bolt.new.",
            "Architecture: Dual-Stack (Vite/Next.js study)",
            "Status: Deployed"
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
          newBlock.output = [`Command not found: ${cmd}`, "Type 'help' for assistance."];
      }

      setBlocks(prev => [...prev, newBlock]);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="w-full max-w-3xl bg-slate-950 border border-slate-700 rounded-lg shadow-2xl overflow-hidden font-mono ring-1 ring-amber-500/20 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Terminal Header with Midnight Sunset Gradient - ICONS REMOVED */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 p-3 flex justify-between items-center">
          <div className="flex gap-2 ml-2">
            {/* Window controls removed as requested */}
          </div>
          <div className="text-slate-900 font-bold text-xs tracking-widest opacity-80">GUEST@WAKEFIELD:~</div>
          <button onClick={onClose} className="text-slate-900 hover:text-white transition-colors mr-2"><X size={18} /></button>
        </div>

        {/* Terminal Body */}
        <div 
          className="flex-1 overflow-y-auto bg-slate-950 scrollbar-thin scrollbar-thumb-slate-800" 
          onClick={handleFocus}
          ref={scrollRef}
        >
          {blocks.map((block, index) => (
            <div key={block.id} className={`p-4 border-b border-white/5 ${index % 2 === 0 ? 'bg-indigo-950/10' : 'bg-transparent'}`}>
              {/* Command Line */}
              <div className="flex items-start gap-3 mb-2 opacity-80">
                <span className="text-amber-500 font-bold shrink-0">➜</span>
                <span className="text-blue-400 shrink-0">~</span>
                <span className="text-gray-100">{block.command}</span>
                <span className="text-slate-600 text-xs ml-auto font-sans">{block.timestamp}</span>
              </div>
              
              {/* Output Lines */}
              <div className="pl-6 space-y-1">
                {block.output.map((line, i) => (
                  <div key={i} className="text-green-400/90 text-sm md:text-base leading-relaxed break-words">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="p-4 bg-slate-900/30">
            <div className="flex items-center gap-3">
              <span className="text-amber-500 font-bold animate-pulse">➜</span>
              <span className="text-blue-400">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                // Text-base prevents iOS zoom. No outline.
                className="bg-transparent border-none outline-none text-gray-100 flex-1 focus:ring-0 placeholder-slate-700 text-base"
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
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
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 font-sans antialiased transition-colors duration-700">
      
      {/* System Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 z-50 transition-all duration-300 bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)]"
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* Floating UI Controls */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        {/* Terminal Toggle - Positioned higher to clear Bolt badge */}
        <button 
          onClick={() => setIsTerminalOpen(true)}
          className="p-4 backdrop-blur border rounded-full shadow-2xl transition-all duration-300 hover:scale-110 bg-indigo-950/90 border-amber-500/50 text-amber-400/80 hover:text-amber-400 hover:border-amber-400"
          title="Open System Terminal"
        >
          <Terminal size={24} />
        </button>

        {/* Spacer to push Terminal button above "Made in Bolt" badge */}
        <div className="w-12 h-10 pointer-events-none" aria-hidden="true" />
      </div>

      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Dynamic Backgrounds */}
        <div className="absolute inset-0 opacity-10 [background-size:16px_16px] grid-pulse bg-[radial-gradient(#fbbf24_1px,transparent_1px)]"></div>

        {/* Midnight Sunset Gradient Overlay */}
        <div className="absolute inset-0 opacity-30 bg-gradient-to-b from-indigo-900 via-purple-900 to-amber-900/20 pointer-events-none"></div>

        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(251, 191, 36, 0.1) 2px, rgba(251, 191, 36, 0.1) 4px)',
          animation: 'scanlines 8s linear infinite'
        }}></div>
        
        <div className="max-w-5xl w-full text-center space-y-8 relative z-10">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full border text-sm font-mono mb-4 border-amber-500/50 bg-amber-500/10 text-amber-400">
              SYSTEM STATE: HIGH VIBRATION // READY
            </div>
            
            {/* Main Title with Midnight Sunset Gradient */}
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text mb-4 bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              JOSHUA WAKEFIELD
            </h1>
            
            <p className="text-xl md:text-3xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto">
              The <span className="font-medium text-amber-400">Human Hypervisor</span> for AI Communities.
              <br className="hidden md:block" />
              Bridging Blue-Collar Grit & White-Collar Strategy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            
            {/* CONTACT ME BUTTON - UPDATED FOR IOS */}
            <a href="mailto:joshua.wakefield@gmail.com" className="group relative px-8 py-4 font-medium rounded-lg transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg hover:scale-105 overflow-hidden bg-amber-500 text-slate-900 shadow-amber-900/30 hover:bg-amber-400">
              <span className="relative z-10 flex items-center gap-2">
                <Mail size={20} /> Contact Me
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-amber-300" style={{ mixBlendMode: 'overlay' }} />
            </a>

            {/* PROOF OF WORK BUTTON - UPDATED FOR IOS */}
            <a href="https://jamcamping.com" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 border font-medium rounded-lg transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center overflow-hidden border-amber-500/50 bg-indigo-950/50 text-amber-400 hover:text-amber-300 hover:border-amber-400">
              <span className="relative z-10 flex items-center gap-2">
                <ExternalLink size={20} /> View Proof of Work
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 bg-amber-500" style={{ transform: 'translateZ(0)' }} />
            </a>

          </div>
        </div>

        <button
          onClick={() => scrollToSection('thesis')}
          className="absolute bottom-12 transition-colors duration-200 animate-bounce text-amber-600 hover:text-amber-400"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-40">

        {/* The Thesis */}
        {/* ADDED GROUP CLASS FOR UNIVERSAL HOVER TRIGGER */}
        <section id="thesis" className="space-y-8 group">
          <div className="space-y-4 border-l-4 pl-6 relative border-amber-500 transition-all duration-700 group-hover:shadow-[0_0_25px_-5px_rgba(251,191,36,0.3)]">
            {/* Title grows 15% when ANYWHERE in section is hovered */}
            <h2 className="text-3xl md:text-5xl font-bold text-gray-100 tracking-tight glow-header transition-transform duration-700 ease-out origin-left group-hover:scale-[1.15]">
              Integrated Polarity
            </h2>
            <p className="text-amber-400 font-mono text-lg">/ˈin(t)əˌɡrādəd pōˈlerədē/</p>
          </div>
          
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-6">
            <p>
              I operate beyond the standard "Soft Skills vs. Hard Skills" binary. Most professionals optimize for a single trajectory—climbing the corporate ladder or mastering a craft. 
              <strong className="text-white"> I have deliberately integrated both.</strong>
            </p>
            <p>
              I possess the engineering rigor to deconstruct the kernel (WPI EE), but the artistic intuition to read the room (Jazz/Comedy). I have the grit to handle the daily grind (Trades), but the vision to see the product roadmap. I don't just toggle between these states; I synthesize them to solve problems that single-domain experts cannot touch.
            </p>
            
            {/* FORCE MULTIPLIER - ACTIVE SPOTLIGHT CARD */}
            <SpotlightCard 
              className="p-6 rounded-lg border mt-8 bg-indigo-950/50 border-amber-500/30 hover:border-amber-500/80"
            >
              <p className="text-amber-400 font-mono text-sm mb-2">// THE FORCE MULTIPLIER EFFECT</p>
              <p className="italic text-gray-400">
                "I am not just one person; I am a team of specialists inhabiting one body, orchestrated by a mature executive consciousness."
              </p>
            </SpotlightCard>
          </div>
        </section>

        {/* The Timeline */}
        {/* ADDED GROUP CLASS FOR UNIVERSAL HOVER TRIGGER */}
        <section id="timeline" className="space-y-12 group">
          {/* Header responds to GROUP hover */}
          <div className="flex items-center gap-4 relative">
            <div className="absolute -inset-4 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-amber-500/5"></div>
            {/* Icon container glows/scales on GROUP hover */}
            <div className="p-3 rounded-lg transition-all duration-700 transform group-hover:scale-110 bg-amber-500/10 text-amber-400 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] group-hover:bg-amber-500/20">
              <Terminal size={32} />
            </div>
            {/* Title grows 15% on GROUP hover */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight glow-header transition-transform duration-700 ease-out origin-left group-hover:scale-[1.15]">
              The Electron-to-Cloud Graph
            </h2>
          </div>

          <div className="relative border-l border-slate-800 ml-4 space-y-12 pb-4">
            {/* WPI Era */}
            <div className="relative pl-12 group/item">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 transition-colors duration-300 border-amber-500 group-hover/item:bg-amber-500"></div>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <h3 className="text-xl font-bold text-gray-100">The Bedrock: WPI</h3>
                  <span className="text-amber-400 font-mono text-sm">1999-2003</span>
                </div>
                <div className="text-gray-400 leading-relaxed">
                  Electrical Engineering & Signal Processing. I learned the math of the universe—Fourier transforms, Control Theory, and Entropy. I view LLMs not as magic, but as high-dimensional signal processing.
                </div>
              </div>
            </div>

            {/* The Pivot Era */}
            <div className="relative pl-12 group/item">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 border-slate-600 transition-colors duration-300 group-hover/item:border-indigo-500"></div>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <h3 className="text-xl font-bold text-gray-100">The Forge: Operational Grit</h3>
                  <span className="text-indigo-400 font-mono text-sm">2020-2022</span>
                </div>
                <div className="text-gray-400 leading-relaxed">
                  Navigated extreme resource constraints (housing instability) while working rigorous trade jobs (Tree Service, Industrial Kitchens). This era forged my "Stopper" mentality: In a crisis, I do not vibrate with chaos; I absorb it.
                </div>
              </div>
            </div>

            {/* The Tech Return */}
            <div className="relative pl-12 group/item">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 transition-colors duration-300 border-amber-400 group-hover/item:bg-amber-400"></div>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <h3 className="text-xl font-bold text-gray-100">The Return: Burlington Code Academy</h3>
                  <span className="text-amber-400 font-mono text-sm">2022</span>
                </div>
                <div className="text-gray-400 leading-relaxed">
                  Graduated Top of Class. I didn't accept the $12k tuition constraint; I engineered a funding solution via grants. Mastered the MERN stack manually right before the ChatGPT acceleration.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The ROI (Arbitrage) */}
        {/* ADDED GROUP CLASS FOR UNIVERSAL HOVER TRIGGER */}
        <section id="roi" className="space-y-8 group">
           {/* Header responds to GROUP hover */}
           <div className="flex items-center gap-4 relative">
            <div className="absolute -inset-4 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-amber-500/5"></div>
            {/* Icon container glows/scales on GROUP hover */}
            <div className="p-3 rounded-lg transition-all duration-700 transform group-hover:scale-110 bg-amber-500/10 text-amber-400 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] group-hover:bg-amber-500/20">
              <Zap size={32} />
            </div>
            {/* Title grows 15% on GROUP hover */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight glow-header transition-transform duration-700 ease-out origin-left group-hover:scale-[1.15]">
              The Arbitrage Opportunity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['Escalation Firewall', 'Vibration Control', 'Context Hygiene', 'Zero Latency'].map((title, i) => (
              // ADDED SCALE EFFECT TO CONSUME GAP
              <SpotlightCard key={i} className="bg-slate-900 border p-6 rounded-lg transition-all duration-300 border-slate-800 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
                <h3 className="text-lg font-bold text-gray-200 mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">
                  {i === 0 && "Most support reps escalate Tier 3 tickets. I solve them in the queue. I protect your Engineering team's bandwidth, saving thousands in context-switching costs."}
                  {i === 1 && "I apply radical empathy + technical authority. I turn 'Cancellation Events' into 'Loyalty Events,' directly defending Net Dollar Retention (NDR)."}
                  {i === 2 && "I don't just use AI; I orchestrate it. My JamCamping workflow proves I can teach your users how to be Hypervisors of their own code."}
                  {i === 3 && "I am an exponential learner. I built production apps on your stack over a weekend. I start generating ROI on Day 1."}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="text-center space-y-8 pt-10 pb-20">
          <p className="text-2xl text-gray-300 font-light">
            I am not looking for a job. I am looking for a mission.
          </p>
          <div className="flex justify-center">
             <a 
               href="mailto:joshua.wakefield@gmail.com"
               className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 bg-amber-500 text-slate-900 focus:ring-amber-500 shadow-[0_0_40px_-10px_rgba(251,191,36,0.6)]"
             >
              <span className="relative z-10">Let's Talk</span>
              
              {/* Hardware Accelerated Glow Layer - iOS Safe */}
              <div 
                className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-amber-400" 
                style={{ transform: 'translateZ(0)' }} 
              />
              
              {/* Subtle pulsing ring animation */}
              <div className="absolute -inset-0 rounded-full animate-ping opacity-20 bg-amber-500" style={{ animationDuration: '3s' }}></div>
            </a>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 mt-32 bg-slate-950">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm font-mono">
                SYSTEM_ID: JOSHUA_WAKEFIELD // <span className="text-amber-500">READY</span>
              </p>
            </div>
            <div className="flex gap-6">
              <a href="https://linkedin.com/in/jmwakefield" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 text-gray-400 hover:text-amber-500"><Linkedin size={24} /></a>
              <a href="https://github.com/joshuawakefield" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 text-gray-400 hover:text-amber-500"><Github size={24} /></a>
              <a href="mailto:joshua.wakefield@gmail.com" className="transition-colors duration-200 text-gray-400 hover:text-amber-500"><Mail size={24} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;