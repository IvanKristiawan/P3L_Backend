const Aktivasi = require("../../models/Aktivasi/AktivasiModel.js");
const User = require("../../models/UserModel.js");
const { findNextKode } = require("../../../helper/helper");

const getAktivasis = async (req, res) => {
  try {
    let tempAktivasis = [];
    const aktivasis = await Aktivasi.findAll({ include: [{ model: User }] });

    // Formatting date and Parsing json from string data
    for (let element of aktivasis) {
      let objectAktivasi = {
        ...element.dataValues,
        masaAktif: formatDate(element.dataValues.masaAktif),
      };
      tempAktivasis.push(objectAktivasi);
    }

    res.status(200).json(tempAktivasis);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getAktivasiNextKode = async (req, res) => {
  try {
    const aktivasis = await Aktivasi.findAll({});
    let tempDate = new Date();
    let tempFullYear = `${tempDate.getFullYear()}`;
    let nextKodeAktivasi = findNextKode(aktivasis.length, 3);
    tempNoMember = `${tempFullYear.slice(-2)}.${(
      tempDate.getMonth() + 1
    ).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}.${nextKodeAktivasi}`;
    res.status(200).json(tempNoMember);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getAktivasiByUser = async (req, res) => {
  try {
    const aktivasi = await Aktivasi.findOne({
      where: {
        userId: req.body.userId,
      },
      include: [{ model: User }],
    });
    res.status(200).json(aktivasi);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const getAktivasiById = async (req, res) => {
  try {
    const aktivasi = await Aktivasi.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }],
    });
    res.status(200).json(aktivasi);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveAktivasi = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });

  const aktivasis = await Aktivasi.findAll({});
  let tempDate = new Date();
  let nextKodeAktivasi = findNextKode(aktivasis.length, 3);
  let tempFullYear = `${tempDate.getFullYear()}`;
  tempNoMember = `${tempFullYear.slice(-2)}.${(
    tempDate.getMonth() + 1
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}.${nextKodeAktivasi}`;

  let tempMasaAktif = new Date(req.body.masaAktif);
  tempMasaAktif.setFullYear(tempMasaAktif.getFullYear() + 1);

  try {
    const insertedAktivasi = await Aktivasi.create({
      ...req.body,
      kodeAktivasi: tempNoMember,
      masaAktif: tempMasaAktif,
    });
    // Status 201 = Created
    res.status(201).json(insertedAktivasi);
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateAktivasi = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  try {
    await Aktivasi.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "Aktivasi Updated!" });
      } else {
        res
          .status(400)
          .json({ message: `Aktivasi ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteAktivasi = async (req, res) => {
  try {
    await Aktivasi.destroy({
      where: {
        id: req.params.id,
      },
    }).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "Aktivasi Deleted!" });
      } else {
        res
          .status(400)
          .json({ message: `Aktivasi ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAktivasis,
  getAktivasiNextKode,
  getAktivasiByUser,
  getAktivasiById,
  saveAktivasi,
  updateAktivasi,
  deleteAktivasi,
};
