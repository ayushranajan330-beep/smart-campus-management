import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Loader2, FileText, AlertTriangle, Paperclip } from 'lucide-react';
import Button from '../ui/Button';

const NoticeForm = ({ isOpen, onClose, onSubmit, isLoading, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    content: '',
    priority: 'Normal',
    attachment: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="p-8 md:p-12">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                {initialData ? 'Edit Notice' : 'Post Notice'}
              </h2>
              <p className="text-slate-500 text-sm mt-1">Broadcast an official announcement to students</p>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors">
              <X size={24} className="text-slate-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Notice Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Mandatory Hostel Meeting"
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Priority Level</label>
              <div className="grid grid-cols-3 gap-4">
                {['Normal', 'Important', 'Urgent'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: p })}
                    className={`py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-2 ${
                      formData.priority === p 
                      ? (p === 'Urgent' ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20' : 
                         p === 'Important' ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20' :
                         'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20')
                      : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 hover:border-indigo-500/30'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Content</label>
              <textarea
                required
                rows="6"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write the full notice content here..."
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-2">
                <Paperclip size={14} /> Attachment URL (Optional)
              </label>
              <input
                type="text"
                value={formData.attachment}
                onChange={(e) => setFormData({ ...formData, attachment: e.target.value })}
                placeholder="https://example.com/file.pdf"
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="button" variant="secondary" onClick={onClose} className="flex-1 py-5 rounded-2xl">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1 py-5 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20">
                {isLoading ? (
                  <><Loader2 className="animate-spin" size={20} /> Publishing...</>
                ) : (
                  <><Send size={20} /> {initialData ? 'Update Notice' : 'Post Notice'}</>
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default NoticeForm;
