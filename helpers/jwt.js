const jwt = require('jsonwebtoken');

const { JWT_SECRET: secretKey } = process.env;

module.exports = {
  sign(payload) {
    try {
      return jwt.sign(payload, secretKey);
    } catch (e) {
      return false;
    }
  },
  verify(payload) {
    try {
      return jwt.verify(payload, secretKey);
    } catch (e) {
      return null;
    }
  },
};
