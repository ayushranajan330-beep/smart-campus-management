import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, ChevronRight, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card';

const ComplaintTable = ({ complaints }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    const configs = {
      'Pending': { icon: <Clock size={14} />, classes: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
      'In Progress': { icon: <AlertCircle size={14} />, classes: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
      'Resolved': { icon: <CheckCircle2 size={14} />, classes: 'bg-green-500/10 text-green-500 border-green-500/20' }
    };

    const config = configs[status] || configs['Pending'];

    return (
      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${config.classes}`}>
        {config.icon}
        {status}
      </span>
    );
  };

  return (
    <Card className="p-0 overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Complaints</h2>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-48"
            />
          </div>
          <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-indigo-500 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto custom-scrollbar">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">Complaint Title</th>
              <th className="px-6 py-4 font-bold">Category</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {complaints?.length > 0 ? (
              complaints.map((complaint, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">{complaint.title}</p>
                    <p className="text-xs text-slate-400">ID: {complaint.id || '#CMP-2024'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg">
                      {complaint.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(complaint.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-20 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle size={40} className="opacity-20" />
                    <p>No complaints found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-center">
        <button className="text-sm font-bold text-indigo-500 hover:text-indigo-600 transition-colors">
          View All Complaints
        </button>
      </div>
    </Card>
  );
};

export default ComplaintTable;
