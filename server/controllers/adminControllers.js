import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Admin from '../models/Admin';
import Bill from '../models/Bill'
import User from '../models/User';
import convertCase from '../utils/convertCase';
import generateToken from '../utils/GenerateToken';
import validators from '../middlewares/validators';

/**
   * @description sign up an admin
   * 
   * @param {Object} req user request object
   * @param {Object} res server response object
   * 
   * @return {undefined}
   */
exports.adminSignUp = (req, res) => {
  if (req.body.userName !== 'admin') {
    return res.status(400).send({
      message: 'Username can only be \'Admin\'',
      success: false
    });
  }
  Admin.findOne({
    userName: req.body.userName.trim().toLowerCase()
  })
    .exec()
    .then((userName) => {
      if (userName) {
        res.status(409).send({
          message: 'Admin can only sign up once, please sign in!',
          success: false
        });
      } else {
        const {
          userName, password
        }
          = req.body;
        const admin = new Admin({
          userName: userName.trim().toLowerCase(),
          permission: 1,
          password: password.trim(),
        });
        admin.save((error, newAdminUser) => {
          if (error) {
            return res.status(500).send({
              success: false,
              message: 'Internal server Error',
              error: error.message
            });
          }
          return res.status(201).send({
            success: true,
            token: generateToken(newAdminUser),
            message: 'admin successfully created',
            userName: newAdminUser.userName,
          });
        });
      }
    })
    .catch((error) => {
      res.status(500)
        .send({ message: 'Internal server error', error });
    });
};


/**
   * @description sign in an admin
   * 
   * @param {Object} req user request object
   * @param {Object} res server response object
   * 
   * @return {undefined}
   */
exports.adminSignIn = (req, res) => {
  Admin.findOne({
    userName: req.body.userName.trim().toLowerCase()
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
   * @description allows admins create new bills
   * 
   * @param {Object} req user request object
   * @param {Object} res server response object
   * 
   * @return {undefined}
   */
exports.createBill = (req, res) => {
  const userId = req.decoded.id;
  const {
    title, description, billProgress, voteStatus
  }
    = req.body;
  User.findOne({
    $or: [
      { _id: userId },
      { permission: 2 }
    ]
  })
    .exec()
    .then((adminFound) => {
      if (!adminFound) {
        return res.status(400).send({
          success: false,
          message: 'Sorry you dont the permission to perform the requested operation'
        });
      }
      Bill.findOne({
        title: req.body.title.trim().toLowerCase()
      })
        .exec()
        .then((billFound) => {
          if (billFound) {
            return res.status(409).send({
              message: 'bill already exists!',
              success: false
            });
          } else {
            const billDetails = {
              title, description, billProgress, voteStatus
            }
            const newBill = new Bill(billDetails);
            newBill.save((error, newBill) => {
              if (error) {
                return res.status(500).send({
                  success: false,
                  message: 'Internal server Error',
                  error: error.message
                });
              }
              return res.status(201).send({
                success: true,
                message: 'bill successfully created',
                newBill
              });
            });
          }
        })
        .catch((error) => {
          res.status(500)
            .send({ message: 'Internal server error', error });
        });
    })
    .catch((error) => {
      res.status(500)
        .send({ message: 'Internal server error', error });
    });
};
/**
   * @description allows admins edit bills
   * 
   * @param {Object} req user request object
   * @param {Object} res server response object
   * 
   * @return {undefined}
   */
exports.editBill = (req, res) => {
  const userId = req.decoded.id;
  User.findOne({
    $or: [
      { _id: userId },
      { permission: 2 }
    ]
  })
    .exec()
    .then((adminFound) => {
      if (!adminFound) {
        return res.status(400).send({
          success: false,
          message: 'Sorry you dont the permission to perform the requested operation'
        });
      }
      Bill.findOne({
        title: req.body.title.trim().toLowerCase()
      })
        .exec()
        .then((billFound) => {
          if (billFound) {
            res.status(409).send({
              message: 'bill already exists!',
              success: false
            });
          } else {
            Bill.findByIdAndUpdate(
              { _id: req.params.billId },
              {
                $set: {
                  title: req.body.title,
                  description: req.body.description,
                  billProgress: req.body.billProgress,
                },
              },
              { new: true },
            )
              .exec((error, editedBill) => {
                if (editedBill) {
                  return res.status(200)
                    .send({
                      message: 'Bill has been successfully updated!',
                      editedBill,
                    });
                }
              });
          }
        })
        .catch((error) => {
          res.status(500)
            .send({ message: 'Internal server error', error });
        });
    })
    .catch((error) => {
      res.status(500)
        .send({ message: 'Internal server error', error });
    });
};
/**
   * @description allows admins delete bills
   * 
   * @param {Object} req user request object
   * @param {Object} res server response object
   *
   * @return {undefined}
   */
exports.deleteBill = (req, res) => {
  const userId = req.decoded.id;
  const { billId } = req.params;
  User.findOne({
    $or: [
      { _id: userId },
      { permission: 2 }
    ]
  })
    .exec()
    .then((adminFound) => {
      if (!adminFound) {
        return res.status(400).send({
          success: false,
          message: 'Sorry you dont the permission to perform the requested operation'
        });
      }
      Bill.findByIdAndRemove(billId, (err) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: 'Internal server error',
          });
        }
        return res.status(200).send({
          success: true,
          message: 'Bill successfully deleted!'
        });
      });
    })
    .catch((error) => {
      res.status(500)
        .send({ message: 'Internal server error', error });
    });
};

/**
   * @description allows admin gets all users
   * 
   * @param { Object } req user request object
   * @param { Object } res servers response
   * 
   * @return { undefined }
   */
exports.getAllUsers = (req, res) => {
  const options = {
    select: "-password",
    page: 1 || Number(req.query.page),
    limit: 6 || Number(req.query.limit)
  };
  User.paginate({}, options)
    .then((users) => {
      if (!users) {
        res.status(404).send({
          message: 'Users not found',
        });
      }
      const pageInfo = {
        pages: users.pages,
        page: users.page,
        total: users.total,
      };
      res.status(200).send({
        users: users.docs,
        pageInfo,
        message: 'Users successfully fetched'
      });
    })
    .catch((error) => {
      res.status(500).send({
        error: error.message
      });
    });
};
