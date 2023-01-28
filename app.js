const express = require("express");
const sq = require("./config/database");
const Users = require("./models/users");
const Locations = require("./models/locations");
const Logs = require("./models/log");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT | 3000;
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


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

  const student = await Users.findOne({ where: { rollNo: data.rollNo } });
  const location = await Locations.findOne({
    where: { uniqueId: data.uniqueId },
  });
  const log = await Logs.findOne({
    where: { token: data.token },
  });

  const token = log.dataValues.token;
  const rollNo = student.dataValues.rollNo;
  const userLog = await Logs.findOne({
    where: { rollNo: rollNo, token: token },
  });
  if (student && location && token && userLog) {
    await Logs.update(
      { logoutTime: new Date().toISOString().slice(0, 19).replace("T", " ") },
      { where: { /*rollNo: student,*/ token: token } }
      );
      res.json({ msg: "You are logged out!" });
  }
});


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
