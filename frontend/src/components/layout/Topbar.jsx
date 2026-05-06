import { Menu, Search, Bell } from 'lucide-react';

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="h-10 border-b border-border bg-sidebar flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-1 hover:bg-white/5 rounded text-secondary"
        >
          <Menu size={18} />
        </button>
        <div className="flex items-center gap-2 text-[11px] text-secondary font-medium">
          <span className="hover:text-white cursor-pointer transition-colors">File</span>
          <span className="hover:text-white cursor-pointer transition-colors">Edit</span>
          <span className="hover:text-white cursor-pointer transition-colors">Selection</span>
          <span className="hover:text-white cursor-pointer transition-colors">View</span>
          <span className="hover:text-white cursor-pointer transition-colors">Go</span>
          <span className="hover:text-white cursor-pointer transition-colors">Run</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terminal</span>
          <span className="hover:text-white cursor-pointer transition-colors">Help</span>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background border border-border rounded-md px-12 py-1 text-[11px] text-secondary min-w-[300px] justify-center hover:border-primary/50 cursor-text transition-all">
        <Search size={12} />
        <span>FlowSync CRM — workspace.json</span>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-1 hover:bg-white/5 rounded text-secondary hover:text-white transition-colors">
          <Bell size={16} />
        </button>
        <div className="h-4 w-[1px] bg-border mx-1"></div>
        <div className="text-[11px] font-mono text-primary flex items-center gap-1 bg-primary/5 px-2 py-0.5 rounded border border-primary/20">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
          main*
        </div>
      </div>
    </header>
  );
};

export default Topbar;
