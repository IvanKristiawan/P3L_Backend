const BookingKelas = require("../../models/BookingKelas/BookingKelasModel.js");
const JadwalInstruktur = require("../../models/JadwalInstruktur/JadwalInstrukturModel.js");
const User = require("../../../User/models/UserModel.js");
const { findNextKode, formatDate } = require("../../../helper/helper");

const getBookingKelas = async (req, res) => {
  try {
    let tempBookingKelas = [];
    const bookingKelas = await BookingKelas.findAll({
      include: [
        { model: User },
        {
          model: JadwalInstruktur,
          include: [{ model: User }],
        },
      ],
    });

    // Formatting date and Parsing json from string data
    for (let element of bookingKelas) {
      let objectBookingKelas = {
        ...element.dataValues,
        tanggal: formatDate(
          element.dataValues.jadwalinstruktur.dataValues.tanggal
        ),
        absensi: element.dataValues.absensi === true ? "DATANG" : "ABSEN",
      };
      tempBookingKelas.push(objectBookingKelas);
    }

    res.status(200).json(tempBookingKelas);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getBookingKelasNextKode = async (req, res) => {
  try {
    const bookingKelass = await BookingKelas.findAll({});
    let tempDate = new Date();
    let tempFullYear = `${tempDate.getFullYear()}`;
    let nextKodeBookingKelas = findNextKode(bookingKelass.length, 3);
    tempNoMember = `${tempFullYear.slice(-2)}.${(
      tempDate.getMonth() + 1
    ).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}.${nextKodeBookingKelas}`;
    res.status(200).json(tempNoMember);
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
      include: [
        { model: User },
        {
          model: JadwalInstruktur,
          include: [{ model: User }],
        },
      ],
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

  const bookingKelass = await BookingKelas.findAll({});
  let tempDate = new Date();
  let tempFullYear = `${tempDate.getFullYear()}`;
  let nextKodeBookingKelas = findNextKode(bookingKelass.length, 3);
  tempNoMember = `${tempFullYear.slice(-2)}.${(
    tempDate.getMonth() + 1
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}.${nextKodeBookingKelas}`;

  const jadwalinstruktur = await JadwalInstruktur.findOne({
    where: {
      id: req.body.jadwalInstrukturId,
    },
    include: [{ model: User }],
  });
  let tempJumlahMember = jadwalinstruktur.jumlahMember + 1;

  const user = await User.findOne({
    where: {
      id: req.body.userId,
    },
  });
  let tempDeposit = parseInt(user.deposit) - parseInt(jadwalinstruktur.harga);

  try {
    const insertedBookingKelas = await BookingKelas.create({
      noBooking: tempNoMember,
      ...req.body,
    });
    await JadwalInstruktur.update(
      {
        jumlahMember: tempJumlahMember,
      },
      {
        where: {
          id: req.body.jadwalInstrukturId,
        },
      }
    );
    await User.update(
      {
        deposit: tempDeposit,
      },
      {
        where: {
          id: req.body.userId,
        },
      }
    );
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

const presensiBookingKelas = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  try {
    await BookingKelas.update(
      { absensi: true },
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
    const bookingKelas = await BookingKelas.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }, { model: JadwalInstruktur }],
    });

    const jadwalInstruktur = await JadwalInstruktur.findOne({
      where: {
        id: bookingKelas.jadwalinstruktur.id,
      },
    });
    let tempJumlahMember = jadwalInstruktur.jumlahMember - 1;

    await BookingKelas.destroy({
      where: {
        id: req.params.id,
      },
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await JadwalInstruktur.update(
          {
            jumlahMember: tempJumlahMember,
          },
          {
            where: {
              id: bookingKelas.jadwalinstruktur.id,
            },
          }
        );
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
  getBookingKelasNextKode,
  getBookingKelasById,
  saveBookingKelas,
  updateBookingKelas,
  presensiBookingKelas,
  deleteBookingKelas,
};
