const Kelas = require("../../models/Kelas/KelasModel.js");

const getKelass = async (req, res) => {
  try {
    const kelass = await Kelas.findAll({});
    res.status(200).json(kelass);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getKelasById = async (req, res) => {
  try {
    const kelas = await Kelas.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(kelas);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveKelas = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });

  try {
    const insertedKelas = await Kelas.create({
      ...req.body,
    });
    // Status 201 = Created
    res.status(201).json(insertedKelas);
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateKelas = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  try {
    await Kelas.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "Kelas Updated!" });
      } else {
        res.status(400).json({ message: `Kelas ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteKelas = async (req, res) => {
  try {
    await Kelas.destroy({
      where: {
        id: req.params.id,
      },
    }).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "Kelas Deleted!" });
      } else {
        res.status(400).json({ message: `Kelas ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getKelass,
  getKelasById,
  saveKelas,
  updateKelas,
  deleteKelas,
};
