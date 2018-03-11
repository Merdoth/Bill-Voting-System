import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../../models/User';
import Bill from '../../models/Bill';
import convertCase from '../../utils/convertCase';
import { user2 } from '../../utils/testHelper';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;


describe('Opinion Model', () => {
  let userId;

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
  it('create a new bill', (done) => {
    const {
      title, description, upVoteCount, downVoteCount, billProgress
    } = user2.billDetail;
    const billDetails = {
      title, description, upVoteCount, downVoteCount, billProgress
    };
    const newBill = new Bill(billDetails);
    newBill.save((error, createdBill) => {
      if (!error) {
        expect(createdBill.title).to.eql('ghana must go');
        expect(createdBill.description).to.eql('this is a test bill');
        expect(createdBill.billProgress).to.eql('Not enacted');
        done();
      }
    });
  });
  it('Should throw an error if title field is not provided', (done) => {
    const {
      description, upVoteCount, downVoteCount, billProgress
    } = user2.billDetail;
    const billDetails = {
      description, upVoteCount, downVoteCount, billProgress
    };
    const newBill = new Bill(billDetails);
    newBill.save((error) => {
      if (error) {
        expect(error.errors.title.message)
          .to.eql('Path `title` is required.');
        done();
      }
    });
  });
});
