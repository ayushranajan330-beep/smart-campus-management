import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Calendar, ChevronRight, Loader2, FileText } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import LeaveStats from '../../components/leaves/LeaveStats';
import LeaveForm from '../../components/leaves/LeaveForm';
import LeaveStatusBadge from '../../components/leaves/LeaveStatusBadge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const LeaveRequestPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/leaves/student');
      setLeaves(res.data);
    } catch (error) {
      toast.error('Failed to fetch leave history');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyLeave = async (formData) => {
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5001/api/leaves', formData);
      toast.success('Leave Request Submitted Successfully');
      setIsFormOpen(false);
      fetchLeaves();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredLeaves = leaves.filter(l => {
    const matchesSearch = l.reason.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         l.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || l.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: leaves.length,
    approved: leaves.filter(l => l.status === 'Approved').length,
    pending: leaves.filter(l => l.status === 'Pending').length,
    rejected: leaves.filter(l => l.status === 'Rejected').length,
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Leave Requests</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your out-of-campus applications</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="py-4 shadow-xl shadow-indigo-500/20 px-8">
          <Plus size={20} className="mr-2" /> Apply for Leave
        </Button>
      </div>

      {/* Stats Section */}
      <LeaveStats stats={stats} />

      {/* Main Content Card */}
      <Card className="p-0 overflow-hidden border-none shadow-xl">
        {/* Toolbar */}
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by reason or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
              <Filter size={14} /> Filter:
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-6 py-4 bg-white dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer shadow-sm"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-indigo-600" size={48} />
              <p className="text-slate-500 font-bold">Syncing leave history...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-400 text-[10px] uppercase font-bold tracking-[0.2em]">
                <tr>
                  <th className="px-8 py-6">Leave Duration</th>
                  <th className="px-8 py-6">Reason</th>
                  <th className="px-8 py-6">Destination</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Applied Date</th>
                  <th className="px-8 py-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredLeaves.length > 0 ? (
                  filteredLeaves.map((l) => (
                    <tr key={l._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
                            <Calendar size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                              {new Date(l.fromDate).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-slate-400 font-medium">
                              to {new Date(l.toDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 line-clamp-1 max-w-[200px]">{l.reason}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{l.destination}</p>
                      </td>
                      <td className="px-8 py-6">
                        <LeaveStatusBadge status={l.status} />
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-400 font-medium">
                        {new Date(l.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Link to={`/student/leave/${l._id}`}>
                          <button className="p-3 text-slate-400 hover:text-indigo-500 transition-all bg-slate-100 dark:bg-slate-800 rounded-2xl group-hover:bg-indigo-500 group-hover:text-white shadow-sm">
                            <ChevronRight size={20} />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-8 py-24 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-300">
                          <FileText size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">No leave records</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">You haven't submitted any leave applications yet. Click the button above to apply.</p>
                      </div>
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
          <LeaveForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleApplyLeave}
            isLoading={isSubmitting}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeaveRequestPage;
