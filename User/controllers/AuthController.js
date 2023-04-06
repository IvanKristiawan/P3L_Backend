const User = require("../models/UserModel.js");
const { createError } = require("../../utils/error.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    Object.keys(req.body).forEach(function (k) {
      if (typeof req.body[k] == "string") {
        req.body[k] = req.body[k].toUpperCase().trim();
      }
    });

    await User.create({
      ...req.body,
      akses: JSON.stringify(req.body.akses),
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

    res.status(200).json({
      details: {
        ...otherDetails,
        token,
        akses: JSON.parse(user.dataValues.akses),
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
