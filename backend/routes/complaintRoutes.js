import express from 'express';
import {
  createComplaint,
  getStudentComplaints,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
} from '../controllers/complaintController.js';
import { protect, adminOnly, studentOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Common routes
router.use(protect);

// Student specific
router.post('/', studentOnly, createComplaint);
router.get('/student', studentOnly, getStudentComplaints);

// Admin specific
router.get('/', adminOnly, getAllComplaints);
router.patch('/:id/status', adminOnly, updateComplaintStatus);
router.delete('/:id', adminOnly, deleteComplaint);

// Shared
router.get('/:id', getComplaintById);

export default router;
