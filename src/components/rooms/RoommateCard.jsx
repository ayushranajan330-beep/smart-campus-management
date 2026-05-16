import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import Card from '../ui/Card';

const RoommateCard = ({ student, isSelf }) => {
  return (
    <Card className={`p-6 border-none shadow-lg relative overflow-hidden group transition-all duration-300 ${
      isSelf ? 'ring-2 ring-indigo-500 bg-indigo-50/10' : ''
    }`}>
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-xl shadow-lg">
            {student.fullName[0]}
          </div>
          {isSelf && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              {student.fullName}
            </h4>
            {isSelf && (
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                You
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 font-medium">{student.id || 'Student ID: ST-2024'}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <Mail size={14} />
          </div>
          <span className="text-xs font-bold truncate">{student.email}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <Phone size={14} />
          </div>
          <span className="text-xs font-bold">{student.phone || 'Contact Private'}</span>
        </div>
      </div>

      <button className="absolute top-4 right-4 p-2 text-slate-300 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all">
        <ExternalLink size={16} />
      </button>
    </Card>
  );
};

export default RoommateCard;
