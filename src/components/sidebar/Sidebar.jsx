import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Calendar, 
  Bell, 
  User, 
  Settings, 
  Users, 
  Home, 
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Sidebar = ({ role = 'student' }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout, user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRoleSwitch = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/auth` : 'http://localhost:5001/api/auth';
      const res = await axios.patch(`${API_URL}/switch-role`);
      
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      
      const newRole = res.data.role;
      toast.success(`Switched to ${newRole} mode`);
      
      navigate(newRole === 'admin' ? '/admin/dashboard' : '/student/dashboard');
      window.location.reload(); 
    } catch (err) {
      toast.error('Failed to switch role');
      console.error(err);
    }
  };

  const studentItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/student/dashboard' },
    { icon: Home, label: 'Room Details', to: '/student/room' },
    { icon: MessageSquare, label: 'Complaints', to: '/student/complaints' },
    { icon: FileText, label: 'Leave Request', to: '/student/leave' },
    { icon: Calendar, label: 'Events', to: '/student/events' },
    { icon: Bell, label: 'Notices', to: '/student/notices' },
    { icon: User, label: 'Profile', to: '/student/profile' },
    { icon: Settings, label: 'Settings', to: '/student/settings' },
  ];

  const adminItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/admin/dashboard' },
    { icon: Users, label: 'Students', to: '/admin/students' },
    { icon: MessageSquare, label: 'Complaints', to: '/admin/complaints' },
    { icon: Home, label: 'Room Allocation', to: '/admin/rooms' },
    { icon: FileText, label: 'Leave Requests', to: '/admin/leave' },
    { icon: Calendar, label: 'Events', to: '/admin/events' },
    { icon: Bell, label: 'Notices', to: '/admin/notices' },
    { icon: BarChart3, label: 'Analytics', to: '/admin/analytics' },
  ];

  const menuItems = role === 'admin' ? adminItems : studentItems;

  return (
    <motion.aside
      animate={{ width: isOpen ? 260 : 80 }}
      className="relative flex flex-col h-screen bg-slate-900 border-r border-slate-800 transition-all duration-300 z-50"
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Home className="text-white" size={24} />
        </div>
        {isOpen && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-white tracking-tight"
          >
            SmartCampus
          </motion.h1>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.label} 
            {...item} 
            isOpen={isOpen} 
          />
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <button 
          onClick={handleRoleSwitch}
          className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300 transition-all duration-300"
        >
          <Users size={22} />
          {isOpen && <span className="font-medium">Switch to {user?.role === 'admin' ? 'Student' : 'Admin'}</span>}
        </button>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
        >
          <LogOut size={22} />
          {isOpen && <span className="font-medium">Logout</span>}
        </button>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-20 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </motion.aside>
  );
};

export default Sidebar;
