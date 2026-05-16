import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

const ComplaintTimeline = ({ status, createdAt, updatedAt }) => {
  const steps = [
    { 
      label: 'Pending', 
      description: 'Complaint submitted and waiting for review',
      date: createdAt,
      icon: Clock,
      active: true,
      completed: status !== 'Pending'
    },
    { 
      label: 'In Progress', 
      description: 'Staff assigned and issue being addressed',
      date: status === 'In Progress' ? updatedAt : null,
      icon: AlertCircle,
      active: status === 'In Progress' || status === 'Resolved',
      completed: status === 'Resolved'
    },
    { 
      label: 'Resolved', 
      description: 'Issue fixed and marked as complete',
      date: status === 'Resolved' ? updatedAt : null,
      icon: CheckCircle2,
      active: status === 'Resolved',
      completed: status === 'Resolved'
    }
  ];

  return (
    <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.2 }}
          className="relative pl-16"
        >
          <div className={`absolute left-0 w-12 h-12 rounded-2xl flex items-center justify-center z-10 transition-colors duration-500 shadow-lg ${
            step.completed ? 'bg-green-500 text-white shadow-green-500/20' : 
            step.active ? 'bg-indigo-600 text-white shadow-indigo-500/20' : 
            'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}>
            <step.icon size={22} />
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h4 className={`font-bold ${step.active ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                {step.label}
              </h4>
              {step.date && (
                <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {new Date(step.date).toLocaleDateString()}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ComplaintTimeline;
