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
      toast.success('Project request submitted successfully!');
      navigate('/customer/dashboard');
    },
    onError: () => {
      toast.error('Failed to submit request. Please try again.');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.deadline) {
      return toast.error('Please fill in all required fields');
    }
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
      >
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div>
        <h1 className="text-3xl font-bold">Create New Project</h1>
        <p className="text-secondary mt-1">Fill out the details below to start your project request.</p>
      </div>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="col-span-full">
                <Input 
                  label="Project Title"
                  placeholder="e.g. E-commerce Mobile App"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="col-span-full">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-secondary ml-1">Description</label>
                  <textarea 
                    className="w-full bg-background border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-white/20 min-h-[120px]"
                    placeholder="Describe your project in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-secondary ml-1">Deadline</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                  <input 
                    type="date"
                    className="w-full bg-background border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-secondary ml-1">Priority Level</label>
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                  <select 
                    className="w-full bg-background border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-secondary ml-1">Technical Requirements (Optional)</label>
                  <textarea 
                    className="w-full bg-background border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-white/20 min-h-[100px]"
                    placeholder="e.g. React, Node.js, Stripe integration..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button 
                type="submit" 
                className="flex-1 flex items-center justify-center gap-2 h-12 text-lg"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    Submit Project Request <Send size={20} />
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="h-12 px-6"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex gap-4">
        <AlertCircle className="text-accent shrink-0" size={24} />
        <p className="text-sm text-accent/80 leading-relaxed">
          Once submitted, our team will review your requirements and assign a project manager. You'll receive a notification when the status changes to "In Progress".
        </p>
      </div>
    </div>
  );
};

export default CreateProject;
