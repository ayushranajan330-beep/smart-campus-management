import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, MessageSquare, Home, Bell } from 'lucide-react';
import Button from '../ui/Button';

const AdminHero = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-14 mb-8"
    >
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 -z-10" />
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[80%] rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 relative z-10">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold"
          >
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            System Administrator
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Welcome back, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {user?.fullName || 'Warden'}
            </span> 👋
          </h1>
          
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
            Campus operations are running smoothly. You have <span className="text-white font-bold">14 pending</span> leave requests and <span className="text-white font-bold">8 new</span> complaints to review today.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20 px-8 py-4">
              <UserPlus className="mr-2" size={20} /> Add Student
            </Button>
            <Button variant="secondary" className="bg-slate-800 hover:bg-slate-700 text-white border-slate-700 px-8 py-4">
              <Bell className="mr-2" size={20} /> Post Notice
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl min-w-[320px]"
        >
          <h3 className="text-white font-bold mb-6 flex items-center justify-between">
            Hostel Occupancy
            <span className="text-indigo-400 text-sm">Live</span>
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400 font-medium">B-Block Occupied</span>
                <span className="text-white font-bold">92%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '92%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400 font-medium">A-Block Occupied</span>
                <span className="text-white font-bold">78%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-extrabold text-white">410</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Occupied</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-400">90</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Vacant</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminHero;
