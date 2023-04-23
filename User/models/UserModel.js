const { Sequelize } = require("sequelize");
const db = require("../../config/Database.js");

const { DataTypes } = Sequelize;

const User = db.define(
  "users",
  {
    noMember: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    telepon: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    tanggalLahir: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: true,
    },
    tipeUser: {
      type: DataTypes.STRING,
      default: "ADMIN", // ADMIN, MANAGER, INSTRUKTUR, MEMBER
      allowNull: true,
    },
    aktivasi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    deposit: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    depositKelas: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    jmlLibur: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    jmlTerlambat: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
    waktuTerlambat: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;

(async () => {
  await db.sync();
})();
