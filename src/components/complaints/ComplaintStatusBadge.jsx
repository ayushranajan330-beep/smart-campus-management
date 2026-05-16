import React from 'react';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

const ComplaintStatusBadge = ({ status }) => {
  const configs = {
    'Pending': { 
      icon: <Clock size={14} />, 
      classes: 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
    },
    'In Progress': { 
      icon: <AlertCircle size={14} />, 
      classes: 'bg-blue-500/10 text-blue-500 border-blue-500/20' 
    },
    'Resolved': { 
      icon: <CheckCircle2 size={14} />, 
      classes: 'bg-green-500/10 text-green-500 border-green-500/20' 
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

export default ComplaintStatusBadge;
