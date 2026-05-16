import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  ChevronRight, 
  Loader2, 
  User, 
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  AlertCircle,
  X
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ComplaintStatusBadge from '../../components/complaints/ComplaintStatusBadge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  
  // Update state for selected complaint
  const [updateData, setUpdateData] = useState({
    status: '',
    adminRemarks: '',
    assignedTo: ''
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/complaints');
      setComplaints(res.data);
    } catch (error) {
      toast.error('Failed to fetch all complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUpdateModal = (c) => {
    setSelectedComplaint(c);
    setUpdateData({
      status: c.status,
      adminRemarks: c.adminRemarks || '',
      assignedTo: c.assignedTo || ''
    });
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      await axios.patch(`http://localhost:5001/api/complaints/${selectedComplaint._id}/status`, updateData);
      toast.success('Complaint Updated Successfully');
      setIsModalOpen(false);
      fetchComplaints();
    } catch (error) {
      toast.error('Failed to update complaint');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        await axios.delete(`http://localhost:5001/api/complaints/${id}`);
        toast.success('Complaint Deleted');
        fetchComplaints();
      } catch (error) {
        toast.error('Failed to delete complaint');
      }
    }
  };

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         c.studentId?.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
            <div className="p-3 bg-rose-500 rounded-2xl text-white shadow-lg shadow-rose-500/20">
              <AlertCircle size={32} />
            </div>
            Complaints Hub
          </h1>
          <p className="text-slate-400 mt-2 ml-16 font-medium">Review and resolve campus maintenance requests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'New / Pending', count: complaints.filter(c => c.status === 'Pending').length, color: 'text-rose-500', bg: 'bg-rose-500/10' },
          { label: 'In Progress', count: complaints.filter(c => c.status === 'In Progress').length, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Total Resolved', count: complaints.filter(c => c.status === 'Resolved').length, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        ].map((stat) => (
          <Card key={stat.label} className="p-6 flex items-center justify-between border-none shadow-sm">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className={`text-3xl font-black ${stat.color}`}>{stat.count}</p>
            </div>
            <div className={`p-3 ${stat.bg} ${stat.color} rounded-2xl`}>
              <CheckCircle2 size={24} />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by student name or complaint..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <Filter size={18} className="text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-indigo-600" size={40} />
              <p className="text-slate-500 font-medium">Loading complaints...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-5 font-bold">Student</th>
                  <th className="px-8 py-5 font-bold">Complaint</th>
                  <th className="px-8 py-5 font-bold">Category</th>
                  <th className="px-8 py-5 font-bold">Priority</th>
                  <th className="px-8 py-5 font-bold">Status</th>
                  <th className="px-8 py-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((c) => (
                    <tr key={c._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-xs">
                            {c.studentId?.fullName[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{c.studentId?.fullName}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{c.studentId?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{c.title}</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase">{new Date(c.createdAt).toLocaleDateString()}</p>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-lg">
                          {c.category}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`text-xs font-bold ${
                          c.priority === 'High' ? 'text-red-500' : 
                          c.priority === 'Medium' ? 'text-amber-500' : 
                          'text-blue-500'
                        }`}>
                          {c.priority}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <ComplaintStatusBadge status={c.status} />
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenUpdateModal(c)}
                            className="p-2 text-slate-400 hover:text-indigo-500 transition-colors bg-slate-100 dark:bg-slate-800 rounded-xl"
                            title="Update Status"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(c._id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors bg-slate-100 dark:bg-slate-800 rounded-xl"
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
                    <td colSpan="6" className="px-8 py-20 text-center">
                      <p className="text-slate-500 font-medium">No complaints found matching your criteria</p>
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
        {isModalOpen && selectedComplaint && (
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
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Update Complaint</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <X size={20} className="text-slate-500" />
                  </button>
                </div>

                <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">COMPLAINT</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedComplaint.title}</p>
                </div>

                <form onSubmit={handleUpdateStatus} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Change Status</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Pending', 'In Progress', 'Resolved'].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setUpdateData({ ...updateData, status: s })}
                          className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                            updateData.status === s 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20' 
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-500 border-transparent hover:border-slate-200'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Assign Staff</label>
                    <input
                      type="text"
                      value={updateData.assignedTo}
                      onChange={(e) => setUpdateData({ ...updateData, assignedTo: e.target.value })}
                      placeholder="e.g. Electrician, IT Team"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Admin Remarks</label>
                    <textarea
                      rows="3"
                      value={updateData.adminRemarks}
                      onChange={(e) => setUpdateData({ ...updateData, adminRemarks: e.target.value })}
                      placeholder="Add internal notes or response to student..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={updateLoading} className="w-full py-4 flex items-center justify-center gap-2">
                      {updateLoading ? (
                        <><Loader2 className="animate-spin" size={20} /> Updating...</>
                      ) : (
                        <><CheckCircle2 size={20} /> Save Changes</>
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

export default ManageComplaints;
