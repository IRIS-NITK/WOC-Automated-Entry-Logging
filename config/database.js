const Sequelize = require("sequelize");
require("dotenv").config();

// const user = process.env.username;
const password = process.env.password;

const sequelize = new Sequelize("Automated_Entry_System", "root", password, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;