import { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    // Connect to the backend socket server
    socketRef.current = io(import.meta.env.VITE_API_URL || 'http://localhost:5001', {
      transports: ['websocket'],
    });

    const socket = socketRef.current;

    // Join a private room based on user ID for targeted notifications
    socket.emit('join', user._id || user.id);

    // Listen for complaint status updates
    socket.on('complaintStatusUpdated', (updatedComplaint) => {
      toast.success(
        `🔔 Complaint "${updatedComplaint.title}" is now ${updatedComplaint.status}`,
        { duration: 5000, icon: '📋' }
      );
      // Dispatch a custom event so components can react
      window.dispatchEvent(new CustomEvent('complaintUpdated', { detail: updatedComplaint }));
    });

    // Listen for leave status updates
    socket.on('leaveStatusUpdated', (updatedLeave) => {
      const icon = updatedLeave.status === 'Approved' ? '✅' : updatedLeave.status === 'Rejected' ? '❌' : '⏳';
      toast(`${icon} Leave request ${updatedLeave.status}!`, { duration: 5000 });
      window.dispatchEvent(new CustomEvent('leaveUpdated', { detail: updatedLeave }));
    });

    // Listen for new notices (broadcast to all)
    socket.on('newNotice', (notice) => {
      toast(`📢 New Notice: ${notice.title}`, {
        duration: 6000,
        style: { background: '#4f46e5', color: '#fff', fontWeight: 'bold' }
      });
      window.dispatchEvent(new CustomEvent('newNoticeReceived', { detail: notice }));
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketContext;
