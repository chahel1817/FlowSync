import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../../services/api';
import Card, { CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { MoreHorizontal, Calendar, MessageSquare, Paperclip, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { toast } from 'sonner';

const COLUMNS = [
  { id: 'Pending', title: 'Pending', color: 'bg-warning' },
  { id: 'In Progress', title: 'In_Progress', color: 'bg-primary' },
  { id: 'Review', title: 'Review', color: 'bg-review' },
  { id: 'Completed', title: 'Completed', color: 'bg-success' },
];

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const KanbanCard = ({ project, onStatusChange }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getNextStatus = () => {
    const currentIndex = COLUMNS.findIndex(col => col.id === project.status);
    if (currentIndex < COLUMNS.length - 1) return COLUMNS[currentIndex + 1];
    return null;
  };

  const getPrevStatus = () => {
    const currentIndex = COLUMNS.findIndex(col => col.id === project.status);
    if (currentIndex > 0) return COLUMNS[currentIndex - 1];
    return null;
  };

  const nextStatus = getNextStatus();
  const prevStatus = getPrevStatus();

  return (
    <motion.div
      layoutId={project.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-card border border-border p-3 rounded shadow-sm hover:border-primary/50 transition-all group overflow-hidden"
    >
      {/* Hover Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        className="absolute inset-0 bg-background/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4 gap-2"
        style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
      >
        <p className="text-[10px] font-bold font-mono text-secondary mb-2 tracking-widest uppercase">MOVE_STATE</p>
        <div className="flex gap-2 w-full">
          {prevStatus && (
            <button 
              onClick={() => onStatusChange(project.id, prevStatus.id)}
              className="flex-1 py-1.5 bg-sidebar border border-border rounded text-[9px] font-mono font-bold hover:bg-white/5 transition-all text-secondary"
            >
              ← {prevStatus.title.toUpperCase()}
            </button>
          )}
          {nextStatus && (
            <button 
              onClick={() => onStatusChange(project.id, nextStatus.id)}
              className="flex-1 py-1.5 bg-primary text-white rounded text-[9px] font-mono font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-1"
            >
              {nextStatus.title.toUpperCase()} →
            </button>
          )}
        </div>
        {project.status === 'Completed' && (
          <div className="flex items-center gap-1 text-success text-[10px] font-mono font-bold">
            <CheckCircle2 size={12} /> PROJECT_RELEASED
          </div>
        )}
      </motion.div>

      <div className="flex items-center justify-between mb-2">
        <span className={cn(
          "px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border",
          project.priority === 'High' ? "text-danger border-danger/30 bg-danger/5" : 
          project.priority === 'Medium' ? "text-warning border-warning/30 bg-warning/5" : "text-secondary border-border bg-white/5"
        )}>
          {project.priority.toUpperCase()}
        </span>
        <div className="text-secondary opacity-40 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={14} />
        </div>
      </div>
      
      <h4 className="text-[13px] font-bold mb-1 group-hover:text-primary transition-colors truncate">{project.title}</h4>
      <p className="text-[11px] text-secondary mb-3 line-clamp-1 font-mono">// {project.description}</p>
      
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center text-primary text-[9px] font-bold border border-primary/20">
            {project.customer?.charAt(0)}
          </div>
          <span className="text-[10px] text-secondary font-mono">{project.customer?.split(' ')[0]}</span>
        </div>
        
        <div className="flex items-center justify-between gap-2 text-secondary text-[9px] font-mono flex-1 ml-4">
          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${project.progress}%` }}></div>
          </div>
          <span className="font-bold">{project.progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};

const KanbanBoard = () => {
  const queryClient = useQueryClient();
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => projectService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      toast.success('Resource status updated');
    }
  });

  const handleStatusChange = (id, newStatus) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    let newProgress = project.progress;
    switch(newStatus) {
      case 'Pending': newProgress = 5; break;
      case 'In Progress': newProgress = 20; break;
      case 'Review': newProgress = 90; break;
      case 'Completed': newProgress = 100; break;
    }
    
    updateMutation.mutate({ 
      id, 
      data: { status: newStatus, progress: newProgress } 
    });
  };

  const getProjectsByStatus = (status) => {
    return projects?.filter(p => p.status === status) || [];
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight">/projects/kanban_board</h1>
          <p className="text-[11px] text-secondary font-mono">DEBUG: Hover over cards to re-assign status variables.</p>
        </div>
        <div className="flex items-center gap-2 bg-sidebar border border-border p-1 rounded-md">
          <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-mono font-bold rounded">HOVER_ACTIONS</div>
          <div className="px-3 py-1 text-secondary text-[10px] font-mono hover:text-white transition-colors cursor-pointer">STABLE_BUILD</div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-2">
        <div className="flex gap-4 h-full min-w-[900px]">
          {COLUMNS.map((column) => (
            <div key={column.id} className="flex-1 flex flex-col min-w-[220px]">
              <div className="flex items-center justify-between mb-2 px-1 border-b border-border pb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${column.color}`}></div>
                  <h3 className="font-mono font-bold text-[11px] uppercase tracking-wider text-[#c9d1d9]">{column.title}</h3>
                  <span className="text-[9px] font-mono text-secondary">
                    ({getProjectsByStatus(column.id).length})
                  </span>
                </div>
              </div>

              <div 
                className="flex-1 bg-white/[0.01] border border-dashed border-border rounded-lg p-2 space-y-3 overflow-y-auto"
              >
                {isLoading ? (
                  <div className="h-10 flex items-center justify-center">
                    <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : getProjectsByStatus(column.id).map((project) => (
                  <KanbanCard 
                    key={project.id} 
                    project={project} 
                    onStatusChange={handleStatusChange}
                  />
                ))}
                <button className="w-full py-1.5 border border-dashed border-border rounded hover:bg-white/5 text-[10px] font-mono text-secondary hover:text-white transition-all">
                  + PUSH_RESOURCE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
