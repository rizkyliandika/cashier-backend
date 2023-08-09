const { Router } = require("express");
const AuthService = require('../services/auth');

const AuthRoute = Router()
    .post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const data = await AuthService.login({ email, password });
            res.status(200).json({ message: 'Login success', token: data });
        } catch (error) {
            res.status(401).json({ message: error?.message });
        }
    })

module.exports = AuthRoute;