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
  <Card className="relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-${color}/10 rounded-full blur-2xl group-hover:bg-${color}/20 transition-all duration-500`}></div>
    <CardContent className="flex items-center justify-between">
      <div>
        <p className="text-secondary text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        <div className="flex items-center gap-1 mt-2">
          {trend === 'up' ? (
            <ArrowUpRight size={16} className="text-success" />
          ) : (
            <ArrowDownRight size={16} className="text-danger" />
          )}
          <span className={`text-xs font-semibold ${trend === 'up' ? 'text-success' : 'text-danger'}`}>
            {trendValue}
          </span>
          <span className="text-xs text-secondary ml-1">vs last month</span>
        </div>
      </div>
      <div className={`w-12 h-12 bg-${color}/10 rounded-xl flex items-center justify-center text-${color}`}>
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
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748B" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #ffffff10', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="projects" 
                  stroke="#3B82F6" 
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
            <h3 className="font-bold">Recent Activity</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">Rahul</span> updated <span className="text-accent font-semibold">School CRM</span> status to In Progress
                  </p>
                  <p className="text-xs text-secondary mt-1">2 hours ago</p>
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
