const { Sequelize } = require("sequelize");
const db = require("../../../config/Database.js");
const User = require("../../../User/models/UserModel.js");

const { DataTypes } = Sequelize;

const JadwalInstruktur = db.define(
  "jadwalinstrukturs",
  {
    namaKelas: {
      type: DataTypes.STRING,
      default: "",
      allowNull: false,
    },
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
    harga: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },

    // Foreign Key User
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

JadwalInstruktur.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

module.exports = JadwalInstruktur;

(async () => {
  await db.sync();
})();
