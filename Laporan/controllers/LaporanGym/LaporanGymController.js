const JadwalGym = require("../../../Master/models/JadwalGym/JadwalGymModel.js");
const { formatDate } = require("../../../helper/helper");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const getLaporanGym = async (req, res) => {
  try {
    let tempJadwalGyms = [];
    const jadwalGyms = await JadwalGym.findAll({
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
    });

    // Formatting date and Parsing json from string data
    for (let element of jadwalGyms) {
      let objectJadwalGym = {
        ...element.dataValues,
        tanggal: formatDate(element.dataValues.tanggal),
        libur: element.dataValues.libur === true ? "LIBUR" : "MASUK",
      };
      tempJadwalGyms.push(objectJadwalGym);
    }

    res.status(200).json(tempJadwalGyms);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLaporanGym,
};
