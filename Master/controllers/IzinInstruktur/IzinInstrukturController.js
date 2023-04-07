const IzinInstruktur = require("../../models/IzinInstruktur/IzinInstrukturModel.js");
const JadwalInstruktur = require("../../models/JadwalInstruktur/JadwalInstrukturModel.js");
const User = require("../../../User/models/UserModel.js");
const { formatDate } = require("../../../helper/helper");

const getIzinInstrukturs = async (req, res) => {
  try {
    let tempIzinInstruktur = [];
    const izinInstruktur = await IzinInstruktur.findAll({
      include: [{ model: User }, { model: JadwalInstruktur }],
    });

    // Formatting date and Parsing json from string data
    for (let element of izinInstruktur) {
      let objectIzinInstruktur = {
        ...element.dataValues,
        tanggal: formatDate(
          element.dataValues.jadwalinstruktur.dataValues.tanggal
        ),
        absensi: element.dataValues.absensi === true ? "MASUK" : "IZIN",
        konfirmasi:
          element.dataValues.konfirmasi === true ? "TERKONFIRMASI" : "BELUM",
      };
      tempIzinInstruktur.push(objectIzinInstruktur);
    }

    res.status(200).json(tempIzinInstruktur);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getIzinInstrukturById = async (req, res) => {
  try {
    const izinInstruktur = await IzinInstruktur.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }, { model: JadwalInstruktur }],
    });
    res.status(200).json(izinInstruktur);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveIzinInstruktur = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });

  try {
    const insertedIzinInstruktur = await IzinInstruktur.create({
      ...req.body,
    });
    // Status 201 = Created
    res.status(201).json(insertedIzinInstruktur);
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const konfirmasiIzinInstruktur = async (req, res) => {
  try {
    await JadwalInstruktur.update(
      {
        libur: true,
      },
      {
        where: {
          id: req.body.jadwalInstrukturId,
        },
      }
    );

    await IzinInstruktur.update(
      {
        konfirmasi: true,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const findUser = await User.findOne({
      where: {
        id: req.body.userId,
      },
    });
    let tempJmlLibur = findUser.jmlLibur + 1;
    await User.update(
      {
        jmlLibur: tempJmlLibur,
      },
      {
        where: {
          id: req.body.userId,
        },
      }
    );

    res.status(200).json("Berhasil dikonfirmasi!");
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const updateIzinInstruktur = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  try {
    await IzinInstruktur.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "Izin Instruktur Updated!" });
      } else {
        res
          .status(400)
          .json({ message: `Izin Instruktur ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteIzinInstruktur = async (req, res) => {
  try {
    await JadwalInstruktur.update(
      {
        libur: false,
      },
      {
        where: {
          id: req.body.jadwalInstrukturId,
        },
      }
    );
    const findUser = await User.findOne({
      where: {
        id: req.body.userId,
      },
    });
    let tempJmlLibur = findUser.jmlLibur - 1;
    await User.update(
      {
        jmlLibur: tempJmlLibur,
      },
      {
        where: {
          id: req.body.userId,
        },
      }
    );
    await IzinInstruktur.destroy({
      where: {
        id: req.params.id,
      },
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "Izin Instruktur Deleted!" });
      } else {
        res
          .status(400)
          .json({ message: `Izin Instruktur ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getIzinInstrukturs,
  getIzinInstrukturById,
  saveIzinInstruktur,
  konfirmasiIzinInstruktur,
  updateIzinInstruktur,
  deleteIzinInstruktur,
};
