const BookingGym = require("../../models/BookingGym/BookingGymModel.js");
const JadwalGym = require("../../models/JadwalGym/JadwalGymModel.js");
const User = require("../../../User/models/UserModel.js");

const getBookingGyms = async (req, res) => {
  try {
    const bookingGyms = await BookingGym.findAll({
      include: [{ model: User }, { model: JadwalGym }],
    });
    res.status(200).json(bookingGyms);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getBookingGymById = async (req, res) => {
  try {
    const bookingGym = await BookingGym.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }],
    });
    res.status(200).json(bookingGym);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveBookingGym = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });

  try {
    const insertedBookingGym = await BookingGym.create({
      ...req.body,
    });
    // Status 201 = Created
    res.status(201).json(insertedBookingGym);
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateBookingGym = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  try {
    await BookingGym.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "Booking Gym Updated!" });
      } else {
        res
          .status(400)
          .json({ message: `Booking Gym ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteBookingGym = async (req, res) => {
  try {
    await BookingGym.destroy({
      where: {
        id: req.params.id,
      },
    }).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "Booking Gym Deleted!" });
      } else {
        res
          .status(400)
          .json({ message: `Booking Gym ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBookingGyms,
  getBookingGymById,
  saveBookingGym,
  updateBookingGym,
  deleteBookingGym,
};
