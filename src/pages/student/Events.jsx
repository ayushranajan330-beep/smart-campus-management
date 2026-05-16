import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar as CalIcon, 
  Loader2, 
  Trophy, 
  Music, 
  BookOpen, 
  Home, 
  AlertTriangle, 
  Layers,
  ArrowRight
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import EventCard from '../../components/events/EventCard';
import Card from '../../components/ui/Card';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/events');
      setEvents(res.data);
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         e.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || e.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { name: 'All', icon: Layers, color: 'text-slate-400' },
    { name: 'Sports', icon: Trophy, color: 'text-orange-500' },
    { name: 'Cultural', icon: Music, color: 'text-pink-500' },
    { name: 'Academic', icon: BookOpen, color: 'text-blue-500' },
    { name: 'Hostel', icon: Home, color: 'text-indigo-500' },
    { name: 'Emergency', icon: AlertTriangle, color: 'text-red-500' },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Campus Events</h1>
          <p className="text-slate-500 font-medium">Discover what's happening around the campus</p>
        </div>
        <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-indigo-500/5 border border-slate-100 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <CalIcon size={24} />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">{events.length}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Scheduled Events</p>
          </div>
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 custom-scrollbar no-scrollbar">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setFilterCategory(cat.name)}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all border shrink-0 font-bold text-sm ${
              filterCategory === cat.name 
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-500/20' 
              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-indigo-500/30'
            }`}
          >
            <cat.icon size={18} className={filterCategory === cat.name ? 'text-white' : cat.color} />
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search for event title or venue..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-16 pr-8 py-6 bg-white dark:bg-slate-900 border-none rounded-[2rem] text-lg font-medium shadow-2xl shadow-indigo-500/5 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="py-24 flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-indigo-600" size={48} />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Syncing Calendar...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, idx) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-300 mx-auto mb-6">
                  <CalIcon size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Events Found</h3>
                <p className="text-slate-500">Try searching for something else or check other categories.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Events;
