const Deposit = require("../../models/Deposit/DepositModel.js");
const User = require("../../models/UserModel.js");
const { findNextKode } = require("../../../helper/helper");

const getDeposits = async (req, res) => {
  try {
    const deposits = await Deposit.findAll({ include: [{ model: User }] });

    res.status(200).json(deposits);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getDepositNextKode = async (req, res) => {
  try {
    const deposits = await Deposit.findAll({});
    let nextKodeDeposit = findNextKode(deposits.length, 6);
    res.status(200).json(nextKodeDeposit);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getDepositById = async (req, res) => {
  try {
    const deposit = await Deposit.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }],
    });
    res.status(200).json(deposit);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveDeposit = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });

  const user = await User.findOne({
    where: {
      id: req.body.userId,
    },
  });
  let tempDeposit = user.deposit;

  const deposits = await Deposit.findAll({});
  let nextKodeDeposit = findNextKode(deposits.length, 6);

  tempDeposit += req.body.jumlahDeposit;

  try {
    const insertedDeposit = await Deposit.create({
      ...req.body,
      noDeposit: nextKodeDeposit,
    });
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
    res.status(201).json(insertedDeposit);
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const updateDeposit = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  try {
    await Deposit.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((num) => {
      // num come from numbers of updated data
      if (num == 1) {
        res.status(200).json({ message: "Deposit Updated!" });
      } else {
        res
          .status(400)
          .json({ message: `Deposit ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

const deleteDeposit = async (req, res) => {
  try {
    const deposit = await Deposit.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }],
    });

    const user = await User.findOne({
      where: {
        id: req.body.userId,
      },
    });
    let tempDeposit = user.deposit;

    tempDeposit -= deposit.jumlahDeposit;

    await Deposit.destroy({
      where: {
        id: req.params.id,
      },
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
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
        res.status(200).json({ message: "Deposit Deleted!" });
      } else {
        res
          .status(400)
          .json({ message: `Deposit ${req.params.id} not found!` });
      }
    });
  } catch (error) {
    // Error 400 = Kesalahan dari sisi user
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getDeposits,
  getDepositNextKode,
  getDepositById,
  saveDeposit,
  updateDeposit,
  deleteDeposit,
};
