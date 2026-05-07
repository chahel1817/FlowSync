import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, Shield, Users, Eye, EyeOff } from 'lucide-react';
import Logo from '../../components/ui/Logo';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';
import { cn } from '../../utils/cn';
import { toast } from 'sonner';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin123!');
  const [role, setRole] = useState('admin'); // Default role
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await authService.login({ email, password });
      
      // Verification: Check if the returned user role matches the selected role
      if (data.user.role !== role) {
        toast.error(`Invalid role for this account. Please select ${data.user.role.toUpperCase()}.`);
        setIsLoading(false);
        return;
      }

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
          >
            <Logo size="lg" />
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
            <h2 className="text-3xl font-bold font-mono tracking-tight text-white">SIGN_IN</h2>
            <p className="text-secondary mt-2 font-mono text-sm">// Access your development workspace</p>
          </div>

          {/* Role Selector */}
          <div className="mb-8 p-1 bg-sidebar border border-border rounded-lg flex gap-1">
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={cn(
                "flex-1 py-2 px-4 text-xs font-bold font-mono rounded-md transition-all flex items-center justify-center gap-2",
                role === 'admin' ? "bg-primary text-white shadow-lg" : "text-secondary hover:text-white"
              )}
            >
              <Shield size={14} /> ADMIN
            </button>
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={cn(
                "flex-1 py-2 px-4 text-xs font-bold font-mono rounded-md transition-all flex items-center justify-center gap-2",
                role === 'customer' ? "bg-primary text-white shadow-lg" : "text-secondary hover:text-white"
              )}
            >
              <Users size={14} /> CUSTOMER
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-[38px] text-secondary" size={16} />
                <Input
                  label="EMAIL_ADDRESS"
                  type="email"
                  placeholder="user@domain.com"
                  className="pl-10 h-11 font-mono text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-[38px] text-secondary group-focus-within:text-accent transition-colors" size={16} />
                <Input
                  label="PASSWORD"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-11 font-mono text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-secondary hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[11px]">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-border bg-sidebar checked:bg-primary focus:ring-primary transition-all" />
                <span className="text-secondary group-hover:text-white transition-colors">persist_session</span>
              </label>
              <a href="#" className="text-primary hover:underline">forgot_password?</a>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 text-sm flex items-center justify-center gap-2 font-bold font-mono"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  EXECUTE_LOGIN <ArrowRight size={18} />
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
