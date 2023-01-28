const Sequelize = require("sequelize");
const sq = require("../config/database");

const Users = sq.define("users", {
  rollNo: {
    primarKey: true,
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Users;
