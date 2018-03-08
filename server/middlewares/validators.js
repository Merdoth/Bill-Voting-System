import jwt from 'jsonwebtoken';
import lodash from 'lodash';

const secret = process.env.SECRET;


exports.validateToken = (req, res, next) => {
  const token = req.body.token
    || req.query.token
    || req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ message: 'User not authorized' });
  }
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      return res.status(401).send({
        message: 'Token authentication failed'
      });
    }
    req.decoded = decoded.token;
    next();
  });
};

/**
 * @description validate User Sign Up Field
 *
 * @param {Object} value
 *
 * @returns {undefined}
 */
exports.validateSignUpInput = (value) => {
  const {
    fullName, userName, email, password
  } = value;
  const errors = {};
  const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!fullName) {
    errors.fullNameError = 'Fullname can\'t be empty';
  } else if (fullName.trim().length === 0) {
    errors.fullNameError = 'Fullname is required';
  } else if (fullName.length < 3) {
    errors.fullNameError = 'Fullname must be at least 3 characters long';
  }
  if (!userName) {
    errors.userNameError = 'Username can\'t be empty';
  } else if (userName.trim().length === 0) {
    errors.userNameError = 'Username is required';
  } else if (userName.length < 3) {
    errors.userNameError = 'Username must be at least 3 characters long';
  }
  if (!email) {
    errors.emailError = 'Email can\'t be empty';
  } else if (email.trim().length === 0) {
    errors.emailError = 'Email is required';
  } else if (!filter.test(email)) {
    errors.emailError = 'Email is not valid';
  }
  if (!password) {
    errors.passwordError = 'Password can\'t be empty';
  } else if (password.trim().length === 0) {
    errors.passwordError = 'Password is required';
  } else if (password.length < 8) {
    errors.passwordError = 'Password must be at least 8 characters long';
  }

  return { isValid: lodash.isEmpty(errors), errors };
};

/**
 * @description validate Bill Input Field
 *
 * @param {Object} value
 *
 * @returns {object} json - payload
 */
exports.validateBillInput = (req, res, next) => {
  req.check('title', 'Title cannot be empty').notEmpty();
  req.check('title', 'Title must be at least of 8 character long')
    .isLength(8, 50);
  req.check('description', 'Description cannot be empty').notEmpty();
  req.check('description', 'Description must be at least of 8 character long')
    .isLength(8, 50);
  req.check('billProgress', 'Bill Progress cannot be empty').notEmpty();
  req.check('billProgress', 'Bill Progress must be at least of 8 character long')
    .isLength(8, 50);
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).send({ message });
  } else {
    next();
  }
};

/**
 * @description validate User Sign in Field
 *
 * @param {Object} value
 *
 * @returns {object} json - payload
 */
exports.validateSignInInput = (value) => {
  const {
    fullName, userName, email, password
  } = value;
  const errors = {};
  const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!email) {
    errors.emailError = 'Email can\'t be empty';
  } else if (email.trim().length === 0) {
    errors.emailError = 'Email is required';
  } else if (!filter.test(email)) {
    errors.emailError = 'Email is not valid';
  }
  if (!password) {
    errors.passwordError = 'Password can\'t be empty';
  } else if (password.trim().length === 0) {
    errors.passwordError = 'Password is required';
  } else if (password.length < 8) {
    errors.passwordError = 'Password must be at least 8 characters long';
  }

  return { isValid: lodash.isEmpty(errors), errors };
};

/**
 * @description validate Admin Input Field
 *
 * @param {Object} value
 *
 * @returns {object} json - payload
 */
exports.validateAdmin = (req, res, next) => {
  req.check('userName', 'Username cannot be empty').notEmpty();
  req.check('password', 'Password cannot be empty').notEmpty();
  req.check('password', 'Password must be at least of 8 character')
    .isLength(6, 50);
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).send({ message });
  } else {
    next();
  }
};

exports.validateUserProfile = (req, res, next) => {
  req.check('fullName', 'Fullname cannot be empty').notEmpty();
  req.check('userName', 'Username cannot be empty').notEmpty();
  req.check('email', 'Email cannot be empty').notEmpty();
  req.check('email', 'Please enter a valid email').isEmail();
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).send({ message });
  } else {
    next();
  }
};

/**
 * @description validate permisssion 
 *
 * @param {Object} value
 *
 * @returns {object} json - payload
 */
exports.validatePermmission = (value) => {
  const {
    permission
  } = value;
  const errors = {};
  const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!permission) {
    errors.permissionError = 'permission can\'t be empty';
  } else if (permission == 1) {
    errors.permissionError = 'This role is restricted ';
  } else if (permission < 1 || permission > 3) {
    errors.permissionError = 'this permission role is invalid';
  }


  return { isValid: lodash.isEmpty(errors), errors };
};
