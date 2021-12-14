const Joi = require('joi');
const User = require('../models/user.model');

module.exports = class {
  static get createSchema() {
    return Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      address: Joi.string(),
      date: Joi.date(),
      state: Joi.string(),
      phone: Joi.string(),
      gender: Joi.string(),
      maritalStat: Joi.string(),
      amount: Joi.string(),
      kin: Joi.string(),
      kinRel: Joi.string(),
      kinNumber: Joi.string(),
      traininType: Joi.string(),
      duration: Joi.string(),
      trainingCategory: Joi.string(),
      medical: Joi.string(),
      email: Joi.string().email(),
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
    // console.log(req.body);
    const avatar = req.file.buffer.toString('base64');
    req.resource = { ...req.body, avatar };
    next();
  }

  static async loginUser(req, res, next) {
    req.resource = req.body;
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
