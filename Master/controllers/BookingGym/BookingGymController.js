const BookingGym = require("../../models/BookingGym/BookingGymModel.js");
const JadwalGym = require("../../models/JadwalGym/JadwalGymModel.js");
const User = require("../../../User/models/UserModel.js");
const Aktivasi = require("../../../User/models/Aktivasi/AktivasiModel.js");
const { findNextKode, formatDate } = require("../../../helper/helper");

const getBookingGyms = async (req, res) => {
  try {
    let tempBookingGyms = [];
    const bookingGyms = await BookingGym.findAll({
      include: [{ model: User }, { model: JadwalGym }],
    });

    // Formatting date and Parsing json from string data
    for (let element of bookingGyms) {
      let objectBookingGym = {
        ...element.dataValues,
        tanggal: formatDate(element.dataValues.jadwalgym.dataValues.tanggal),
        absensi: element.dataValues.absensi === true ? "DATANG" : "ABSEN",
      };
      tempBookingGyms.push(objectBookingGym);
    }

    res.status(200).json(tempBookingGyms);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getBookingGymNextKode = async (req, res) => {
  try {
    const bookingGyms = await BookingGym.findAll({});
    let nextKodeBookingGym = findNextKode(bookingGyms.length, 6);
    res.status(200).json(nextKodeBookingGym);
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
      include: [{ model: User }, { model: JadwalGym }],
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

  const jadwalGym = await JadwalGym.findOne({
    where: {
      id: req.body.jadwalGymId,
    },
  });
  let tempJumlahMember = jadwalGym.jumlahMember + 1;

  const bookingGyms = await BookingGym.findAll({});
  let nextKodeBookingGym = findNextKode(bookingGyms.length, 6);

  try {
    const insertedBookingGym = await BookingGym.create({
      noBooking: nextKodeBookingGym,
      ...req.body,
    });
    await JadwalGym.update(
      {
        jumlahMember: tempJumlahMember,
      },
      {
        where: {
          id: req.body.jadwalGymId,
        },
      }
    );
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

const presensiBookingGym = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  try {
    await BookingGym.update(
      { absensi: true },
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
    const bookingGym = await BookingGym.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }, { model: JadwalGym }],
    });

    const jadwalGym = await JadwalGym.findOne({
      where: {
        id: bookingGym.jadwalgym.id,
      },
    });
    let tempJumlahMember = jadwalGym.jumlahMember - 1;

    await BookingGym.destroy({
      where: {
        id: req.params.id,
      },
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await JadwalGym.update(
          {
            jumlahMember: tempJumlahMember,
          },
          {
            where: {
              id: bookingGym.jadwalgym.id,
            },
          }
        );
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
  getBookingGymNextKode,
  getBookingGymById,
  saveBookingGym,
  updateBookingGym,
  presensiBookingGym,
  deleteBookingGym,
};
