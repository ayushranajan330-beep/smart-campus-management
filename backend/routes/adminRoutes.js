import express from 'express';
import {
  getDashboardStats,
  getComplaintAnalytics,
  getLeaveAnalytics,
  getOccupancy
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get('/dashboard-stats', getDashboardStats);
router.get('/complaint-analytics', getComplaintAnalytics);
router.get('/leave-analytics', getLeaveAnalytics);
router.get('/occupancy', getOccupancy);

export default router;
