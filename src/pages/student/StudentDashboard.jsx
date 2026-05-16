import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Bell
} from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import WelcomeCard from '../../components/dashboard/WelcomeCard';
import StatsCard from '../../components/dashboard/StatsCard';
import RoomDetails from '../../components/dashboard/RoomDetails';
import ComplaintTable from '../../components/dashboard/ComplaintTable';
import EventCard from '../../components/dashboard/EventCard';
import NoticeCard from '../../components/dashboard/NoticeCard';
import LeaveStatusBadge from '../../components/leaves/LeaveStatusBadge';
import { TableSkeleton, DashboardSkeleton } from '../../components/ui/Skeleton';
import Card from '../../components/ui/Card';
import { Link } from 'react-router-dom';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const chartData = [
  { name: 'Mon', count: 2 },
  { name: 'Tue', count: 4 },
  { name: 'Wed', count: 3 },
  { name: 'Thu', count: 7 },
  { name: 'Fri', count: 5 },
  { name: 'Sat', count: 3 },
  { name: 'Sun', count: 1 },
];

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    stats: [],
    roommates: [],
    complaints: [],
    events: [],
    notices: [],
    roomInfo: null,
    leavesPreview: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [roomRes, eventsRes, noticesRes] = await Promise.all([
          axios.get('http://localhost:5001/api/rooms/my-room').catch(() => ({ data: null })),
          axios.get('http://localhost:5001/api/events?limit=2'),
          axios.get('http://localhost:5001/api/notices?limit=3')
        ]);

        setData({
          stats: [
            { label: 'Total Complaints', value: '12', icon: MessageSquare, color: 'bg-indigo-500', trend: '+2 this month' },
            { label: 'Pending Status', value: '03', icon: Clock, color: 'bg-amber-500', trend: 'In Review' },
            { label: 'Approved Leaves', value: '08', icon: CheckCircle2, color: 'bg-green-500', trend: 'Completed' },
            { label: 'Upcoming Events', value: eventsRes.data?.length.toString() || '0', icon: Calendar, color: 'bg-purple-500', trend: 'Join now' }
          ],
          complaints: [
            { id: '#CMP-1021', title: 'WiFi not working in B-Block', category: 'IT/Network', status: 'In Progress' },
            { id: '#CMP-0942', title: 'Water leakage in bathroom', category: 'Plumbing', status: 'Pending' }
          ],
          roomInfo: {
            number: roomRes.data?.roomNumber || 'N/A',
            type: roomRes.data?.roomType || 'N/A',
            block: roomRes.data?.block || 'N/A',
            floor: roomRes.data?.floor || 'N/A'
          },
          roommates: roomRes.data?.occupants || [],
          events: eventsRes.data || [],
          notices: noticesRes.data || [],
          leavesPreview: [
            { reason: 'Home Visit', duration: '3 Days', status: 'Approved' },
            { reason: 'Medical Checkup', duration: '1 Day', status: 'Pending' },
            { reason: 'Family Event', duration: '2 Days', status: 'Rejected' }
          ]
        });
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Hero */}
      <WelcomeCard user={user} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat, i) => (
          <StatsCard key={i} {...stat} index={i} />
        ))}
      </div>

      {/* Analytics Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Complaint Activity</h2>
              <p className="text-sm text-slate-400">Total reports submitted this week</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 text-indigo-500 rounded-lg text-sm font-bold">
              <TrendingUp size={16} />
              <span>+12.5%</span>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Complaints */}
        <div className="lg:col-span-2">
          <ComplaintTable complaints={data.complaints} />
        </div>

        {/* Room Details */}
        <div className="h-full">
          <RoomDetails roomInfo={data.roomInfo} roommates={data.roommates} />
        </div>
      </div>

      {/* Leaves Preview Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Leave Requests</h2>
          <Link to="/student/leave" className="text-sm font-bold text-indigo-500">View History</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(data.leavesPreview || []).map((leave, i) => (
            <Card key={i} className="p-6 border-none shadow-lg group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
                  <Calendar size={20} />
                </div>
                <LeaveStatusBadge status={leave.status} />
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{leave.reason}</p>
              <p className="text-xs text-slate-500 font-medium">{leave.duration}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Events and Notices Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Events */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Upcoming Events</h2>
            <Link to="/student/events" className="text-sm font-bold text-indigo-500">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.events.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
        </div>

        {/* Notices */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Notice Board</h2>
            <Bell size={20} className="text-slate-400" />
          </div>
          <div className="space-y-4">
            {data.notices.map((notice, i) => (
              <NoticeCard key={i} notice={notice} />
            ))}
            <Link to="/student/notices">
              <button className="w-full mt-4 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                See All Notices
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
