const { Router } = require('express');
const UserRoute = require('./user');
const CustomerRoute = require('./customer');
const ProductRoute = require('./product');

const AppRoute = Router()
    .use('/users', UserRoute)
    .use('/customers', CustomerRoute)
    .use('/products', ProductRoute)
    .use((req, res, next) => {
        res.status(404).json({ message: "404 not found" })
    })

module.exports = AppRoute;