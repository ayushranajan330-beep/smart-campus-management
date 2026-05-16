import React from 'react';
import { CheckCircle2, UserPlus, Users, AlertCircle } from 'lucide-react';

const RoomStatusBadge = ({ status }) => {
  const configs = {
    'Available': { 
      icon: <CheckCircle2 size={14} />, 
      classes: 'bg-green-500/10 text-green-500 border-green-500/20' 
    },
    'Partially Occupied': { 
      icon: <UserPlus size={14} />, 
      classes: 'bg-blue-500/10 text-blue-500 border-blue-500/20' 
    },
    'Full': { 
      icon: <Users size={14} />, 
      classes: 'bg-purple-500/10 text-purple-500 border-purple-500/20' 
    },
    'Maintenance': { 
      icon: <AlertCircle size={14} />, 
      classes: 'bg-red-500/10 text-red-500 border-red-500/20' 
    }
  };

  const config = configs[status] || configs['Available'];

  return (
    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border w-fit uppercase tracking-wider ${config.classes}`}>
      {config.icon}
      {status}
    </span>
  );
};

export default RoomStatusBadge;
