import { Menu, Search, Bell } from 'lucide-react';

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="h-16 border-b border-white/10 bg-background/50 backdrop-blur-md sticky top-0 z-30 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-white/5 rounded-lg"
        >
          <Menu size={24} />
        </button>

        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-white/5 rounded-lg relative text-secondary hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-background"></span>
        </button>
        <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
        <div className="hidden sm:block">
          <p className="text-xs text-secondary">System Status</p>
          <p className="text-xs font-semibold text-success flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
            Operational
          </p>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
