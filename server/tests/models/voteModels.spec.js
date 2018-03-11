import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../../models/User';
import Vote from '../../models/Vote';
import Bill from '../../models/Bill';
import convertCase from '../../utils/convertCase';
import { user2 } from '../../utils/testHelper';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;


describe('Vote Model', () => {
  let userId;
  let billId;
  before((done) => {
    const {
      fullName, userName, permission, password, email
    } = user2;
    const user = new User({
      fullName,
      userName: convertCase(userName),
      permission,
      password,
      email
    });
    user.save((error, newUser) => {
      if (!error) {
        userId = newUser._id;
        done();
      }
    });
  });
  it('create a new bill first', (done) => {
    const {
      title, description, upVoteCount, downVoteCount, billProgress
    } = user2.billDetail;
    const billDetails = {
      title, description, upVoteCount, downVoteCount, billProgress
    };
    const newBill = new Bill(billDetails);
    newBill.save((error, createdBill) => {
      if (!error) {
        billId = createdBill._id;
        done();
      }
    });
  });
  it('Should Create a new vote', (done) => {
    const voteDetails = {
      status: user2.status,
      votedBy: userId,
      votedBill: billId
    };
    const vote = new Vote(voteDetails);
    vote.save((error, newVote) => {
      if (!error) {
        expect(newVote.status).to.eql('upvote');
        done();
      }
    });
  });
});
