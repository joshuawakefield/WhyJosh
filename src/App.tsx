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
              Most professionals optimize for a single trajectory—climbing the corporate ladder or mastering a craft.
              I've deliberately integrated both. The result: a cognitive operating system that translates between
              execution and strategy, field operations and boardroom decisions, electrons and clouds.
            </p>
            <p className="text-gray-400 leading-relaxed">
              This isn't about being a generalist. It's about building bridges where others see walls. Blue-collar
              discipline taught me systems thinking from the ground up. White-collar strategy taught me to scale
              those systems. The intersection is where leverage lives.
            </p>
          </div>
        </section>

        {/* The Timeline */}
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
                  <span className="text-blue-500 font-mono text-sm">1989-2007</span>
                  <h4 className="text-lg font-semibold text-gray-200">Foundation</h4>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Apprentice electrician. Learned to read blueprints, pull wire, troubleshoot live systems.
                  Built muscle memory for complex systems under pressure.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-blue-500 font-mono text-sm">2007-2015</span>
                  <h4 className="text-lg font-semibold text-gray-200">Evolution</h4>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Journeyman to Master. Commercial projects. Team leadership. Systems design.
                  The transition from executing plans to creating them.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-blue-500 font-mono text-sm">2015-Present</span>
                  <h4 className="text-lg font-semibold text-gray-200">Transformation</h4>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  The pivot. Business education. Technology integration. From installing physical infrastructure
                  to architecting digital systems. Same principles, different medium.
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
                  <div className="text-3xl font-bold text-blue-500">4.0</div>
                  <div className="text-sm text-gray-400">GPA</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-blue-500">Full-Time</div>
                  <div className="text-sm text-gray-400">While Working</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-blue-500">3 Years</div>
                  <div className="text-sm text-gray-400">Accelerated</div>
                </div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Bachelor of Commerce Administration while maintaining full-time work. Not because I needed
              validation, but because I needed tools. Financial modeling. Strategic frameworks.
              Organizational behavior. The meta-layer that turns operations into outcomes.
            </p>
            <p className="text-gray-400 leading-relaxed">
              The discipline from pulling wire in freezing warehouses translated directly to pulling
              all-nighters with balance sheets. Different domain. Same execution engine.
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
            <h3 className="text-xl font-semibold text-gray-200">Financial Alteration</h3>
            <p className="text-gray-400 leading-relaxed">
              Career transitions aren't linear. They're exponential when you compound domains.
              Blue-collar hourly rates hit ceilings. White-collar strategy work scales.
              The arbitrage opportunity: apply trades-level systems thinking to knowledge work.
            </p>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-400">Electrician (Peak)</span>
                  <span className="text-gray-200 font-mono">$XX/hour × 2080 hours</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-400">Strategic Roles (Current)</span>
                  <span className="text-blue-500 font-mono">$XXX,XXX+ annually</span>
                </div>
                <div className="h-px bg-slate-800 my-2"></div>
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-300 font-semibold">Multiplier</span>
                  <span className="text-blue-500 font-mono text-xl">X.X×</span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              But the real ROI isn't financial—it's cognitive. I can walk onto a construction site
              and speak the language. Then walk into a boardroom and translate it into strategy.
              That translation layer is the moat.
            </p>
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
