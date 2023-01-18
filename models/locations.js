const Sequelize = require("sequelize");
const sq = require('../config/database');

const Locations = sq.define("locations", {
    location : {
        type: Sequelize.STRING,
        allowNull: false,
        primarKey: true
    },
    uniqueId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Locations;