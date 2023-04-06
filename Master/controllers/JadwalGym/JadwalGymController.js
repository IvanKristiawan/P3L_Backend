const JadwalGym = require("../../models/JadwalGym/JadwalGymModel.js");

const getJadwalGyms = async (req, res) => {
  try {
    const jadwalGyms = await JadwalGym.findAll({});
    res.status(200).json(jadwalGyms);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getJadwalGymById = async (req, res) => {
  try {
    const jadwalGym = await JadwalGym.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(jadwalGym);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveJadwalGym = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });

  try {
    const insertedJadwalGym = await JadwalGym.create({
      ...req.body,
    });
    // Status 201 = Created
    res.status(201).json(insertedJadwalGym);
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateJadwalGym = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  try {
    await JadwalGym.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "Jadwal Gym Updated!" });
      } else {
        res
          .status(400)
          .json({ message: `Jadwal Gym ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteJadwalGym = async (req, res) => {
  try {
    await JadwalGym.destroy({
      where: {
        id: req.params.id,
      },
    }).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "Jadwal Gym Deleted!" });
      } else {
        res
          .status(400)
          .json({ message: `Jadwal Gym ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getJadwalGyms,
  getJadwalGymById,
  saveJadwalGym,
  updateJadwalGym,
  deleteJadwalGym,
};
