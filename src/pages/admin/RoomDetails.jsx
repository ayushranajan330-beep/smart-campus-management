import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Home, 
  Users, 
  Settings, 
  UserMinus, 
  Repeat, 
  ShieldAlert,
  Loader2,
  Trash2,
  Edit,
  Info
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Card from '../../components/ui/Card';
import RoomStatusBadge from '../../components/rooms/RoomStatusBadge';

const AdminRoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/rooms/${id}`);
      setRoom(res.data);
    } catch (error) {
      toast.error('Failed to load room details');
      navigate('/admin/rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveOccupant = async (studentId) => {
    if (window.confirm('Are you sure you want to remove this student from the room?')) {
      try {
        await axios.patch(`http://localhost:5001/api/rooms/remove/${studentId}`);
        toast.success('Student removed from room');
        fetchRoom();
      } catch (error) {
        toast.error('Failed to remove student');
      }
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-6">
        <Loader2 className="animate-spin text-indigo-600" size={56} />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Accessing Room Records...</p>
      </div>
    );
  }

  if (!room) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/admin/rooms')}
            className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 text-slate-500 hover:text-indigo-500 transition-all shadow-xl group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Room {room.roomNumber}</h1>
              <RoomStatusBadge status={room.status} />
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
              {room.block} Block — {room.floor} Floor — {room.roomType}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-indigo-500 transition-all shadow-sm">
            <Edit size={20} />
          </button>
          <button className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-red-500 transition-all shadow-sm">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Occupants List */}
        <div className="lg:col-span-2 space-y-10">
          <Card className="p-0 overflow-hidden border-none shadow-2xl">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Users className="text-indigo-500" /> Current Occupants
              </h3>
              <span className="text-xs font-black bg-indigo-500/10 text-indigo-500 px-3 py-1 rounded-full">
                {room.occupants.length} / {room.capacity} Slots
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {room.occupants.length > 0 ? (
                room.occupants.map((student, idx) => (
                  <div key={idx} className="p-8 flex items-center justify-between group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-black text-2xl group-hover:scale-110 transition-transform shadow-sm">
                        {student.fullName[0]}
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">{student.fullName}</p>
                        <p className="text-sm text-slate-400 font-medium">{student.email}</p>
                        <p className="text-xs text-slate-500 mt-1">{student.phone || 'No phone provided'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-indigo-500 transition-all"
                        title="Change Room"
                      >
                        <Repeat size={18} />
                      </button>
                      <button 
                        onClick={() => handleRemoveOccupant(student._id)}
                        className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        title="Remove Occupant"
                      >
                        <UserMinus size={18} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center text-slate-400">
                  <p className="font-bold mb-2">Room is empty</p>
                  <p className="text-sm">Assign students to this room from the management panel.</p>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-10 border-none shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <Settings className="text-purple-500" /> Amenities
            </h3>
            <div className="flex flex-wrap gap-4">
              {room.amenities.map((amenity, idx) => (
                <div key={idx} className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-300">
                  {amenity}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Room Logs & Maintenance */}
        <div className="space-y-10">
          <Card className="p-8 border-none shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <ShieldAlert className="text-amber-500" /> Maintenance
            </h3>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">Room Status Control</p>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 px-4 rounded-xl bg-white dark:bg-slate-900 text-xs font-bold shadow-sm border border-slate-100 dark:border-slate-800 hover:border-indigo-500 transition-all">
                    Maintenance
                  </button>
                  <button className="py-3 px-4 rounded-xl bg-white dark:bg-slate-900 text-xs font-bold shadow-sm border border-slate-100 dark:border-slate-800 hover:border-indigo-500 transition-all">
                    Available
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recent Complaints</p>
                <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 text-xs text-red-600 dark:text-red-400 font-bold">
                  Fan regulator broken (Reported 2d ago)
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-none shadow-xl bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="flex items-center gap-3 mb-6">
              <Info className="text-indigo-400" />
              <h3 className="text-xl font-bold">Room History</h3>
            </div>
            <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-indigo-500 border-4 border-slate-900" />
                <p className="text-xs font-bold">Last inspection: Oct 2024</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Checked by Warden Verma</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-slate-700 border-4 border-slate-900" />
                <p className="text-xs font-bold">Furniture upgrade</p>
                <p className="text-[10px] text-slate-400 mt-0.5">New desks installed (Sep 2024)</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminRoomDetails;
