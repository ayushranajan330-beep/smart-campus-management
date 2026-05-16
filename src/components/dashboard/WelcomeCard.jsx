import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Calendar, Bell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const WelcomeCard = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[2rem] p-8 md:p-12 bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-slate-900 shadow-2xl shadow-indigo-500/20"
    >
      {/* Background Decor */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Welcome back, <span className="text-indigo-200">{user?.fullName || 'Student'}</span> 👋
          </motion.h1>
          <p className="text-indigo-100/80 text-lg max-w-md">
            You're currently in <span className="font-bold text-white">Room {user?.roomId || 'B-204'}</span>, 
            Hostel Block <span className="font-bold text-white">B</span>. Everything looks good today!
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/student/complaints">
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50 border-none shadow-xl">
                <MessageSquare className="mr-2" size={18} />
                Raise Complaint
              </Button>
            </Link>
            <Link to="/student/leave">
              <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                <Calendar className="mr-2" size={18} />
                Apply Leave
              </Button>
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden lg:block"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Bell className="text-white" size={24} />
              </div>
              <div>
                <p className="text-white font-bold">Latest Notice</p>
                <p className="text-indigo-200 text-xs">Posted 2h ago</p>
              </div>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              Hostel maintenance scheduled for <br /> next Saturday between 10AM - 4PM.
            </p>
            <button className="text-white text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
              See All Notices <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
