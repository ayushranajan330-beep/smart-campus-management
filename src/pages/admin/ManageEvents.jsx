import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Loader2, 
  Edit, 
  Trash2, 
  Calendar as CalIcon,
  MapPin,
  Clock,
  MoreVertical
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import EventCard from '../../components/events/EventCard';
import EventForm from '../../components/events/EventForm';
import EventBadge from '../../components/events/EventBadge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const handleCreateOrUpdate = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedEvent) {
        await axios.patch(`http://localhost:5001/api/events/${selectedEvent._id}`, formData);
        toast.success('Event updated successfully');
      } else {
        await axios.post('http://localhost:5001/api/events', formData);
        toast.success('Event scheduled successfully');
      }
      setIsFormOpen(false);
      setSelectedEvent(null);
      fetchEvents();
    } catch (error) {
      toast.error('Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5001/api/events/${id}`);
        toast.success('Event removed');
        fetchEvents();
      } catch (error) {
        toast.error('Failed to delete event');
      }
    }
  };

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Events</h1>
          <p className="text-slate-500 dark:text-slate-400">Schedule and oversee campus activities</p>
        </div>
        <Button onClick={() => { setSelectedEvent(null); setIsFormOpen(true); }} className="py-4 shadow-xl shadow-indigo-500/20 px-8">
          <Plus size={20} className="mr-2" /> Schedule New Event
        </Button>
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-xl">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by title or venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 shadow-sm">
              <Filter size={18} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-24 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-indigo-600" size={48} />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Event Records...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-400 text-[10px] uppercase font-bold tracking-[0.2em]">
                <tr>
                  <th className="px-8 py-6">Event Details</th>
                  <th className="px-8 py-6">Date & Time</th>
                  <th className="px-8 py-6">Venue</th>
                  <th className="px-8 py-6">Category</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((e) => (
                    <tr key={e._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                            {e.title[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{e.title}</p>
                            <p className="text-xs text-slate-400 font-medium line-clamp-1 max-w-[200px]">{e.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                          <CalIcon size={14} className="text-indigo-400" />
                          {new Date(e.date).toLocaleDateString()}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <Clock size={12} /> {e.time}
                        </p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                          <MapPin size={14} className="text-purple-400" /> {e.venue}
                        </p>
                      </td>
                      <td className="px-8 py-6">
                        <EventBadge category={e.category} />
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => { setSelectedEvent(e); setIsFormOpen(true); }}
                            className="p-3 text-slate-400 hover:text-indigo-500 transition-all bg-slate-100 dark:bg-slate-800 rounded-2xl"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(e._id)}
                            className="p-3 text-slate-400 hover:text-red-500 transition-all bg-slate-100 dark:bg-slate-800 rounded-2xl"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-8 py-24 text-center">
                      <p className="text-slate-500 font-bold">No events scheduled yet.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <EventForm
            isOpen={isFormOpen}
            onClose={() => { setIsFormOpen(false); setSelectedEvent(null); }}
            onSubmit={handleCreateOrUpdate}
            isLoading={isSubmitting}
            initialData={selectedEvent}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageEvents;
