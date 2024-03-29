const User = require("../models/UserModel.js");
const HakAkses = require("../models/HakAkses/HakAksesModel.js");
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
        password: tempPassword,
        akses: JSON.stringify(req.body.akses),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    await HakAkses.update(
      { ...req.body.akses },
      {
        where: {
          userId: req.params.id,
        },
      }
    );

    findUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    const hakAkses = await HakAkses.findOne({
      where: {
        userId: req.params.id,
      },
    });

    const { ...otherDetails } = findUser.dataValues;

    res.status(200).json({
      ...otherDetails,
      akses: hakAkses,
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

    await HakAkses.update(
      { ...req.body.akses },
      {
        where: {
          userId: req.params.id,
        },
      }
    );

    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    const hakAkses = await HakAkses.findOne({
      where: {
        userId: req.params.id,
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
        akses: hakAkses,
      },
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await HakAkses.destroy({
      where: {
        userId: req.params.id,
      },
    });
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
    const hakAkses = await HakAkses.findOne({
      where: {
        userId: req.params.id,
      },
    });
    const { ...otherDetails } = user.dataValues;
    res.status(200).json({
      ...otherDetails,
      akses: hakAkses,
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
      let hakAkses = await HakAkses.findOne({
        where: {
          userId: user.dataValues.id,
        },
      });
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: hakAkses,
      };
      tempAllUser.push(objectUser);
    }

    res.status(200).json(tempAllUser);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getUsersManager = async (req, res) => {
  try {
    let tempAllUser = [];
    const users = await User.findAll({
      where: {
        tipeUser: "MANAGER",
      },
    });

    for (let user of users) {
      let hakAkses = await HakAkses.findOne({
        where: {
          userId: user.dataValues.id,
        },
      });
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: hakAkses,
      };
      tempAllUser.push(objectUser);
    }

    res.status(200).json(tempAllUser);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getUsersKasir = async (req, res) => {
  try {
    let tempAllUser = [];
    const users = await User.findAll({
      where: {
        tipeUser: "KASIR",
      },
    });

    for (let user of users) {
      let hakAkses = await HakAkses.findOne({
        where: {
          userId: user.dataValues.id,
        },
      });
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: hakAkses,
      };
      tempAllUser.push(objectUser);
    }

    res.status(200).json(tempAllUser);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getUsersAdmin = async (req, res) => {
  try {
    let tempAllUser = [];
    const users = await User.findAll({
      where: {
        tipeUser: "ADMIN",
      },
    });

    for (let user of users) {
      let hakAkses = await HakAkses.findOne({
        where: {
          userId: user.dataValues.id,
        },
      });
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: hakAkses,
      };
      tempAllUser.push(objectUser);
    }

    res.status(200).json(tempAllUser);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getUsersInstruktur = async (req, res) => {
  try {
    let tempAllUser = [];
    const users = await User.findAll({
      where: {
        tipeUser: "INSTRUKTUR",
      },
    });

    for (let user of users) {
      let hakAkses = await HakAkses.findOne({
        where: {
          userId: user.dataValues.id,
        },
      });
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: hakAkses,
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
      where: {
        tipeUser: "MEMBER",
      },
    });

    for (let user of users) {
      let hakAkses = await HakAkses.findOne({
        where: {
          userId: user.dataValues.id,
        },
      });
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: hakAkses,
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
      let hakAkses = await HakAkses.findOne({
        where: {
          userId: user.dataValues.id,
        },
      });
      const { ...otherDetails } = user.dataValues;
      let objectUser = {
        ...otherDetails,
        akses: hakAkses,
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
  getUsersManager,
  getUsersKasir,
  getUsersAdmin,
  getUsersInstruktur,
  getUsersMember,
  getUsername,
};
