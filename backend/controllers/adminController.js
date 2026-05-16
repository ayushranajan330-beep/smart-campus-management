import User from '../models/User.js';
import Complaint from '../models/Complaint.js';

// @desc    Get dashboard summary stats
// @route   GET /api/admin/dashboard-stats
// @access  Private (Admin)
export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const activeComplaints = await Complaint.countDocuments({ status: { $ne: 'Resolved' } });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
    
    // Mocking leaves and events for now as they aren't implemented yet
    const pendingLeaves = 14; 
    const occupancyRate = 82;
    const upcomingEvents = 3;

    res.json({
      totalStudents,
      activeComplaints,
      pendingLeaves,
      occupancyRate,
      resolvedComplaints,
      upcomingEvents
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get complaint analytics data
// @route   GET /api/admin/complaint-analytics
// @access  Private (Admin)
export const getComplaintAnalytics = async (req, res) => {
  try {
    // Complaint by Category aggregation
    const categoryData = await Complaint.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Monthly trends (last 6 months)
    // For now returning mock trend data since DB might not have enough history
    const monthlyTrend = [
      { month: 'Jan', count: 45 },
      { month: 'Feb', count: 52 },
      { month: 'Mar', count: 48 },
      { month: 'Apr', count: 70 },
      { month: 'May', count: 65 },
      { month: 'Jun', count: 80 }
    ];

    res.json({
      categoryData: categoryData.map(item => ({ name: item._id, value: item.count })),
      monthlyTrend
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get leave analytics
// @route   GET /api/admin/leave-analytics
// @access  Private (Admin)
export const getLeaveAnalytics = async (req, res) => {
  try {
    // Mocking leave data
    const leaveData = [
      { name: 'Approved', value: 120, color: '#10b981' },
      { name: 'Pending', value: 45, color: '#f59e0b' },
      { name: 'Rejected', value: 15, color: '#ef4444' }
    ];
    res.json(leaveData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get occupancy details
// @route   GET /api/admin/occupancy
// @access  Private (Admin)
export const getOccupancy = async (req, res) => {
  try {
    res.json({
      totalRooms: 500,
      occupiedRooms: 410,
      vacantRooms: 90,
      occupancyPercentage: 82
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
