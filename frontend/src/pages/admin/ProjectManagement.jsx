import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  ChevronRight,
  Plus,
  FileText,
  UserPlus
} from 'lucide-react';
import { projectService } from '../../services/api';
import { cn } from '../../utils/cn';
import Card, { CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { toast } from 'sonner';

const ProjectManagement = () => {
  const queryClient = useQueryClient();
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll
  });

  const deleteMutation = useMutation({
    mutationFn: projectService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      toast.success('Project deleted successfully');
    }
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight">/projects/all</h1>
          <p className="text-[11px] text-secondary font-mono">Manage and assign customer workspaces.</p>
        </div>
        <Button className="flex items-center gap-2 h-8 text-[11px] font-bold" size="sm">
          <Plus size={14} /> NEW_PROJECT
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Filters & Search - Editor Tab bar style */}
          <div className="bg-sidebar/50 p-2 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={14} />
              <input 
                type="text" 
                placeholder="Find in files..." 
                className="w-full bg-background border border-border rounded py-1 pl-9 pr-4 text-[11px] font-mono focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-background border border-border rounded p-[1px]">
                <button className="px-3 py-1 text-[11px] font-mono bg-white/5 text-white rounded-[2px]">table.md</button>
                <button className="px-3 py-1 text-[11px] font-mono text-secondary hover:text-white transition-colors">grid.json</button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-sidebar/30">
                  <th className="px-6 py-2 text-[10px] font-bold text-secondary uppercase tracking-widest font-mono">Project Name</th>
                  <th className="px-6 py-2 text-[10px] font-bold text-secondary uppercase tracking-widest font-mono">Client</th>
                  <th className="px-6 py-2 text-[10px] font-bold text-secondary uppercase tracking-widest font-mono">Status</th>
                  <th className="px-6 py-2 text-[10px] font-bold text-secondary uppercase tracking-widest font-mono">Deadline</th>
                  <th className="px-6 py-2 text-[10px] font-bold text-secondary uppercase tracking-widest font-mono">Progress</th>
                  <th className="px-6 py-2 text-[10px] font-bold text-secondary uppercase tracking-widest font-mono text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-secondary font-mono text-[11px]">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        INDEXING_RESOURCES...
                      </div>
                    </td>
                  </tr>
                ) : projects?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-secondary font-mono text-[11px]">
                      // No projects found in this directory
                    </td>
                  </tr>
                ) : projects?.map((project) => (
                  <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-primary" />
                        <div>
                          <p className="text-[13px] font-bold text-[#c9d1d9] group-hover:text-primary transition-colors">{project.title}</p>
                          <p className="text-[11px] text-secondary font-mono mt-0.5">{project.id.substring(0, 8)}.js</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary font-mono text-[10px] border border-primary/20">
                          {project.customer?.charAt(0)}
                        </div>
                        <span className="text-[12px] font-medium">{project.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border",
                        project.status === 'Completed' ? "bg-success/10 text-success border-success/30" :
                        project.status === 'In Progress' ? "bg-primary/10 text-primary border-primary/30" :
                        "bg-secondary/10 text-secondary border-secondary/30"
                      )}>
                        {project.status.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-[11px] text-secondary font-mono">{new Date(project.deadline).toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-3 w-40">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-500" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-secondary">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1 hover:bg-white/5 rounded text-secondary hover:text-white transition-colors" title="View Details">
                          <Eye size={14} />
                        </button>
                        <button className="p-1 hover:bg-white/5 rounded text-secondary hover:text-primary transition-colors" title="Assign Team">
                          <UserPlus size={14} />
                        </button>
                        <button className="p-1 hover:bg-white/5 rounded text-secondary hover:text-primary transition-colors" title="Edit Project">
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => {
                            if(confirm('Are you sure?')) deleteMutation.mutate(project.id);
                          }}
                          className="p-1 hover:bg-danger/10 rounded text-secondary hover:text-danger transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination bar style */}
          <div className="px-4 py-2 bg-sidebar/50 border-t border-border flex items-center justify-between text-[10px] font-mono text-secondary">
            <div>
              <span className="text-primary">LINE: {projects?.length}</span>
              <span className="ml-4">CHAR: {projects?.length * 10}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-white cursor-pointer transition-colors">UTF-8</span>
              <span className="hover:text-white cursor-pointer transition-colors">Spaces: 2</span>
              <span className="hover:text-white cursor-pointer transition-colors">Javascript</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectManagement;
