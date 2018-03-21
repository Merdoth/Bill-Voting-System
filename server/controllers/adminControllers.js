import Bill from '../models/Bill';
import User from '../models/User';
import Vote from '../models/Vote';
import validators from '../middlewares/validators';
import generateToken from '../utils/generateToken';

/**
   * @description allows a super-admin sign up
   *
   * @param {Object} req admin request object
   * @param {Object} res server response object
   *
   * @return {undefined}
   */
exports.adminSignUp = (req, res) => {
  if (req.body.userName !== 'super-admin') {
    return res.status(400).send({
      message: 'Username can only be "super-admin"',
      success: false
    });
  }
  User.findOne({
    userName: req.body.userName.trim().toLowerCase()
  })
    .exec()
    .then((userNameFound) => {
      if (userNameFound) {
        res.status(409).send({
          message: 'Admin can only sign up once, please sign in!',
          success: false
        });
      } else {
        const {
          fullName, email, userName, password
        }
          = req.body;
        const admin = new User({
          fullName: fullName.trim().toLowerCase(),
          userName: userName.trim().toLowerCase(),
          email: email.trim().toLowerCase(),
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
    title, description
  }
    = req.body;
  User.findOne({
    $or: [
      { _id: userId },
      { permission: 1 || 2 }
    ]
  })
    .sort({ title: 'descending' })
    .exec()
    .then((adminFound) => {
      if (adminFound.permission === 3) {
        return res.status(403).send({
          success: false,
          message: `Sorry you dont the permission
          to perform the requested operation`
        });
      }
      const billDetails = {
        title: title.toUpperCase(), description
      };
      const newBill = new Bill(billDetails);
      newBill.save((error, createdBill) => {
        if (error) {
          return res.status(409).send({
            message: 'bill already exists!',
            success: false
          });
        }
        return res.status(201).send({
          success: true,
          message: 'bill successfully created',
          createdBill
        });
      });
    })
    .catch((error) => {
      res.status(500)
        .send({ message: 'Internal server error', error: error.message });
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
      { permission: 1 || 2 }
    ]
  })
    .exec()
    .then((adminFound) => {
      if (adminFound.permission === 3) {
        return res.status(403).send({
          success: false,
          message: `Sorry you dont the permission 
          to perform the requested operation`
        });
      }
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
          if (error) {
            return res.status(409).send({
              message: 'bill already exists!',
              success: false
            });
          }
          if (editedBill) {
            return res.status(200)
              .send({
                message: 'Bill has been successfully updated!',
                editedBill,
              });
          }
        });
    })
    .catch((error) => {
      res.status(500)
        .send({ message: 'Internal server error', error: error.message });
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
      { permission: 1 || 2 }
    ]
  })
    .exec()
    .then((adminFound) => {
      if (adminFound.permission === 3) {
        return res.status(403).send({
          success: false,
          message: `Sorry you dont the permission
           to perform the requested operation`
        });
      }
      Bill.findByIdAndRemove(billId, (err) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: 'Internal server error',
          });
        }
        Vote.remove({ votedBill: billId }, (err) => {
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
        // return res.status(200).send({
        //   success: true,
        //   message: 'Bill successfully deleted!'
        // });
      });
    })
    .catch((error) => {
      res.status(500)
        .send({ message: 'Internal server error', error });
    });
};

/**
   * @description allows admin update user permission
   *
   * @param { Object } req user request object
   * @param { Object } res servers response
   *
   * @return { undefined }
   */
exports.addPermission = (req, res) => {
  const adminId = req.decoded.id;
  const { userId } = req.body;
  const { permission } = req.body;
  const { isActive } = req.body;
  const { errors, isValid } = validators.validatePermmission(req.body);
  if (!isValid) {
    return res.status(400).send({ error: errors });
  }
  User.findOne({
    $and: [
      { _id: adminId },
      { permission: 1 }
    ]
  })
    .exec()
    .then((adminFound) => {
      if (!adminFound) {
        return res.status(400).send({
          success: false,
          message: `Sorry you dont the permission
           to perform the requested operation`
        });
      }
      User.findByIdAndUpdate(
        { _id: userId },
        {
          $set: {
            permission,
            isActive
          },
        },
        { new: true },
      ).exec((error, updatedUser) => {
        if (updatedUser) {
          return res.status(200)
            .send({
              message: 'user permission has been successfully updated!',
              updatedUser,
            });
        }
      });
    })
    .catch((error) => {
      res.status(500).send({
        error: error.message
      });
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
    select: '-password',
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 6
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
        message: 'internal server error',
        error: error.message
      });
    });
};
