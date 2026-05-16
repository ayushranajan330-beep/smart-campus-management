import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';

const StatsCard = ({ label, value, icon: Icon, color, trend, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 h-full border-none relative overflow-hidden group">
        {/* Subtle background gradient glow */}
        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-20 transition-all group-hover:opacity-40 ${color}`} />
        
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100 shadow-sm transition-transform group-hover:scale-110 duration-300`}>
            <Icon size={24} className={color.replace('bg-', 'text-')} />
          </div>
          {trend && (
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.includes('+') ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
              {trend}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{label}</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
