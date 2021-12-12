const User = require('../models/User');
const bcrypt = require('bcryptjs');

const newUser = async (req, res) => {
    try {
        const { password, email } = req.body;
        let user = await User.find({ email });
        user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    newUser,
    getUsers
}