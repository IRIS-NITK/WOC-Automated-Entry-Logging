const Sequelize = require("sequelize");
const sq = require('./database');

const Users = sq.define("users", {
    rollNo : {
        type: Sequelize.STRING,
        allowNull: false,
        primarKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    logged: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,                     // 0 for logged out and 1 for Logged in
    }
});

module.exports = Users;