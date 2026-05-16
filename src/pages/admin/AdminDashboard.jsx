import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Clock, 
  Home, 
  CheckCircle2, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import AdminHero from '../../components/admin/AdminHero';
import AnalyticsCard from '../../components/admin/AnalyticsCard';
import ComplaintChart from '../../components/admin/ComplaintChart';
import LeavePreview from '../../components/admin/LeavePreview';
import QuickActionCard from '../../components/admin/QuickActionCard';
import ComplaintTable from '../../components/dashboard/ComplaintTable';
import { DashboardSkeleton } from '../../components/ui/Skeleton';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [recentComplaints, setRecentComplaints] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // In real app, call APIs:
        // const [statsRes, analyticsRes, complaintsRes] = await Promise.all([
        //   axios.get('http://localhost:5001/api/admin/dashboard-stats'),
        //   axios.get('http://localhost:5001/api/admin/complaint-analytics'),
        //   axios.get('http://localhost:5001/api/complaints')
        // ]);

        // Mocking data for now
        setTimeout(() => {
          setStats({
            totalStudents: '1,240',
            activeComplaints: '12',
            pendingLeaves: '14',
            occupancyRate: '82%',
            resolvedComplaints: '450',
            upcomingEvents: '03'
          });

          setAnalytics({
            trendData: [
              { month: 'Jan', count: 45 },
              { month: 'Feb', count: 52 },
              { month: 'Mar', count: 48 },
              { month: 'Apr', count: 70 },
              { month: 'May', count: 65 },
              { month: 'Jun', count: 80 }
            ],
            categoryData: [
              { name: 'WiFi', value: 400 },
              { name: 'Plumbing', value: 300 },
              { name: 'Electricity', value: 300 },
              { name: 'Furniture', value: 200 }
            ],
            leaveRequests: [
              { studentName: 'Ayush Sharma', duration: '3 Days', reason: 'Medical Checkup' },
              { studentName: 'Priya Patel', duration: '2 Days', reason: 'Family Event' },
              { studentName: 'Rohan Gupta', duration: '1 Day', reason: 'Interview' },
              { studentName: 'Sanya Malhotra', duration: '5 Days', reason: 'Home Visit' }
            ]
          });

          setRecentComplaints([
            { id: '#CMP-9041', title: 'WiFi not working in B-204', category: 'IT/Network', status: 'Pending', studentName: 'John Doe' },
            { id: '#CMP-8822', title: 'Water leakage in bathroom', category: 'Plumbing', status: 'In Progress', studentName: 'Jane Smith' },
            { id: '#CMP-7611', title: 'Fan regulator broken', category: 'Electrical', status: 'Resolved', studentName: 'Alex Lee' }
          ]);

          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching admin data', error);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) return <DashboardSkeleton />;

  const analyticsCards = [
    { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'bg-blue-500', trend: 'up', trendValue: '+12%' },
    { label: 'Active Complaints', value: stats.activeComplaints, icon: MessageSquare, color: 'bg-red-500', trend: 'down', trendValue: '-5%' },
    { label: 'Pending Leaves', value: stats.pendingLeaves, icon: Clock, color: 'bg-amber-500', trend: 'up', trendValue: '+8%' },
    { label: 'Hostel Occupancy', value: stats.occupancyRate, icon: Home, color: 'bg-indigo-500', trend: 'up', trendValue: '+2%' },
    { label: 'Resolved Issues', value: stats.resolvedComplaints, icon: CheckCircle2, color: 'bg-green-500', trend: 'up', trendValue: '+24%' },
    { label: 'Upcoming Events', value: stats.upcomingEvents, icon: Calendar, color: 'bg-purple-500', trend: 'up', trendValue: 'New' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <AdminHero user={user} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {analyticsCards.map((card, i) => (
          <AnalyticsCard key={i} {...card} index={i} />
        ))}
      </div>

      {/* Analytics Charts */}
      <ComplaintChart 
        trendData={analytics.trendData} 
        categoryData={analytics.categoryData} 
      />

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ComplaintTable complaints={recentComplaints} />
        </div>
        <div className="h-full">
          <LeavePreview requests={analytics.leaveRequests} />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActionCard />
    </div>
  );
};

export default AdminDashboard;
