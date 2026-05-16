import React from 'react';
import { 
  Bell, 
  AlertCircle, 
  Zap 
} from 'lucide-react';

const NoticePriorityBadge = ({ priority }) => {
  const configs = {
    'Normal': { 
      icon: <Bell size={14} />, 
      classes: 'bg-blue-500/10 text-blue-500 border-blue-500/20' 
    },
    'Important': { 
      icon: <Zap size={14} />, 
      classes: 'bg-amber-500/10 text-amber-600 border-amber-500/20' 
    },
    'Urgent': { 
      icon: <AlertCircle size={14} />, 
      classes: 'bg-red-500/10 text-red-500 border-red-500/20' 
    }
  };

  const config = configs[priority] || configs['Normal'];

  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest w-fit ${config.classes}`}>
      {config.icon}
      {priority}
    </span>
  );
};

export default NoticePriorityBadge;
