import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../ui/Card';

const AnalyticsCard = ({ label, value, icon: Icon, color, trend, trendValue, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 h-full relative overflow-hidden group border-none shadow-xl">
        {/* Hover Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        <div className="flex justify-between items-start relative z-10">
          <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-opacity-100 transition-transform group-hover:scale-110 duration-300`}>
            <Icon size={24} className={color.replace('bg-', 'text-')} />
          </div>
          
          <div className="text-right">
            <div className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
              trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
            }`}>
              {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trendValue}
            </div>
            <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">Since last week</p>
          </div>
        </div>

        <div className="mt-6 relative z-10">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{label}</p>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{value}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default AnalyticsCard;
