import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, User } from 'lucide-react';
import Card from '../ui/Card';

const LeavePreview = ({ requests }) => {
  return (
    <Card className="p-0 overflow-hidden border-none shadow-xl flex flex-col h-full">
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pending Leave Requests</h3>
          <p className="text-sm text-slate-500">Recently submitted applications</p>
        </div>
        <button className="text-indigo-500 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
          View All <ArrowRight size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {requests?.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {requests.map((request, idx) => (
              <div key={idx} className="p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                    {request.studentName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{request.studentName}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="font-bold text-indigo-500">{request.duration}</span> • {request.reason}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2.5 rounded-xl bg-green-500/10 text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm">
                    <Check size={18} />
                  </button>
                  <button className="p-2.5 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-20 text-center text-slate-400">
            <User size={40} className="mx-auto mb-4 opacity-20" />
            <p>No pending requests</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LeavePreview;
