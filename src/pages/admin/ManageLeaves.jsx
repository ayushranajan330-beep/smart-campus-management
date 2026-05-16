import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Loader2, 
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  X,
  FileText,
  Calendar,
  MapPin
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import LeaveStatusBadge from '../../components/leaves/LeaveStatusBadge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ManageLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  
  const [updateData, setUpdateData] = useState({
    status: '',
    adminRemarks: ''
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/leaves');
      setLeaves(res.data);
    } catch (error) {
      toast.error('Failed to fetch leave requests');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUpdateModal = (l) => {
    setSelectedLeave(l);
    setUpdateData({
      status: l.status,
      adminRemarks: l.adminRemarks || ''
    });
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      await axios.patch(`http://localhost:5001/api/leaves/${selectedLeave._id}/status`, updateData);
      toast.success(`Leave Request ${updateData.status}`);
      setIsModalOpen(false);
      fetchLeaves();
    } catch (error) {
      toast.error('Failed to update request');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this leave record?')) {
      try {
        await axios.delete(`http://localhost:5001/api/leaves/${id}`);
        toast.success('Record Deleted');
        fetchLeaves();
      } catch (error) {
        toast.error('Failed to delete record');
      }
    }
  };

  const filteredLeaves = leaves.filter(l => {
    const matchesSearch = l.studentId?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         l.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || l.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Leave Management</h1>
        <p className="text-slate-500 dark:text-slate-400">Review and authorize student leave applications</p>
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-xl">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search student or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-6 py-4 bg-white dark:bg-slate-900 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer shadow-sm"
            >
              <option value="All">All Applications</option>
              <option value="Pending">Pending Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-24 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-indigo-600" size={48} />
              <p className="text-slate-500 font-bold">Fetching records...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-400 text-[10px] uppercase font-bold tracking-[0.2em]">
                <tr>
                  <th className="px-8 py-6">Student</th>
                  <th className="px-8 py-6">Leave Duration</th>
                  <th className="px-8 py-6">Destination</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredLeaves.length > 0 ? (
                  filteredLeaves.map((l) => (
                    <tr key={l._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-sm">
                            {l.studentId?.fullName[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{l.studentId?.fullName}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{l.studentId?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                          <span>{new Date(l.fromDate).toLocaleDateString()}</span>
                          <span className="text-slate-300 mx-1">→</span>
                          <span>{new Date(l.toDate).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 italic">"{l.reason}"</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                          <MapPin size={14} className="text-indigo-400" /> {l.destination}
                        </p>
                      </td>
                      <td className="px-8 py-6">
                        <LeaveStatusBadge status={l.status} />
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenUpdateModal(l)}
                            className="p-3 text-slate-400 hover:text-indigo-500 transition-all bg-slate-100 dark:bg-slate-800 rounded-2xl"
                            title="Update Status"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(l._id)}
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
                    <td colSpan="5" className="px-8 py-24 text-center">
                      <p className="text-slate-500 font-bold">No leave requests found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Update Modal */}
      <AnimatePresence>
        {isModalOpen && selectedLeave && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Review Application</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors">
                    <X size={20} className="text-slate-500" />
                  </button>
                </div>

                <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-2">Student Application</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">{selectedLeave.studentId?.fullName}</p>
                  <p className="text-xs text-slate-500 leading-relaxed italic">"{selectedLeave.reason}"</p>
                </div>

                <form onSubmit={handleUpdateStatus} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Decision</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setUpdateData({ ...updateData, status: 'Approved' })}
                        className={`py-4 rounded-2xl text-sm font-bold transition-all border-2 flex items-center justify-center gap-2 ${
                          updateData.status === 'Approved' 
                          ? 'bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/20' 
                          : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-100 dark:border-slate-700 hover:border-green-500/30'
                        }`}
                      >
                        <CheckCircle2 size={18} /> Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpdateData({ ...updateData, status: 'Rejected' })}
                        className={`py-4 rounded-2xl text-sm font-bold transition-all border-2 flex items-center justify-center gap-2 ${
                          updateData.status === 'Rejected' 
                          ? 'bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/20' 
                          : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-100 dark:border-slate-700 hover:border-red-500/30'
                        }`}
                      >
                        <XCircle size={18} /> Reject
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Add Remarks (Optional)</label>
                    <textarea
                      rows="3"
                      value={updateData.adminRemarks}
                      onChange={(e) => setUpdateData({ ...updateData, adminRemarks: e.target.value })}
                      placeholder="e.g. Return before 9 PM on Sunday"
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none shadow-inner"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={updateLoading || !updateData.status} className="w-full py-5 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20 text-lg">
                      {updateLoading ? (
                        <><Loader2 className="animate-spin" size={24} /> Processing...</>
                      ) : (
                        <>Confirm Decision</>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageLeaves;
