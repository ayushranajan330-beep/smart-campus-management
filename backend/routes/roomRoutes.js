import express from 'express';
import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  assignRoom,
  removeStudentFromRoom,
  getMyRoom
} from '../controllers/roomController.js';
import { protect, adminOnly, studentOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Student routes
router.get('/my-room', studentOnly, getMyRoom);

// Shared
router.get('/:id', getRoomById);

// Admin routes
router.post('/', adminOnly, createRoom);
router.get('/', adminOnly, getAllRooms);
router.patch('/:id', adminOnly, updateRoom);
router.delete('/:id', adminOnly, deleteRoom);

// Allocation routes
router.patch('/assign/:studentId', adminOnly, assignRoom);
router.patch('/remove/:studentId', adminOnly, removeStudentFromRoom);

export default router;
