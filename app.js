const express = require("express");
const sq = require("./config/database");
const Users = require("./models/users");
const Locations = require("./models/locations");
const Logs = require("./models/log");

const app = express();
const PORT = process.env.PORT | 3000;
app.use(express.urlencoded({ extended: true }));
// I get the user details as url query parameters from the user when he scans along with random string

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/public/index.html')
})

app.post("/login", async (req, res) => {
  const data = req.body;
  console.log(data);
  // const student = await Users.findByPk(data.rollNo);
  const student = await Users.findOne({where: {rollNo: data.rollNo}});
  const location = await Locations.findOne({where: {uniqueId: data.uniqueId}});
  if(student && location){
    const logs = Logs.create({location: location.location, rollNo: data.rollNo, loginTime: new Date().toISOString().slice(0, 19).replace('T', ' ')});
  }
  res.json({msg:"You are logged in!"});
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
