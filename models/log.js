const Sequelize = require("sequelize");
const sq = require("../config/database");

const Logs = sq.define("logs", {
  rollNo: {
    type: Sequelize.STRING,
    allowNull: false,
    primarKey: true,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  loginTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  logoutTime: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

module.exports = Logs;