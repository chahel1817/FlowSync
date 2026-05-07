import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ArrowLeft, 
  Send, 
  FileText, 
  Calendar, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { projectService } from '../../services/api';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { toast } from 'sonner';

const CreateProject = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'Medium',
    requirements: ''
  });

  const mutation = useMutation({
    mutationFn: projectService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      toast.success('// Project initialized successfully');
      navigate('/customer/dashboard');
    },
    onError: () => {
      toast.error('// Deployment failed. Please check your network.');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.deadline) {
      return toast.error('// ERROR: Missing required fields');
    }
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 font-mono">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-secondary hover:text-white transition-colors text-sm"
      >
        <ArrowLeft size={16} /> ../back_to_workspace
      </button>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">INITIALIZE_NEW_PROJECT</h1>
        <p className="text-[11px] text-secondary mt-1">// Fill out the configuration below to deploy your request.</p>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="col-span-full">
                <Input 
                  label="PROJECT_TITLE"
                  placeholder="e.g. mobile_banking_app"
                  className="bg-background font-mono text-sm h-11"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="col-span-full">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">DESCRIPTION</label>
                  <textarea 
                    className="w-full bg-background border border-border rounded p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-white/10 min-h-[120px]"
                    placeholder="Describe your project requirements here..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">DEADLINE_DATE</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
                  <input 
                    type="date"
                    className="w-full bg-background border border-border rounded h-11 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all [color-scheme:dark]"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">PRIORITY_LEVEL</label>
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
                  <select 
                    className="w-full bg-background border border-border rounded h-11 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="Low">LOW_PRIORITY</option>
                    <option value="Medium">MEDIUM_PRIORITY</option>
                    <option value="High">HIGH_PRIORITY</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">REQUIREMENTS_SCHEMA</label>
                  <textarea 
                    className="w-full bg-background border border-border rounded p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-white/10 min-h-[100px]"
                    placeholder="e.g. { 'stack': ['react', 'node'], 'auth': 'jwt' }"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center gap-4">
              <Button 
                type="submit" 
                className="flex-1 flex items-center justify-center gap-2 h-11 text-sm font-bold"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    PUSH_TO_MAIN <Send size={18} />
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="h-11 px-8 text-xs"
                onClick={() => navigate(-1)}
              >
                CANCEL_INIT
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="bg-primary/5 border border-primary/20 rounded p-4 flex gap-4">
        <AlertCircle className="text-primary shrink-0" size={20} />
        <p className="text-[11px] text-secondary leading-relaxed">
          <span className="text-primary font-bold">INFO:</span> Once pushed to main, our team will review the requirements and assign a specialized development unit. Deployment logs will be visible in your activity stream.
        </p>
      </div>
    </div>
  );
};

export default CreateProject;
