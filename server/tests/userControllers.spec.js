import chai from 'chai';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import userControllers from '../controllers/userControllers';
import adminControllers from '../controllers/adminControllers';

const { expect } = chai;

chai.should();
chai.use(chaiHttp);

const app = require('../app');


describe('Users', () => {
  let jwtToken;
  let jwtToken1;
  before((done) => {
    mongoose.createConnection(process.env.MONGODB_TEST_URL, () => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });
  });
  describe('User Sign Up', () => {
    it('should throw an error if fullname is empty and return 400', (done) => {
      const fullName = '';
      const userName = 'Black T';
      const email = 'blackt@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('fullNameError')
              .equal('Fullname can\'t be empty');
          }
          done();
        });
    });
    it(`should throw an error if fullname 
    is just whitespaces and return 400`, (done) => {
      const fullName = '    ';
      const userName = 'Black T';
      const email = 'blackt@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('fullNameError')
              .equal('Fullname is required');
          }
          done();
        });
    });
    it(`should throw an error if fullname is
     less than 3 characters and return 400`, (done) => {
      const fullName = 'Sh';
      const userName = 'Black T';
      const email = 'blackt@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('fullNameError')
              .equal('Fullname must be at least 3 characters long');
          }
          done();
        });
    });
    it('should throw an error if username is empty and return 400', (done) => {
      const fullName = 'Black Thief';
      const userName = '';
      const email = 'blackt@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('userNameError')
              .equal('Username can\'t be empty');
          }
          done();
        });
    });
    it(`should throw an error if username 
    is just whitespaces and return 400`, (done) => {
      const fullName = 'Black Thief';
      const userName = '   ';
      const email = 'blackt@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('userNameError')
              .equal('Username is required');
          }
          done();
        });
    });
    it(`should throw an error if username is
     less than 3 characters and return 400`, (done) => {
      const fullName = 'Black Thief';
      const userName = 'ci';
      const email = 'blackt@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('userNameError')
              .equal('Username must be at least 3 characters long');
          }
          done();
        });
    });
    it('should throw an error if email is empty and return 400', (done) => {
      const fullName = 'Black Thief';
      const userName = 'Black T';
      const email = '';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('emailError')
              .equal('Email can\'t be empty');
          }
          done();
        });
    });
    it(`should throw an error if email 
    is just whitespaces and return 400`, (done) => {
      const fullName = 'Black Thief';
      const userName = 'Black T';
      const email = '    ';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('emailError')
              .equal('Email is required');
          }
          done();
        });
    });
    it('should throw an error if email is invalid and return 400', (done) => {
      const fullName = 'Black Thief';
      const userName = 'Black T';
      const email = 'chuiduhgudshuhsa';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('emailError')
              .equal('Email is not valid');
          }
          done();
        });
    });
    it('should throw an error if password is empty and return 400', (done) => {
      const fullName = 'Black Thief';
      const userName = 'Black T';
      const email = 'blackt@yahoo.com';
      const password = '';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('passwordError')
              .equal('Password can\'t be empty');
          }
          done();
        });
    }); it(`should throw an error if email 
    is just whitespaces and return 400`, (done) => {
      const fullName = 'Black Thief';
      const userName = 'Black T';
      const email = 'blackt@yahoo.com';
      const password = '    ';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('passwordError')
              .equal('Password is required');
          }
          done();
        });
    }); it(`should throw an error if password is less
     than 8 characters and return 400`, (done) => {
      const fullName = 'Black Thief';
      const userName = 'Black T';
      const email = 'blackt@yahoo.com';
      const password = '1234567';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('passwordError')
              .equal('Password must be at least 8 characters long');
          }
          done();
        });
    });
    it('should successfully sign a user up and return 201 ', (done) => {
      const fullName = 'Black Thief';
      const userName = 'Black T';
      const email = 'blackt@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(201);
            res.body.should.have.property('message')
              .equal('User successfully created');
            jwtToken = res.body.token;
          }
          done();
        });
    });
    it('should successfully sign up a new user and return 201 ', (done) => {
      const fullName = 'Pablo Twinny';
      const userName = 'Pablo';
      const email = 'pablo@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((err, res) => {
          if (!err) {
            expect(res).to.have.status(201);
            res.body.should.have.property('message')
              .equal('User successfully created');
            jwtToken1 = res.body.token;
          }
          done();
        });
    });
    it(`should throw an error if email 
    already exists and return 409`, (done) => {
      const fullName = 'Cindy Shine';
      const userName = 'cindy';
      const email = 'blackt@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((err, res) => {
          if (res) {
            expect(res).to.have.status(409);
            res.body.should.have.property('message')
              .equal('Email already exists');
          }
          done();
        });
    });
    it(`should throw an error if username
     already exists and return 409 `, (done) => {
      const fullName = 'Cindy Shine';
      const userName = 'Black T';
      const email = 'ciny@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signup', userControllers.signUp)
        .set('Accept', 'application/json')
        .send({
          email, fullName, password, userName
        })
        .end((err, res) => {
          if (res) {
            expect(res).to.have.status(409);
            res.body.should.have.property('message')
              .equal('User with this username already exists');
          }
          done();
        });
    });
  });
  describe('User Sign In', () => {
    it('should throw an error if email is empty and return 400', (done) => {
      const email = '';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signin', userControllers.signIn)
        .set('Accept', 'application/json')
        .send({
          email, password
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('emailError')
              .equal('Email can\'t be empty');
          }
          done();
        });
    });
    it(`should throw an error if email 
    is just whitespaces and return 400`, (done) => {
      const email = '    ';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signin', userControllers.signIn)
        .set('Accept', 'application/json')
        .send({
          email, password,
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('emailError')
              .equal('Email is required');
          }
          done();
        });
    });
    it('should throw an error if email is invalid and return 400', (done) => {
      const email = 'chuiduhgudshuhsa';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signin', userControllers.signIn)
        .set('Accept', 'application/json')
        .send({
          email, password,
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('emailError')
              .equal('Email is not valid');
          }
          done();
        });
    });
    it('should throw an error if password is empty and return 400', (done) => {
      const email = 'blackt@yahoo.com';
      const password = '';
      chai.request(app)
        .post('/api/v1/user/signin', userControllers.signIn)
        .set('Accept', 'application/json')
        .send({
          email, password,
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('passwordError')
              .equal('Password can\'t be empty');
          }
          done();
        });
    });
    it(`should throw an error if password
    is just whitespaces and return 400`, (done) => {
      const email = 'blackt@yahoo.com';
      const password = '    ';
      chai.request(app)
        .post('/api/v1/user/signin', userControllers.signIn)
        .set('Accept', 'application/json')
        .send({
          email, password
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('passwordError')
              .equal('Password is required');
          }
          done();
        });
    });
    it(`should throw an error if password is less
     than 8 characters and return 400`, (done) => {
      const email = 'blackt@yahoo.com';
      const password = '1234567';
      chai.request(app)
        .post('/api/v1/user/signin', userControllers.signIn)
        .set('Accept', 'application/json')
        .send({
          email, password,
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('passwordError')
              .equal('Password must be at least 8 characters long');
          }
          done();
        });
    });
    it(`should throw an error if user is not found
     and return 404`, (done) => {
      const email = 'blacktheyjfc@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signin', userControllers.signIn)
        .set('Accept', 'application/json')
        .send({
          email, password,
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(404);
            res.body.should.have.property('message')
              .equal('Failed to authenticate user');
          }
          done();
        });
    });
    it(`should throw an error if password does not 
    match the password in the database 
     and return 422`, (done) => {
      const email = 'blackt@yahoo.com';
      const password = '123453789';
      chai.request(app)
        .post('/api/v1/user/signin', userControllers.signIn)
        .set('Accept', 'application/json')
        .send({
          email, password,
        })
        .end((error, res) => {
          if (!error) {
            expect(res).to.have.status(422);
            res.body.should.have.property('message')
              .equal('Incorrect password');
          }
          done();
        });
    });
    it(`should succeessfully sign in
     and return 200`, (done) => {
      const email = 'blackt@yahoo.com';
      const password = '123456789';
      chai.request(app)
        .post('/api/v1/user/signin', userControllers.signIn)
        .set('Accept', 'application/json')
        .send({
          email, password,
        })
        .end((error, res) => {
          if (!error) {
            expect(res).to.have.status(200);
            res.body.should.have.property('message')
              .equal(`Welcome ${res.body.user.userName}`);
            jwtToken = res.body.token;
          }
          done();
        });
    });
  });

  describe('User Update Profile', () => {
    it('should throw an error if fullname is empty and return 400', (done) => {
      const fullName = '';
      const userName = 'Black T';
      const email = 'blackt@yahoo.com';
      chai.request(app)
        .put('/api/v1/user/updateprofile', userControllers.updateUserProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          email, fullName, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('fullNameError')
              .equal('Fullname can\'t be empty');
          }
          done();
        });
    });
    it(`should throw an error if fullname 
    is just whitespaces and return 400`, (done) => {
      const fullName = '    ';
      const userName = 'Black T';
      const email = 'blackt@yahoo.com';
      chai.request(app)
        .put('/api/v1/user/updateprofile', userControllers.updateUserProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          email, fullName, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('fullNameError')
              .equal('Fullname is required');
          }
          done();
        });
    });
    it(`should throw an error if fullname is
     less than 3 characters and return 400`, (done) => {
      const fullName = 'Sh';
      const userName = 'Black T';
      const email = 'blackt@yahoo.com';
      chai.request(app)
        .put('/api/v1/user/updateprofile', userControllers.updateUserProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          email, fullName, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('fullNameError')
              .equal('Fullname must be at least 3 characters long');
          }
          done();
        });
    });
    it('should throw an error if username is empty and return 400', (done) => {
      const fullName = 'Black Thief';
      const userName = '';
      const email = 'blackt@yahoo.com';
      chai.request(app)
        .put('/api/v1/user/updateprofile', userControllers.updateUserProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          email, fullName, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('userNameError')
              .equal('Username can\'t be empty');
          }
          done();
        });
    });
    it(`should throw an error if username 
    is just whitespaces and return 400`, (done) => {
      const fullName = 'Black Thief';
      const userName = '   ';
      const email = 'blackt@yahoo.com';
      chai.request(app)
        .put('/api/v1/user/updateprofile', userControllers.updateUserProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          email, fullName, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('userNameError')
              .equal('Username is required');
          }
          done();
        });
    });
    it(`should throw an error if username is
     less than 3 characters and return 400`, (done) => {
      const fullName = 'Black Thief';
      const userName = 'ci';
      const email = 'blackt@yahoo.com';
      chai.request(app)
        .put('/api/v1/user/updateprofile', userControllers.updateUserProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          email, fullName, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('userNameError')
              .equal('Username must be at least 3 characters long');
          }
          done();
        });
    });
    it('should throw an error if email is empty and return 400', (done) => {
      const fullName = 'Black Thief';
      const userName = 'Black T';
      const email = '';
      chai.request(app)
        .put('/api/v1/user/updateprofile', userControllers.updateUserProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          email, fullName, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('emailError')
              .equal('Email can\'t be empty');
          }
          done();
        });
    });
    it(`should throw an error if email 
    is just whitespaces and return 400`, (done) => {
      const fullName = 'Black Thief';
      const userName = 'Black T';
      const email = '    ';
      chai.request(app)
        .put('/api/v1/user/updateprofile', userControllers.updateUserProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          email, fullName, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('emailError')
              .equal('Email is required');
          }
          done();
        });
    });
    it('should throw an error if email is invalid and return 400', (done) => {
      const fullName = 'Black Thief';
      const userName = 'Black T';
      const email = 'chuiduhgudshuhsa';
      chai.request(app)
        .put('/api/v1/user/updateprofile', userControllers.updateUserProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          email, fullName, userName
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(400);
            res.body.error.should.have.property('emailError')
              .equal('Email is not valid');
          }
          done();
        });
    });
    // it(`should throw an error if
    //  email already exists and return 409`, (done) => {
    //   const fullName = 'Pablo Twinny';
    //   const userName = 'Pablo';
    //   const email = 'blackt@yahoo.com';
    //   chai.request(app)
    //     .put('/api/v1/user/updateprofile', userControllers.updateUserProfile)
    //     .set('Accept', 'application/json')
    //     .set('x-access-token', jwtToken1)
    //     .send({
    //       email, fullName, userName
    //     })
    //     .end((error, res) => {
    //       if (res) {
    //         expect(res).to.have.status(409);
    //         res.body.should.have.property('message')
    //           .equal('This email address is already in use by another account.');
    //       }
    //       done();
    //     });
    // });
    it(`should throw an error if username
     already exist and return 409`, (done) => {
      const fullName = 'Black Twinny';
      const userName = 'Pablo';
      const email = 'blackt@yahoo.com';
      chai.request(app)
        .put('/api/v1/user/updateprofile', userControllers.updateUserProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken)
        .send({
          email, fullName, userName
        })
        .end((error, res) => {
          if (!res) {
            res.status.should.equal(409);
            res.body.should.have.property('message')
              .equal('This username is already in use by another account.');
          }
          done();
        });
    });
    it(`should successfully update a 
     users profile and return 200`, (done) => {
      chai.request(app)
        .put('/api/v1/user/updateprofile', userControllers.updateUserProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          fullName: 'Black goooddeads',
          userName: 'Black',
          email: 'pabloy@yahoo.com',
        })
        .end((error, res) => {
          if (res) {
            expect(res).to.have.status(200);
            res.body.should.have.property('message')
              .equal('Profile successfully updated');
          }
          done();
        });
    });
    it(`should throw an error if user 
    is unauthorized and return 401`, (done) => {
      let jwtToken3 = 'hbbugibii';
      chai.request(app)
        .put('/api/v1/user/updateprofile', userControllers.updateUserProfile)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken3)
        .send({
          fullName: 'Black',
          userName: 'Blam knck',
          email: 'loy@yahoo.com',
        })
        .end((error, res) => {
          if (!res) {
            expect(res).to.have.status(401);
            res.body.should.have.property('message')
              .equal('Token authentication failed');
          }
          done();
        });
    });
  });
  describe('User Create Bill', () => {
    it(`should throw an error if 
    permission is not admin while
    creating a bill and return 403`, (done) => {
      const title = 'All the lies in Nigeria';
      const description = 'Lying senators';
      const billProgress = 'Not-enacted';
      chai.request(app)
        .post('/api/v1/admin/bills', adminControllers.createBill)
        .set('Accept', 'application/json')
        .set('x-access-token', jwtToken1)
        .send({
          title, description, billProgress
        })
        .end((error, res) => {
          if (!res) {
            res.status.should.status(403);
            res.body.should.have.property('message')
              .equal(`Sorry you don't the permission 
          to perform the requested operation`);
          }
          done();
        });
    });
  });
});
