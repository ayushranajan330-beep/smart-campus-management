import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, AlertCircle, Loader2, MessageSquare } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import ComplaintStatusBadge from '../../components/complaints/ComplaintStatusBadge';
import ComplaintTimeline from '../../components/complaints/ComplaintTimeline';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/complaints/${id}`);
        setComplaint(res.data);
      } catch (error) {
        toast.error('Failed to load complaint details');
        navigate('/student/complaints');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
        <p className="text-slate-500 font-medium">Loading details...</p>
      </div>
    );
  }

  if (!complaint) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/student/complaints')}
          className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-500 hover:text-indigo-500 transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{complaint.title}</h1>
            <ComplaintStatusBadge status={complaint.status} />
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Complaint ID: #{complaint._id.slice(-8).toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Description</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
              {complaint.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <Tag size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category</p>
                  <p className="font-bold text-slate-900 dark:text-white">{complaint.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</p>
                  <p className={`font-bold ${
                    complaint.priority === 'High' ? 'text-red-500' : 
                    complaint.priority === 'Medium' ? 'text-amber-500' : 
                    'text-blue-500'
                  }`}>{complaint.priority}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Submitted On</p>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {new Date(complaint.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Staff</p>
                  <p className="font-bold text-slate-900 dark:text-white">{complaint.assignedTo || 'Not Assigned'}</p>
                </div>
              </div>
            </div>
          </Card>

          {complaint.adminRemarks && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-8 border-amber-500/20 bg-amber-500/5">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="text-amber-500" size={20} />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Admin Remarks</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic">
                  "{complaint.adminRemarks}"
                </p>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar - Timeline */}
        <div className="space-y-8">
          <Card className="p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Status Timeline</h3>
            <ComplaintTimeline 
              status={complaint.status} 
              createdAt={complaint.createdAt} 
              updatedAt={complaint.updatedAt} 
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
