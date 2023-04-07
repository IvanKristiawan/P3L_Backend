const Aktivasi = require("../../../User/models/Aktivasi/AktivasiModel.js");
const Deposit = require("../../../User/models/Deposit/DepositModel.js");
const User = require("../../../User/models/UserModel.js");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const getLaporanPendapatan = async (req, res) => {
  try {
    let tempAktivasiTotal = 0;
    let tempDepositTotal = 0;
    const aktivasis = await Aktivasi.findAll({
      where: {
        [Op.and]: [
          {
            createdAt: {
              [Op.gte]: new Date(req.body.dariTanggal),
            },
          },
          {
            createdAt: {
              [Op.lte]: new Date(req.body.sampaiTanggal),
            },
          },
        ],
      },
      include: [{ model: User }],
    });

    for (let aktivasi of aktivasis) {
      tempAktivasiTotal += aktivasi.jumlahAktivasi;
    }
    console.log(aktivasis.length);

    const deposits = await Deposit.findAll({
      where: {
        [Op.and]: [
          {
            createdAt: {
              [Op.gte]: new Date(req.body.dariTanggal),
            },
          },
          {
            createdAt: {
              [Op.lte]: new Date(req.body.sampaiTanggal),
            },
          },
        ],
      },
      include: [{ model: User }],
    });

    for (let deposit of deposits) {
      tempDepositTotal += deposit.jumlahDeposit;
    }

    let tempLapPendapatan = [
      {
        aktivasi: tempAktivasiTotal,
        deposit: tempDepositTotal,
        total: tempAktivasiTotal + tempDepositTotal,
      },
    ];

    res.status(200).json(tempLapPendapatan);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLaporanPendapatan,
};
