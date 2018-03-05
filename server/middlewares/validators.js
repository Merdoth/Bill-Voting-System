import jwt from 'jsonwebtoken';

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
    req.decoded = decoded.token.user;
    next();
  });
};


exports.validateSignUp = (req, res, next) => {
  req.check('email', 'Email cannot be empty').notEmpty();
  req.check('email', 'Please enter a valid email').isEmail();
  req.check('userName', 'Username cannot be empty').notEmpty();
  req.check('fullName', 'Fullname cannot be empty').notEmpty();
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


exports.validateSignIn = (req, res, next) => {
  req.check('email', 'email address cannot be empty').notEmpty();
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

exports.validateProfile = (req, res, next) => {
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
