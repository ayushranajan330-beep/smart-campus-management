import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ role }) => {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0b1120] transition-colors duration-300">
      <Sidebar role={role} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
