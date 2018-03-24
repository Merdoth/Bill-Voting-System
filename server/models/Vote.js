import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const voteSchema = new mongoose.Schema(
  {
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
  }
);
voteSchema.plugin(mongoosePaginate);
const Vote = mongoose.model('Vote', voteSchema);
export default Vote;

// List of voted bills and status for a user
// const votedBills = [
//   {
//     votedBill: 'BillA',
//     status: 'upvote',
//     votedby: 'userid'
//   },
//   {
//     votedBill: 'BillB',
//     status: 'null',
//     votedby: 'userid'
//   },
//   {
//     votedBill: 'Billc',
//     status: 'downvote',
//     votedby: 'userid'
//   }
// ]

  
  //  * Bill has not been voted for votedBills = []
  //  * 1. User clicks upvote on BillA
  //  * client push { status: upvote, votedBill: BillA, votedBy: userId } into votedBills
  //  * server send { status: upvote, votedBill: BillA, votedBy: userId, addUpVote: true }
  //  * FindBill with votedBill, upvote + 1
  //  * Vote Schema - add { status: upvote, votedBill: BillA, votedBy: userId }
  //  * 
  //  * 1B. User clicks downvote on BillA
  //  * push { status: downvote, votedBill: BillA, votedBy: userId }into votedBills
  //  * server send { status: upvote, votedBill: BillA, votedBy: userId, addDownVote: true }
  //  * FindBill with votedBill, downvote + 1
  //  * Vote Schema - add { status: downvote, votedBill: BillA, votedBy: userId }
  //  * 
  //  * Bill has been upvoted for votedBills = [{ status: upvote, votedBill: BillA, votedBy: userId }]
  //  * 1. User clicks upvote on BillA
  //  * client push { status: null, votedBill: BillA, votedBy: userId } into votedBills
  //  * server send { status: null, votedBill: BillA, votedBy: userId, removeUpVote: true }
  //  * Vote Schema - add { status: null, votedBill: BillA, votedBy: userId }
  //  * 
  //  * Bill has been downvoted for votedBills = [{ status: downvote, votedBill: BillA, votedBy: userId }]
  //  * 1. User clicks downvote on BillA
  //  * client push { status: null, votedBill: BillA, votedBy: userId } into votedBills
  //  * server send { status: null, votedBill: BillA, votedBy: userId, removeDownVote: true }
  //  * Vote Schema - add { status: null, votedBill: BillA, votedBy: userId }
  //  * 
  //  * 
  //  * Bill has been upvoted for votedBills = [{ status: upvote, votedBill: BillA, votedBy: userId }]
  //  * 1. User clicks downvote on BillA
  //  * client push { status: downvote, votedBill: BillA, votedBy: userId } into votedBills
  //  * server send { status: downvote, votedBill: BillA, votedBy: userId, removeUpVote: true, addDownVote: true }
  //  * Vote Schema - add { status: downvote, votedBill: BillA, votedBy: userId }
  //  *
  //  * 
  //  * Bill has been downvoted for votedBills = [{ status: downvote, votedBill: BillA, votedBy: userId }]
  //  * 1. User clicks upvote on BillA
  //  * client push { status: upvote, votedBill: BillA, votedBy: userId } into votedBills
  //  * server send { status: upvote, votedBill: BillA, votedBy: userId, addUpVote: true, removeDownVote: true }
  //  * Vote Schema - add { status: upvote, votedBill: BillA, votedBy: userId }
  //  * 
  //  * 
  //  * 
  //  *
