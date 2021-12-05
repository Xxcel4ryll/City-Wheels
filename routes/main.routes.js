const router = require('express').Router();
const mainController = require('../controllers/main.controllers');

router.get('/', mainController.home);

router.get('/sign-in', mainController.signIn);

module.exports = router;
