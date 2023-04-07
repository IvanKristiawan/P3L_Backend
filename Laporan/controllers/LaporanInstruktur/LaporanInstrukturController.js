const User = require("../../../User/models/UserModel.js");
const HakAkses = require("../../../User/models/HakAkses/HakAksesModel.js");

const getLaporansInstruktur = async (req, res) => {
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

module.exports = {
  getLaporansInstruktur,
};
