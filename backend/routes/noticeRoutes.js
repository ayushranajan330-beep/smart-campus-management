import express from 'express';
import {
  createNotice,
  getNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
} from '../controllers/noticeController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Student & Admin (View)
router.get('/', getNotices);
router.get('/:id', getNoticeById);

// Admin only (Manage)
router.post('/', adminOnly, createNotice);
router.patch('/:id', adminOnly, updateNotice);
router.delete('/:id', adminOnly, deleteNotice);

export default router;
