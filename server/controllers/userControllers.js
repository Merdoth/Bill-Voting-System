import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/User';
import convertCase from '../utils/convertCase';
import generateToken from '../utils/GenerateToken';

/**
   * @description sign up a new user
   * 
   * @param {Object} req user request object
   * @param {Object} res server response object
   * 
   * @return {undefined}
   */
exports.signUp = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .exec()
    .then((email) => {
      if (email) {
        res.status(409).send({
          message: 'Email already exists',
          success: false
        });
      } else {
        User.findOne({
          userName: convertCase(req.body.userName)
        })
          .exec()
          .then((userName) => {
            if (userName) {
              res.status(409).send({
                message: 'User with this username already exists',
                success: false
              });
            } else {
              const {
                email, fullName, password, userName
              }
                = req.body;
              const user = new User({
                fullName: convertCase(fullName),
                userName: convertCase(userName),
                email: email.toLowerCase(),
                password,
              });
              user.save((error, newUser) => {
                if (error) {
                  return res.status(500).send({
                    success: false,
                    message: error
                  });
                }
                return res.status(201).send({
                  success: true,
                  token: generateToken(newUser),
                  message: 'User successfully created',
                  userName: newUser.userName,
                });
              });
            }
          })
          .catch((error) => {
            res.status(500)
              .send({ message: 'Internal server error', error });
          });
      }
    }).catch((error) => {
      res.status(500)
        .send({ message: 'Internal server error', error });
    });
};

/**
   * @description sign in a registered user
   * 
   * @param {Object} req user request object
   * @param {Object} res server response object
   * 
   * @return {undefined}
   */
exports.signIn = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .exec((error, response) => {
      if (error) {
        return res.status(500).send({
          success: false,
          message: 'internal server error'
        });
      }
      if (!response) {
        return res.status(404).send({
          success: false,
          message: 'User does not exist'
        });
      }
      // compare users hash passwords
      if (!bcrypt.compareSync(req.body.password, response.password)) {
        return res.status(422).send({
          success: false,
          message: 'Incorrect password'
        });
      }
      return res.status(200).send({
        message: 'Welcome!!',
        success: true,
        username: response.username,
        token: generateToken(response)
      });
    });
};

/**
 * @description allows user update profile
 * 
 * @param {object} req - response object
 * @param {object} res - request object
 *
 * @return {object} - success or failure message
 */
exports.updateUserProfile = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .exec()
    .then((userFound) => {
      if (userFound.email !== req.decoded.email) {
        res.status(409).send({
          message: 'The email address is already in use by another account.',
          success: false
        });
      } else {
        const { fullName, userName, email } = req.body;
        User.findByIdAndUpdate(
          { _id: req.decoded.id },
          {
            $set: {
              fullName,
              userName,
              email,
            },
          },
          { new: true },
        )
          .exec((error, user) => {
            if (user) {
              return res.status(200).send({
                user: {
                  fullName,
                  userName,
                  email,
                },
                message: 'Profile Update successful',
              });
            }
            return res.status(404).send({ message: 'User not Found' });
          })
      }
    }).catch((error) => {
      res.status(500)
        .send({ message: 'Internal server error', error });
    });
};
