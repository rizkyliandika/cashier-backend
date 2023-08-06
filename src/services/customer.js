const { db } = require('../db/connection');
const Customer = db.customer;

exports.createCustomer = (customer) => {
    return Customer.create({
        barcode: customer.barcode
    })
        .then((customer) => {
            console.log('>> Created customer: ', JSON.stringify(customer, null, 4));
            return customer;
        })
        .catch((err) => {
            console.error('>> Error while creating customer: ', err);
        })
}

exports.updateCustomer = (id, customer) => {
    return Customer.update({
        barcode: customer.barcode
    }, { where: { id } })
        .then(customer => {
            console.log('>> Updated customer: ', JSON.stringify(customer, null, 4));
            return customer;
        })
        .catch(err => {
            console.error('>> Error while updating customer: ', err);
        })
}

exports.deleteCustomer = (id) => {
    return Customer.destroy({ where: { id } })
        .then(customer => {
            console.log('>> Deleted customer: ', JSON.stringify(customer, null, 4));
            return customer;
        })
        .catch(err => {
            console.error('>> Error while deleting customer: ', err);
        })
}

exports.findAll = () => {
    return Customer.findAll({ include: ['products'] })
        .then((customer) => {
            return customer;
        })
}

exports.findCustomerById = (customerId) => {
    return Customer.findByPk(customerId, { include: ["products"] })
        .then((customer) => {
            return customer;
        })
        .catch(err => {
            console.error('>> Error while finding customer: ', err);
        })
}