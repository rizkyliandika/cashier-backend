const { Router } = require('express');
const UserService = require('../services/user');
const middleware = require('../services/auth');

const UserRoute = Router()
    .get('/', middleware.verifyAuth, async (req, res) => {
        try {
            const data = await UserService.findAll();
            res.status(200).json({ message: 'Success get data', data });
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    })
    .post('/', async (req, res) => {
        try {
            const { username, password, phoneNumber, email, active } = req.body;
            const data = await UserService.createUser({ username, password, phoneNumber, email, joinDate: Date.now(), active })
            res.status(200).json({ message: 'Success create user', data });
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    })
    .put('/:id', middleware.verifyAuth, async (req, res) => {
        try {
            const { username, password, phoneNumber, email, active } = req.body;
            const { id } = req.params;
            const data = await UserService.updateUser(id, { username, password, phoneNumber, email, joinDate: Date.now(), active });
            res.status(200).json({ message: 'Success update user', data });
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    })
    .delete(':/id', middleware.verifyAuth, async (req, res) => {
        try {
            const { id } = req.params;
            const data = await UserService.deleteUser(id);
            res.status(200).json({ message: 'Success delete user', data });
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    })
    .get(':/id', middleware.verifyAuth, async (req, res) => {
        try {
            const { id } = req.params;
            const data = await UserService.findUserById(id);
            res.status(200).json({ message: 'Success find user', data });
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    })

module.exports = UserRoute;