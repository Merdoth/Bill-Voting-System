import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  voteStatus: {
    type: String,
    required: true,
    enum: ['open', 'closed'],
  },
  upVoteCount: {
    type: Number,
    required: true,
    default: 0
  },
  downVoteCount: {
    type: Number,
    required: true,
    default: 0
  },
  billProgress: {
    type: String,
    required: true,
    enum: ['Not enacted', 'Senate Voted', 'House Passed'],
  },
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
billSchema.index({ title: 'text', description: 'text' });
const Bill = mongoose.model('Bill', billSchema);

export default Bill;
