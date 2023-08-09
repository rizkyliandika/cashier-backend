const { db } = require('../db/connection');
const { hashPassword } = require('../helpers/index');
const User = db.user;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.findAll = () => {
    return User.findAll()
        .then(user => {
            console.log('>> Success find all user');
            return user;
        })
        .catch(err => {
            console.error('>> Failed to finding all user');
        })
}

exports.createUser = async (user) => {
    const password = await hashPassword(user.password);
    return User.create({
        username: user.username,
        password: password,
        phone_number: user.phoneNumber,
        email: user.email,
        joindate: user.joinDate,
        active: user.active,
    })
        .then(user => {
            console.log('>> Success create user', JSON.stringify(user, null, 4));
            return user;
        })
        .catch(err => {
            console.error('>> Failed to creating user: ', err);
        })
}

exports.updateUser = async (id, user) => {
    const password = await hashPassword(user.password);
    return User.update({
        username: user.username,
        password: password,
        phone_number: user.phoneNumber,
        email: user.email,
        joindate: user.joinDate,
        active: user.active,
    }, { where: { id } })
        .then(user => {
            console.log('>> Success update user', JSON.stringify(user, null, 4));
            return user;
        })
        .catch(err => {
            console.error('>> Failed to updating user: ', err);
        })
}

exports.deleteUser = (id) => {
    return User.destroy({ where: { id } })
        .then(user => {
            console.log('>> Success delete user: ', JSON.stringify(user, null, 4));
            return user;
        })
        .catch(err => {
            console.error('>> Failed to deleting user: ', err);
        })
}

exports.findUserById = (id) => {
    return User.findByPk(id)
        .then(user => {
            return user;
        })
        .catch(err => {
            console.error('>> Error while finding user: ', err);
        })
}

exports.findUserByEmail = (email) => {
    return User.findAll({
        where: {
            email: {
                [Op.like]: `%${email}%`
            }
        }
    })
        .then(user => {
            return user;
        })
        .catch(err => {
            console.error('>> Error while finding user: ', err);
        })
}