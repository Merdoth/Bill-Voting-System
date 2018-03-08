import mongoose from 'mongoose';

const opinionSchema = new mongoose.Schema({
  opinion: { type: String, required: true },
  opinionBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  opinionBill: {
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
const Opinion = mongoose.model('Opinion', opinionSchema);

export default Opinion;
