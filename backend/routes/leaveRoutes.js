import express from 'express';
import {
  createLeaveRequest,
  getStudentLeaves,
  getAllLeaves,
  getLeaveById,
  updateLeaveStatus,
  deleteLeaveRequest,
} from '../controllers/leaveController.js';
import { protect, adminOnly, studentOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Student routes
router.post('/', studentOnly, createLeaveRequest);
router.get('/student', studentOnly, getStudentLeaves);

// Admin routes
router.get('/', adminOnly, getAllLeaves);
router.patch('/:id/status', adminOnly, updateLeaveStatus);
router.delete('/:id', adminOnly, deleteLeaveRequest);

// Shared
router.get('/:id', getLeaveById);

export default router;
