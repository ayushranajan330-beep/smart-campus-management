import React from 'react';
import { motion } from 'framer-motion';
import { Home, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';

const RoomStats = ({ stats }) => {
  const items = [
    { label: 'Total Rooms', value: stats.total, icon: Home, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { label: 'Occupied', value: stats.occupied, icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Vacant', value: stats.vacant, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Maintenance', value: stats.maintenance, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="p-6 border-none shadow-xl">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${item.bg} ${item.color}`}>
                <item.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{item.label}</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{item.value || 0}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default RoomStats;
