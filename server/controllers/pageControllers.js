const argon2 = require('argon2');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        user.password = await argon2.hash(user.password);
        user.save();
        res.status(200).json({
            status: 'Success',
            desc: 'User Created'
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });    
    }
}