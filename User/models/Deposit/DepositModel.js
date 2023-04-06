const { Sequelize } = require("sequelize");
const db = require("../../../config/Database.js");
const User = require("../../models/UserModel.js");

const { DataTypes } = Sequelize;

const Deposit = db.define(
  "deposits",
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

Deposit.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

module.exports = Deposit;

(async () => {
  await db.sync();
})();
