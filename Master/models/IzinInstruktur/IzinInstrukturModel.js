const { Sequelize } = require("sequelize");
const db = require("../../../config/Database.js");
const User = require("../../../User/models/UserModel.js");
const JadwalInstruktur = require("../JadwalInstruktur/JadwalInstrukturModel.js");

const { DataTypes } = Sequelize;

const IzinInstruktur = db.define(
  "izinInstrukturs",
  {
    // Foreign Key User
    userId: {
      type: DataTypes.INTEGER,
      default: 1,
      allowNull: false,
    },
    absensi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    konfirmasi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

IzinInstruktur.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

IzinInstruktur.belongsTo(JadwalInstruktur, {
  foreignKey: "jadwalInstrukturId",
  targetKey: "id",
});

module.exports = IzinInstruktur;

(async () => {
  await db.sync();
})();
