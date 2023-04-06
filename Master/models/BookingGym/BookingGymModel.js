const { Sequelize } = require("sequelize");
const db = require("../../../config/Database.js");
const User = require("../../../User/models/UserModel.js");
const JadwalGymModel = require("../JadwalGym/JadwalGymModel.js");

const { DataTypes } = Sequelize;

const BookingGym = db.define(
  "bookinggyms",
  {
    // Foreign Key User
    userId: {
      type: DataTypes.INTEGER,
      default: 1,
      allowNull: false,
    },
    // Foreign Key Jadwal Gym
    jadwalGymId: {
      type: DataTypes.INTEGER,
      default: 1,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

BookingGym.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

BookingGym.belongsTo(JadwalGymModel, {
  foreignKey: "jadwalGymId",
  targetKey: "id",
});

module.exports = BookingGym;

(async () => {
  await db.sync();
})();
