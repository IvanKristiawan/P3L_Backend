const JadwalInstruktur = require("../../../Master/models/JadwalInstruktur/JadwalInstrukturModel.js");
const User = require("../../../User/models/UserModel.js");
const { formatDate } = require("../../../helper/helper");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const getLaporanKelas = async (req, res) => {
  try {
    let tempJadwalInstrukturs = [];
    const jadwalinstrukturs = await JadwalInstruktur.findAll({
      where: {
        [Op.and]: [
          {
            tanggal: {
              [Op.gte]: new Date(req.body.dariTanggal),
            },
          },
          {
            tanggal: {
              [Op.lte]: new Date(req.body.sampaiTanggal),
            },
          },
        ],
      },
      include: [{ model: User }],
    });

    // Formatting date and Parsing json from string data
    for (let element of jadwalinstrukturs) {
      let objectPengajuan = {
        ...element.dataValues,
        tanggal: formatDate(element.dataValues.tanggal),
        libur: element.dataValues.libur === true ? 1 : 0,
      };
      tempJadwalInstrukturs.push(objectPengajuan);
    }

    res.status(200).json(tempJadwalInstrukturs);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLaporanKelas,
};
