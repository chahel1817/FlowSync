import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  MessageSquare,
  History,
  FileText,
  AlertCircle
} from 'lucide-react';
import { projectService } from '../../services/api';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { cn } from '../../utils/cn';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => projectService.getById(id),
  });

  if (isLoading) return (
    <div className="h-96 flex items-center justify-center font-mono">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-3 text-secondary tracking-widest uppercase text-xs">Fetching_Resource...</span>
    </div>
  );

  if (!project) return (
    <div className="p-8 text-center font-mono">
      <p className="text-danger">// ERROR: RESOURCE_NOT_FOUND</p>
      <button onClick={() => navigate(-1)} className="mt-4 text-primary hover:underline underline-offset-4">../back_to_workspace</button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-mono pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-secondary hover:text-white transition-colors text-sm"
      >
        <ArrowLeft size={16} /> ../back_to_dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge variant={project.status === 'Completed' ? 'success' : project.status === 'Review' ? 'review' : 'primary'} className="text-[10px] uppercase font-bold px-2 py-1">
              {project.status}
            </Badge>
            <span className="text-secondary text-xs">// {project.id}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">{project.title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] text-secondary font-bold tracking-widest uppercase">DEPLOYMENT_PROGRESS</p>
            <p className="text-2xl font-bold text-primary">{project.progress}%</p>
          </div>
          <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${project.progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-border bg-card">
            <CardHeader className="border-b border-border p-6">
              <h2 className="text-sm font-bold tracking-widest uppercase text-secondary flex items-center gap-2">
                <FileText size={16} /> PROJECT_SPECIFICATIONS
              </h2>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-[#c9d1d9] whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>

              {project.requirements && (
                <div className="p-4 bg-sidebar/50 border border-border rounded-lg space-y-2">
                  <p className="text-[10px] font-bold text-primary tracking-widest uppercase">TECHNICAL_REQUIREMENTS</p>
                  <code className="text-xs text-secondary block leading-relaxed">
                    {project.requirements}
                  </code>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-secondary">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] text-secondary font-bold uppercase tracking-widest">DEADLINE_DATE</p>
                    <p className="text-sm font-bold">{new Date(project.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-secondary">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] text-secondary font-bold uppercase tracking-widest">PRIORITY_LEVEL</p>
                    <p className="text-sm font-bold text-warning">{project.priority.toUpperCase()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold tracking-widest uppercase text-secondary flex items-center gap-2">
              <History size={16} /> DEPLOYMENT_HISTORY
            </h2>
            <Card className="border-border bg-sidebar/50">
              <CardContent className="p-6 space-y-8">
                {[
                  { event: 'Project Initialized', time: 'Oct 24, 2023 10:20 AM', status: 'completed' },
                  { event: 'Design Phase Started', time: 'Oct 25, 2023 02:45 PM', status: 'completed' },
                  { event: 'API Integration Commenced', time: 'Oct 27, 2023 09:12 AM', status: 'current' },
                  { event: 'Quality Assurance Review', time: 'Pending Stage', status: 'pending' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 relative">
                    {i !== 3 && <div className="absolute left-[11px] top-6 bottom-[-20px] w-0.5 bg-border"></div>}
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center z-10 shrink-0 border-2",
                      item.status === 'completed' ? "bg-success/20 border-success text-success" :
                      item.status === 'current' ? "bg-primary/20 border-primary text-primary animate-pulse" :
                      "bg-sidebar border-border text-secondary"
                    )}>
                      {item.status === 'completed' && <CheckCircle2 size={12} />}
                      {item.status === 'current' && <Clock size={12} />}
                      {item.status === 'pending' && <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>}
                    </div>
                    <div className="space-y-1">
                      <p className={cn("text-sm font-bold", item.status === 'pending' ? "text-secondary" : "text-white")}>
                        {item.event}
                      </p>
                      <p className="text-[10px] text-secondary uppercase font-bold tracking-widest">{item.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Team & Comments */}
        <div className="space-y-8">
          <Card className="border-border bg-card">
            <CardHeader className="border-b border-border p-6">
              <h2 className="text-sm font-bold tracking-widest uppercase text-secondary flex items-center gap-2">
                <User size={16} /> ASSIGNED_UNIT
              </h2>
            </CardHeader>
            <CardContent className="p-6">
              {project.developerName ? (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                    {project.developerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{project.developerName}</p>
                    <p className="text-[10px] text-secondary uppercase font-bold tracking-widest">Lead_Developer</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-secondary italic text-xs">
                  <AlertCircle size={14} /> // PENDING_ASSIGNMENT
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-sm font-bold tracking-widest uppercase text-secondary flex items-center gap-2">
              <MessageSquare size={16} /> COMMUNICATION_LOGS
            </h2>
            <Card className="border-border bg-sidebar/50">
              <CardContent className="p-4 space-y-6">
                {[
                  { user: 'Admin', msg: 'UI design for Project A completed', time: '2h ago' },
                  { user: 'Admin', msg: 'Backend integration started', time: '5h ago' },
                ].map((comment, i) => (
                  <div key={i} className="space-y-2 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-primary tracking-widest uppercase">@{comment.user}</span>
                      <span className="text-[9px] text-secondary uppercase">{comment.time}</span>
                    </div>
                    <p className="text-[11px] text-[#c9d1d9] leading-relaxed italic">"{comment.msg}"</p>
                  </div>
                ))}
                
                <div className="pt-4">
                  <textarea 
                    className="w-full bg-background border border-border rounded p-2 text-[10px] font-mono text-white focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-white/10 min-h-[60px]"
                    placeholder="Input message to unit..."
                  />
                  <Button className="w-full mt-2 h-8 text-[9px] font-bold tracking-widest uppercase">SEND_MESSAGE</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
