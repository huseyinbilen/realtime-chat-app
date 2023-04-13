const express = require('express');
const router = express.Router();

const pageController = require('../controllers/pageControllers');
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/register').post(pageController.register);
router.route('/login').post(pageController.login);
router.route('/friends/add').post(authMiddleware, pageController.friendsAdd);

module.exports = router;