const router = require('express').Router();
const Validator = require('../services/validator');
const UserController = require('../controllers/user.controllers');
const UserModel = require('../models/user.model');
const $ = require('express-async-handler');

router.post(
  '/signup',
  Validator(UserController.createSchema),
  $(UserController.createUser),
  UserModel.buildUser
);

router.post(
  '/login',
  Validator(UserController.loginSchema),
  $(UserController.loginUser),
  UserModel.login
);

router.post(
  '/forgot/password',
  Validator(UserController.forgotPasswordSchema),
  $(UserController.forgotPassword)
);

router.get('/users', $(UserController.fetchUser));

router.post(
  '/reset/password',
  Validator(UserController.resetPasswordSchema),
  $(UserController.resetPassword)
);

module.exports = router;
