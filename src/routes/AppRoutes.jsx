import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout';

// Auth & Shared (Static import for entry points)
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import LandingPage from '../pages/shared/LandingPage';
import NotFound from '../pages/shared/NotFound';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Lazy Loaded Pages
const StudentDashboard = lazy(() => import('../pages/student/StudentDashboard'));
const Complaints = lazy(() => import('../pages/student/Complaints'));
const ComplaintDetails = lazy(() => import('../pages/student/ComplaintDetails'));
const LeaveRequest = lazy(() => import('../pages/student/LeaveRequest'));
const LeaveDetails = lazy(() => import('../pages/student/LeaveDetails'));
const StudentRoomDetails = lazy(() => import('../pages/student/RoomDetails'));
const Events = lazy(() => import('../pages/student/Events'));
const EventDetails = lazy(() => import('../pages/student/EventDetails'));
const Notices = lazy(() => import('../pages/student/Notices'));
const NoticeDetails = lazy(() => import('../pages/student/NoticeDetails'));
const Profile = lazy(() => import('../pages/student/Profile'));
const Settings = lazy(() => import('../pages/student/Settings'));

// Admin Lazy Loaded Pages
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const ManageStudents = lazy(() => import('../pages/admin/ManageStudents'));
const ManageComplaints = lazy(() => import('../pages/admin/ManageComplaints'));
const ManageLeaves = lazy(() => import('../pages/admin/ManageLeaves'));
const RoomManagement = lazy(() => import('../pages/admin/RoomManagement'));
const AdminRoomDetails = lazy(() => import('../pages/admin/RoomDetails'));
const ManageEvents = lazy(() => import('../pages/admin/ManageEvents'));
const ManageNotices = lazy(() => import('../pages/admin/ManageNotices'));
const Analytics = lazy(() => import('../pages/admin/Analytics'));

const LoadingFallback = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-6">
    <div className="relative">
      <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full animate-pulse" />
      <Loader2 className="animate-spin text-indigo-600 relative z-10" size={56} />
    </div>
    <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">
      Initializing Secure Environment...
    </p>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Routes */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/student" element={<DashboardLayout role="student" />}>
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="room" element={<StudentRoomDetails />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="complaints/:id" element={<ComplaintDetails />} />
            <Route path="leave" element={<LeaveRequest />} />
            <Route path="leave/:id" element={<LeaveDetails />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route path="notices" element={<Notices />} />
            <Route path="notices/:id" element={<NoticeDetails />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<DashboardLayout role="admin" />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="complaints" element={<ManageComplaints />} />
            <Route path="rooms" element={<RoomManagement />} />
            <Route path="rooms/:id" element={<AdminRoomDetails />} />
            <Route path="leave" element={<ManageLeaves />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="notices" element={<ManageNotices />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
