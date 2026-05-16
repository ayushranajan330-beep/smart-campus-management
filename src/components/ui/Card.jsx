import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', animate = true }) => {
  const content = (
    <div className={`bg-white dark:bg-slate-900/40 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-xl ${className}`}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      {content}
    </motion.div>
  );
};

export default Card;
