import LeaveRequest from '../models/LeaveRequest.js';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Create new leave request
// @route   POST /api/leaves
// @access  Private (Student)
export const createLeaveRequest = async (req, res) => {
  try {
    const { fromDate, toDate, reason, emergencyContact, destination } = req.body;

    if (!fromDate || !toDate || !reason || !emergencyContact || !destination) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const leave = await LeaveRequest.create({
      studentId: req.user.id,
      fromDate,
      toDate,
      reason,
      emergencyContact,
      destination,
    });

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get student's leave requests
// @route   GET /api/leaves/student
// @access  Private (Student)
export const getStudentLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ studentId: req.user.id }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all leave requests
// @route   GET /api/leaves
// @access  Private (Admin)
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({})
      .populate('studentId', 'fullName email')
      .sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get leave request by ID
// @route   GET /api/leaves/:id
// @access  Private
export const getLeaveById = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id).populate('studentId', 'fullName email');

    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    // Check if user is the student who created it or an admin
    if (leave.studentId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update leave status
// @route   PATCH /api/leaves/:id/status
// @access  Private (Admin)
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status, adminRemarks } = req.body;

    const leave = await LeaveRequest.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    leave.status = status || leave.status;
    leave.adminRemarks = adminRemarks || leave.adminRemarks;

    const updatedLeave = await leave.save();

    // Find student to get email
    const student = await User.findById(leave.studentId);

    if (student) {
      // 1. Emit socket event
      const io = req.app.get('io');
      io.to(student._id.toString()).emit('leaveStatusUpdated', updatedLeave);

      // 2. Send email notification
      const message = `
Hello ${student.fullName},

Your leave request from ${new Date(leave.fromDate).toLocaleDateString()} to ${new Date(leave.toDate).toLocaleDateString()} has been ${status}.
${adminRemarks ? `\nRemarks: ${adminRemarks}` : ''}

Regards,
Smart Campus Admin
      `;

      await sendEmail({
        email: student.email,
        subject: `Leave Request ${status}`,
        message,
      });
    }

    res.json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete leave request
// @route   DELETE /api/leaves/:id
// @access  Private (Admin)
export const deleteLeaveRequest = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    await leave.deleteOne();
    res.json({ message: 'Leave request removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
