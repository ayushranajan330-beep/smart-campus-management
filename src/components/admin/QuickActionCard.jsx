import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Home, 
  Bell, 
  Calendar, 
  BarChart3,
  ArrowUpRight
} from 'lucide-react';
import Card from '../ui/Card';

const actions = [
  { label: 'Manage Students', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Complaints', icon: MessageSquare, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { label: 'Room Allocation', icon: Home, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { label: 'Notices', icon: Bell, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { label: 'Events', icon: Calendar, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { label: 'Full Analytics', icon: BarChart3, color: 'text-green-500', bg: 'bg-green-500/10' },
];

const QuickActionCard = () => {
  return (
    <Card className="p-8 border-none shadow-xl">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Management Shortcuts</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {actions.map((action, idx) => (
          <motion.button
            key={idx}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center gap-4 group"
          >
            <div className={`w-16 h-16 rounded-[1.5rem] ${action.bg} ${action.color} flex items-center justify-center relative group-hover:shadow-2xl transition-all duration-300`}>
              <action.icon size={28} />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <ArrowUpRight size={12} className="text-slate-400" />
              </div>
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 text-center uppercase tracking-wider group-hover:text-indigo-500 transition-colors">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActionCard;
