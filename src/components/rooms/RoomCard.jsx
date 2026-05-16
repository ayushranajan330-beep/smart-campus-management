import React from 'react';
import { motion } from 'framer-motion';
import { Users, Layers, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import RoomStatusBadge from './RoomStatusBadge';

const RoomCard = ({ room }) => {
  const occupancyPercentage = (room.occupants.length / room.capacity) * 100;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="p-6 border-none shadow-lg h-full flex flex-col group">
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-xl text-slate-900 dark:text-white group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            {room.roomNumber}
          </div>
          <RoomStatusBadge status={room.status} />
        </div>

        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1.5 font-bold">
              <MapPin size={14} className="text-indigo-500" /> {room.block} BLOCK
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <Layers size={14} className="text-purple-500" /> {room.floor} FLOOR
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
              <span>Occupancy</span>
              <span>{room.occupants.length} / {room.capacity}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${occupancyPercentage}%` }}
                className={`h-full rounded-full ${
                  occupancyPercentage === 100 ? 'bg-purple-500' : 'bg-indigo-500'
                }`}
              />
            </div>
          </div>
          
          <div className="pt-4 flex flex-wrap gap-2">
            {room.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="text-[10px] font-bold px-2 py-1 bg-slate-50 dark:bg-slate-800/50 text-slate-400 rounded-md">
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-[10px] font-bold px-2 py-1 bg-slate-50 dark:bg-slate-800/50 text-slate-400 rounded-md">
                +{room.amenities.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex -space-x-3">
            {room.occupants.slice(0, 3).map((occ, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                {occ.fullName[0]}
              </div>
            ))}
            {room.occupants.length > 3 && (
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
                +{room.occupants.length - 3}
              </div>
            )}
          </div>
          <Link to={`/admin/rooms/${room._id}`}>
            <button className="p-2 text-slate-400 hover:text-indigo-500 transition-colors">
              <ChevronRight size={20} />
            </button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default RoomCard;
