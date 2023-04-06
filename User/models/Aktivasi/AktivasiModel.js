const { Sequelize } = require("sequelize");
const db = require("../../../config/Database.js");
const User = require("../../models/UserModel.js");

const { DataTypes } = Sequelize;

const Aktivasi = db.define(
  "aktivasis",
  {
    kodeAktivasi: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
    masaAktif: {
      type: DataTypes.DATE,
      default: new Date(),
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

Aktivasi.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

module.exports = Aktivasi;

(async () => {
  await db.sync();
})();
