import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { projectService } from '../../services/api';
import Card, { CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { MoreHorizontal, Calendar, MessageSquare, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const COLUMNS = [
  { id: 'Pending', title: 'Pending', color: 'bg-[#8b949e]' },
  { id: 'In Progress', title: 'In_Progress', color: 'bg-primary' },
  { id: 'Review', title: 'Review', color: 'bg-warning' },
  { id: 'Completed', title: 'Completed', color: 'bg-success' },
];

const KanbanCard = ({ project }) => {
  return (
    <motion.div
      layoutId={project.id}
      className="bg-card border border-border p-3 rounded shadow-sm hover:border-primary/50 transition-all cursor-grab active:cursor-grabbing group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className={cn(
          "px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border",
          project.priority === 'High' ? "text-danger border-danger/30 bg-danger/5" : 
          project.priority === 'Medium' ? "text-warning border-warning/30 bg-warning/5" : "text-secondary border-border bg-white/5"
        )}>
          {project.priority.toUpperCase()}
        </span>
        <button className="text-secondary hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={14} />
        </button>
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
        
        <div className="flex items-center gap-2 text-secondary text-[9px] font-mono">
          <span className="flex items-center gap-1"><MessageSquare size={10} /> 2</span>
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
    }
  });

  const getProjectsByStatus = (status) => {
    return projects?.filter(p => p.status === status) || [];
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold font-mono tracking-tight">/projects/kanban_board</h1>
        <p className="text-[11px] text-secondary font-mono">DEBUG: Drag and drop cards to re-assign status variables.</p>
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

              <div className="flex-1 bg-white/[0.01] border border-dashed border-border rounded-lg p-2 space-y-3 overflow-y-auto">
                {isLoading ? (
                  <div className="h-10 flex items-center justify-center">
                    <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : getProjectsByStatus(column.id).map((project) => (
                  <KanbanCard key={project.id} project={project} />
                ))}
                <button className="w-full py-1.5 border border-dashed border-border rounded hover:bg-white/5 text-[10px] font-mono text-secondary hover:text-white transition-all">
                  + PUSH_PROJECT
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
