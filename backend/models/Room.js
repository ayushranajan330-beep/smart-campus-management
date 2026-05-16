import mongoose from 'mongoose';

const roomSchema = mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, 'Please add a room number'],
      unique: true,
    },
    block: {
      type: String,
      required: [true, 'Please add a block'],
    },
    floor: {
      type: String,
      required: [true, 'Please add a floor'],
    },
    roomType: {
      type: String,
      required: [true, 'Please add a room type'],
      enum: ['Single', 'Double', 'Triple', 'Dormitory'],
    },
    capacity: {
      type: Number,
      required: [true, 'Please add capacity'],
    },
    occupants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ['Available', 'Partially Occupied', 'Full', 'Maintenance'],
      default: 'Available',
    },
    amenities: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model('Room', roomSchema);

export default Room;
