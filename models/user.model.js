require('dotenv').config();
const { Model, DataTypes, Op } = require('sequelize');
const { seq: DB } = require('../sequelize');
const { hashPassword, comparePassword } = require('../helpers/hash-password');
const jwt = require('../helpers/jwt');
const _ = require('lodash');
const paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);
const Admin = require('./admin.model');
class User extends Model {
  static async buildUser(req, res) {
    const data = req.resource;
    const { email } = data;

    const [user, created] = await User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        ...data,
      },
    });

    if (!created) {
      return res.render('success', {
        message: 'Invalid credentials! User with email already exist',
        emoji: '&#128549',
      });
    }
    // res.cookie('user', user);
    return res.status(201).render('success', {
      message: 'Student Credentials successfully Created',
      emoji: '&#128077',
    });
  }

  static async login(req, res) {
    const data = req.resource;
    const { username, password } = data;

    const adminExist = await Admin.findOne({
      where: {
        firstName: username,
        password,
      },
    });

    if (!adminExist) {
      return res.render('sign-in', {
        message: 'email or password incorrect',
      });
    }

    // const match = await comparePassword(password, userExist.password);

    // if (!match)
    //   return res.render('sign-in', {
    //     message: 'email or password incorrect',
    //   });

    const token = await jwt.sign({
      id: adminExist.id,
      role: 'ADMIN',
    });

    // return _.omit({ ...userExist.toJSON(), token }, ['password']);
    res.cookie('user', _.omit({ ...adminExist.toJSON(), token }, ['password']));
    return res.render('dashboard', { message: '' });
  }

  static waybill(req, res) {
    const { weight, quatity } = req.purchase;

    const amount = +quatity * (+weight * 100);
    return res.render('goods', { message: amount.toLocaleString() });
  }

  static pay(req, res) {
    const { amount } = req.purchase;
    const { email } = req.cookies.user;

    // Also verify payment then make sendSMS
    paystack.transaction
      .initialize({
        email,
        amount: `${amount.replace(/,/g, '')}00`,
      })
      .then(async (data) => {
        const authURL = data.data.authorization_url;
        await res.redirect(`${authURL}`);
      })
      .catch((err) => console.log(err.message));
  }

  static async forgotPassword({ email, userName }) {
    const userExist = await this.findOne({
      where: {
        email,
        userName,
      },
    });

    if (!userExist) return Promise.reject('User doesnt exist');

    return userExist.userName;
  }

  static async allUser() {
    const users = await this.findAndCountAll();

    if (!users) return Promise.reject('Users doesnt exist');

    return users;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maritalStat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kinRel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kinNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    traininType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trainingCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medical: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    underscored: true,
    timestamps: true,
    sequelize: DB,
  }
);

module.exports = User;
