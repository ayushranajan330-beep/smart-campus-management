import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Card from '../ui/Card';

const EventCard = ({ event }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="p-0 overflow-hidden h-full group flex flex-col">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={event.image || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
            alt={event.title}
          />
          <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg">
            Upcoming
          </div>
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-500 transition-colors">
            {event.title}
          </h3>
          
          <div className="space-y-2 mb-4 flex-1">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
              <Calendar size={14} className="text-indigo-500" />
              {event.date}
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
              <Clock size={14} className="text-indigo-500" />
              {event.time}
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
              <MapPin size={14} className="text-indigo-500" />
              {event.venue}
            </div>
          </div>
          
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {event.description}
          </p>

          <button className="w-full py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white transition-all">
            Join Event
          </button>
        </div>
      </Card>
    </motion.div>
  );
};

export default EventCard;
