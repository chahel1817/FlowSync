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
import { cn } from '../../utils/cn';

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
      case 'Review': return 'review';
      case 'Pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-8 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">WORKSPACE_OVERVIEW</h1>
          <p className="text-[11px] text-secondary mt-1">// Welcome back, <span className="text-primary">{user?.name}</span>. Diagnostic logs show 0 errors.</p>
        </div>
        <Link to="/customer/create-project">
          <Button className="flex items-center gap-2 h-10 text-xs font-bold px-6">
            <Plus size={16} /> INITIALIZE_PROJECT
          </Button>
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL_RESOURCES', value: projects?.length || 0, icon: Briefcase, color: 'text-primary' },
          { label: 'ACTIVE_BUILDS', value: projects?.filter(p => p.status === 'In Progress').length || 0, icon: Clock, color: 'text-warning' },
          { label: 'STABLE_RELEASES', value: projects?.filter(p => p.status === 'Completed').length || 0, icon: CheckCircle2, color: 'text-success' },
          { label: 'REVIEW_PENDING', value: projects?.filter(p => p.status === 'Review').length || 0, icon: List, color: 'text-review' },
        ].map((stat, i) => (
          <Card key={i} className="border-border bg-sidebar/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center bg-white/5", stat.color)}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] text-secondary font-bold tracking-wider uppercase">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Projects Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-widest uppercase text-secondary flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              ACTIVE_PROJECTS
            </h2>
            <div className="flex items-center gap-2">
              <button className="p-1.5 bg-primary/10 rounded text-primary border border-primary/20"><LayoutGrid size={14} /></button>
              <button className="p-1.5 hover:bg-white/5 rounded text-secondary transition-colors"><List size={14} /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="h-40 bg-card border border-border rounded animate-pulse"></div>
              ))
            ) : projects?.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-sidebar/30 border border-dashed border-border rounded-xl">
                <p className="text-secondary text-sm font-mono">// No active resources found. Push a new project to begin.</p>
              </div>
            ) : projects?.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link to={`/customer/projects/${project.id}`}>
                  <Card className="hover:border-primary/50 transition-all cursor-pointer group h-full flex flex-col bg-card border-border">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant={getStatusVariant(project.status)} className="text-[9px] px-1.5 rounded uppercase font-bold">
                          {project.status}
                        </Badge>
                        <span className="text-[10px] text-secondary">{new Date(project.deadline).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-sm font-bold group-hover:text-primary transition-colors truncate">{project.title}</h3>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex-1">
                      <p className="text-[11px] text-secondary line-clamp-1 mb-4 font-mono">// {project.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-secondary uppercase font-bold tracking-widest">DEPLOYMENT_PROGRESS</span>
                          <span className="font-bold text-primary">{project.progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-500" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                    <div className="px-4 py-3 border-t border-border flex items-center justify-between bg-sidebar/30">
                      <span className="text-[9px] text-secondary font-bold uppercase tracking-widest">priority: <span className="text-white">{project.priority}</span></span>
                      <ChevronRight size={14} className="text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar - Latest Updates */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold tracking-widest uppercase text-secondary">LATEST_LOGS</h2>
          <Card className="border-border bg-sidebar/50">
            <CardContent className="p-4 space-y-6">
              {[
                { type: 'build', msg: 'UI design for Project A completed', time: '2h ago', status: 'success' },
                { type: 'sys', msg: 'Backend integration started', time: '5h ago', status: 'primary' },
                { type: 'user', msg: 'New project request received', time: '1d ago', status: 'warning' },
                { type: 'build', msg: 'Deployment successful for mobile_v2', time: '2d ago', status: 'success' },
              ].map((update, i) => (
                <div key={i} className="flex gap-3 relative pb-6 last:pb-0">
                  {i !== 3 && <div className="absolute left-1.5 top-5 bottom-0 w-px bg-border"></div>}
                  <div className={cn(
                    "w-3 h-3 rounded-full mt-1.5 z-10 shrink-0",
                    update.status === 'success' ? 'bg-success' : update.status === 'primary' ? 'bg-primary' : 'bg-warning'
                  )}></div>
                  <div className="space-y-1">
                    <p className="text-[11px] text-[#c9d1d9] font-mono leading-relaxed">{update.msg}</p>
                    <p className="text-[9px] text-secondary uppercase font-bold tracking-widest">{update.time} • type: {update.type}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 text-[10px] text-secondary hover:text-white transition-colors border border-dashed border-border rounded mt-2">
                VIEW_ALL_LOGS
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
