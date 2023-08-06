const express = require('express');
const { Environment, sequelize, db } = require('./db/connection');
const AppRoute = require('./routes');
const app = express();
const port = 3000;

const run = async () => {
    Environment();
    app.use(express.json());
    app.use(AppRoute);
    app.listen(port, () => {
        console.log(`Example listening on port ${port}`);
    });
};

db.sequelize.sync({force: true})
    .then(() => {
        console.log("Drop and re-sync db.");
        run();
    })