
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @description When called, this function generates a
 * token
 * @param {Object} user request object
 * @return {string} Token
 */
export default (user) => {
  const Token = jwt.sign({
    token: {
      id: user._id,
      userName: user.userName,
      email: user.email
    }
  }, process.env.SECRET, { expiresIn: 60 });
  return Token;
};
