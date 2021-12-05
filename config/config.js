require('dotenv').config();

const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT, MYSQL_NAME } =
  process.env;

module.exports = {
  development: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_NAME,
    host: MYSQL_HOST,
    dialect: 'mysql',
  },
};
