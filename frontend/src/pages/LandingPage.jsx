import { Link } from 'react-router-dom';
import { Briefcase, CheckCircle, BarChart, Users, ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-accent/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/50 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Briefcase size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight font-mono">FlowSync</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[13px] text-secondary font-medium font-mono">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-[13px] text-secondary hover:text-white transition-colors font-medium font-mono">Login</Link>
            <Link to="/login">
              <Button size="sm" className="font-mono text-[12px]">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="px-3 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase font-mono">
              V4.2 RELEASED
            </span>
            <h1 className="mt-8 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] font-mono">
              Manage Projects <span className="text-primary italic underline decoration-wavy underline-offset-8">Smarter</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-secondary leading-relaxed font-mono">
              Track progress, collaborate with clients, and monitor workflows seamlessly with FlowSync's developer-first CRM.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <Button className="h-12 px-8 text-sm flex items-center gap-2 font-bold font-mono">
                  Get Started <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="h-12 px-8 text-sm font-bold font-mono">
                  Explore Dashboard
                </Button>
              </Link>
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
