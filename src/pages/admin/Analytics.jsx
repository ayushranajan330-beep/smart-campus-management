import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Home, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import Card from '../../components/ui/Card';

const Analytics = () => {
  const stats = [
    { label: 'Total Occupancy', value: '84%', icon: Home, color: 'text-indigo-500', bg: 'bg-indigo-500/10', trend: '+2.5%', trendUp: true },
    { label: 'Resolved Issues', value: '142', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10', trend: '+12%', trendUp: true },
    { label: 'Pending Leaves', value: '12', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', trend: '-4%', trendUp: false },
    { label: 'Active Complaints', value: '8', icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-500/10', trend: '-2', trendUp: false },
  ];

  const chartData = [
    { day: 'Mon', count: 40 },
    { day: 'Tue', count: 65 },
    { day: 'Wed', count: 45 },
    { day: 'Thu', count: 90 },
    { day: 'Fri', count: 55 },
    { day: 'Sat', count: 30 },
    { day: 'Sun', count: 20 },
  ];

  return (
    <div className="space-y-10 pb-20">
      <header>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
          <div className="p-3 bg-indigo-500 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
            <BarChart3 size={32} />
          </div>
          Campus Analytics
        </h1>
        <p className="text-slate-400 mt-2 ml-16 font-medium">Real-time insights and performance metrics</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 ${stat.bg} ${stat.color} rounded-2xl`}>
                  <stat.icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.trend}
                </div>
              </div>
              <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest">{stat.label}</h3>
              <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <Card className="lg:col-span-2 p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Complaints Volume</h2>
              <p className="text-sm text-slate-400">Weekly resolution activity</p>
            </div>
            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-xs font-bold outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className="flex items-end justify-between h-64 gap-2 px-2">
            {chartData.map((data, idx) => (
              <div key={data.day} className="flex-1 flex flex-col items-center gap-4">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${data.count}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className="w-full max-w-[40px] bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-xl relative group"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {data.count}
                  </div>
                </motion.div>
                <span className="text-xs font-bold text-slate-400 uppercase">{data.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Recent Activity</h2>
          <div className="space-y-8">
            {[
              { type: 'complaint', text: 'New plumbing issue reported in Block B', time: '2 mins ago', icon: AlertTriangle, color: 'text-rose-500' },
              { type: 'leave', text: 'Leave request approved for Rahul S.', time: '1 hour ago', icon: CheckCircle, color: 'text-emerald-500' },
              { type: 'room', text: 'Room B-204 allocated to Ayush R.', time: '3 hours ago', icon: Home, color: 'text-indigo-500' },
              { type: 'notice', text: 'Holiday notice posted by Warden', time: '5 hours ago', icon: Clock, color: 'text-amber-500' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 relative">
                {idx !== 3 && <div className="absolute left-[11px] top-8 bottom-[-32px] w-[2px] bg-slate-100 dark:bg-slate-800" />}
                <div className={`w-6 h-6 rounded-full ${item.color} bg-current opacity-10 shrink-0`} />
                <div className={`absolute left-[9px] top-[9px] w-1.5 h-1.5 rounded-full ${item.color} bg-current`} />
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-tight">{item.text}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-500 hover:text-indigo-500 transition-all">
            View All Activity
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
