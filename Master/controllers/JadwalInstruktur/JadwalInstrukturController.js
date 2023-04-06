const JadwalInstruktur = require("../../models/JadwalInstruktur/JadwalInstrukturModel.js");
const User = require("../../../User/models/UserModel.js");

const getJadwalInstrukturs = async (req, res) => {
  try {
    const jadwalinstrukturs = await JadwalInstruktur.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(jadwalinstrukturs);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getJadwalInstrukturById = async (req, res) => {
  try {
    const jadwalinstruktur = await JadwalInstruktur.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }],
    });
    res.status(200).json(jadwalinstruktur);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveJadwalInstruktur = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });

  try {
    const insertedJadwalInstruktur = await JadwalInstruktur.create({
      ...req.body,
    });
    // Status 201 = Created
    res.status(201).json(insertedJadwalInstruktur);
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateJadwalInstruktur = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  try {
    await JadwalInstruktur.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "Jadwal Instruktur Updated!" });
      } else {
        res
          .status(400)
          .json({ message: `Jadwal Instruktur ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteJadwalInstruktur = async (req, res) => {
  try {
    await JadwalInstruktur.destroy({
      where: {
        id: req.params.id,
      },
    }).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "Jadwal Instruktur Deleted!" });
      } else {
        res
          .status(400)
          .json({ message: `Jadwal Instruktur ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getJadwalInstrukturs,
  getJadwalInstrukturById,
  saveJadwalInstruktur,
  updateJadwalInstruktur,
  deleteJadwalInstruktur,
};
