const { Router } = require('express');
const CustomerService = require('../services/customer');

const CustomerRoute = Router()
    .get('/', async (req, res) => {
        try {
            const data = await CustomerService.findAll();
            res.status(200).json({ message: 'Success get data', data });
        } catch (error) {
            res.status(500).json({ message: error?.message })
        }
    })
    .get('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const data = await CustomerService.findCustomerById(id);
            res.status(200).json({ message: 'Success get data customer by id', data });
        } catch (error) {
            res.status(500).json({ message: error?.message })
        }
    })
    .post('/', async (req, res) => {
        try {
            const data = await CustomerService.createCustomer(
                { barcode: req.body?.barcode }
            );
            res.status(200).json({ message: 'Success create data customer', data });
        } catch (error) {
            res.status(500).json({ message: error?.message })
        }
    })
    .put('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { barcode } = req.body;
            const data = await CustomerService.updateCustomer(id, {
                barcode: barcode
            })
            res.status(200).json({ message: 'Success update data customer', data });
        } catch (error) {
            res.status(500).json({ message: error?.message })
        }
    })
    .delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const data = await CustomerService.deleteCustomer(id);
            res.status(200).json({ message: 'Success delete data customer', data });
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    })


module.exports = CustomerRoute;