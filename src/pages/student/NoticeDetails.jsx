import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Download, 
  Share2, 
  Loader2,
  FileText,
  User,
  ShieldCheck
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import NoticePriorityBadge from '../../components/notices/NoticePriorityBadge';

const NoticeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticeDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/notices/${id}`);
        setNotice(res.data);
      } catch (error) {
        toast.error('Notice not found');
        navigate('/student/notices');
      } finally {
        setLoading(false);
      }
    };
    fetchNoticeDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-6">
        <Loader2 className="animate-spin text-indigo-600" size={56} />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Fetching Official Records...</p>
      </div>
    );
  }

  if (!notice) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/student/notices')}
            className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 text-slate-500 hover:text-indigo-500 transition-all shadow-xl group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Official Notice</h1>
              <NoticePriorityBadge priority={notice.priority} />
            </div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Calendar size={12} /> Posted on {new Date(notice.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-2xl relative">
        {/* Certificate Style Border Top */}
        <div className={`h-2 w-full ${
          notice.priority === 'Urgent' ? 'bg-red-500' :
          notice.priority === 'Important' ? 'bg-amber-500' :
          'bg-indigo-600'
        }`} />
        
        <div className="p-10 md:p-16">
          <div className="flex justify-between items-start mb-12">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shadow-inner">
                <FileText size={32} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {notice.title}
              </h2>
            </div>
            <div className="hidden md:flex flex-col items-end gap-2">
              <ShieldCheck size={40} className="text-indigo-500 opacity-20" />
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] vertical-text">VERIFIED NOTICE</p>
            </div>
          </div>

          <div className="prose prose-indigo dark:prose-invert max-w-none mb-16">
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
              {notice.content}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <User size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {notice.createdBy?.fullName || 'Campus Administration'}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Issuing Authority</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {notice.attachment && (
                <button className="flex items-center gap-2 px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 hover:text-indigo-500 transition-all border border-transparent hover:border-indigo-500/30">
                  <Download size={18} /> Attachment
                </button>
              )}
              <button className="flex items-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
                <Share2 size={18} /> Share
              </button>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-center gap-4 text-slate-400 text-xs font-medium">
        <p>© 2024 SmartCampus Hostel Management System</p>
        <div className="w-1 h-1 rounded-full bg-slate-300" />
        <p>This is a system-generated official document.</p>
      </div>
    </div>
  );
};

export default NoticeDetails;
