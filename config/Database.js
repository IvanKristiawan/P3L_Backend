const { Sequelize } = require("sequelize");

// Connect PhpMyAdmin MySql to Nodejs
const db = new Sequelize("gym_p3l", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Akun MySql Hosting
// const db = new Sequelize("u1643776_gadai_db", "u1643776_ivan", "Damnfly*369", {
//   host: "127.0.0.1",
//   dialect: "mysql",
// });

module.exports = db;
