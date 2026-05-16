import mongoose from 'mongoose';

const leaveRequestSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    fromDate: {
      type: Date,
      required: [true, 'Please add a start date'],
    },
    toDate: {
      type: Date,
      required: [true, 'Please add an end date'],
    },
    reason: {
      type: String,
      required: [true, 'Please add a reason'],
    },
    emergencyContact: {
      type: String,
      required: [true, 'Please add an emergency contact'],
    },
    destination: {
      type: String,
      required: [true, 'Please add a destination'],
    },
    parentApproval: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    adminRemarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

export default LeaveRequest;
