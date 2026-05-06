import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  ChevronRight,
  Plus
} from 'lucide-react';
import { projectService } from '../../services/api';
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
          <h1 className="text-2xl font-bold">Project Management</h1>
          <p className="text-secondary">View and manage all customer projects.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} /> Create New Project
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Filters & Search */}
          <div className="p-4 border-b border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter size={16} /> Filter
              </Button>
              <select className="bg-white/5 border border-white/10 rounded-lg text-sm py-2 px-3 focus:outline-none w-full md:w-auto">
                <option>All Status</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Project</th>
                  <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Deadline</th>
                  <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-secondary">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                        Loading projects...
                      </div>
                    </td>
                  </tr>
                ) : projects?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-secondary">
                      No projects found.
                    </td>
                  </tr>
                ) : projects?.map((project) => (
                  <tr key={project.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-white group-hover:text-accent transition-colors">{project.title}</p>
                        <p className="text-xs text-secondary mt-1 line-clamp-1">{project.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xs">
                          {project.customer?.charAt(0)}
                        </div>
                        <span className="text-sm">{project.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusVariant(project.status)}>
                        {project.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-secondary">{new Date(project.deadline).toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-4 w-40">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent transition-all duration-500" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 hover:bg-white/10 rounded-md text-secondary hover:text-white transition-colors">
                          <Eye size={18} />
                        </button>
                        <button className="p-1.5 hover:bg-white/10 rounded-md text-secondary hover:text-white transition-colors">
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => {
                            if(confirm('Are you sure?')) deleteMutation.mutate(project.id);
                          }}
                          className="p-1.5 hover:bg-danger/10 rounded-md text-secondary hover:text-danger transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-white/10 flex items-center justify-between">
            <p className="text-xs text-secondary">Showing 1 to {projects?.length} of {projects?.length} projects</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectManagement;
