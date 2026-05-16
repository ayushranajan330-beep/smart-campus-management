import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Loader2, 
  FileText,
  Filter,
  ArrowRight
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoticeCard from '../../components/notices/NoticeCard';
import Card from '../../components/ui/Card';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/notices');
      setNotices(res.data);
    } catch (error) {
      toast.error('Failed to load notices');
    } finally {
      setLoading(false);
    }
  };

  const filteredNotices = notices.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         n.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'All' || n.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Notice Board</h1>
          <p className="text-slate-500 font-medium">Important announcements and administrative updates</p>
        </div>
        <div className="w-16 h-16 rounded-[2rem] bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-500/20">
          <Bell size={28} className="animate-bounce" />
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-2xl">
        {/* Toolbar */}
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by title or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
              <Filter size={14} /> Priority:
            </div>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-6 py-4 bg-white dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer shadow-sm"
            >
              <option value="All">All Priority</option>
              <option value="Normal">Normal</option>
              <option value="Important">Important</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {loading ? (
            <div className="py-20 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-indigo-600" size={48} />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Syncing Notices...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence>
                {filteredNotices.length > 0 ? (
                  filteredNotices.map((notice, idx) => (
                    <motion.div
                      key={notice._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <NoticeCard notice={notice} />
                    </motion.div>
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-300 mx-auto mb-6">
                      <FileText size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Notices Found</h3>
                    <p className="text-slate-500">The notice board is currently clear.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Notices;
