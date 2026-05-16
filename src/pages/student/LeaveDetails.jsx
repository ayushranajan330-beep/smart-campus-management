import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Phone, Loader2, MessageSquare, Info } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import LeaveStatusBadge from '../../components/leaves/LeaveStatusBadge';
import LeaveTimeline from '../../components/leaves/LeaveTimeline';

const LeaveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/leaves/${id}`);
        setLeave(res.data);
      } catch (error) {
        toast.error('Failed to load leave details');
        navigate('/student/leave');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaveDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-6">
        <Loader2 className="animate-spin text-indigo-600" size={56} />
        <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Authenticating Details...</p>
      </div>
    );
  }

  if (!leave) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/student/leave')}
            className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 text-slate-500 hover:text-indigo-500 transition-all shadow-xl shadow-indigo-500/5 group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Application Details</h1>
              <LeaveStatusBadge status={leave.status} />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Reference ID: #{leave._id.slice(-10).toUpperCase()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-10">
          <Card className="p-10 border-none shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <Info className="text-indigo-500" /> General Information
            </h3>
            
            <div className="space-y-8">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Reason for Leave</p>
                <p className="text-xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{leave.reason}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      {new Date(leave.fromDate).toLocaleDateString()} — {new Date(leave.toDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {Math.ceil((new Date(leave.toDate) - new Date(leave.fromDate)) / (1000 * 60 * 60 * 24))} Days total
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Destination</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{leave.destination}</p>
                    <p className="text-xs text-slate-500 font-medium">Outstation Travel</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-pink-500/10 text-pink-500 flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Emergency Contact</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{leave.emergencyContact}</p>
                    <p className="text-xs text-slate-500 font-medium">Guardian Phone</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {leave.adminRemarks && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-10 border-none shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <MessageSquare size={22} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Remarks</h3>
                </div>
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <p className="text-slate-600 dark:text-slate-300 italic text-lg leading-relaxed">
                    "{leave.adminRemarks}"
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar - Timeline Area */}
        <div className="space-y-10">
          <Card className="p-10 border-none shadow-2xl h-full">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 flex items-center gap-3">
              Application Status
            </h3>
            <LeaveTimeline 
              status={leave.status} 
              createdAt={leave.createdAt} 
              updatedAt={leave.updatedAt} 
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetails;
