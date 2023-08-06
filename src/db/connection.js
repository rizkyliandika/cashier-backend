const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const Environment = () => {
    if (process.env.NODE_ENV === 'development') {
        console.log('Running on development server');
    } else {
        console.error('Error not running on development');
        process.exit(1);
    }
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./models/user.model.js')(sequelize, DataTypes);
db.customer = require('./models/customer.model.js')(sequelize, DataTypes);
db.product = require('./models/product.model.js')(sequelize, DataTypes);
db.transaction = require('./models/transaction.model.js')(sequelize, DataTypes);

db.customer.hasMany(db.product, { as: 'products' });
db.product.belongsTo(db.customer, {
    foreignKey: "customerId",
    as: 'customer',
});

module.exports = { sequelize, Environment, db };