import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Clock, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';

const NoticeCard = ({ notice }) => {
  return (
    <motion.div whileHover={{ x: 5 }} className="group">
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 transition-all shadow-sm flex gap-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <Bell size={20} />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
              {notice.title}
            </h4>
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
              <Clock size={10} /> {notice.date}
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
            {notice.description}
          </p>
        </div>
        
        <button className="self-center p-2 text-slate-300 group-hover:text-indigo-500 transition-colors">
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default NoticeCard;
