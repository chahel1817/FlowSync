import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Kanban, 
  Users, 
  BarChart3, 
  Settings, 
  PlusCircle,
  LogOut,
  X,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const adminLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Projects', icon: Briefcase, path: '/admin/projects' },
    { name: 'Kanban', icon: Kanban, path: '/admin/kanban' },
    { name: 'Customers', icon: Users, path: '/admin/customers' },
    { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const customerLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/customer/dashboard' },
    { name: 'My Projects', icon: Briefcase, path: '/customer/projects' },
    { name: 'Create Project', icon: PlusCircle, path: '/customer/create-project' },
    { name: 'Settings', icon: Settings, path: '/customer/settings' },
  ];

  const links = user?.role === 'admin' ? adminLinks : customerLinks;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-full transition-transform duration-300 lg:static lg:translate-x-0",
        !isOpen && "-translate-x-full"
      )}>
        {/* Activity Bar (VS Code style) */}
        <div className="w-16 bg-sidebar border-r border-border flex flex-col items-center py-4 gap-4">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary mb-4">
            <Briefcase size={24} />
          </div>
          {links.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "p-3 rounded-lg transition-colors",
                location.pathname === link.path ? "text-primary bg-white/5" : "text-secondary hover:text-white"
              )}
            >
              <link.icon size={24} />
            </Link>
          ))}
          <div className="mt-auto flex flex-col items-center gap-4">
            <button className="text-secondary hover:text-white"><Settings size={24} /></button>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold border border-primary/30">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </div>

        {/* Side Bar Navigation */}
        <div className="w-56 bg-card border-r border-border flex flex-col h-full">
          <div className="p-4 flex items-center justify-between border-b border-border">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">Explorer</span>
            <button onClick={toggleSidebar} className="lg:hidden text-secondary"><X size={18} /></button>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            <div className="px-4 py-2 flex items-center gap-2 text-secondary">
              <ChevronRight size={14} className="rotate-90" />
              <span className="text-[11px] font-bold uppercase tracking-tight">FlowSync Workspace</span>
            </div>
            <nav className="space-y-[2px]">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-2 px-6 py-1 text-sm transition-colors",
                    location.pathname === link.path 
                      ? "bg-primary/10 text-primary border-l-2 border-primary" 
                      : "text-secondary hover:bg-white/5 hover:text-[#c9d1d9] border-l-2 border-transparent"
                  )}
                >
                  <link.icon size={16} />
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-border bg-sidebar/50">
            <button 
              onClick={logout}
              className="flex items-center gap-2 w-full px-2 py-1 text-sm text-danger hover:bg-danger/10 rounded transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
