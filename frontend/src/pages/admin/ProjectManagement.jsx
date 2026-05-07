import { useState } from 'react';
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
import { projectService, userService } from '../../services/api';
import { cn } from '../../utils/cn';
import Card, { CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { toast } from 'sonner';

const ProjectManagement = () => {
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll
  });

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => projectService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      toast.success('// Resource updated successfully');
      setIsEditModalOpen(false);
      setIsAssignModalOpen(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: projectService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      toast.success('// Resource deleted');
    }
  });

  const handleStatusChange = (id, newStatus) => {
    let newProgress = 0;
    switch(newStatus) {
      case 'Pending': newProgress = 5; break;
      case 'In Progress': newProgress = 20; break;
      case 'Review': newProgress = 90; break;
      case 'Completed': newProgress = 100; break;
    }
    updateMutation.mutate({ id, data: { status: newStatus, progress: newProgress } });
  };

  const filteredProjects = projects?.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.customer?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-mono">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">PROJECT_RESOURCES</h1>
          <p className="text-[11px] text-secondary mt-1">// Total instances: <span className="text-white">{projects?.length || 0}</span>. Filtering by: <span className="text-primary">{statusFilter}</span></p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={14} />
            <input 
              type="text" 
              placeholder="SEARCH_BY_NAME..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-sidebar border border-border rounded h-9 pl-9 pr-4 text-[11px] text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all w-64"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-sidebar border border-border rounded h-9 px-3 text-[11px] text-white focus:outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer"
          >
            <option value="ALL">ALL_STATUS</option>
            <option value="Pending">PENDING</option>
            <option value="In Progress">IN_PROGRESS</option>
            <option value="Review">REVIEW</option>
            <option value="Completed">COMPLETED</option>
          </select>
          <Button className="h-9 px-4 text-[10px] font-bold tracking-widest">
            <Plus size={14} className="mr-2" /> NEW_RESOURCE
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-2 border-b border-border flex items-center justify-between bg-sidebar/20">
            <div className="relative flex-1 max-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={12} />
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
                      <select 
                        value={project.status}
                        onChange={(e) => handleStatusChange(project.id, e.target.value)}
                        className={cn(
                          "bg-transparent border-none text-[10px] font-mono focus:ring-0 cursor-pointer rounded px-2 py-0.5",
                          project.status === 'Completed' ? "text-success bg-success/10" :
                          project.status === 'In Progress' ? "text-primary bg-primary/10" :
                          project.status === 'Review' ? "text-review bg-review/10" :
                          "text-warning bg-warning/10"
                        )}
                      >
                        <option value="Pending">PENDING</option>
                        <option value="In Progress">IN_PROGRESS</option>
                        <option value="Review">REVIEW</option>
                        <option value="Completed">COMPLETED</option>
                      </select>
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
                        <button 
                          onClick={() => {
                            setSelectedProject(project);
                            setIsAssignModalOpen(true);
                          }}
                          className="p-1 hover:bg-white/5 rounded text-secondary hover:text-primary transition-colors" 
                          title="Assign Team"
                        >
                          <UserPlus size={14} />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedProject(project);
                            setIsEditModalOpen(true);
                          }}
                          className="p-1 hover:bg-white/5 rounded text-secondary hover:text-primary transition-colors" 
                          title="Edit Project"
                        >
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

      {/* Edit Modal */}
      {isEditModalOpen && selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-md shadow-2xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold font-mono mb-4 text-white">EDIT_PROJECT: {selectedProject.id.substring(0, 8)}</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                updateMutation.mutate({ 
                  id: selectedProject.id, 
                  data: {
                    title: formData.get('title'),
                    description: formData.get('description'),
                    progress: parseInt(formData.get('progress'))
                  } 
                });
              }} className="space-y-4">
                <Input label="PROJECT_TITLE" name="title" defaultValue={selectedProject.title} required className="font-mono text-sm" />
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-secondary uppercase tracking-widest font-mono">DESCRIPTION</label>
                  <textarea 
                    name="description" 
                    defaultValue={selectedProject.description}
                    className="w-full bg-background border border-border rounded p-2 text-sm font-mono min-h-[100px] focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <Input label="PROGRESS (%)" name="progress" type="number" min="0" max="100" defaultValue={selectedProject.progress} required className="font-mono text-sm" />
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1 h-9 text-xs" onClick={() => setIsEditModalOpen(false)}>CANCEL</Button>
                  <Button type="submit" className="flex-1 h-9 text-xs" disabled={updateMutation.isLoading}>UPDATE_RESOURCE</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Assign Modal */}
      {isAssignModalOpen && selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-md shadow-2xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold font-mono mb-4 text-white">ASSIGN_DEVELOPER</h2>
              <p className="text-xs text-secondary font-mono mb-6">// Select a team member to assign to <span className="text-primary">{selectedProject.title}</span></p>
              
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {users?.filter(u => u.role === 'admin' || u.role === 'developer').map(u => (
                  <button 
                    key={u.id}
                    onClick={() => updateMutation.mutate({ id: selectedProject.id, data: { developerId: u.id, developerName: u.name } })}
                    className="w-full flex items-center justify-between p-3 rounded border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
                        {u.name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <p className="text-[13px] font-bold text-white group-hover:text-primary transition-colors">{u.name}</p>
                        <p className="text-[10px] text-secondary font-mono">{u.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-secondary uppercase bg-white/5 px-2 py-0.5 rounded">
                      {u.role}
                    </span>
                  </button>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-6 h-9 text-xs" onClick={() => setIsAssignModalOpen(false)}>CLOSE_WINDOW</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
