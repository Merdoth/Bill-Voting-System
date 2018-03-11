import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../../models/User';
import Opinion from '../../models/Opinion';
import Bill from '../../models/Bill';
import convertCase from '../../utils/convertCase';
import { user2 } from '../../utils/testHelper';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;


describe('Opinion Model', () => {
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
  it('Should Create a new opinion', (done) => {
    const opinionDetails = {
      opinion: user2.opinion,
      opinionBy: userId,
      opinionBill: billId
    };
    const opinion = new Opinion(opinionDetails);
    opinion.save((error, newOpinion) => {
      if (!error) {
        expect(newOpinion.opinion).to.eql('this is an opinion');
        done();
      }
    });
  });
  it('Should throw an error if opinion field is not provided', (done) => {
    const opinionDetails = {
      opinionBy: userId,
      opinionBill: billId
    };
    const opinion = new Opinion(opinionDetails);
    opinion.save((error) => {
      if (error) {
        expect(error.errors.opinion.message)
          .to.eql('Path `opinion` is required.');
        done();
      }
    });
  });
});
