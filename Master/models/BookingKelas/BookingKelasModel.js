const { Sequelize } = require("sequelize");
const db = require("../../../config/Database.js");
const User = require("../../../User/models/UserModel.js");
const JadwalInstruktur = require("../JadwalInstruktur/JadwalInstrukturModel.js");

const { DataTypes } = Sequelize;

const BookingKelas = db.define(
  "bookingkelass",
  {
    // Foreign Key User
    userId: {
      type: DataTypes.INTEGER,
      default: 1,
      allowNull: false,
    },
    absensi: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: false,
    },
    // Foreign Key Jadwal Gym
    jadwalInstrukturId: {
      type: DataTypes.INTEGER,
      default: 1,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

BookingKelas.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

BookingKelas.belongsTo(JadwalInstruktur, {
  foreignKey: "jadwalInstrukturId",
  targetKey: "id",
});

module.exports = BookingKelas;

(async () => {
  await db.sync();
})();
