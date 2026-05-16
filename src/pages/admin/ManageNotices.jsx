import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Loader2, 
  Edit, 
  Trash2, 
  FileText,
  Bell,
  MoreVertical
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoticeCard from '../../components/notices/NoticeCard';
import NoticeForm from '../../components/notices/NoticeForm';
import NoticePriorityBadge from '../../components/notices/NoticePriorityBadge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ManageNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotice, setSelectedNotice] = useState(null);

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

  const handleCreateOrUpdate = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedNotice) {
        await axios.patch(`http://localhost:5001/api/notices/${selectedNotice._id}`, formData);
        toast.success('Notice updated successfully');
      } else {
        await axios.post('http://localhost:5001/api/notices', formData);
        toast.success('Notice published successfully');
      }
      setIsFormOpen(false);
      setSelectedNotice(null);
      fetchNotices();
    } catch (error) {
      toast.error('Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await axios.delete(`http://localhost:5001/api/notices/${id}`);
        toast.success('Notice removed');
        fetchNotices();
      } catch (error) {
        toast.error('Failed to delete notice');
      }
    }
  };

  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Notices</h1>
          <p className="text-slate-500 dark:text-slate-400">Broadcast important campus announcements</p>
        </div>
        <Button onClick={() => { setSelectedNotice(null); setIsFormOpen(true); }} className="py-4 shadow-xl shadow-indigo-500/20 px-8">
          <Plus size={20} className="mr-2" /> Post New Notice
        </Button>
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-xl">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 shadow-sm">
              <Bell size={18} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-24 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-indigo-600" size={48} />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Accessing Announcements...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-400 text-[10px] uppercase font-bold tracking-[0.2em]">
                <tr>
                  <th className="px-8 py-6">Notice Info</th>
                  <th className="px-8 py-6">Priority</th>
                  <th className="px-8 py-6">Posted Date</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredNotices.length > 0 ? (
                  filteredNotices.map((n) => (
                    <tr key={n._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-110 transition-transform ${
                            n.priority === 'Urgent' ? 'bg-red-500' : 
                            n.priority === 'Important' ? 'bg-amber-500' : 
                            'bg-indigo-600'
                          }`}>
                            <FileText size={22} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{n.title}</p>
                            <p className="text-xs text-slate-400 font-medium line-clamp-1 max-w-[300px]">{n.content}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <NoticePriorityBadge priority={n.priority} />
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-400 font-medium">
                        {new Date(n.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => { setSelectedNotice(n); setIsFormOpen(true); }}
                            className="p-3 text-slate-400 hover:text-indigo-500 transition-all bg-slate-100 dark:bg-slate-800 rounded-2xl"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(n._id)}
                            className="p-3 text-slate-400 hover:text-red-500 transition-all bg-slate-100 dark:bg-slate-800 rounded-2xl"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-8 py-24 text-center">
                      <p className="text-slate-500 font-bold">No notices published yet.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <NoticeForm
            isOpen={isFormOpen}
            onClose={() => { setIsFormOpen(false); setSelectedNotice(null); }}
            onSubmit={handleCreateOrUpdate}
            isLoading={isSubmitting}
            initialData={selectedNotice}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageNotices;
