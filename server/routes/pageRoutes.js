const express = require('express');
const router = express.Router();

const pageController = require('../controllers/pageControllers');
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/').get(pageController.mainPage);
router.route('/register').post(pageController.register);
router.route('/login').post(pageController.login);
router.route('/friends/add').post(authMiddleware, pageController.friendsAdd);
router.route('/friends/remove').post(authMiddleware, pageController.friendsRemove);
router.route('/friends/all').get(authMiddleware, pageController.friendsGet);
router.route('/users/all').get(authMiddleware, pageController.getAllUser);
router.route('/user-info').get(authMiddleware, pageController.getUserInfo);

module.exports = router;