import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Loader2, UserCheck, Home, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import Button from '../ui/Button';

const RoomAllocationModal = ({ isOpen, onClose, onSubmit, isLoading, rooms }) => {
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchStudents();
    }
  }, [isOpen]);

  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      // In a real app, fetch students who don't have a room
      // For now, mock or fetch all
      const res = await axios.get('http://localhost:5001/api/auth/me'); // Just a placeholder
      setStudents([
        { _id: 'S1', fullName: 'Ayush Sharma', email: 'ayush@example.com' },
        { _id: 'S2', fullName: 'Priya Patel', email: 'priya@example.com' },
        { _id: 'S3', fullName: 'Rahul Verma', email: 'rahul@example.com' }
      ]);
    } catch (error) {
      console.error('Error fetching students', error);
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleAllocate = (e) => {
    e.preventDefault();
    onSubmit({ studentId: selectedStudent, roomId: selectedRoom });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Allocate Room</h2>
              <p className="text-slate-500 text-sm mt-1">Assign a student to a vacant room slot</p>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors">
              <X size={24} className="text-slate-500" />
            </button>
          </div>

          <form onSubmit={handleAllocate} className="space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-2">
                <UserCheck size={16} className="text-indigo-500" /> Select Student
              </label>
              <select
                required
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer appearance-none"
              >
                <option value="">Select Student...</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>{s.fullName} ({s.email})</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-2">
                <Home size={16} className="text-purple-500" /> Select Room
              </label>
              <select
                required
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer appearance-none"
              >
                <option value="">Select Room...</option>
                {rooms?.filter(r => r.status !== 'Full' && r.status !== 'Maintenance').map((r) => (
                  <option key={r._id} value={r._id}>
                    Room {r.roomNumber} - {r.block} Block ({r.occupants.length}/{r.capacity})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-4">
              <AlertTriangle className="text-amber-500 shrink-0" size={20} />
              <p className="text-xs text-amber-600 dark:text-amber-500 font-medium">
                Allocation will automatically update the room occupancy status. Students already assigned will be transferred.
              </p>
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="button" variant="secondary" onClick={onClose} className="flex-1 py-5 rounded-2xl">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || !selectedStudent || !selectedRoom} className="flex-1 py-5 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20">
                {isLoading ? (
                  <><Loader2 className="animate-spin" size={20} /> Allocating...</>
                ) : (
                  <><UserCheck size={20} /> Assign Room</>
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default RoomAllocationModal;
