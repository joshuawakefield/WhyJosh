import { ExternalLink, Linkedin, Github, Mail, ChevronDown, Terminal, X, Zap, Cpu, Palette, Hammer, Shield, Wrench, Trophy, Activity, Radio } from 'lucide-react';
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
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      inputRef.current?.focus();
    }
  }, [blocks, isOpen]);

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
          newBlock.output = ["Available commands:", "whoami", "whyjosh", "yearlygoal", "stack", "contact", "jamcamping", "clear", "exit"];
          break;
        case 'whoami':
          newBlock.output = ["Joshua Wakefield.", "Polymathic Systems Synthesizer.", "WPI EE '03.", "Forged in DR Power.", "Currently optimizing entropy."];
          break;
        case 'whyjosh':
          newBlock.output = [
            "RUNNING: ROI_ANALYSIS.EXE",
            "---------------------------",
            "1. ARBITRAGE: You get Senior Architecture logic for Support cost.",
            "2. STABILITY: A 'Stopper' who absorbs chaos rather than amplifying it.",
            "3. VELOCITY: Protects Engineering bandwidth by solving Tier 3 issues in queue.",
            "CONCLUSION: Joshua is not a hire. He is high-yield infrastructure."
          ];
          break;
        case 'yearlygoal':
          newBlock.output = [
            "PRIMARY OBJECTIVE:",
            "To save the company more money than I am being paid.",
            "--------------------------------------------------",
            "METHODOLOGY: Engineering Bandwidth Defense + Churn Reduction"
          ];
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
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-400 p-3 flex justify-between items-center">
          <div className="flex gap-2 ml-2"></div>
          <div className="text-slate-900 font-bold text-xs tracking-widest opacity-80">GUEST@WAKEFIELD:~</div>
          <button onClick={onClose} className="text-slate-900 hover:text-white transition-colors mr-2"><X size={18} /></button>
        </div>

        <div 
          className="flex-1 overflow-y-auto bg-slate-950 scrollbar-thin scrollbar-thumb-slate-800" 
          onClick={handleFocus}
          ref={scrollRef}
        >
          {blocks.map((block, index) => (
            <div key={block.id} className={`p-4 border-b border-white/5 ${index % 2 === 0 ? 'bg-indigo-950/10' : 'bg-transparent'}`}>
              <div className="flex items-start gap-3 mb-2 opacity-80">
                <span className="text-amber-500 font-bold shrink-0">➜</span>
                <span className="text-blue-400 shrink-0">~</span>
                <span className="text-gray-100">{block.command}</span>
                <span className="text-slate-600 text-xs ml-auto font-sans">{block.timestamp}</span>
              </div>
              
              <div className="pl-6 space-y-1">
                {block.output.map((line, i) => (
                  <div key={i} className="text-green-400/90 text-sm md:text-base leading-relaxed break-words">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}

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
      if (windowHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const scrolled = window.scrollY;
      const progress = (scrolled / windowHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 font-sans antialiased transition-colors duration-700 relative">
      
      {/* --- GLOBAL TEXTURE LAYER --- */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* System Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 z-50 transition-all duration-300 bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)]"
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* Floating UI Controls */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        {/* Terminal Toggle */}
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
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden z-10">
        
        {/* Midnight Sunset Gradient Overlay */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-indigo-900 via-purple-900 to-amber-900/20 pointer-events-none"></div>

        {/* Scanlines */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(251, 191, 36, 0.1) 2px, rgba(251, 191, 36, 0.1) 4px)',
          animation: 'scanlines 8s linear infinite'
        }}></div>
        
        <div className="max-w-5xl w-full text-center space-y-8 relative z-10">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full border text-sm font-mono mb-4 border-amber-500/50 bg-amber-500/10 text-amber-400">
              SYSTEM STATE: HIGH VIBRATION // READY
            </div>
            
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
            <a href="mailto:joshua.wakefield@gmail.com" className="group relative px-8 py-4 font-medium rounded-lg transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg hover:scale-105 overflow-hidden bg-amber-500 text-slate-900 shadow-amber-900/30 hover:bg-amber-400">
              <span className="relative z-10 flex items-center gap-2">
                <Mail size={20} /> Contact Me
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-amber-300" style={{ mixBlendMode: 'overlay' }} />
            </a>

            <a href="https://jamcamping.com" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 border font-medium rounded-lg transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center overflow-hidden border-amber-500/50 bg-indigo-950/50 text-amber-400 hover:text-amber-300 hover:border-amber-400">
              <span className="relative z-10 flex items-center gap-2">
                <ExternalLink size={20} /> View Proof of Work
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 bg-amber-500" style={{ transform: 'translateZ(0)' }} />
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
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-40 relative z-10">

        {/* The Thesis */}
        <section id="thesis" className="space-y-8 group">
          <div className="space-y-4 border-l-4 pl-6 relative border-amber-500 transition-all duration-700">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-100 tracking-tight transition-transform duration-700 ease-out origin-left group-hover:scale-[1.15]">
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
        <section id="timeline" className="space-y-12 group">
          <div className="flex items-center gap-4 relative">
            <div className="p-3 rounded-lg transition-all duration-700 transform group-hover:scale-110 bg-amber-500/10 text-amber-400 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] group-hover:bg-amber-500/20">
              <Terminal size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight transition-transform duration-700 ease-out origin-left group-hover:scale-[1.15]">
              The Electron-to-Cloud Graph
            </h2>
          </div>

          <div className="relative border-l border-slate-800 ml-4 space-y-12 pb-4">
            
             {/* ITEM 1: The Origin (Amber) */}
             <div className="relative pl-12 group/item">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 transition-colors duration-300 border-amber-500 group-hover/item:bg-amber-500"></div>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <h3 className="text-xl font-bold text-gray-100">The Source Code: From Armatron to NuMega</h3>
                  <span className="text-amber-400 font-mono text-sm">1985-1999</span>
                </div>
                <div className="text-gray-400 leading-relaxed">
                  My path began with a Radio Shack Armatron in 1985 and evolved through Logo, DOS, and Linux. By 1996, I was attending college night school for C/C++ while still in Catholic high school. This culminated in a professional role at <strong>NuMega Labs (1998)</strong> coding alongside senior engineers and competing in US FIRST Robotics. I entered WPI not as a novice, but as a seasoned practitioner.
                </div>
              </div>
            </div>

            {/* ITEM 2: WPI (Indigo) */}
            <div className="relative pl-12 group/item">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 border-slate-600 transition-colors duration-300 border-indigo-500 group-hover/item:bg-indigo-500"></div>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <h3 className="text-xl font-bold text-gray-100">The Hard Foundation: WPI Engineering</h3>
                  <span className="text-indigo-400 font-mono text-sm">1999-2003</span>
                </div>
                <div className="text-gray-400 leading-relaxed">
                  BS in Electrical Engineering. This was the era of "Hard Robotics" and rigorous Control Theory. I specialized in <strong>Real-Time DSP (EE 3703)</strong>, <strong>Control Engineering (ES 3011)</strong>, and <strong>Theory of Computation (CS 4123)</strong>. I was building autonomous feedback loops and optimizing assembly for embedded architectures. My understanding of AI is grounded in the math of the universe—Fourier transforms, Entropy, and Feedback—not just API calls.
                </div>
              </div>
            </div>

            {/* ITEM 3: The Crucible (Amber) */}
            <div className="relative pl-12 group/item">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 transition-colors duration-300 border-amber-500 group-hover/item:bg-amber-500"></div>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <h3 className="text-xl font-bold text-gray-100">The Crucible: High-Stakes Operations</h3>
                  <span className="text-amber-400 font-mono text-sm">2006-2020</span>
                </div>
                <div className="text-gray-400 leading-relaxed">
                   I stepped out of the code and into the fire of reality. From managing multi-million dollar government contracts at <strong>CACI</strong> (Budgeting, Compliance, Section L/M) to solving critical mechanical failures at <strong>DR Power Equipment</strong>. This era forged my financial literacy and operational grit. I know that when systems fail, it costs real money—whether it's an SAP error or a blown actuator.
                </div>
              </div>
            </div>

            {/* ITEM 4: The Pivot (Indigo) */}
            <div className="relative pl-12 group/item">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 border-slate-600 transition-colors duration-300 border-indigo-500 group-hover/item:bg-indigo-500"></div>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <h3 className="text-xl font-bold text-gray-100">The Antifragile Turn</h3>
                  <span className="text-indigo-400 font-mono text-sm">2020-2022</span>
                </div>
                <div className="text-gray-400 leading-relaxed">
                  Navigated extreme resource constraints while working rigorous manual labor (Tree Service) during a Vermont winter. This era proved that ambition can survive even when resources are at zero. It culminated in my return to the <strong>Burlington Code Academy</strong>, where I graduated top-of-class in the industry's <strong>final pre-ChatGPT cohort</strong>.
                </div>
              </div>
            </div>

             {/* ITEM 5: The Synthesis (Amber) */}
             <div className="relative pl-12 group/item">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 transition-colors duration-300 border-amber-500 group-hover/item:bg-amber-500"></div>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <h3 className="text-xl font-bold text-gray-100">The Synthesis: AI Orchestration</h3>
                  <span className="text-amber-400 font-mono text-sm">Present</span>
                </div>
                <div className="text-gray-400 leading-relaxed">
                  I have now integrated the "Hard Engineering" of WPI, the "Operational Grit" of the trades, and the "Modern Stack" of React/Node. I don't just write code; I orchestrate AI systems (JamCamping) using a hypervisor mentality. I am the bridge between the metal and the model.
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* DOMAIN SYNTHESIS SECTION */}
        <section id="domains" className="space-y-12 group">
          <div className="flex items-center gap-4 relative">
            <div className="p-3 rounded-lg transition-all duration-700 transform group-hover:scale-110 bg-indigo-500/10 text-indigo-400 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] group-hover:bg-indigo-500/20">
              <Cpu size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight transition-transform duration-700 ease-out origin-left group-hover:scale-[1.15]">
              The Domain Matrix
            </h2>
          </div>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
            <p>
              My mind is an association engine. I can poke a stick in a campfire and see embers that remind me of particle trails in a cloud chamber. To me, a jazz mode is just a frequency response; a kitchen service is just a packet-switching network. I don't just "know" these domains—I understand the universal patterns that connect them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Domain 1: The Physics */}
            <SpotlightCard className="bg-slate-900 border p-6 rounded-lg border-slate-800 flex flex-col gap-4 transition-all duration-300 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
              <div className="flex items-center gap-3 text-amber-400">
                <Zap size={24} />
                <h3 className="text-xl font-bold">The Physics</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                <strong>First Principles.</strong> My foundation isn't syntax; it is the Math of the Universe. I possess the literacy to consume <strong>Robotics & AI white papers</strong> because I speak their native tongue: <strong>Fourier Transforms</strong>, <strong>Control Theory</strong>, and <strong>Feedback Loops</strong>. From <strong>Relativity</strong> and <strong>Optics</strong> to <strong>Algorithmic Complexity</strong>, I understand the deep physics that high-level APIs abstract away.
              </p>
            </SpotlightCard>

            {/* Domain 2: The Improvisation */}
            <SpotlightCard className="bg-slate-900 border p-6 rounded-lg border-slate-800 flex flex-col gap-4 transition-all duration-300 hover:border-indigo-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
              <div className="flex items-center gap-3 text-indigo-400">
                <Palette size={24} />
                <h3 className="text-xl font-bold">The Art</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                <strong>Systematic Creativity.</strong> To me, the Circle of Fifths is a circuit diagram. I apply <strong>Jazz Theory</strong> to improvisational guitar (Phish/Dead), treating music as real-time conversational logic. I create <strong>Sacred Geometric</strong> art to explore the visual syntax of nature. I study <strong>Stand-Up Comedy</strong> to master the ultimate feedback loop: controlling the timing, tension, and release of a room's energy.
              </p>
            </SpotlightCard>

            {/* Domain 3: The Reality */}
            <SpotlightCard className="bg-slate-900 border p-6 rounded-lg border-slate-800 flex flex-col gap-4 transition-all duration-300 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
              <div className="flex items-center gap-3 text-amber-400">
                <Hammer size={24} />
                <h3 className="text-xl font-bold">The Reality</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                <strong>Operational Truth.</strong> I have mastered the physical stack. In the <strong>Trades</strong>, I execute Carpentry, Plumbing, Electrical, Demo, and Tree Work. In <strong>Culinary</strong>, I am a ServSafe Manager who has run everything from Line/Grill to Large-Scale Banquets (Colleges/Cruise Ships). Whether mudding drywall or designing a menu for an industrial kitchen build, I respect the physics of production.
              </p>
            </SpotlightCard>
          </div>

          {/* HARD SKILLS MATRIX */}
          <div className="mt-8 rounded-lg border border-slate-700 bg-slate-950 p-6 font-mono text-sm relative overflow-hidden group/matrix transition-all duration-300 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
            <div className="absolute top-0 right-0 p-2 text-xs text-slate-500 font-bold tracking-widest uppercase">
              Desirability Index: Robotics & AI
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <h4 className="text-amber-500 mb-3 border-b border-amber-500/20 pb-1">01. THE METAL (Control & Signals)</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><span className="text-gray-100">Control Theory:</span> Feedback Loops, PID Tuning, Stability Analysis</li>
                  <li><span className="text-gray-100">Signal Processing:</span> FFT, Filtering, Noise Reduction, ADC/DAC</li>
                  <li><span className="text-gray-100">Embedded Logic:</span> Assembly, Real-Time Constraints, Interrupts</li>
                  <li><span className="text-gray-100">Physics:</span> E&M, Thermodynamics, Kinematics (Robotics)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-indigo-500 mb-3 border-b border-indigo-500/20 pb-1">02. THE MIND (AI & Math)</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><span className="text-gray-100">Mathematics:</span> Linear Algebra, Calculus, Discrete Math, Probability</li>
                  <li><span className="text-gray-100">AI Context:</span> RAG Architectures, Token Optimization, Agentic Workflows</li>
                  <li><span className="text-gray-100">Data Engineering:</span> Python (Pandas/NumPy), ETL Pipelines, Regex</li>
                  <li><span className="text-gray-100">Pattern Rec:</span> High-Dimensional Data Synthesis, Anomaly Detection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WINS / MISSION LOGS SECTION */}
        <section id="wins" className="space-y-12 group">
          <div className="flex items-center gap-4 relative">
            <div className="p-3 rounded-lg transition-all duration-700 transform group-hover:scale-110 bg-amber-500/10 text-amber-400 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] group-hover:bg-amber-500/20">
              <Trophy size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight transition-transform duration-700 ease-out origin-left group-hover:scale-[1.15]">
              Favorite Wins
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Story 1: CACI (Governance) */}
            <SpotlightCard className="bg-slate-900 border p-0 rounded-lg border-slate-800 flex flex-col overflow-hidden group/card transition-all duration-300 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
              <div className="p-4 bg-indigo-950/30 border-b border-slate-700 flex justify-between items-center">
                <span className="text-xs font-mono text-indigo-400 tracking-widest">LOG_REF: CACI_RED_TEAM</span>
                <Shield size={18} className="text-indigo-400" />
              </div>
              <div className="p-6 flex flex-col gap-4 flex-1">
                <h3 className="text-xl font-bold text-gray-100">The Red Team Unification</h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-1">
                  As the final Red Team Editor for a **$6M federal recompete**, I inherited 21 disjointed submissions with clashing voices and formatting. I spent days synthesizing them into a "single consciousness," harmonizing every font, tense, and vocabulary choice. NUWCDIVNPT officials later confirmed it was the "best written proposal they had ever received," setting a new standard for readability.
                </p>
                <div className="mt-2 text-xs text-indigo-300 font-mono">[RESULT: QUALITY_BENCHMARK_SET]</div>
              </div>
            </SpotlightCard>

            {/* Story 2: DR Power (Wire Crimp) */}
            <SpotlightCard className="bg-slate-900 border p-0 rounded-lg border-slate-800 flex flex-col overflow-hidden group/card transition-all duration-300 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
              <div className="p-4 bg-amber-950/30 border-b border-slate-700 flex justify-between items-center">
                <span className="text-xs font-mono text-amber-400 tracking-widest">LOG_REF: REMOTE_DEBUG</span>
                <Radio size={18} className="text-amber-400" />
              </div>
              <div className="p-6 flex flex-col gap-4 flex-1">
                <h3 className="text-xl font-bold text-gray-100">The Remote Debug</h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-1">
                  A customer received a $1,700 machine that wouldn't start. He was irate. Instead of dispatching a return (costing ~$400), I visualized the schematic in my mind. I guided him to check a specific ignition wire buried deep in the chassis. We found a rare factory crimp error. He fixed it live. The engine fired. I turned a cancellation event into a victory lap.
                </p>
                <div className="mt-2 text-xs text-amber-300 font-mono">[RESULT: CHURN_PREVENTED]</div>
              </div>
            </SpotlightCard>

            {/* Story 3: DR Power (Human Override) */}
             <SpotlightCard className="bg-slate-900 border p-0 rounded-lg border-slate-800 flex flex-col overflow-hidden group/card transition-all duration-300 hover:border-indigo-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
              <div className="p-4 bg-indigo-950/30 border-b border-slate-700 flex justify-between items-center">
                <span className="text-xs font-mono text-indigo-400 tracking-widest">LOG_REF: HUMAN_OVERRIDE</span>
                <Activity size={18} className="text-indigo-400" />
              </div>
              <div className="p-6 flex flex-col gap-4 flex-1">
                <h3 className="text-xl font-bold text-gray-100">The 160-Mile Protocol Breach</h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-1">
                  A customer's husband was dying at home; his mower was a critical emotional anchor. The nearest dealer was 80 miles away. Protocol said "too far." I refused that output. I negotiated a custom service contract, leveraging human empathy to convince the dealer to drive 160 miles round-trip. The machine was fixed before he passed. Some KPIs don't fit on a spreadsheet.
                </p>
                <div className="mt-2 text-xs text-indigo-300 font-mono">[RESULT: MISSION_COMPLETE]</div>
              </div>
            </SpotlightCard>

          </div>
        </section>

        {/* The ROI (Arbitrage) */}
        <section id="roi" className="space-y-8 group">
           <div className="flex items-center gap-4 relative">
            <div className="p-3 rounded-lg transition-all duration-700 transform group-hover:scale-110 bg-amber-500/10 text-amber-400 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] group-hover:bg-amber-500/20">
              <Zap size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight transition-transform duration-700 ease-out origin-left group-hover:scale-[1.15]">
              The Financial Arbitrage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpotlightCard className="bg-slate-900 border p-6 rounded-lg transition-all duration-300 border-slate-800 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
              <h3 className="text-lg font-bold text-gray-200 mb-2">OpEx Defense (Engineering Shield)</h3>
              <p className="text-gray-400 text-sm">
                Every ticket I solve is an interruption your Senior Engineers <em>don't</em> have to handle. I protect your most expensive payroll assets from context-switching costs, effectively subsidizing my own salary by preserving high-value engineering hours.
              </p>
            </SpotlightCard>

            <SpotlightCard className="bg-slate-900 border p-6 rounded-lg transition-all duration-300 border-slate-800 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
              <h3 className="text-lg font-bold text-gray-200 mb-2">NDR Protection (Churn Defense)</h3>
              <p className="text-gray-400 text-sm">
                Support is the frontline of revenue retention. I convert "Cancellation Events" into "Loyalty Events" through radical empathy and forensic technical competence, directly defending your Net Dollar Retention (NDR) and reducing logo churn.
              </p>
            </SpotlightCard>

            <SpotlightCard className="bg-slate-900 border p-6 rounded-lg transition-all duration-300 border-slate-800 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
               <h3 className="text-lg font-bold text-gray-200 mb-2">Capital Efficiency (Token Hygiene)</h3>
              <p className="text-gray-400 text-sm">
                I don't just use AI; I orchestrate it. My JamCamping workflow proves I can teach your users how to be Hypervisors of their own code, reducing frustration and maximizing the value they get from every token they pay for.
              </p>
            </SpotlightCard>

            <SpotlightCard className="bg-slate-900 border p-6 rounded-lg transition-all duration-300 border-slate-800 hover:border-amber-500/50 hover:scale-[1.05] hover:z-10 hover:shadow-2xl">
              <h3 className="text-lg font-bold text-gray-200 mb-2">Zero Latency (Immediate Yield)</h3>
              <p className="text-gray-400 text-sm">
                 I built a production app on your stack in 48 hours. I don't need a 3-month ramp. I am a depreciating asset in reverse: I become exponentially more valuable every week as I synthesize the platform's edge cases into documentation.
              </p>
            </SpotlightCard>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="text-center space-y-8 pt-10 pb-20">
          <p className="text-2xl text-gray-300 font-light max-w-2xl mx-auto">
             I don't just want to close tickets; I want to build the division that eliminates them. <br/><br/>
             <span className="text-lg text-gray-400">My trajectory is vertical. I am looking for the role where I can prove my value in the queue, and eventually lead your entire Customer Experience function.</span>
          </p>
          <div className="flex justify-center">
             <a 
               href="mailto:joshua.wakefield@gmail.com"
               className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 bg-amber-500 text-slate-900 focus:ring-amber-500 shadow-[0_0_40px_-10px_rgba(251,191,36,0.6)]"
             >
              <span className="relative z-10">Let's Talk</span>
              
              <div 
                className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-amber-400" 
                style={{ transform: 'translateZ(0)' }} 
              />
              
              <div className="absolute -inset-0 rounded-full animate-ping opacity-20 bg-amber-500" style={{ animationDuration: '3s' }}></div>
            </a>
          </div>
        </section>

      </div>

      <footer className="border-t border-slate-900 mt-32 bg-slate-950 relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm font-mono">
                SYSTEM_ID: JOSHUA_WAKEFIELD // <span className="text-amber-500">READY</span>
              </p>
            </div>
            <div className="flex gap-6">
              <a href="https://linkedin.com/in/jmwakefield" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 text-gray-400 hover:text-amber-400 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"><Linkedin size={24} /></a>
              <a href="https://github.com/joshuawakefield" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 text-gray-400 hover:text-amber-400 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"><Github size={24} /></a>
              <a href="mailto:joshua.wakefield@gmail.com" className="transition-all duration-300 text-gray-400 hover:text-amber-400 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"><Mail size={24} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;