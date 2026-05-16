import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Building, Edit3, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-64 rounded-[3rem] overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500" />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute -bottom-10 left-10 flex items-end gap-6">
          <div className="relative group">
            <div className="w-40 h-40 rounded-[2.5rem] bg-white p-2 shadow-2xl overflow-hidden border-4 border-white dark:border-slate-800">
              <div className="w-full h-full rounded-[2rem] bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-indigo-600">
                <User size={64} />
              </div>
            </div>
            <button className="absolute bottom-4 right-4 p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform opacity-0 group-hover:opacity-100 duration-300">
              <Camera size={20} />
            </button>
          </div>
          
          <div className="pb-14">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{user?.fullName}</h1>
            <p className="text-indigo-100 font-medium capitalize">{user?.role} • Student ID: #STU-{user?._id?.slice(-6).toUpperCase()}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
        {/* Contact Info */}
        <Card className="p-8 space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User size={20} className="text-indigo-500" />
            Basic Info
          </h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Full Name</p>
              <p className="text-slate-700 dark:text-slate-200 font-medium">{user?.fullName}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <Mail size={16} className="text-slate-400" />
                <span className="font-medium">{user?.email}</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Account Role</p>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <Shield size={16} className="text-slate-400" />
                <span className="font-medium capitalize">{user?.role}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Academic/Hostel Info */}
        <div className="md:col-span-2 space-y-8">
          <Card className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Building size={24} className="text-indigo-500" />
                Hostel Details
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-500 rounded-xl text-sm font-bold hover:bg-indigo-500 hover:text-white transition-all">
                <Edit3 size={16} />
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">Assigned Room</p>
                <p className="text-4xl font-black text-center text-indigo-600 dark:text-indigo-400">B-204</p>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">Hostel Block</p>
                <p className="text-4xl font-black text-center text-purple-600 dark:text-purple-400">B</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 space-y-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Security Settings</h3>
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div>
                  <p className="font-bold text-slate-700 dark:text-slate-200">Password</p>
                  <p className="text-xs text-slate-400">Last changed 2 months ago</p>
                </div>
                <button className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold shadow-sm border border-slate-100 dark:border-slate-700">
                  Update
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
