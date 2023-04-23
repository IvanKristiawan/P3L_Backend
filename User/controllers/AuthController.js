const User = require("../models/UserModel.js");
const HakAkses = require("../models/HakAkses/HakAksesModel.js");
const { createError } = require("../../utils/error.js");
const jwt = require("jsonwebtoken");
const { findNextKode } = require("../../helper/helper");

const register = async (req, res) => {
  try {
    Object.keys(req.body).forEach(function (k) {
      if (typeof req.body[k] == "string") {
        req.body[k] = req.body[k].toUpperCase().trim();
      }
    });
    let tempNoMember;

    if (req.body.tipeUser === "MEMBER") {
      const users = await User.findAll({
        where: {
          tipeUser: req.body.tipeUser,
        },
      });
      let tempDate = new Date();
      let tempFullYear = `${tempDate.getFullYear()}`;
      let nextKodeBookingGym = findNextKode(users.length, 3);
      tempNoMember = `${tempFullYear.slice(-2)}.${(
        tempDate.getMonth() + 1
      ).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}.${nextKodeBookingGym}`;
    }

    const newUser = await User.create({
      noMember: tempNoMember,
      ...req.body,
    });

    const insertedHakAkses = await HakAkses.create({
      ...req.body.akses,
      userId: newUser.dataValues.id,
    });

    res.status(200).send(`User ${req.body.username} has been created.`);
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) return next(createError(404, "User not found!"));

    if (req.body.password !== user.password) {
      return next(createError(400, "Username atau Password Salah!"));
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT, {
      expiresIn: "15d",
    });

    const { password, ...otherDetails } = user.dataValues;

    const hakAkses = await HakAkses.findOne({
      where: {
        userId: user.dataValues.id,
      },
    });

    res.status(200).json({
      details: {
        ...otherDetails,
        token,
        akses: hakAkses,
      },
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
