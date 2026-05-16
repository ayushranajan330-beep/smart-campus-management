import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, to, isOpen }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
        ${isActive 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }
      `}
    >
      <Icon size={22} className="shrink-0" />
      {isOpen && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-medium whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}
    </NavLink>
  );
};

export default SidebarItem;
