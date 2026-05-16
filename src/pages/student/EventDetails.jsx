import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar as CalIcon, 
  Clock, 
  MapPin, 
  User, 
  Share2, 
  Loader2,
  Info,
  CalendarCheck
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import EventBadge from '../../components/events/EventBadge';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        toast.error('Event not found');
        navigate('/student/events');
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-6">
        <Loader2 className="animate-spin text-indigo-600" size={56} />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Opening Invitation...</p>
      </div>
    );
  }

  if (!event) return null;

  const eventDate = new Date(event.date);

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      {/* Premium Hero Header */}
      <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl">
        {event.image ? (
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800" />
        )}
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        <button 
          onClick={() => navigate('/student/events')}
          className="absolute top-8 left-8 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all z-20 group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="absolute bottom-10 left-10 right-10 z-20">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <EventBadge category={event.category} />
            <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <CalendarCheck size={14} /> Open to all Students
            </div>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-4 drop-shadow-xl">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-8 text-white/80">
            <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm">
              <CalIcon size={18} className="text-indigo-400" /> 
              {eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
            <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm">
              <Clock size={18} className="text-purple-400" /> {event.time}
            </div>
            <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm">
              <MapPin size={18} className="text-pink-400" /> {event.venue}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <Card className="p-10 border-none shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <Info className="text-indigo-500" /> About the Event
            </h3>
            
            <div className="prose prose-indigo dark:prose-invert max-w-none">
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-10">
          <Card className="p-8 border-none shadow-xl bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <h3 className="text-xl font-bold mb-8">Organizer Information</h3>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center font-black text-xl shadow-lg">
                {event.createdBy?.fullName[0] || 'A'}
              </div>
              <div>
                <p className="text-lg font-bold">{event.createdBy?.fullName || 'Campus Administration'}</p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Authorized Organizer</p>
              </div>
            </div>
            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20">
              <Share2 size={18} /> Share Event
            </button>
          </Card>

          <Card className="p-8 border-none shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Need Help?</h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              If you have any questions regarding this event, please contact the hostel warden's office.
            </p>
            <button className="w-full py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-all">
              Contact Organizer
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
