const Sequelize = require("sequelize");
const sq = require("../config/database");

const Users = sq.define(
  "users",
  {
    rollNo: {
      type: Sequelize.STRING,
      allowNull: false,
      primarKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Users;
