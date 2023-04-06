const { Sequelize } = require("sequelize");
const db = require("../../../config/Database.js");

const { DataTypes } = Sequelize;

const JadwalGym = db.define(
  "jadwalgyms",
  {
    dariJam: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    sampaiJam: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    tanggal: {
      type: DataTypes.DATE,
      default: new Date(),
      allowNull: false,
    },
    jumlahMember: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    jumlahMemberMax: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = JadwalGym;

(async () => {
  await db.sync();
})();
