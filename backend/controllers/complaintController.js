import Complaint from '../models/Complaint.js';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private (Student)
export const createComplaint = async (req, res) => {
  try {
    const { title, category, description, priority, image } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const complaint = await Complaint.create({
      studentId: req.user.id,
      title,
      category,
      description,
      priority: priority || 'Low',
      image,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get student's complaints
// @route   GET /api/complaints/student
// @access  Private (Student)
export const getStudentComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ studentId: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private (Admin)
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({})
      .populate('studentId', 'fullName email')
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get complaint by ID
// @route   GET /api/complaints/:id
// @access  Private
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('studentId', 'fullName email');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Check if user is the student who created it or an admin
    if (complaint.studentId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update complaint status/remarks
// @route   PATCH /api/complaints/:id/status
// @access  Private (Admin)
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status, adminRemarks, assignedTo } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = status || complaint.status;
    if (adminRemarks) complaint.adminRemarks = adminRemarks;
    if (assignedTo) complaint.assignedTo = assignedTo;

    const updatedComplaint = await complaint.save();

    // Find student to get email
    const student = await User.findById(complaint.studentId);

    if (student) {
      // 1. Emit socket event
      const io = req.app.get('io');
      io.to(student._id.toString()).emit('complaintStatusUpdated', updatedComplaint);

      // 2. Send email notification
      const message = `
Hello ${student.fullName},

Your complaint status for "${complaint.title}" has been updated to: ${status}.
${adminRemarks ? `\nRemarks: ${adminRemarks}` : ''}

Regards,
Smart Campus Admin
      `;

      await sendEmail({
        email: student.email,
        subject: `Complaint Status Updated: ${status}`,
        message,
      });
    }

    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete complaint
// @route   DELETE /api/complaints/:id
// @access  Private (Admin)
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    await complaint.deleteOne();
    res.json({ message: 'Complaint removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
