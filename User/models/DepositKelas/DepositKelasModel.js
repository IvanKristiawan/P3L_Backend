const { Sequelize } = require("sequelize");
const db = require("../../../config/Database.js");
const User = require("../../models/UserModel.js");
const Kelas = require("../../../Master/models/Kelas/KelasModel.js");

const { DataTypes } = Sequelize;

const DepositKelas = db.define(
  "depositkelass",
  {
    noDeposit: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    sisaDeposit: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    jumlahDeposit: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },

    // Foreign Key Kelas
    kelasId: {
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

DepositKelas.belongsTo(Kelas, {
  foreignKey: "kelasId",
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
