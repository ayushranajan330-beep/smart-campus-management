import React from 'react';
import { motion } from 'framer-motion';
import { Send, Search, CheckCircle2, XCircle } from 'lucide-react';

const LeaveTimeline = ({ status, createdAt, updatedAt }) => {
  const steps = [
    { 
      label: 'Submitted', 
      description: 'Request successfully sent to warden',
      date: createdAt,
      icon: Send,
      active: true,
      completed: true
    },
    { 
      label: 'Under Review', 
      description: 'Warden is reviewing your application',
      date: status === 'Pending' ? null : updatedAt,
      icon: Search,
      active: true,
      completed: status !== 'Pending'
    },
    { 
      label: status === 'Rejected' ? 'Rejected' : 'Approved', 
      description: status === 'Rejected' ? 'Application denied' : 'Leave granted by warden',
      date: status !== 'Pending' ? updatedAt : null,
      icon: status === 'Rejected' ? XCircle : CheckCircle2,
      active: status !== 'Pending',
      completed: status !== 'Pending',
      isError: status === 'Rejected'
    }
  ];

  return (
    <div className="space-y-10 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.2 }}
          className="relative pl-16"
        >
          <div className={`absolute left-0 w-12 h-12 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 shadow-xl ${
            step.isError ? 'bg-red-500 text-white shadow-red-500/20' :
            step.completed ? 'bg-green-500 text-white shadow-green-500/20' : 
            'bg-indigo-600 text-white shadow-indigo-500/20'
          }`}>
            <step.icon size={22} />
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between gap-3 mb-1">
              <h4 className={`font-bold text-lg ${step.active ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                {step.label}
              </h4>
              {step.date && (
                <span className="text-xs font-bold text-slate-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm">
                  {new Date(step.date).toLocaleDateString()}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LeaveTimeline;
