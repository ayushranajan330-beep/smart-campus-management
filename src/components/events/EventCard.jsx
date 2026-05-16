import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import EventBadge from './EventBadge';

const EventCard = ({ event, isAdmin = false, onDelete }) => {
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('default', { month: 'short' });

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="p-0 border-none shadow-xl flex flex-col h-full overflow-hidden group">
        {/* Date & Category Overlay */}
        <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <div className="absolute top-4 left-4 z-10">
            <EventBadge category={event.category} />
          </div>
          
          <div className="absolute top-4 right-4 z-10 w-12 h-14 bg-white dark:bg-slate-900 rounded-2xl flex flex-col items-center justify-center shadow-lg border border-slate-100 dark:border-slate-800">
            <span className="text-lg font-black text-slate-900 dark:text-white leading-none">{day}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{month}</span>
          </div>

          {event.image ? (
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
              <Calendar size={48} className="text-indigo-500 opacity-20" />
            </div>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-1 group-hover:text-indigo-500 transition-colors">
            {event.title}
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <Clock size={16} className="text-indigo-500" />
              <span className="text-sm font-bold">{event.time}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <MapPin size={16} className="text-purple-500" />
              <span className="text-sm font-bold">{event.venue}</span>
            </div>
          </div>

          <p className="text-sm text-slate-400 line-clamp-2 mb-6 flex-1">
            {event.description}
          </p>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <User size={12} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">By Admin</span>
            </div>
            
            <Link to={isAdmin ? `/admin/events/${event._id}` : `/student/events/${event._id}`}>
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-500 hover:gap-3 transition-all">
                Details <ChevronRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default EventCard;
