import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const voteSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['upvote', 'null', 'downvote'],
  },
  votedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  votedBill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bill'
  },
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
voteSchema.plugin(mongoosePaginate);
const Vote = mongoose.model('Vote', voteSchema);
export default Vote;
