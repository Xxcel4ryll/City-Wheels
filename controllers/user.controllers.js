const Joi = require('joi');
const User = require('../models/user.model');

module.exports = class {
  static get createSchema() {
    return Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      address: Joi.string().required(),
      date: Joi.date().required(),
      state: Joi.string().required(),
      phone: Joi.string().required(),
      gender: Joi.string().required(),
      maritalStat: Joi.string().required(),
      amount: Joi.string().required(),
      kin: Joi.string().required(),
      kinRel: Joi.string().required(),
      kinNumber: Joi.string().required(),
      traininType: Joi.string().required(),
      duration: Joi.string().required(),
      trainingCategory: Joi.string().required(),
      medical: Joi.string().required(),
      email: Joi.string().email().required(),
    });
  }

  static get loginSchema() {
    return Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
  }

  static get forgotPasswordSchema() {
    return Joi.object().keys({
      email: Joi.string().email().required(),
      userName: Joi.string().required(),
    });
  }

  static get usernameSchema() {
    return Joi.object().keys({
      email: Joi.string().email().required(),
      socialSecurity: Joi.string().required(),
    });
  }

  static get updateSchema() {
    return Joi.object().keys({
      oldPassword: Joi.string().required(),
      newPassword: Joi.string()
        .invalid(Joi.ref('oldPassword'))
        .required()
        .messages({
          'any.only': 'A new password is required',
        }),
      confirmPassword: Joi.string()
        .valid(Joi.ref('newPassword'))
        .required()
        .messages({
          'any.only': 'passwords do not match',
        }),
    });
  }

  // eslint-disable-next-line no-unused-vars
  static async createUser(req, res, next) {
    req.resource = req.body;
    next();
    // console.log(req.body);
  }

  static async loginUser(req, res, next) {
    req.resource = req.body;
    next();
  }

  static async purchase(req, res, next) {
    req.purchase = req.body;
    next();
  }

  static async pay(req, res, next) {
    req.purchase = req.body;
    next();
  }

  static async forgotPassword(req, res) {
    const passwordToken = await User.forgot(req.body);

    res.json(passwordToken);
  }

  static async fetchUser(req, res) {
    const user = await User.allUser();

    res.json(user);
  }

  static async resetPassword(req, res) {
    const passwordReset = await User.passwordReset(req.body);

    res.json(passwordReset);
  }

  static async updatePassword(req, res) {
    const passwordInfo = req.body;
    const partner = req.user.toJSON();

    const updatedPassword = await User.passwordUpdate({
      ...passwordInfo,
      ...partner,
    });

    res.json(updatedPassword);
  }
};
