import { Download, ExternalLink, Linkedin, Github, Mail, ChevronDown, Terminal, Cpu, HardHat, Zap } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

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
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={spotlightRef} className="spotlight w-24 h-24" />
      {children}
    </div>
  );
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

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
    <div className="min-h-screen bg-slate-950 text-gray-100 font-sans antialiased selection:bg-blue-500/30">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-blue-500 z-50 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Background texture with pulse */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] grid-pulse"></div>

        {/* Scanlines overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59, 130, 246, 0.1) 2px, rgba(59, 130, 246, 0.1) 4px)',
          animation: 'scanlines 8s linear infinite'
        }}></div>
        
        <div className="max-w-5xl w-full text-center space-y-8 relative z-10">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-mono mb-4">
              SYSTEM STATE: OPTIMAL // READY FOR DEPLOYMENT
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
              JOSHUA WAKEFIELD
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto">
              The <span className="text-blue-400 font-medium">Human Hypervisor</span> for AI Communities.
              <br className="hidden md:block" />
              Bridging Blue-Collar Grit & White-Collar Strategy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a href="mailto:joshua.wakefield@gmail.com" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg shadow-blue-900/20 hover:scale-105">
              <Mail size={20} />
              Contact Me
            </a>
            <a href="https://jamcamping.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-blue-400 hover:text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center hover:border-blue-500/50">
              <ExternalLink size={20} />
              View Proof of Work
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('thesis')}
          className="absolute bottom-12 text-slate-600 hover:text-blue-400 transition-colors duration-200 animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-40">

        {/* The Thesis */}
        <section id="thesis" className="space-y-8">
          <div className="space-y-4 border-l-4 border-blue-500 pl-6 relative">
            <div className="absolute -inset-4 bg-blue-500/5 rounded-lg -z-10"></div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-100 tracking-tight glow-header">
              Integrated Polarity
            </h2>
            <p className="text-blue-400 font-mono text-lg">/ˈin(t)əˌɡrādəd pōˈlerədē/</p>
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
              <p className="text-emerald-400 font-mono text-sm mb-2">// THE FORCE MULTIPLIER EFFECT</p>
              <p className="italic text-gray-400">
                "I am not just one person; I am a team of specialists inhabiting one body, orchestrated by a mature executive consciousness."
              </p>
            </div>
          </div>
        </section>

        {/* The Timeline */}
        <section id="timeline" className="space-y-12">
          <div className="flex items-center gap-4 relative">
            <div className="absolute -inset-4 bg-blue-500/5 rounded-lg -z-10"></div>
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
              <Terminal size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight glow-header">
              The Electron-to-Cloud Graph
            </h2>
          </div>

          <div className="relative border-l border-slate-800 ml-4 space-y-12 pb-4">
            {/* WPI Era */}
            <div className="relative pl-12 group">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 border-blue-500 group-hover:bg-blue-500 transition-colors duration-300"></div>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <h3 className="text-xl font-bold text-gray-100">The Bedrock: WPI</h3>
                  <span className="font-mono text-blue-400 text-sm">1999-2003</span>
                </div>
                <div className="text-gray-400 leading-relaxed">
                  Electrical Engineering & Signal Processing. I learned the math of the universe—Fourier transforms, Control Theory, and Entropy. I view LLMs not as magic, but as high-dimensional signal processing.
                </div>
              </div>
            </div>

            {/* The Pivot Era */}
            <div className="relative pl-12 group">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 border-slate-600 group-hover:border-emerald-500 transition-colors duration-300"></div>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <h3 className="text-xl font-bold text-gray-100">The Forge: Operational Grit</h3>
                  <span className="font-mono text-emerald-400 text-sm">2020-2022</span>
                </div>
                <div className="text-gray-400 leading-relaxed">
                  Navigated extreme resource constraints (housing instability) while working rigorous trade jobs (Tree Service, Industrial Kitchens). This era forged my "Stopper" mentality: In a crisis, I do not vibrate with chaos; I absorb it.
                </div>
              </div>
            </div>

            {/* The Tech Return */}
            <div className="relative pl-12 group">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 border-2 border-blue-400 group-hover:bg-blue-400 transition-colors duration-300"></div>
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                  <h3 className="text-xl font-bold text-gray-100">The Return: Burlington Code Academy</h3>
                  <span className="font-mono text-blue-400 text-sm">2022</span>
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
            <div className="absolute -inset-4 bg-emerald-500/5 rounded-lg -z-10"></div>
            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
              <Zap size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight glow-header">
              The Arbitrage Opportunity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpotlightCard className="bg-slate-900 border border-slate-800 p-6 rounded-lg hover:border-blue-500/30 transition-colors">
              <h3 className="text-lg font-bold text-gray-200 mb-2">Escalation Firewall</h3>
              <p className="text-gray-400 text-sm">
                Most support reps escalate Tier 3 tickets. I solve them in the queue. I protect your Engineering team's bandwidth, saving thousands in context-switching costs.
              </p>
            </SpotlightCard>
            <SpotlightCard className="bg-slate-900 border border-slate-800 p-6 rounded-lg hover:border-blue-500/30 transition-colors">
              <h3 className="text-lg font-bold text-gray-200 mb-2">Vibration Control</h3>
              <p className="text-gray-400 text-sm">
                I apply radical empathy + technical authority. I turn "Cancellation Events" into "Loyalty Events," directly defending Net Dollar Retention (NDR).
              </p>
            </SpotlightCard>
            <SpotlightCard className="bg-slate-900 border border-slate-800 p-6 rounded-lg hover:border-blue-500/30 transition-colors">
              <h3 className="text-lg font-bold text-gray-200 mb-2">Context Hygiene</h3>
              <p className="text-gray-400 text-sm">
                I don't just use AI; I orchestrate it. My JamCamping workflow proves I can teach your users how to be Hypervisors of their own code.
              </p>
            </SpotlightCard>
            <SpotlightCard className="bg-slate-900 border border-slate-800 p-6 rounded-lg hover:border-blue-500/30 transition-colors">
              <h3 className="text-lg font-bold text-gray-200 mb-2">Zero Latency</h3>
              <p className="text-gray-400 text-sm">
                I am an exponential learner. I built production apps on your stack over a weekend. I start generating ROI on Day 1.
              </p>
            </SpotlightCard>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-8 pt-10">
          <p className="text-2xl text-gray-300 font-light">
            I am not looking for a job. I am looking for a mission.
          </p>
          <div className="flex justify-center">
             <a 
               href="mailto:joshua.wakefield@gmail.com"
               className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-500"
             >
              Let's Talk
              <div className="absolute -inset-3 rounded-full bg-blue-400 opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-200" />
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
                SYSTEM_ID: JOSHUA_WAKEFIELD // <span className="text-blue-500">READY</span>
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="https://linkedin.com/in/jmwakefield"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/joshuawakefield"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                <Github size={24} />
              </a>
              <a
                href="mailto:joshua.wakefield@gmail.com"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;