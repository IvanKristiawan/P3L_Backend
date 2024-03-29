const { Sequelize } = require("sequelize");
const db = require("../../../config/Database.js");
const Kelas = require("../../models/Kelas/KelasModel.js");
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
      type: DataTypes.DATEONLY,
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
    libur: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: true,
    },

    // Foreign Key Kelas
    kelasId: {
      type: DataTypes.INTEGER,
      default: 1,
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

JadwalInstruktur.belongsTo(Kelas, {
  foreignKey: "kelasId",
  targetKey: "id",
});

JadwalInstruktur.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

module.exports = JadwalInstruktur;

(async () => {
  await db.sync();
})();
