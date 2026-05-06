import { useQuery } from '@tanstack/react-query';
import { 
  Plus, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  LayoutGrid,
  List
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectService } from '../../services/api';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects', user?.id],
    queryFn: projectService.getAll
  });

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'accent';
      case 'Review': return 'warning';
      case 'Pending': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-secondary">Here's what's happening with your projects.</p>
        </div>
        <Link to="/customer/create-project">
          <Button className="flex items-center gap-2">
            <Plus size={20} /> New Project Request
          </Button>
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-sm text-secondary font-medium">My Projects</p>
              <p className="text-2xl font-bold">{projects?.length || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center text-warning">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-secondary font-medium">In Progress</p>
              <p className="text-2xl font-bold">{projects?.filter(p => p.status === 'In Progress').length || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center text-success">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm text-secondary font-medium">Completed</p>
              <p className="text-2xl font-bold">{projects?.filter(p => p.status === 'Completed').length || 0}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Current Projects</h2>
          <div className="flex items-center gap-2">
            <button className="p-1.5 bg-white/5 rounded-md text-accent border border-accent/20"><LayoutGrid size={18} /></button>
            <button className="p-1.5 hover:bg-white/5 rounded-md text-secondary"><List size={18} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-card border border-white/10 rounded-xl animate-pulse"></div>
            ))
          ) : projects?.length === 0 ? (
            <div className="col-span-full py-12 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
              <p className="text-secondary">No projects yet. Start by creating your first project request!</p>
            </div>
          ) : projects?.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="hover:border-accent/50 transition-all cursor-pointer group h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={getStatusVariant(project.status)}>
                      {project.status}
                    </Badge>
                    <span className="text-xs text-secondary">{new Date(project.deadline).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-bold group-hover:text-accent transition-colors">{project.title}</h3>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-secondary line-clamp-2 mb-4">{project.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-secondary font-medium">Progress</span>
                      <span className="font-bold">{project.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent transition-all duration-500" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-white/5">
                  <span className="text-xs text-secondary font-medium">Priority: <span className="text-white">{project.priority}</span></span>
                  <ChevronRight size={18} className="text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
