import mongoose from 'mongoose';

const complaintSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: [
        'Fan Not Working',
        'WiFi Issue',
        'Plumbing Problem',
        'Electricity Issue',
        'Furniture Damage',
        'Cleaning Issue',
        'Other',
      ],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    priority: {
      type: String,
      required: [true, 'Please add priority'],
      enum: ['Low', 'Medium', 'High'],
      default: 'Low',
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'In Progress', 'Resolved'],
      default: 'Pending',
    },
    adminRemarks: {
      type: String,
    },
    assignedTo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;
