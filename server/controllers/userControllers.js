import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/User';
import convertCase from '../utils/convertCase';
import generateToken from '../utils/GenerateToken';

/**
   * signup a new user
   * @param {Object} req user request object
   * @param {Object} res servers response object
   * 
   * @return {undefined}
   */
exports.signUp = (req, res) => {
  console.log(req.body)
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

