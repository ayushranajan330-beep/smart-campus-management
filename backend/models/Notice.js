import mongoose from 'mongoose';

const noticeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a notice title'],
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
    },
    priority: {
      type: String,
      required: true,
      enum: ['Normal', 'Important', 'Urgent'],
      default: 'Normal',
    },
    attachment: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;
