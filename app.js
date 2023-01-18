const express = require("express");
const sq = require("./config/database");
const Users = require("./models/users");
const Locations = require("./models/locations");
const Logs = require("./models/log");

const app = express();
const PORT = process.env.PORT | 3000;

// I get the user details as url query parameters from the user when he scans along with random string

app.get("/login", (req, res) => {
  const query = req.query;
  console.log(query);
});

app.post("/logout", (req, res) => {});


const start = async () => {
  try {
    const res = await sq.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Running app at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
