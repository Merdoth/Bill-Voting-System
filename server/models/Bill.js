import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const billSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
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
      default: 'Not enacted',
      enum: ['Not enacted', 'Senate Voted', 'House Passed'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);
billSchema.index({ title: 'text', description: 'text' });
billSchema.plugin(mongoosePaginate);
const Bill = mongoose.model('Bill', billSchema);

export default Bill;
