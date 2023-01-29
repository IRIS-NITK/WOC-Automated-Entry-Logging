const express = require("express");
const sq = require("./config/database");
const Users = require("./models/users");
const Locations = require("./models/locations");
const Logs = require("./models/log");
const crypto = require("crypto");
const create = require("./create");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT | 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(cors());

// login post request will contain rollno and uniqueId in the request body
app.post("/login", async (req, res) => {
  const data = req.body;
  console.log(data);
  const student = await Users.findOne({ where: { rollNo: data.rollNo } });
  const location = await Locations.findOne({
    where: { uniqueId: data.uniqueId },
  });

  if (student && location) {
    const token = crypto.randomBytes(8).toString("hex");
    const logs = Logs.create({
      location: location.location,
      rollNo: data.rollNo,
      loginTime: new Date().toISOString().slice(0, 19).replace("T", " "),
      token: token,
    });

    res.json({ msg: "You are logged in!", token });
  }
});

// logout patch request will contain the user roll number, log out location and token in the request body
app.patch("/logout", async (req, res) => {
  const data = req.body;
  console.log(data);
  const log = await Logs.findOne({
    where: { token: data.token },
  });

  const token = log.dataValues.token;
  const userLog = await Logs.findOne({
    where: { token: token },
  });
  if (token && userLog) {
    await Logs.update(
      { logoutTime: new Date().toISOString().slice(0, 19).replace("T", " ") },
      { where: { token: token } }
    );
    res.json({ msg: "You are logged out!" });
  }
});

app.post("/generate_qr", async (req, res) => {
  const location = req.body.location;
  console.log(req.body);
  const token = crypto.randomBytes(8).toString("hex");
  await Locations.update(
    {
      uniqueId: token,
    },
    { where: { location } }
  );
  res.json({ msg: "New uid generated!", uid: token });
});

app.get("/qr", async (req, res) => {
  const data = req.query.location;
  const location = await Locations.findOne({ where: { location: data } });
  res.status(200).json({ uid: location.uniqueId });
});

const start = async () => {
  try {
    await sq.sync({ alter: true });
    await create();
    app.listen(PORT, () => {
      console.log(`Running app at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
