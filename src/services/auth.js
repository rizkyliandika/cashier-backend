const { comparePassword } = require("../helpers")
const UserService = require('../services/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (user) => {
    const result = await UserService.findUserByEmail(user.email);
    const checkPassword = await comparePassword(user.password, result[0].password);
    if (user.email === result[0].email && checkPassword) {
        return jwt.sign({ email: result[0].email }, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn: 60 * 60 });
    } else {
        throw new Error('Username or password is invalid');
    }
}