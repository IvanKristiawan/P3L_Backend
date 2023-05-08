const DepositKelas = require("../../models/DepositKelas/DepositKelasModel.js");
const User = require("../../models/UserModel.js");
const Kelas = require("../../../Master/models/Kelas/KelasModel.js");
const { findNextKode } = require("../../../helper/helper");

const getDepositKelass = async (req, res) => {
  try {
    const deposits = await DepositKelas.findAll({
      include: [{ model: User }, { model: Kelas }],
    });

    res.status(200).json(deposits);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getDepositKelasNextKode = async (req, res) => {
  try {
    const deposits = await DepositKelas.findAll({});
    let tempDate = new Date();
    let tempFullYear = `${tempDate.getFullYear()}`;
    let nextKodeDeposit = findNextKode(deposits.length, 3);
    tempNoMember = `${tempFullYear.slice(-2)}.${(
      tempDate.getMonth() + 1
    ).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}.${nextKodeDeposit}`;
    res.status(200).json(tempNoMember);
  } catch (error) {
    // Error 500 = Kesalahan di server
    res.status(500).json({ message: error.message });
  }
};

const getDepositKelasById = async (req, res) => {
  try {
    const deposit = await DepositKelas.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }, { model: Kelas }],
    });
    res.status(200).json(deposit);
  } catch (error) {
    // Error 404 = Not Found
    res.status(404).json({ message: error.message });
  }
};

const saveDepositKelas = async (req, res) => {
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
  let tempDeposit = parseInt(user.depositKelas);

  const deposits = await DepositKelas.findAll({});
  let tempDate = new Date();
  let tempFullYear = `${tempDate.getFullYear()}`;
  let nextKodeDeposit = findNextKode(deposits.length, 6);
  tempNoMember = `${tempFullYear.slice(-2)}.${(
    tempDate.getMonth() + 1
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}.${nextKodeDeposit}`;

  tempDeposit += parseInt(req.body.jumlahDeposit);

  try {
    const insertedDeposit = await DepositKelas.create({
      ...req.body,
      noDeposit: tempNoMember,
    });
    await User.update(
      {
        depositKelas: tempDeposit,
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

const updateDepositKelas = async (req, res) => {
  Object.keys(req.body).forEach(function (k) {
    if (typeof req.body[k] == "string") {
      req.body[k] = req.body[k].toUpperCase().trim();
    }
  });
  try {
    await DepositKelas.update(
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

const deleteDepositKelas = async (req, res) => {
  try {
    const deposit = await DepositKelas.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }, { model: Kelas }],
    });

    const user = await User.findOne({
      where: {
        id: req.body.userId,
      },
    });
    let tempDeposit = parseInt(user.depositKelas);

    tempDeposit -= parseInt(deposit.jumlahDeposit);

    await DepositKelas.destroy({
      where: {
        id: req.params.id,
      },
    }).then(async (num) => {
      // num come from numbers of updated data
      if (num == 1) {
        await User.update(
          {
            depositKelas: tempDeposit,
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
  getDepositKelass,
  getDepositKelasNextKode,
  getDepositKelasById,
  saveDepositKelas,
  updateDepositKelas,
  deleteDepositKelas,
};
