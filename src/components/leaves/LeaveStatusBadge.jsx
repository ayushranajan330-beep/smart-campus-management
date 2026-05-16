import React from 'react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

const LeaveStatusBadge = ({ status }) => {
  const configs = {
    'Pending': { 
      icon: <Clock size={14} />, 
      classes: 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
    },
    'Approved': { 
      icon: <CheckCircle2 size={14} />, 
      classes: 'bg-green-500/10 text-green-500 border-green-500/20' 
    },
    'Rejected': { 
      icon: <XCircle size={14} />, 
      classes: 'bg-red-500/10 text-red-500 border-red-500/20' 
    }
  };

  const config = configs[status] || configs['Pending'];

  return (
    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border w-fit ${config.classes}`}>
      {config.icon}
      {status}
    </span>
  );
};

export default LeaveStatusBadge;
