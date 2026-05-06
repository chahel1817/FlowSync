import { Link } from 'react-router-dom';
import { Briefcase, CheckCircle, BarChart, Users, ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-accent/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <Briefcase size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">FlowSync</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-secondary font-medium">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-secondary hover:text-white transition-colors font-medium">Login</Link>
            <Link to="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-accent/20 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold tracking-wide uppercase">
              Now in Public Beta
            </span>
            <h1 className="mt-8 text-6xl md:text-8xl font-extrabold tracking-tight leading-[1.1]">
              The CRM built for <br />
              <span className="text-accent italic">high-velocity</span> teams
            </h1>
            <p className="mt-8 max-w-2xl mx-auto text-xl text-secondary leading-relaxed">
              FlowSync helps you manage complex projects, track customer progress, and deliver results faster with a beautiful, intuitive interface.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <Button className="h-14 px-8 text-lg flex items-center gap-2">
                  Start Managing Projects <ArrowRight size={20} />
                </Button>
              </Link>
              <Button variant="outline" className="h-14 px-8 text-lg">
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Preview Image */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 h-full"></div>
            <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50 bg-card p-2">
               <div className="rounded-xl border border-white/5 bg-background overflow-hidden h-[400px] flex items-center justify-center text-secondary">
                  <div className="flex flex-col items-center gap-4">
                    <BarChart size={64} className="text-accent animate-pulse" />
                    <p className="text-xl font-bold">Interactive Dashboard Preview</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Everything you need to scale</h2>
            <p className="mt-4 text-secondary text-lg">Powerful features to keep your business moving forward.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Real-time Tracking", desc: "Monitor project status and progress as it happens. Never miss a deadline." },
              { icon: Shield, title: "Secure by Design", desc: "Enterprise-grade security with JWT authentication and role-based access." },
              { icon: Globe, title: "Client Portal", desc: "Dedicated dashboard for your customers to track their own project journey." },
              { icon: BarChart, title: "Advanced Analytics", desc: "Gain insights with beautiful charts and performance metrics." },
              { icon: Users, title: "Team Collaboration", desc: "Assign developers, add notes, and keep everyone in the loop." },
              { icon: CheckCircle, title: "Task Automation", desc: "Automate repetitive workflows and focus on what matters most." },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-card border border-white/5 hover:border-accent/30 transition-all group">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Briefcase size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">FlowSync</span>
          </div>
          <p className="text-secondary text-sm">© 2026 FlowSync CRM. Built with precision for modern teams.</p>
          <div className="flex gap-6 text-secondary text-sm">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
