const bcrypt = require('bcrypt');

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

exports.hashPassword = async (plainPassword) => {
    const hash = await bcrypt.hash(plainPassword, getRandomInt(10));
    return hash;
}

exports.comparePassword = async (plainPassword, hash) => {
    const result = await bcrypt.compare(plainPassword, hash);
    return result;
}