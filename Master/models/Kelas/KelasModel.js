const { Sequelize } = require("sequelize");
const db = require("../../../config/Database.js");

const { DataTypes } = Sequelize;

const Kelas = db.define(
  "kelass",
  {
    namaKelas: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    hari: {
      type: DataTypes.STRING,
      default: "",
      allowNull: true,
    },
    harga: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Kelas;

(async () => {
  await db.sync();
})();
