import { Download, ExternalLink, Linkedin, Github, Mail, ChevronDown } from 'lucide-react';

function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 font-sans antialiased">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
        <div className="max-w-4xl w-full text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-blue-500 mb-4">
              JOSHUA WAKEFIELD
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
              The Human Hypervisor. Bridging Blue-Collar Grit & White-Collar Strategy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center">
              <Download size={20} />
              Download Resume
            </button>
            <button className="px-8 py-4 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center">
              <ExternalLink size={20} />
              View JamCamping
            </button>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('thesis')}
          className="absolute bottom-12 text-gray-500 hover:text-blue-500 transition-colors duration-200 animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* Main Content Container */}
      <div className="max-w-3xl mx-auto px-6 py-20 space-y-32">

        {/* The Thesis */}
        <section id="thesis" className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 tracking-tight">
              The Thesis
            </h2>
            <div className="h-1 w-20 bg-blue-500"></div>
          </div>
          <div className="prose prose-invert prose-lg max-w-none">
            <h3 className="text-xl font-semibold text-gray-200 mb-4">Integrated Polarity</h3>
            <p className="text-gray-400 leading-relaxed">
              I operate beyond the standard 'Soft Skills vs. Hard Skills' binary. I possess <span className="text-gray-200 font-semibold">Integrated Polarity</span>. I have the engineering rigor to deconstruct the kernel, but the artistic intuition to read the room. I have the grit to handle the daily grind, but the vision to see the product roadmap. I don't just toggle between these states; I synthesize them to solve problems that single-domain experts cannot touch.
            </p>
          </div>
        </section>

       {/* The Timeline - CORRECTED */}
        <section id="timeline" className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 tracking-tight">
              The Timeline
            </h2>
            <div className="h-1 w-20 bg-blue-500"></div>
          </div>
          <div className="space-y-8">
            <h3 className="text-xl font-semibold text-gray-200">Electron to Cloud: 1989-Present</h3>
        
            <div className="space-y-6 border-l-2 border-blue-500/30 pl-6 ml-2">
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-blue-500 font-mono text-sm">1989-1998</span>
                  <h4 className="text-lg font-semibold text-gray-200">The Spark</h4>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  My journey began with Logo in 1989. By 1996, I was compiling C++ and navigating the early Linux kernel.
                  Pre-web, pre-cloud, deep roots.
                </p>
              </div>
        
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-blue-500 font-mono text-sm">1999-2003</span>
                  <h4 className="text-lg font-semibold text-gray-200">The Bedrock (WPI)</h4>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Entered WPI early. Switched from CS to Electrical Engineering to master Signal Processing and Analog Circuitry.
                  This physics-based mental model underpins how I debug AI today.
                </p>
              </div>
        
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-blue-500 font-mono text-sm">2003-2021</span>
                  <h4 className="text-lg font-semibold text-gray-200">The Crucible</h4>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  A non-linear path through high-stakes operations—from managing critical equipment failures at DR Power
                  to international mediation. Mastering the "human" side of systems.
                </p>
              </div>
              
               <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-blue-500 font-mono text-sm">2022-Present</span>
                  <h4 className="text-lg font-semibold text-gray-200">The Synthesis</h4>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Returned to the digital frontier via Burlington Code Academy (Top of Class). Now orchestrating AI agents
                  and building production-grade apps like JamCamping.com.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Pivot (BCA) */}
        <section id="pivot" className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 tracking-tight">
              The Pivot
            </h2>
            <div className="h-1 w-20 bg-blue-500"></div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-200">Proof of Grit</h3>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-blue-500">Top of Class</div>
                  <div className="text-sm text-gray-400">BCA Cohort</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-blue-500">4 Certs</div>
                  <div className="text-sm text-gray-400">Full Stack MERN</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-blue-500">Pre-AI</div>
                  <div className="text-sm text-gray-400">Manual Mastery</div>
                </div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              In 2021, facing severe housing instability, I engineered a pivot. I secured $10k in grants to attend the Burlington Code Academy. I graduated top of class in the final pre-ChatGPT cohort, mastering the MERN stack manually. This proved I don't just survive constraints; I weaponize them.
            </p>
          </div>
        </section>

        {/* The ROI (Arbitrage) */}
        <section id="roi" className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 tracking-tight">
              The ROI
            </h2>
            <div className="h-1 w-20 bg-blue-500"></div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-200">The Arbitrage</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-3">
                <h4 className="text-lg font-semibold text-blue-500">Protection of Engineering</h4>
                <p className="text-gray-400 leading-relaxed text-sm">
                  I act as a firewall. Because I operate 'Electron to Cloud,' I solve Tier 3 complexity in the queue, protecting your core devs from context-switching.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-3">
                <h4 className="text-lg font-semibold text-blue-500">LTV Preservation</h4>
                <p className="text-gray-400 leading-relaxed text-sm">
                  I apply 'Vibration Control.' I turn cancellation events into loyalty events by validating user anxiety and applying forensic technical fixes.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-3">
                <h4 className="text-lg font-semibold text-blue-500">Zero-Latency Onboarding</h4>
                <p className="text-gray-400 leading-relaxed text-sm">
                  I don't need 3 months to ramp. As proven by JamCamping.com, I already understand the Bolt.new stack and can generate value on Day 1.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-32">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                Built on <span className="text-blue-500">Bolt.new</span>. Deployed by Joshua Wakefield.
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
              >
                <Github size={24} />
              </a>
              <a
                href="mailto:your.email@example.com"
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
