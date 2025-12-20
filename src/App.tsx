import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Terminal, 
  Cpu, 
  Zap, 
  ChevronRight, 
  ExternalLink, 
  Github, 
  Mail, 
  Linkedin, 
  ChevronDown,
  Command
} from 'lucide-react';

// --- SUBTLE COMPONENTS (THE GREEN LIST) ---

/**
 * #11: Breathing Gradient Background
 * Fixed atmospheric layer that doesn't interfere with scroll performance.
 */
const BreathingBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
    <div className="absolute inset-0 bg-slate-950" />
    <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent animate-[pulse_8s_ease-in-out_infinite]" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent animate-[pulse_12s_ease-in-out_infinite] delay-1000" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(2,6,23,0.8)_100%)]" />
  </div>
);

/**
 * #3: Typing Animation for Hero
 */
const TypingText = ({ text, delay = 50 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);

  return (
    <span className="font-mono">
      {displayedText}
      <span className="animate-pulse inline-block w-2 h-5 bg-amber-500 ml-1 align-middle" />
    </span>
  );
};

/**
 * #6: Scroll-Triggered Section Reveal
 */
const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    }, { threshold: 0.1 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => { if (domRef.current) observer.unobserve(domRef.current); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

/**
 * #2 & #13: 3D Tilt + Enhanced Spotlight + Parallax
 */
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    setRotate({ x: dy / -15, y: dx / 15 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotate({ x: 0, y: 0 }); }}
      className={`relative group bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden transition-all duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        willChange: 'transform'
      }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${isHovered ? 'var(--mouse-x)' : '50%'} ${isHovered ? 'var(--mouse-y)' : '50%'}, rgba(251, 191, 36, 0.08), transparent 40%)`
        }}
      />
      {/* #13 Parallax Layer */}
      <div 
        className="relative z-10 transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${rotate.y * -0.5}px) translateY(${rotate.x * -0.5}px)` }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * #12: Expandable Timeline Item
 */
const TimelineItem = ({ 
  title, 
  period, 
  company, 
  highlights, 
  details 
}: { 
  title: string, 
  period: string, 
  company: string, 
  highlights: string[], 
  details?: string 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative pl-8 border-l border-slate-800 pb-12 last:pb-0">
      <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        <span className="text-sm font-mono text-amber-500/80">{period}</span>
      </div>
      <div className="text-indigo-400 font-medium mb-4 flex items-center gap-2">
        <Cpu size={16} /> {company}
      </div>
      <ul className="space-y-2 mb-4">
        {highlights.map((point, i) => (
          <li key={i} className="text-slate-400 text-sm flex gap-2">
            <span className="text-amber-500/50 mt-1.5">•</span>
            {point}
          </li>
        ))}
      </ul>
      
      {details && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-amber-500 transition-colors"
        >
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          {isExpanded ? "HIDE OPERATIONAL LOGS" : "VIEW OPERATIONAL LOGS"}
        </button>
      )}
      
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-height-96 mt-4 opacity-100' : 'max-height-0 opacity-0'}`}>
        <p className="text-xs text-slate-500 leading-relaxed bg-slate-900/50 p-4 rounded border border-slate-800/50 font-mono italic">
          {details}
        </p>
      </div>
    </div>
  );
};

// --- MAIN PAGE ARCHITECTURE ---

const Portfolio = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTerminalHovered, setIsTerminalHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(window.scrollY / total);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-slate-300 selection:bg-amber-500/30 selection:text-amber-200">
      <BreathingBackground />

      {/* Navigation (Sticky) */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono font-bold text-slate-100">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            JOSHUA WAKEFIELD
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-mono tracking-tighter uppercase">
            <a href="#about" className="hover:text-amber-500 transition-colors">About</a>
            <a href="#projects" className="hover:text-amber-500 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-amber-500 transition-colors">Experience</a>
            <a href="mailto:joshua.wakefield@gmail.com" className="px-4 py-2 border border-amber-500/50 text-amber-500 rounded-md hover:bg-amber-500/10 transition-all">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl md:text-8xl font-black text-slate-100 leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-200">SYSTEM</span> SYNTHESIZER
            </h1>
            <h2 className="text-xl md:text-3xl font-mono text-indigo-400">
              <TypingText text="The High-Bandwidth Generalist for the AI Era." />
            </h2>
            <p className="max-w-2xl text-lg text-slate-400 leading-relaxed">
              Bridging WPI Physics, Operational Grit, and AI Orchestration. I possess a topological understanding of 10+ distinct domains—from Signal Processing to Industrial Logistics.
            </p>
          </div>
        </div>
      </section>

      {/* About / Synthesis Engine */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-4 uppercase tracking-widest">
                  // THE SYNTHESIS ENGINE
                </div>
                <p className="text-2xl text-slate-200 leading-tight">
                  "I use Artificial Intelligence as a universal glue. I don't need to memorize the syntax of every library because I understand the architecture of the system."
                </p>
                <p className="text-slate-400">
                  I use AI to execute the 'How' so I can focus entirely on the 'Why'. This allows me to be a **Hyper-Navigator**, solving problems that cross the boundaries of Engineering, Operations, and Human Dynamics.
                </p>
              </div>
              
              <SpotlightCard className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500">
                      <Zap size={24} />
                    </div>
                    <div>
                      <h4 className="text-slate-100 font-bold uppercase tracking-wider text-xs">Vibration Control</h4>
                      <p className="text-sm text-slate-400">Stable frequency in high-entropy environments.</p>
                    </div>
                  </div>
                  <div className="w-full h-[2px] bg-slate-800" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase font-mono text-slate-500">Node Entropy</div>
                      <div className="text-sm font-mono text-slate-300 italic">0.0003ms</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase font-mono text-slate-500">Vibe Check</div>
                      <div className="text-sm font-mono text-slate-300 italic">Optimized</div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Featured Projects (Proof of Velocity) */}
      <section id="projects" className="py-24 px-6 bg-slate-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold text-slate-100 mb-2 uppercase tracking-tighter">Case Study: Zero-Latency Adaptation</h2>
              <p className="text-indigo-400 font-mono text-sm">Deployment Velocity: 48 Hours</p>
            </div>
            <div className="hidden md:block h-[1px] flex-1 bg-slate-800 mx-10 mb-2" />
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5 space-y-6">
              <p className="text-slate-400 leading-relaxed">
                The value of JamCamping.com isn't the app itself; it's the **Velocity**. I am not a native React developer—I am a Systems Thinker. I used an "External Reasoner" workflow to bridge the gap between intent and execution.
              </p>
              
              <div className="space-y-4">
                {[
                  { step: '01', title: 'GitIngest (Context)', desc: 'Serialized repo into context stream.' },
                  { step: '02', title: 'External Reasoner', desc: 'Architecture logic via O1/Claude.' },
                  { step: '03', title: 'Bolt.new (Execution)', desc: 'Real-time compilation and deployment.' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-800/50">
                    <span className="text-amber-500 font-mono text-lg font-bold">{item.step}</span>
                    <div>
                      <h4 className="text-slate-200 text-sm font-bold uppercase">{item.title}</h4>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-7">
              <SpotlightCard className="h-full aspect-video flex flex-col items-center justify-center p-0">
                <div className="absolute top-4 right-4 z-20">
                  <a 
                    href="https://jamcamping.com/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-full hover:bg-amber-400 transition-all text-xs"
                  >
                    LIVE SITE <ExternalLink size={14} />
                  </a>
                </div>
                <div className="text-center p-12 bg-slate-950/80 w-full h-full flex flex-col justify-center">
                   <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">JamCamping</h3>
                   <p className="font-mono text-amber-500/50 text-xs mb-6 uppercase">V 1.0.0 // PRODUCTION</p>
                   <div className="flex justify-center gap-2">
                     <span className="px-3 py-1 bg-slate-900 text-[10px] text-slate-400 rounded-full border border-slate-800">React</span>
                     <span className="px-3 py-1 bg-slate-900 text-[10px] text-slate-400 rounded-full border border-slate-800">Vite</span>
                     <span className="px-3 py-1 bg-slate-900 text-[10px] text-slate-400 rounded-full border border-slate-800">Supabase</span>
                   </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl font-black text-slate-100 uppercase tracking-tighter">Professional History</h2>
            <div className="h-[1px] flex-1 bg-slate-800" />
          </div>

          <FadeInSection>
            <div className="space-y-0">
              <TimelineItem 
                title="Systems Builder & Trade Contractor"
                period="2021 – PRESENT"
                company="Independent"
                highlights={[
                  "Executing high-precision infrastructure projects while maintaining operational discipline.",
                  "Mastered MERN stack and Agentic workflows while working in physical systems (The Metal).",
                  "Applied engineering first-principles to physical infrastructure failure points."
                ]}
                details="This era forged the 'Operational Grit' required for technical stability. Managing complex carpentry, electrical, and landscaping projects taught me to see the code in the physical world. Successfully navigated the Vermont motel program during housing instability while simultaneously upskilling in Full-Stack development."
              />
              
              <TimelineItem 
                title="Technical Support Engineer (Tier 3)"
                period="2020 – 2022"
                company="DR Power Equipment"
                highlights={[
                  "Served as 'The Stopper' for critical mechanical and electrical failures.",
                  "Performed forensic RCA on engines, electrical systems, and embedded controllers.",
                  "Converted high-stress detractor events into brand loyalty milestones."
                ]}
                details="Utilized SAP and remote diagnostic frameworks to visualize schematics for customers in crisis. Once guided a customer through a QC repair deep in a chassis via phone, saving a $3,000 return and solidifying brand authority."
              />

              <TimelineItem 
                title="Customer Success Operations"
                period="2016 – 2018"
                company="Localvore"
                highlights={[
                  "Managed CX operations for a SaaS platform with 15,000+ active users.",
                  "Designed scalable support workflows and internal knowledge base architectures.",
                  "Liaison between users and engineering to prioritize high-impact product features."
                ]}
              />

              <TimelineItem 
                title="Senior Proposal Editor & Red Team Lead"
                period="2006 – 2013"
                company="CACI International"
                highlights={[
                  "Synthesized 21 disjointed technical submissions into unified federal contracts ($6M+).",
                  "Ensured Section L/M compliance and forensic invoice validation.",
                  "Coordinated with SMEs to translate Signal Processing data into executive narratives."
                ]}
              />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* The Convergence (WPI) */}
      <section className="py-24 px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <FadeInSection>
            <div className="inline-block p-4 bg-amber-500/10 rounded-2xl mb-8">
              <Cpu size={48} className="text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-100 mb-6 uppercase tracking-wider">The Engineering Bedrock</h2>
            <p className="max-w-3xl mx-auto text-slate-400 mb-12">
              My understanding of AI is grounded in the math of the universe. I studied **Signals & Systems** and **Control Engineering** at **Worcester Polytechnic Institute (WPI)**. My first principles are Fourier transforms and Feedback Loops—not just API calls.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-indigo-400">
              <span className="px-4 py-2 bg-slate-900 border border-slate-800 rounded">LAPLACE TRANSFORMS</span>
              <span className="px-4 py-2 bg-slate-900 border border-slate-800 rounded">STOCHASTIC SYSTEMS</span>
              <span className="px-4 py-2 bg-slate-900 border border-slate-800 rounded">VIBRATION ANALYSIS</span>
              <span className="px-4 py-2 bg-slate-900 border border-slate-800 rounded">POWER SYSTEMS</span>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer / Social */}
      <footer className="py-12 px-6 border-t border-slate-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
             <div className="font-mono font-bold text-slate-100">JOSHUA WAKEFIELD // 2025</div>
             <div className="text-xs text-slate-500 font-mono tracking-widest uppercase italic opacity-50">STATUS: TRANSMITTING</div>
          </div>
          <div className="flex gap-6">
            <a href="https://linkedin.com/in/jmwakefield" className="text-slate-500 hover:text-amber-500 transition-colors"><Linkedin size={20} /></a>
            <a href="https://github.com/joshuawakefield" className="text-slate-500 hover:text-amber-500 transition-colors"><Github size={20} /></a>
            <a href="mailto:joshua.wakefield@gmail.com" className="text-slate-500 hover:text-amber-500 transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </footer>

      {/* #14: Terminal Trigger Tooltip Implementation */}
      <div 
        className="fixed bottom-10 right-10 z-[60]"
        onMouseEnter={() => setIsTerminalHovered(true)}
        onMouseLeave={() => setIsTerminalHovered(false)}
      >
        <div className={`absolute bottom-full right-0 mb-4 transition-all duration-200 ${isTerminalHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
          <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-2xl w-48 font-mono">
            <div className="text-[10px] text-slate-500 uppercase mb-2">Power User Access</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Query Portfolio</span>
                <span className="text-amber-500 px-1.5 py-0.5 bg-amber-500/10 rounded">CMD+K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">ROI Analysis</span>
                <span className="text-amber-500 italic">whyjosh</span>
              </div>
            </div>
          </div>
        </div>

        <button 
          className="relative group p-4 bg-amber-500 text-slate-950 rounded-full shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:scale-110 transition-all duration-300"
          style={{ 
            boxShadow: `0 0 ${20 + (scrollProgress * 60)}px rgba(251,191,36,${0.3 + (scrollProgress * 0.4)})`
          }}
        >
          <Terminal size={24} />
          <div className="absolute -inset-1 rounded-full border border-amber-500/50 animate-ping opacity-20 pointer-events-none" />
        </button>
      </div>

    </div>
  );
};

export default Portfolio;