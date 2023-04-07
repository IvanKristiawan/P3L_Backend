const { Sequelize } = require("sequelize");
const db = require("../../../config/Database.js");
const User = require("../../models/UserModel.js");

const { DataTypes } = Sequelize;

const HakAkses = db.define(
  "hakaksess",
  {
    // MASTER
    bookingGym: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    bookingKelas: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    jadwalGym: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    jadwalInstruktur: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    izinInstruktur: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    // UTILITY
    profilUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    daftarUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    aktivasi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    deposit: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    // Foreign Key Cabang
    userId: {
      type: DataTypes.INTEGER,
      default: 1,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

HakAkses.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

module.exports = HakAkses;

(async () => {
  await db.sync();
})();
