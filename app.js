const express = require("express");
const sq = require("./models/database");
const Users = require("./models/users");
const Locations = require("./models/locations");

const app = express();
const PORT = process.env.PORT | 3000;

app.listen(PORT, () => {
  console.log(`Running app at port ${PORT}`);
});

sq.sync()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
