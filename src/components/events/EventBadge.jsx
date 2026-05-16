import React from 'react';
import { 
  Trophy, 
  Music, 
  BookOpen, 
  Home, 
  AlertTriangle, 
  Layers 
} from 'lucide-react';

const EventBadge = ({ category }) => {
  const configs = {
    'Sports': { 
      icon: <Trophy size={14} />, 
      classes: 'bg-orange-500/10 text-orange-500 border-orange-500/20' 
    },
    'Cultural': { 
      icon: <Music size={14} />, 
      classes: 'bg-pink-500/10 text-pink-500 border-pink-500/20' 
    },
    'Academic': { 
      icon: <BookOpen size={14} />, 
      classes: 'bg-blue-500/10 text-blue-500 border-blue-500/20' 
    },
    'Hostel': { 
      icon: <Home size={14} />, 
      classes: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' 
    },
    'Emergency': { 
      icon: <AlertTriangle size={14} />, 
      classes: 'bg-red-500/10 text-red-500 border-red-500/20' 
    },
    'Other': { 
      icon: <Layers size={14} />, 
      classes: 'bg-slate-500/10 text-slate-500 border-slate-500/20' 
    }
  };

  const config = configs[category] || configs['Other'];

  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest w-fit ${config.classes}`}>
      {config.icon}
      {category}
    </span>
  );
};

export default EventBadge;
