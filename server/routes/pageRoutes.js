const express = require('express');
const router = express.Router();

const pageController = require('../controllers/pageControllers');

router.route('/register').post(pageController.register);
router.route('/register').get((req, res) => {
    res.send("hello world");
});
module.exports = router;