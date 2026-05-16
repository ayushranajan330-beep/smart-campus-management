import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, ChevronRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import NoticePriorityBadge from './NoticePriorityBadge';

const NoticeCard = ({ notice, isAdmin = false }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="w-full"
    >
      <Card className="p-6 border-none shadow-lg hover:shadow-xl transition-all group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 dark:bg-slate-800/50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex gap-6 flex-1">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
              notice.priority === 'Urgent' ? 'bg-red-500 text-white shadow-red-500/20' :
              notice.priority === 'Important' ? 'bg-amber-500 text-white shadow-amber-500/20' :
              'bg-indigo-600 text-white shadow-indigo-500/20'
            }`}>
              <FileText size={28} />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <NoticePriorityBadge priority={notice.priority} />
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Calendar size={12} /> {new Date(notice.createdAt).toLocaleDateString()}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                {notice.title}
              </h3>
              <p className="text-sm text-slate-400 line-clamp-1">
                {notice.content}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {notice.attachment && (
              <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-indigo-500 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm">
                <Download size={20} />
              </button>
            )}
            <Link to={isAdmin ? `/admin/notices/${notice._id}` : `/student/notices/${notice._id}`}>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-2 group-hover:gap-3">
                Read More <ChevronRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default NoticeCard;
