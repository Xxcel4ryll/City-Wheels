const router = require('express').Router();
const mainController = require('../controllers/main.controllers');
const userController = require('../controllers/user.controllers');
const UserModel = require('../models/user.model');

// router.post('/purchase', userController.purchase, UserModel.waybill);

router.post('/pay', userController.pay, UserModel.pay);

router.get('/dashboard', mainController.signUp);

router.get('/profile/:id', UserModel.student);

module.exports = router;
