import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Briefcase, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';
import { toast } from 'sonner';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await authService.login({ email, password });
      login(data.user, data.token);
      toast.success('Welcome back, ' + data.user.name);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8 p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
              <Briefcase size={28} className="text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight">FlowSync</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl font-extrabold leading-tight">
              Manage your projects <span className="text-accent">seamlessly</span> with ease.
            </h1>
            <p className="mt-6 text-secondary text-lg leading-relaxed">
              The ultimate CRM for modern businesses. Track progress, manage customers, and stay on top of deadlines all in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="p-4 rounded-2xl bg-card border border-white/5">
              <p className="text-3xl font-bold text-accent">99.9%</p>
              <p className="text-sm text-secondary">Uptime Guaranteed</p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-white/5">
              <p className="text-3xl font-bold text-accent">10k+</p>
              <p className="text-sm text-secondary">Active Users</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl shadow-black/50"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Sign In</h2>
            <p className="text-secondary mt-2">Enter your credentials to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-[38px] text-secondary" size={18} />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@company.com"
                  className="pl-10 h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-[38px] text-secondary" size={18} />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-accent focus:ring-accent transition-all" />
                <span className="text-sm text-secondary group-hover:text-white transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm text-accent hover:underline">Forgot password?</a>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In <ArrowRight size={20} />
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-secondary">
            Don't have an account? <Link to="/signup" className="text-accent hover:underline font-semibold">Sign up for free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
