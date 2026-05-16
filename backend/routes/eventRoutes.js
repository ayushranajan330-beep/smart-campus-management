import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Student & Admin (View)
router.get('/', getEvents);
router.get('/:id', getEventById);

// Admin only (Manage)
router.post('/', adminOnly, createEvent);
router.patch('/:id', adminOnly, updateEvent);
router.delete('/:id', adminOnly, deleteEvent);

export default router;
