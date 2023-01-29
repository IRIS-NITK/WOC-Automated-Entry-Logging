const Users = require("./models/users");
const Locations = require("./models/locations");
const studentdata = require("./studentdata.json");
const locationdata = require("./locationdata.json");

const create = async () => {
  await Users.destroy({
    where: {},
    truncate: true,
  });
  await Locations.destroy({
    where: {},
    truncate: true,
  });
  const users = await Users.bulkCreate(studentdata);
  const locations = await Locations.bulkCreate(locationdata);
  console.log(users, locations);
};

module.exports = create;
