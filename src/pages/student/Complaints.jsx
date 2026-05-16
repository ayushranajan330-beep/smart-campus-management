import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, MessageSquare, ChevronRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import ComplaintStats from '../../components/complaints/ComplaintStats';
import ComplaintForm from '../../components/complaints/ComplaintForm';
import ComplaintStatusBadge from '../../components/complaints/ComplaintStatusBadge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/complaints/student');
      setComplaints(res.data);
    } catch (error) {
      toast.error('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateComplaint = async (formData) => {
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5001/api/complaints', formData);
      toast.success('Complaint Submitted Successfully');
      setIsFormOpen(false);
      fetchComplaints();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         c.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'Pending').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Complaints Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Track and manage your maintenance requests</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="py-4 shadow-xl shadow-indigo-500/20">
          <Plus size={20} className="mr-2" /> Raise Complaint
        </Button>
      </div>

      {/* Stats Section */}
      <ComplaintStats stats={stats} />

      {/* Main Content Card */}
      <Card className="p-0 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by title or category..."
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

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-indigo-600" size={40} />
              <p className="text-slate-500 font-medium">Fetching complaints...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-5 font-bold">Complaint Title</th>
                  <th className="px-8 py-5 font-bold">Category</th>
                  <th className="px-8 py-5 font-bold">Priority</th>
                  <th className="px-8 py-5 font-bold">Date</th>
                  <th className="px-8 py-5 font-bold">Status</th>
                  <th className="px-8 py-5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((c) => (
                    <tr key={c._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-8 py-5">
                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">{c.title}</p>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg">
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
                      <td className="px-8 py-5 text-sm text-slate-500 dark:text-slate-400">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-5">
                        <ComplaintStatusBadge status={c.status} />
                      </td>
                      <td className="px-8 py-5 text-right">
                        <Link to={`/student/complaints/${c._id}`}>
                          <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors bg-slate-100 dark:bg-slate-800 rounded-xl">
                            <ChevronRight size={20} />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                          <MessageSquare size={30} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No complaints found</h3>
                        <p className="text-slate-500 max-w-xs">Raise a new complaint to get started with maintenance tracking.</p>
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
          <ComplaintForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleCreateComplaint}
            isLoading={isSubmitting}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Complaints;
