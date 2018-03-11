import chai from 'chai';
import chaiHttp from 'chai-http';
import User from '../../models/User';
import convertCase from '../../utils/convertCase';
import { user2 } from '../../utils/testHelper';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;


describe('User Model', () => {
  it('Should Create a new user', (done) => {
    const {
      fullName, userName, permission, password, email
    } = user2;
    const user = new User({
      fullName,
      userName: convertCase(userName),
      password,
      permission,
      email
    });
    user.save((error, newUser) => {
      if (!error) {
        expect(newUser.email).to.eql('tonydante9@gmail.com');
        expect(newUser.userName).to.eql('Tonydante9');
        done();
      }
    });
  });
  it('Should throw an error if fullName field is not provided', (done) => {
    const {
      userName, password, email
    } = user2;
    const user = new User({
      userName: convertCase(userName),
      password,
      email
    });
    user.save((error) => {
      if (error) {
        expect(error.errors.fullName.message)
          .to.eql('Path `fullName` is required.');
        done();
      }
    });
  });
});
