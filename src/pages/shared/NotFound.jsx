import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-12"
      >
        <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />
        <div className="relative z-10 w-48 h-48 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl flex items-center justify-center text-indigo-600 border border-slate-100 dark:border-slate-800">
          <ShieldAlert size={80} strokeWidth={1.5} />
        </div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-4 -right-4 w-16 h-16 bg-red-500 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-red-500/40"
        >
          404
        </motion.div>
      </motion.div>

      <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
        Page Not Found
      </h1>
      <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-md mx-auto leading-relaxed font-medium">
        Oops! The page you're looking for doesn't exist or has been moved to another coordinate in the campus.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="secondary" 
          onClick={() => navigate(-1)}
          className="py-5 px-8 rounded-2xl flex items-center gap-3 border-2"
        >
          <ArrowLeft size={20} /> Go Back
        </Button>
        <Button 
          onClick={() => navigate('/')}
          className="py-5 px-8 rounded-2xl flex items-center gap-3 shadow-xl shadow-indigo-500/30"
        >
          <Home size={20} /> Back to Home
        </Button>
      </div>

      <div className="mt-20 flex items-center gap-4 text-slate-300 dark:text-slate-700 font-bold text-xs uppercase tracking-widest">
        <span>SmartCampus</span>
        <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
        <span>Secure Access</span>
      </div>
    </div>
  );
};

export default NotFound;
