import { useQuery } from '@tanstack/react-query';
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Users
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area 
} from 'recharts';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import { projectService } from '../../services/api';
import { motion } from 'framer-motion';

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

  const stats = [
    { title: 'Total Projects', value: projects?.length || 0, icon: Briefcase, trend: 'up', trendValue: '+12%', color: 'accent' },
    { title: 'Active Projects', value: projects?.filter(p => p.status === 'In Progress').length || 0, icon: Clock, trend: 'up', trendValue: '+5%', color: 'warning' },
    { title: 'Completed', value: projects?.filter(p => p.status === 'Completed').length || 0, icon: CheckCircle2, trend: 'up', trendValue: '+8%', color: 'success' },
    { title: 'New Customers', value: 24, icon: Users, trend: 'down', trendValue: '-2%', color: 'accent' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-secondary">Overview of all current activities and performance.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-secondary">Last updated: Just now</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Project Completion Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <h3 className="font-bold">Project Growth</h3>
            <select className="bg-white/5 border border-white/10 rounded-md text-xs py-1 px-2 focus:outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#58a6ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#30363d" />
                <XAxis 
                  dataKey="name" 
                  stroke="#8b949e" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  fontFamily="monospace"
                />
                <YAxis 
                  stroke="#8b949e" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  fontFamily="monospace"
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '4px' }}
                  itemStyle={{ color: '#c9d1d9', fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="projects" 
                  stroke="#58a6ff" 
                  fillOpacity={1} 
                  fill="url(#colorProjects)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <h3 className="text-xs font-bold uppercase tracking-widest text-secondary font-mono">Recent Activity</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3 text-[12px] border-l border-border pl-4 relative">
                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-border"></div>
                <div>
                  <p className="leading-tight">
                    <span className="text-primary font-bold">Rahul</span> updated <span className="text-warning font-mono">School CRM</span> status
                  </p>
                  <p className="text-secondary mt-1 font-mono text-[10px]">2 hours ago</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
