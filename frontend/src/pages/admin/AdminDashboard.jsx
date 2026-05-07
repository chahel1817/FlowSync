import { useQuery } from '@tanstack/react-query';
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Users,
  List
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area 
} from 'recharts';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import { projectService } from '../../services/api';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const chartData = [
  { name: 'Jan', projects: 4 },
  { name: 'Feb', projects: 7 },
  { name: 'Mar', projects: 5 },
  { name: 'Apr', projects: 12 },
  { name: 'May', projects: 9 },
  { name: 'Jun', projects: 15 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <Card className="relative overflow-hidden group border-l-2 border-l-primary">
    <CardContent className="flex items-center justify-between py-4 px-5">
      <div>
        <p className="text-[#8b949e] text-[11px] font-bold uppercase tracking-wider font-mono">{title}</p>
        <h3 className="text-2xl font-bold mt-1 font-mono text-white tracking-tighter">{value}</h3>
        <div className="flex items-center gap-1 mt-2">
          {trend === 'up' ? (
            <ArrowUpRight size={14} className="text-success" />
          ) : (
            <ArrowDownRight size={14} className="text-danger" />
          )}
          <span className={`text-[10px] font-bold font-mono ${trend === 'up' ? 'text-success' : 'text-danger'}`}>
            {trendValue}
          </span>
        </div>
      </div>
      <div className={`text-${color} opacity-40 group-hover:opacity-100 transition-opacity`}>
        <Icon size={24} />
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll
  });

  // Dynamic Chart Data based on Status
  const statusDistribution = projects ? [
    { name: 'PENDING', value: projects.filter(p => p.status === 'Pending').length, color: '#f59e0b' },
    { name: 'IN_PROGRESS', value: projects.filter(p => p.status === 'In Progress').length, color: '#3b82f6' },
    { name: 'REVIEW', value: projects.filter(p => p.status === 'Review').length, color: '#a855f7' },
    { name: 'COMPLETED', value: projects.filter(p => p.status === 'Completed').length, color: '#10b981' },
  ] : [];

  const stats = [
    { title: 'TOTAL_RESOURCES', value: projects?.length || 0, icon: Briefcase, trend: 'up', trendValue: '+12%', color: 'text-primary' },
    { title: 'ACTIVE_BUILDS', value: projects?.filter(p => p.status === 'In Progress').length || 0, icon: Clock, trend: 'up', trendValue: '+5%', color: 'text-warning' },
    { title: 'STABLE_RELEASES', value: projects?.filter(p => p.status === 'Completed').length || 0, icon: CheckCircle2, trend: 'up', trendValue: '+8%', color: 'text-success' },
    { title: 'TOTAL_DEVELOPERS', value: 12, icon: Users, trend: 'up', trendValue: '+2', color: 'text-review' },
  ];

  return (
    <div className="space-y-8 font-mono">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase tracking-widest">SYSTEM_OVERVIEW</h1>
          <p className="text-[11px] text-secondary mt-1">// Status: <span className="text-success">HEALTHY</span>. Analyzing live resource metrics.</p>
        </div>
        <div className="flex items-center gap-2 bg-sidebar border border-border p-1 rounded-md">
          <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded">LIVE_METRICS</div>
          <div className="px-3 py-1 text-secondary text-[10px] hover:text-white transition-colors cursor-pointer">EXPORT_LOGS</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="relative overflow-hidden group border-border bg-card">
              <CardContent className="flex items-center justify-between py-5 px-5">
                <div className="space-y-1">
                  <p className="text-secondary text-[10px] font-bold tracking-widest uppercase">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-white tracking-tighter">{stat.value}</h3>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className={cn("text-[9px] font-bold px-1 rounded bg-white/5", stat.trend === 'up' ? 'text-success' : 'text-danger')}>
                      {stat.trend === 'up' ? '▲' : '▼'} {stat.trendValue}
                    </span>
                    <span className="text-[9px] text-secondary">vs_prev_cycle</span>
                  </div>
                </div>
                <div className={cn("opacity-40 group-hover:opacity-100 transition-opacity", stat.color)}>
                  <stat.icon size={28} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Resource Distribution Chart */}
        <Card className="lg:col-span-2 border-border bg-card">
          <CardHeader className="flex items-center justify-between border-b border-border p-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
              <TrendingUp size={14} className="text-primary" /> RESOURCE_DISTRIBUTION_ANALYSIS
            </h3>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <div className="w-2 h-2 rounded-full bg-warning"></div>
              <div className="w-2 h-2 rounded-full bg-danger"></div>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] p-6">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusDistribution}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#30363d" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#8b949e" 
                    fontSize={9} 
                    tickLine={false} 
                    axisLine={false} 
                    fontFamily="monospace"
                  />
                  <YAxis 
                    stroke="#8b949e" 
                    fontSize={9} 
                    tickLine={false} 
                    axisLine={false} 
                    fontFamily="monospace"
                  />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.02)'}}
                    contentStyle={{ backgroundColor: '#0d1117', border: '1px solid #30363d', borderRadius: '4px', fontFamily: 'monospace' }}
                    itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                    labelStyle={{ fontSize: '11px', color: '#8b949e', marginBottom: '4px' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {statusDistribution.map((entry, index) => (
                      <Bar key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
          <div className="px-6 py-3 border-t border-border bg-sidebar/30 flex justify-between items-center">
            <p className="text-[10px] text-secondary">// Auto-refreshed every 60s</p>
            <button className="text-[10px] text-primary hover:underline underline-offset-4">REBUILD_METRICS</button>
          </div>
        </Card>

        {/* Diagnostic Activity */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border p-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-2 font-mono">
              <List size={14} className="text-primary" /> SYSTEM_ACTIVITY_STREAM
            </h3>
          </CardHeader>
          <CardContent className="p-4 space-y-6">
            {projects?.slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex gap-4 group relative">
                {i !== 4 && <div className="absolute left-1.5 top-5 bottom-[-24px] w-px bg-border group-hover:bg-primary/30 transition-colors"></div>}
                <div className={cn(
                  "w-3 h-3 rounded-full mt-1.5 z-10 shrink-0 border border-background",
                  p.status === 'Completed' ? 'bg-success' : p.status === 'Pending' ? 'bg-warning' : 'bg-primary'
                )}></div>
                <div className="space-y-1">
                  <p className="text-[11px] text-[#c9d1d9] leading-tight font-mono">
                    <span className="text-primary font-bold">EVENT:</span> Project <span className="text-white">"{p.title}"</span> moved to <span className="text-review uppercase">{p.status}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-[9px] text-secondary font-bold uppercase tracking-widest">USER_ID: {p.customerId?.slice(0, 8)}</p>
                    <span className="text-[9px] text-secondary">•</span>
                    <p className="text-[9px] text-secondary uppercase">2m ago</p>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-[10px] text-secondary hover:text-white transition-colors border border-dashed border-border rounded mt-4 font-mono">
              VIEW_ALL_LOGS
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
