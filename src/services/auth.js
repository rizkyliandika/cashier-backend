const { comparePassword, checkVerifyAuthError } = require("../helpers")
const UserService = require('../services/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const _algorithm = 'HS256'

exports.login = async (user) => {
    const result = await UserService.findUserByEmail(user.email);
    const checkPassword = await comparePassword(user.password, result[0].password);
    if (user.email === result[0].email && checkPassword) {
        return jwt.sign({ email: result[0].email }, process.env.SECRET_KEY, { algorithm: _algorithm, expiresIn: "30m" });
    } else {
        throw new Error('Username or password is invalid');
    }
}

exports.verifyAuth = (req, res, next) => {
    try {
        let authHeader = req.headers['authorization'];
        const splitToken = authHeader.split(' ')[1];
        jwt.verify(splitToken, process.env.SECRET_KEY);
        next();
    } catch (error) {
        return res.status(401).json({ message: checkVerifyAuthError(error) })
    }
}