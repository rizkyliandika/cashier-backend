const { Router } = require('express');
const User = require('../db/models/user.model');

const UserRoute = Router()
    .get('/', async (req, res) => {
        try {
            const data = await User.findAll();
            res.status(200).json({ message: 'Success get data', data });
        } catch (error) {
            res.status(500).json({ message: error?.message })
        }
    });

module.exports = UserRoute;