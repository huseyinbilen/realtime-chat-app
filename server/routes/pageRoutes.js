const express = require('express');
const router = express.Router();

const pageController = require('../controllers/pageControllers');

router.route('/register').post(pageController.register);
router.route('/login').post(pageController.login);

module.exports = router;