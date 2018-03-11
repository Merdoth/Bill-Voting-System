import chai from 'chai';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import adminControllers from '../controllers/adminControllers';
import userControllers from '../controllers/userControllers';

const { expect } = chai;

chai.should();
chai.use(chaiHttp);

const app = require('../app');

describe('Admin Controllers', () => {
  let jwtToken;
  let jwtToken1;
  let billId;
  let billId1;
  let billId2 = '5aa4ffbfb2d16e6594369fce';
  before((done) => {
    mongoose.createConnection(process.env.MONGODB_TEST_URL, () => {
      mongoose.connection.db.dropDatabase(() => {
        const fullName = 'Muha mola';
        const userName = 'mola';
        const email = 'mola@gmIl.com';
        const password = '123456789';
        chai.request(app)
          .post('/api/v1/user/signup', userControllers.signUp)
          .send({
            email, fullName, password, userName
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            jwtToken1 = res.body.token;
          });
        done();
      });
    });
  });
  describe('Admin Sign Up', () => {
    it('should throw an error if fullname is empty and return 400', (done) => {
      const fullName = '';
      const userName = 'super-admin';
      const email = 'blacky@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/admin/signup', adminControllers.adminSignUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('Fullname cannot be empty');
          }
          done();
        });
    });
    it('should throw an error if username is empty and return 400', (done) => {
      const fullName = 'Bisayo Echi';
      const userName = '';
      const email = 'blacky@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/admin/signup', adminControllers.adminSignUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('Username cannot be empty');
          }
          done();
        });
    });
    it('should throw an error if email is empty and return 400', (done) => {
      const fullName = 'Bisayo Echi';
      const userName = 'super-admin';
      const email = '';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/admin/signup', adminControllers.adminSignUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('Email cannot be empty');
          }
          done();
        });
    });
    it('should throw an error if email is empty and return 400', (done) => {
      const fullName = 'Bisayo Echi';
      const userName = 'super-admin';
      const email = 'hfdhkhghgu';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/admin/signup', adminControllers.adminSignUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('Email is not valid');
          }
          done();
        });
    });
    it('should throw an error if password is empty and return 400', (done) => {
      const fullName = 'Bisayo Echi';
      const userName = 'super-admin';
      const email = 'blacky@yahoo.com';
      const password = '';
      chai.request(app)
        .post('/api/v1/admin/signup', adminControllers.adminSignUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('Password cannot be empty');
          }
          done();
        });
    });
    it('should throw an error if password is empty and return 400', (done) => {
      const fullName = 'Bisayo Echi';
      const userName = 'super-admin';
      const email = 'blacky@yahoo.com';
      const password = '1234567';
      chai.request(app)
        .post('/api/v1/admin/signup', adminControllers.adminSignUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('Password must be at least of 8 character');
          }
          done();
        });
    });
    it(`should throw an error if username is not
     super-admin is empty and return 400`, (done) => {
      const fullName = 'Bisayo Echi';
      const userName = 'bisayo';
      const email = 'blacky@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/admin/signup', adminControllers.adminSignUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('Username can only be "super-admin"');
          }
          done();
        });
    });
    it('should successfully sign an admin up and return 201', (done) => {
      const fullName = 'Bisayo Echi';
      const userName = 'super-admin';
      const email = 'blacky@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/admin/signup', adminControllers.adminSignUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName,
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(201);
            res.body.should.have.property('message')
              .equal('admin successfully created');
            jwtToken = res.body.token;
          }
          done();
        });
    });
    it(`should throw if another user tries
     to signup as super-admin up after a 
     super-admin has signed up and return 409`, (done) => {
      const fullName = 'Bisayo Echi';
      const userName = 'super-admin';
      const email = 'blacky@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/admin/signup', adminControllers.adminSignUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName,
        })
        .end((error, res) => {
          if (!res) {
            expect(res).to.have.status(409);
            res.body.should.have.property('message')
              .equal('Admin can only sign up once, please sign in!');
          }
          done();
        });
    });
  });
  describe('Admin Create Bills', () => {
    it(`should throw an error if 
      title is empty and return 400`, (done) => {
      const title = '';
      const description = 'Lying senators';
      const billProgress = 'Not-enacted';
      chai.request(app)
        .post('/api/v1/admin/bills', adminControllers.createBill)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({
          title, description, billProgress,
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('Title cannot be empty');
          }
          done();
        });
    });
    it(`should throw an error if 
      title is less than 5 characters and return 400`, (done) => {
      const title = 'Hili';
      const description = 'Lying senators';
      const billProgress = 'Not-enacted';
      chai.request(app)
        .post('/api/v1/admin/bills', adminControllers.createBill)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({
          title, description, billProgress,
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('Title must be at least of 5 character long');
          }
          done();
        });
    });
    it(`should throw an error if 
      description is empty and return 400`, (done) => {
      const title = 'All the lies in Nigeria';
      const description = '';
      const billProgress = 'Not-enacted';
      chai.request(app)
        .post('/api/v1/admin/bills', adminControllers.createBill)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({
          title, description, billProgress,
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('Description cannot be empty');
          }
          done();
        });
    });
    it(`should throw an error if 
      description is less than 8 characters and return 400`, (done) => {
      const title = 'All the lies in Nigeria';
      const description = 'Lying';
      const billProgress = 'Not-enacted';
      chai.request(app)
        .post('/api/v1/admin/bills', adminControllers.createBill)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({
          title, description, billProgress,
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('Description must be at least of 8 character long');
          }
          done();
        });
    });
    it(`should throw an error if 
      bill progress is less than 8 and
       has an invalid value and return 400`, (done) => {
      const title = 'All the lies in Nigeria';
      const description = 'Lying senators';
      const billProgress = 'Not';
      chai.request(app)
        .post('/api/v1/admin/bills', adminControllers.createBill)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({
          title, description, billProgress,
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal('Invalid value');
          }
          done();
        });
    });
    it('should successfully create a bill and return 201', (done) => {
      const title = 'All the lies in Nigeria';
      const description = 'Lying senators';
      const billProgress = 'Not enacted';
      chai.request(app)
        .post('/api/v1/admin/bills', adminControllers.createBill)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({
          title, description, billProgress,
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(201);
            res.body.should.have.property('message')
              .equal('bill successfully created');
            billId = res.body.createdBill._id;
          }
          done();
        });
    });
    it('should successfully create another bill and return 201', (done) => {
      const title = 'All the lies in Nigeria';
      const description = 'Thiefing senators';
      const billProgress = 'Not enacted';
      chai.request(app)
        .post('/api/v1/admin/bills', adminControllers.createBill)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({
          title, description, billProgress,
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(201);
            res.body.should.have.property('message')
              .equal('bill successfully created');
            billId1 = res.body.createdBill._id;
          }
          done();
        });
    });
  });
  describe('Admin edit bill and delete bill', () => {
    it('should successfully edit a bill and return 200', (done) => {
      const title = 'All senate the lies in Nigeria';
      const description = 'Lying senators';
      const billProgress = 'Not enacted';
      chai.request(app)
        .put(`/api/v1/admin/bills/${billId}`, adminControllers.editBill)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({
          title, description, billProgress,
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(200);
            res.body.should.have.property('message')
              .equal('Bill has been successfully updated!');
          }
          done();
        });
    });

    it('should successfully delete a bill and return 200', (done) => {
      chai.request(app)
        .delete(`/api/v1/admin/bills/${billId1}`, adminControllers.deleteBill)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(200);
            res.body.should.have.property('message')
              .equal('Bill successfully deleted!');
          }
          done();
        });
    });
  });
  describe('Admin grant user admin access', () => {
    it(`should throw an error if super-admin passes 
    empty permission and return 400`, (done) => {
      const userId = jwt.decode(jwtToken1).token.id;
      let permission;
      chai.request(app)
        .post('/api/v1/admin/addpermission', adminControllers.addPermission)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({
          userId, permission
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('permissionError')
              .equal('permission can\'t be empty');
          }
          done();
        });
    });
    it(`should throw an error if super-admin tries to 
    grant a user super-admin permission and return 400`, (done) => {
      const userId = jwt.decode(jwtToken1).token.id;
      const permission = 1;
      chai.request(app)
        .post('/api/v1/admin/addpermission', adminControllers.addPermission)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({
          userId, permission
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('permissionError')
              .equal('This role is restricted');
          }
          done();
        });
    });
    it(`should throw an error if super-admin passes
     a number less than 1 as permission and return 400`, (done) => {
      const userId = jwt.decode(jwtToken1).token.id;
      const permission = -2;
      chai.request(app)
        .post('/api/v1/admin/addpermission', adminControllers.addPermission)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({
          userId, permission
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('permissionError')
              .equal('this permission role is invalid');
          }
          done();
        });
    });
    it(`should throw an error if super-admin passes
     a number greater than 3 as permission and return 400`, (done) => {
      const userId = jwt.decode(jwtToken1).token.id;
      const permission = 4;
      chai.request(app)
        .post('/api/v1/admin/addpermission', adminControllers.addPermission)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({
          userId, permission
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('permissionError')
              .equal('this permission role is invalid');
          }
          done();
        });
    });
    it(`should throw an error if a user tries to grant another user
     admin permission and return 400`, (done) => {
      const userId = jwt.decode(jwtToken1).token.id;
      const permission = 2;
      chai.request(app)
        .post('/api/v1/admin/addpermission', adminControllers.addPermission)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          userId, permission
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.should.have.property('message')
              .equal(`Sorry you dont the permission
           to perform the requested operation`);
          }
          done();
        });
    });
    it(`should successfully grant a user
     admin permission and return 200`, (done) => {
      const userId = jwt.decode(jwtToken1).token.id;
      const permission = 2;
      chai.request(app)
        .post('/api/v1/admin/addpermission', adminControllers.addPermission)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({
          userId, permission
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(200);
            res.body.should.have.property('message')
              .equal('user permission has been successfully updated!');
          }
          done();
        });
    });
  });
  describe('Admin get all users', () => {
    it('should successfully get all users return 200', (done) => {
      chai.request(app)
        .get('/api/v1/admin/users', adminControllers.getAllUsers)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(200);
            res.body.should.have.property('message')
              .equal('Users successfully fetched');
          }
          done();
        });
    });
  });
  describe('User Add Opinion to Bill', () => {
    it(`should throw an error if 
    a user passes an empty opinion and return 400`, (done) => {
      const opinion = '';
      chai.request(app)
        .post(`/api/v1/bill/${billId}/opinions`, userControllers.addOpinion)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          opinion
        })
        .end((error, res) => {
          if (!res) {
            res.status.should.status(400);
            res.body.should.have.property('opinionError')
              .equal('Opinion is required');
          }
          done();
        });
    });
    it(`should throw an error if 
    user tries to add opinion without passing 
    in the opinion field and return 400`, (done) => {
      chai.request(app)
        .post(`/api/v1/bill/${billId}/opinions`, userControllers.addOpinion)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
        })
        .end((error, res) => {
          if (!res) {
            res.status.should.status(400);
            res.body.error.should.have.property('opinionError')
              .equal('Opinion can\'t be empty');
          }
          done();
        });
    });
    it(`should throw an error if 
    user passes opinion less than 3 characters and return 400`, (done) => {
      const opinion = 'No';
      chai.request(app)
        .post(`/api/v1/bill/${billId}/opinions`, userControllers.addOpinion)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          opinion
        })
        .end((error, res) => {
          if (!res) {
            res.status.should.status(400);
            res.body.error.should.have.property('opinionError')
              .equal('Opinion must be at least 3 characters long');
          }
          done();
        });
    });
    it(`should throw an error if user
    passes billId that does not exist
    and return 404`, (done) => {
      const opinion = 'No be today our leaders start the lie';
      chai.request(app)
        .post(`/api/v1/bill/${billId2}/opinions`, userControllers.addOpinion)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          opinion
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(404);
            res.body.should.have.property('message')
              .equal(`Sorry, no bill with id ${billId2}`);
          }
          done();
        });
    });
    it(`should successfully add an opinion
    and return 201`, (done) => {
      const opinion = 'No be today our leaders start the lie';
      chai.request(app)
        .post(`/api/v1/bill/${billId}/opinions`, userControllers.addOpinion)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          opinion
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(201);
            res.body.should.have.property('message')
              .equal('Opinion successfully added');
          }
          done();
        });
    });
  });
  describe('User gets a single bills opinion', () => {
    it('should sucessfully fetch a single bill and return 200', (done) => {
      chai.request(app)
        .get(`/api/v1/bills/${billId}`, userControllers.fetchOpinion)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(200);
            res.body.should.have.property('message')
              .equal('Bill successfully fetched');
          }
          done();
        });
    });
  });
});
