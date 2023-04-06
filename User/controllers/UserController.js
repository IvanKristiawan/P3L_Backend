const User = require("../models/UserModel.js");
const jwt = require("jsonwebtoken");

const updateUser = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  try {
    let findUser;
    findUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    let tempPassword;
    if (req.body.password) {
      tempPassword = req.body.password;
    } else {
      tempPassword = findUser.password;
    }
    let periode;
    if (req.body.namaPeriode) {
      periode = await TutupPeriode.findOne({
        where: {
          namaPeriode: req.body.namaPeriode,
        },
      });
      periode = periode.id;
    }

    await User.update(
      {
        ...req.body,
        akses: JSON.stringify(req.body.akses),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    findUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    const { ...otherDetails } = findUser.dataValues;

    res.status(200).json({
      ...otherDetails,
      akses: JSON.parse(findUser.dataValues.akses),
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateUserThenLogin = async (req, res) => {
  try {
    // const findUser = await User.findById(req.params.id);
    const findUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    let tempPassword;
    if (req.body.password) {
      tempPassword = req.body.password;
    } else {
      tempPassword = findUser.password;
    }
    let periode;
    if (req.body.namaPeriode) {
      periode = await TutupPeriode.findOne({
        where: {
          namaPeriode: req.body.namaPeriode,
        },
      });
      periode = periode.id;
    }

    await User.update(
      {
        ...req.body,
        akses: JSON.stringify(req.body.akses),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

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

const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    }).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "User Deleted!" });
      } else {
        res.status(400).json({ message: `User ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    const { ...otherDetails } = user.dataValues;
    res.status(200).json({
      ...otherDetails,
      akses: JSON.parse(user.dataValues.akses),
    });
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const aktivasiUser = async (req, res) => {
  try {
    await User.update(
      { aktivasi: req.body.aktivasi },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "User Updated!" });
      } else {
        res.status(400).json({ message: `User ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const updateDepositUser = async (req, res) => {
  try {
    await User.update(
      { deposit: req.body.deposit },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "User Updated!" });
      } else {
        res.status(400).json({ message: `User ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    let tempAllUser = [];
    const users = await User.findAll({});

    for (let user of users) {
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: JSON.parse(user.dataValues.akses),
      };
      tempAllUser.push(objectUser);
    }

    res.status(200).json(tempAllUser);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getUsersMember = async (req, res) => {
  try {
    let tempAllUser = [];
    const users = await User.findAll({
      tipeUser: "MEMBER",
    });

    for (let user of users) {
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: JSON.parse(user.dataValues.akses),
      };
      tempAllUser.push(objectUser);
    }

    res.status(200).json(tempAllUser);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getUsername = async (req, res) => {
  try {
    let tempAllUser = [];
    const users = await User.findAll({
      where: {
        username: req.body.username,
      },
    });

    for (let user of users) {
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: JSON.parse(user.dataValues.akses),
      };
      tempAllUser.push(objectUser);
    }

    res.status(200).json(tempAllUser);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateUser,
  updateUserThenLogin,
  deleteUser,
  getUser,
  aktivasiUser,
  updateDepositUser,
  getUsers,
  getUsersMember,
  getUsername,
};
