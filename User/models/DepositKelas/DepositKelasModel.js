const { Sequelize } = require("sequelize");
const db = require("../../../config/Database.js");
const User = require("../../models/UserModel.js");
const JadwalInstruktur = require("../../../Master/models/JadwalInstruktur/JadwalInstrukturModel.js");

const { DataTypes } = Sequelize;

const DepositKelas = db.define(
  "depositkelass",
  {
    noDeposit: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    jumlahDeposit: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },

    // Foreign Key Jadwal Gym
    jadwalInstrukturId: {
      type: DataTypes.INTEGER,
      default: 1,
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

DepositKelas.belongsTo(JadwalInstruktur, {
  foreignKey: "jadwalInstrukturId",
  targetKey: "id",
});

DepositKelas.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

module.exports = DepositKelas;

(async () => {
  await db.sync();
})();
