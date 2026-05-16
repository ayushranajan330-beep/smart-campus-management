import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  Wifi, 
  Wind, 
  Coffee, 
  Monitor, 
  Table as TableIcon, 
  ShieldAlert,
  Loader2,
  MapPin,
  Layers
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import RoommateCard from '../../components/rooms/RoommateCard';
import RoomStatusBadge from '../../components/rooms/RoomStatusBadge';

const StudentRoomDetails = () => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRoom();
  }, []);

  const fetchMyRoom = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/rooms/my-room');
      setRoom(res.data);
    } catch (error) {
      // toast.error('No room assigned yet');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-6">
        <Loader2 className="animate-spin text-indigo-600" size={56} />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Syncing Room Data...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-6 text-center max-w-md mx-auto">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-slate-300">
          <Home size={48} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">No Room Assigned</h2>
        <p className="text-slate-500 leading-relaxed">
          You currently don't have a room assigned. Please contact the hostel warden or administration office for room allocation.
        </p>
      </div>
    );
  }

  const amenitiesMap = {
    'WiFi': <Wifi size={18} />,
    'AC': <Wind size={18} />,
    'Fan': <Wind size={18} />,
    'Bathroom': <Coffee size={18} />,
    'Study Table': <TableIcon size={18} />,
    'Monitor': <Monitor size={18} />
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">My Room</h1>
          <p className="text-slate-500 font-medium">Detailed overview of your current accommodation</p>
        </div>
        <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-indigo-500/5 border border-slate-100 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl">
            {room.roomNumber}
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
            <RoomStatusBadge status={room.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Room Info & Amenities */}
        <div className="lg:col-span-2 space-y-10">
          <Card className="p-10 border-none shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
              <div className="space-y-2">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={12} className="text-indigo-500" /> Block
                </p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{room.block} Block</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Layers size={12} className="text-purple-500" /> Floor
                </p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{room.floor}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Users size={12} className="text-pink-500" /> Type
                </p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{room.roomType}</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Amenities & Features</h3>
              <div className="flex flex-wrap gap-4">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-5 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-indigo-500/30 transition-all">
                    <div className="text-indigo-500 group-hover:scale-110 transition-transform">
                      {amenitiesMap[amenity] || <CheckCircle2 size={18} />}
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Roommates Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              Roommates <span className="text-sm font-medium text-slate-400">({room.occupants.length})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {room.occupants.map((occ, idx) => (
                <RoommateCard key={idx} student={occ} isSelf={false} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Rules & Info */}
        <div className="space-y-10">
          <Card className="p-8 border-none shadow-2xl bg-indigo-600 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <ShieldAlert size={40} className="mb-6 opacity-80" />
            <h3 className="text-2xl font-bold mb-4">Hostel Rules</h3>
            <ul className="space-y-4 text-indigo-100 text-sm">
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                No loud music or noise after 10:00 PM.
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                Visitors are not allowed inside rooms after 8:00 PM.
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                Maintain cleanliness in the room and common areas.
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                Smoking and alcohol are strictly prohibited.
              </li>
            </ul>
            <button className="w-full mt-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
              View Full Policy
            </button>
          </Card>

          <Card className="p-8 border-none shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Contacts</h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Hostel Warden</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">+91 98765 43210</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Security Desk</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">011-2345-6789</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentRoomDetails;
