import React from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Smartphone, MapPin, Layers } from 'lucide-react';
import Card from '../ui/Card';

const RoomDetails = ({ roomInfo, roommates }) => {
  return (
    <Card className="p-8 h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-indigo-600/10 text-indigo-600 rounded-xl flex items-center justify-center">
          <Home size={22} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Room Details</h2>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="space-y-1">
          <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <MapPin size={12} /> BLOCK
          </p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{roomInfo?.block || 'B'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Layers size={12} /> FLOOR
          </p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{roomInfo?.floor || '2nd'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Home size={12} /> CAPACITY
          </p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{roomInfo?.capacity || '3'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Users size={12} /> OCCUPANCY
          </p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{roomInfo?.occupancy || '2'}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Roommates</h3>
        <div className="space-y-4">
          {roommates?.map((roommate, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 transition-hover hover:border-indigo-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {roommate.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{roommate.name}</p>
                  <p className="text-xs text-slate-400">{roommate.id || 'Student'}</p>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors">
                <Smartphone size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default RoomDetails;
