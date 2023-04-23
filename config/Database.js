const { Sequelize } = require("sequelize");

// Connect PhpMyAdmin MySql to Nodejs
const db = new Sequelize("p3l_200710588", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Akun MySql Hosting
// const db = new Sequelize("u1985316_p3l_200710588", "u1985316_ivan", "Damnfly*369", {
//   host: "127.0.0.1",
//   dialect: "mysql",
// });

module.exports = db;
