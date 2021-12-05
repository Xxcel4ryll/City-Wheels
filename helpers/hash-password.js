const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
  },
  comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  },
};
