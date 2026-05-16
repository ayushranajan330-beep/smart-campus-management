import Room from '../models/Room.js';
import User from '../models/User.js';

// @desc    Create new room
// @route   POST /api/rooms
// @access  Private (Admin)
export const createRoom = async (req, res) => {
  try {
    const { roomNumber, block, floor, roomType, capacity, amenities } = req.body;

    const roomExists = await Room.findOne({ roomNumber });
    if (roomExists) {
      return res.status(400).json({ message: 'Room already exists' });
    }

    const room = await Room.create({
      roomNumber,
      block,
      floor,
      roomType,
      capacity,
      amenities,
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Private (Admin)
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({}).populate('occupants', 'fullName email');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get room by ID
// @route   GET /api/rooms/:id
// @access  Private
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('occupants', 'fullName email phone profileImage');
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update room details
// @route   PATCH /api/rooms/:id
// @access  Private (Admin)
export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Private (Admin)
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Clear roomId from all occupants before deleting
    await User.updateMany({ roomId: req.params.id }, { $unset: { roomId: "" } });
    
    await room.deleteOne();
    res.json({ message: 'Room removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign student to room
// @route   PATCH /api/rooms/assign/:studentId
// @access  Private (Admin)
export const assignRoom = async (req, res) => {
  try {
    const { roomId } = req.body;
    const { studentId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.occupants.length >= room.capacity) {
      return res.status(400).json({ message: 'Room is already full' });
    }

    const user = await User.findById(studentId);
    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // If user already has a room, remove them from that room first
    if (user.roomId) {
      await Room.findByIdAndUpdate(user.roomId, { $pull: { occupants: studentId } });
    }

    // Assign new room
    user.roomId = roomId;
    await user.save();

    room.occupants.push(studentId);
    
    // Update status based on occupancy
    if (room.occupants.length === room.capacity) {
      room.status = 'Full';
    } else {
      room.status = 'Partially Occupied';
    }
    
    await room.save();

    res.json({ message: 'Room assigned successfully', room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove student from room
// @route   PATCH /api/rooms/remove/:studentId
// @access  Private (Admin)
export const removeStudentFromRoom = async (req, res) => {
  try {
    const { studentId } = req.params;

    const user = await User.findById(studentId);
    if (!user || !user.roomId) {
      return res.status(400).json({ message: 'Student has no room assigned' });
    }

    const roomId = user.roomId;
    user.roomId = undefined;
    await user.save();

    const room = await Room.findById(roomId);
    if (room) {
      room.occupants.pull(studentId);
      room.status = room.occupants.length === 0 ? 'Available' : 'Partially Occupied';
      await room.save();
    }

    res.json({ message: 'Student removed from room' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get student's own room details
// @route   GET /api/rooms/my-room
// @access  Private (Student)
export const getMyRoom = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'roomId',
      populate: {
        path: 'occupants',
        select: 'fullName email phone profileImage'
      }
    });

    if (!user.roomId) {
      return res.status(404).json({ message: 'No room assigned to you' });
    }

    res.json(user.roomId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
