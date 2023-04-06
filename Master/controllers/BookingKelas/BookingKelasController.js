const BookingKelas = require("../../models/BookingKelas/BookingKelasModel.js");
const JadwalInstruktur = require("../../models/JadwalInstruktur/JadwalInstrukturModel.js");
const User = require("../../../User/models/UserModel.js");

const getBookingKelas = async (req, res) => {
  try {
    const bookingKelass = await BookingKelas.findAll({
      include: [{ model: User }, { model: JadwalInstruktur }],
    });
    res.status(200).json(bookingKelass);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getBookingKelasById = async (req, res) => {
  try {
    const bookingKelas = await BookingKelas.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }, { model: JadwalInstruktur }],
    });
    res.status(200).json(bookingKelas);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveBookingKelas = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });

  try {
    const insertedBookingKelas = await BookingKelas.create({
      ...req.body,
    });
    // Status 201 = Created
    res.status(201).json(insertedBookingKelas);
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateBookingKelas = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  try {
    await BookingKelas.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "Booking Kelas Updated!" });
      } else {
        res
          .status(400)
          .json({ message: `Booking Kelas ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteBookingKelas = async (req, res) => {
  try {
    await BookingKelas.destroy({
      where: {
        id: req.params.id,
      },
    }).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "Booking Kelas Deleted!" });
      } else {
        res
          .status(400)
          .json({ message: `Booking Kelas ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBookingKelas,
  getBookingKelasById,
  saveBookingKelas,
  updateBookingKelas,
  deleteBookingKelas,
};
