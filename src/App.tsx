import { Download, ExternalLink, Linkedin, Github, Mail, ChevronDown, Terminal, Zap, X, Minus, Square } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// --- COMPONENTS ---

function SpotlightCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-container relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={spotlightRef} className="spotlight w-24 h-24 absolute pointer-events-none rounded-full bg-blue-500/20 blur-xl transition-opacity duration-100" style={{ opacity: 0 }} />
      {children}
    </div>
  );
}

function TerminalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    "WakefieldOS v1.0.3 (tty1)",
    "Login: guest",
    "Welcome to the System. Type 'help' for commands.",
    "------------------------------------------------",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'auto' });
      inputRef.current?.focus();
    }
  }, [history, isOpen]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, `guest@wakefield:~$ ${input}`];

      switch (cmd) {
        case 'help':
          newHistory.push("Available commands: whoami, stack, contact, jamcamping, clear, exit");
          break;
        case 'whoami':
          newHistory.push("Joshua Wakefield. Polymathic Systems Synthesizer. WPI EE '03. Forged in DR Power. Currently optimizing entropy.");
          break;
        case 'stack':
          newHistory.push("CORE: React, Next.js, Node, TypeScript");
          newHistory.push("AI: Agent Orchestration, Context Hygiene, RAG");
          newHistory.push("HARDWARE: Signal Processing, IoT, Circuit Design");
          break;
        case 'contact':
          newHistory.push("Email: joshua.wakefield@gmail.com");
          newHistory.push("Location: Newport, RI, USA");
          break;
        case 'jamcamping':
          newHistory.push("JamCamping.com: A production-grade PWA built in one weekend on Bolt.new.");
          newHistory.push("Status: Deployed // Architecture: Dual-Stack");
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'exit':
          onClose();
          return;
        default:
          if (cmd !== '') newHistory.push(`Command not found: ${cmd}. Type 'help' for assistance.`);
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-950 border border-slate-700 rounded-lg shadow-2xl overflow-hidden font-mono text-sm md:text-base">
        {/* Terminal Header */}
        <div className="bg-slate-900 p-2 border-b border-slate-800 flex justify-between items-center">
          <div className="flex gap-2 ml-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="text-slate-400 text-xs">guest@wakefield:~</div>
          <button onClick={onClose} className="text-slate-400 hover:text-white mr-2"><X size={16} /></button>
        </div>
        {/* Terminal Body */}
        <div className="p-4 h-[400px] overflow-y-auto text-green-400 selection:bg-green-900" onClick={() => inputRef.current?.focus()}>
          {history.map((line, i) => (
            <div key={i} className="mb-1 break-words">{line}</div>
          ))}
          <div className="flex items-center gap-2">
            <span className="text-blue-400">guest@wakefield:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none outline-none text-green-400 flex-1 focus:ring-0"
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP ---

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [highVibe, setHighVibe] = useState(false);

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
    <div className={`min-h-screen bg-slate-950 text-gray-100 font-sans antialiased transition-colors duration-500 ${highVibe ? 'high-vibe' : ''}`}>
      
      {/* System Progress Bar */}
      <div className={`fixed top-0 left-0 h-1 z-50 transition-all duration-300 ${highVibe ? 'bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)]' : 'bg-blue-500'}`} style={{ width: `${scrollProgress}%` }} />

      {/* Floating UI Controls */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        {/* Vibration Control Toggle */}
        <button 
          onClick={() => setHighVibe(!highVibe)}
          className={`p-4 rounded-full shadow-2xl border transition-all duration-300 hover:scale-110 ${highVibe ? 'bg-fuchsia-900/80 border-fuchsia-500 text-fuchsia-400' : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-500'}`}
          title="Toggle Vibration Control"
        >
          <Zap size={24} className={highVibe ? 'fill-current animate-pulse' : ''} />
        </button>

        {/* Terminal Toggle */}
        <button 
          onClick={() => setIsTerminalOpen(true)}
          className="p-4 bg-slate-900/80 backdrop-blur border border-slate-700 text-slate-400 hover:text-green-400 hover:border-green-500 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
          title="Open System Terminal"
        >
          <Terminal size={24} />
        </button>
      </div>

      <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className={`absolute inset-0 opacity-10 [background-size:16px_16px] grid-pulse transition-colors duration-500 ${highVibe ? 'bg-[radial-gradient(#d946ef_1px,transparent_1px)]' : 'bg-[radial-gradient(#3b82f6_1px,transparent_1px)]'}`}></div>

        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${highVibe ? 'rgba(217, 70, 239, 0.2)' : 'rgba(59, 130, 246, 0.1)'} 2px, ${highVibe ? 'rgba(217, 70, 239, 0.2)' : 'rgba(59, 130, 246, 0.1)'} 4px)`,
          animation: 'scanlines 8s linear infinite'
        }}></div>
        
        <div className="max-w-5xl w-full text-center space-y-8 relative z-10">
          <div className="space-y-6">
            <div className={`inline-block px-3 py-1 rounded-full border text-sm font-mono mb-4 transition-colors duration-500 ${highVibe ? 'border-fuchsia-500/50 bg-fuchsia-500/10 text-fuchsia-400' : 'border-blue-500/30 bg-blue-500/10 text-blue-400'}`}>
              SYSTEM STATE: {highVibe ? 'HIGH VIBRATION' : 'OPTIMAL'} // READY
            </div>
            <h1 className={`text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text mb-4 transition-all duration-500 ${highVibe ? 'bg-gradient-to-r from-fuchsia-400 to-purple-400 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]' : 'bg-gradient-to-r from-blue-400 to-emerald-400'}`}>
              JOSHUA WAKEFIELD
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto">
              The <span className={`font-medium transition-colors duration-500 ${highVibe ? 'text-fuchsia-400' : 'text-blue-400'}`}>Human Hypervisor</span> for AI Communities.
              <br className="hidden md:block" />
              Bridging Blue-Collar Grit & White-Collar Strategy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a href="mailto:joshua.wakefield@gmail.com" className={`px-8 py-4 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg hover:scale-105 ${highVibe ? 'bg-fuchsia-600 hover:bg-fuchsia-500 shadow-fuchsia-900/20' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20'}`}>
              <Mail size={20} />
              Contact Me
            </a>
            <a href="https://jamcamping.com" target="_blank" rel="noopener noreferrer" className={`px-8 py-4 border bg-slate-900/50 hover:text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center ${highVibe ? 'border-fuchsia-500/30 text-fuchsia-400 hover:bg-fuchsia-900/30' : 'border-slate-700 text-blue-400 hover:bg-slate-800 hover:border-blue-500/50'}`}>
              <ExternalLink size={20} />
              View Proof of Work
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('thesis')}
          className={`absolute bottom-12 transition-colors duration-200 animate-bounce ${highVibe ? 'text-fuchsia-600' : 'text-slate-600 hover:text-blue-400'}`}
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-40">

        {/* The Thesis */}
        <section id="thesis" className="space-y-8">
          <div className={`space-y-4 border-l-4 pl-6 relative ${highVibe ? 'border-fuchsia-500' : 'border-blue-500'}`}>
            <h2 className={`text-3xl md:text-5xl font-bold text-gray-100 tracking-tight glow-header`}>
              Integrated Polarity
            </h2>
            <p className={`${highVibe ? 'text-fuchsia-400' : 'text-blue-400'} font-mono text-lg`}>/ˈin(t)əˌɡrādəd pōˈlerədē/</p>
          </div>
          
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-6">
            <p>
              I operate beyond the standard "Soft Skills vs. Hard Skills" binary. Most professionals optimize for a single trajectory—climbing the corporate ladder or mastering a craft. 
              <strong className="text-white"> I have deliberately integrated both.</strong>
            </p>
            <p>
              I possess the engineering rigor to deconstruct the kernel (WPI EE), but the artistic intuition to read the room (Jazz/Comedy). I have the grit to handle the daily grind (Trades), but the vision to see the product roadmap. I don't just toggle between these states; I synthesize them to solve problems that single-domain experts cannot touch.
            </p>
            <div className="bg-slate-900/80 p-6 rounded-lg border border-slate-800 mt-8">
              <p className={`${highVibe ? 'text-fuchsia-400' : 'text-emerald-400'} font-mono text-sm mb-2`}>// THE FORCE MULTIPLIER EFFECT</p>
              <p className="italic text-gray-400">
                "I am not just one person; I am a team of specialists inhabiting one body, orchestrated by a mature executive consciousness."
              </p>
            </div>
          </div>
        </section>

        {/* The Timeline */}
        <section id="timeline" className="space-y-12">
          <div className="flex items-center gap-4 relative">
            <div className={`p-3 rounded-lg ${highVibe ? 'bg-fuchsia-500/10 text-fuchsia-400' : 'bg-blue-500/10 text-blue-400'}`}>
              <Terminal size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight glow-header">
              The Electron-to-Cloud Graph
            </h2>
          </div>

          <div className="relative border-l border-slate-800 ml-4 space-y-12 pb-4">
            {/* WPI Era */}
            <div className="relative pl-12 group">
              <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 transition-colors duration-300 ${highVibe ? 'border-fuchsia-500 group-hover:bg-fuchsia-500' : 'border-blue-500 group-hover:bg-blue-500'}`}></div>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <h3 className="text-xl font-bold text-gray-100">The Bedrock: WPI</h3>
                  <span className={`${highVibe ? 'text-fuchsia-400' : 'text-blue-400'} font-mono text-sm`}>1999-2003</span>
                </div>
                <div className="text-gray-400 leading-relaxed">
                  Electrical Engineering & Signal Processing. I learned the math of the universe—Fourier transforms, Control Theory, and Entropy. I view LLMs not as magic, but as high-dimensional signal processing.
                </div>
              </div>
            </div>

            {/* The Pivot Era */}
            <div className="relative pl-12 group">
              <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 border-slate-600 transition-colors duration-300 ${highVibe ? 'group-hover:border-fuchsia-500' : 'group-hover:border-emerald-500'}`}></div>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <h3 className="text-xl font-bold text-gray-100">The Forge: Operational Grit</h3>
                  <span className={`${highVibe ? 'text-fuchsia-400' : 'text-emerald-400'} font-mono text-sm`}>2020-2022</span>
                </div>
                <div className="text-gray-400 leading-relaxed">
                  Navigated extreme resource constraints (housing instability) while working rigorous trade jobs (Tree Service, Industrial Kitchens). This era forged my "Stopper" mentality: In a crisis, I do not vibrate with chaos; I absorb it.
                </div>
              </div>
            </div>

            {/* The Tech Return */}
            <div className="relative pl-12 group">
              <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 transition-colors duration-300 ${highVibe ? 'border-fuchsia-400 group-hover:bg-fuchsia-400' : 'border-blue-400 group-hover:bg-blue-400'}`}></div>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <h3 className="text-xl font-bold text-gray-100">The Return: Burlington Code Academy</h3>
                  <span className={`${highVibe ? 'text-fuchsia-400' : 'text-blue-400'} font-mono text-sm`}>2022</span>
                </div>
                <div className="text-gray-400 leading-relaxed">
                  Graduated Top of Class. I didn't accept the $12k tuition constraint; I engineered a funding solution via grants. Mastered the MERN stack manually right before the ChatGPT acceleration.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The ROI (Arbitrage) */}
        <section id="roi" className="space-y-8">
           <div className="flex items-center gap-4 relative">
            <div className={`p-3 rounded-lg ${highVibe ? 'bg-fuchsia-500/10 text-fuchsia-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
              <Zap size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight glow-header">
              The Arbitrage Opportunity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['Escalation Firewall', 'Vibration Control', 'Context Hygiene', 'Zero Latency'].map((title, i) => (
              <SpotlightCard key={i} className={`bg-slate-900 border p-6 rounded-lg transition-colors ${highVibe ? 'border-slate-800 hover:border-fuchsia-500/50' : 'border-slate-800 hover:border-blue-500/30'}`}>
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

        {/* Call to Action */}
        <section className="text-center space-y-8 pt-10 pb-20">
          <p className="text-2xl text-gray-300 font-light">
            I am not looking for a job. I am looking for a mission.
          </p>
          <div className="flex justify-center">
             <a 
               href="mailto:joshua.wakefield@gmail.com"
               className={`group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 ${highVibe ? 'bg-fuchsia-600 focus:ring-fuchsia-600 shadow-[0_0_40px_-10px_rgba(217,70,239,0.5)]' : 'bg-blue-600 focus:ring-blue-600 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]'}`}
             >
              <span className="relative z-10">Let's Talk</span>
              
              {/* Hardware Accelerated Glow Layer - Moved behind text and fixed for iOS */}
              <div 
                className={`absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl ${highVibe ? 'bg-fuchsia-400' : 'bg-blue-400'}`} 
                style={{ transform: 'translateZ(0)' }} // Force GPU acceleration for smooth iOS rendering
              />
              
              {/* Subtle pulsing ring animation for "Lit Up" state */}
              <div className={`absolute -inset-0 rounded-full animate-ping opacity-20 ${highVibe ? 'bg-fuchsia-500' : 'bg-blue-500'}`} style={{ animationDuration: '3s' }}></div>
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
                SYSTEM_ID: JOSHUA_WAKEFIELD // <span className={highVibe ? 'text-fuchsia-500' : 'text-blue-500'}>READY</span>
              </p>
            </div>
            <div className="flex gap-6">
              <a href="https://linkedin.com/in/jmwakefield" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-200 ${highVibe ? 'text-gray-400 hover:text-fuchsia-500' : 'text-gray-400 hover:text-blue-500'}`}><Linkedin size={24} /></a>
              <a href="https://github.com/joshuawakefield" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-200 ${highVibe ? 'text-gray-400 hover:text-fuchsia-500' : 'text-gray-400 hover:text-blue-500'}`}><Github size={24} /></a>
              <a href="mailto:joshua.wakefield@gmail.com" className={`transition-colors duration-200 ${highVibe ? 'text-gray-400 hover:text-fuchsia-500' : 'text-gray-400 hover:text-blue-500'}`}><Mail size={24} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;