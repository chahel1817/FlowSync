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

const COLUMNS = [
  { id: 'Pending', title: 'Pending', color: 'bg-slate-500' },
  { id: 'In Progress', title: 'In Progress', color: 'bg-accent' },
  { id: 'Review', title: 'Review', color: 'bg-warning' },
  { id: 'Completed', title: 'Completed', color: 'bg-success' },
];

const KanbanCard = ({ project }) => {
  return (
    <motion.div
      layoutId={project.id}
      className="bg-card border border-white/10 p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
    >
      <div className="flex items-center justify-between mb-3">
        <Badge variant={
          project.priority === 'High' ? 'danger' : 
          project.priority === 'Medium' ? 'warning' : 'default'
        }>
          {project.priority}
        </Badge>
        <button className="text-secondary hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={18} />
        </button>
      </div>
      
      <h4 className="font-semibold mb-1 group-hover:text-accent transition-colors">{project.title}</h4>
      <p className="text-xs text-secondary mb-4 line-clamp-2">{project.description}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-accent border-2 border-card flex items-center justify-center text-[10px] font-bold">
            {project.customer?.charAt(0)}
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-secondary text-[10px]">
          <span className="flex items-center gap-1"><MessageSquare size={12} /> 2</span>
          <span className="flex items-center gap-1"><Paperclip size={12} /> 1</span>
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
    <div className="h-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <p className="text-secondary">Drag and drop projects to update their status.</p>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-[1000px]">
          {COLUMNS.map((column) => (
            <div key={column.id} className="flex-1 flex flex-col min-w-[280px]">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${column.color}`}></div>
                  <h3 className="font-bold text-sm uppercase tracking-wider">{column.title}</h3>
                  <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] font-bold text-secondary">
                    {getProjectsByStatus(column.id).length}
                  </span>
                </div>
              </div>

              <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-3 space-y-4 overflow-y-auto">
                {isLoading ? (
                  <div className="h-20 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : getProjectsByStatus(column.id).map((project) => (
                  <KanbanCard key={project.id} project={project} />
                ))}
                <button className="w-full py-2 border border-dashed border-white/10 rounded-xl text-xs text-secondary hover:text-white hover:border-white/20 transition-all">
                  + Add Project
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
