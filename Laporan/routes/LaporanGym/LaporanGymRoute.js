const express = require("express");
const controller = require("../../controllers/LaporanGym/LaporanGymController.js");
const getLaporanGym = controller.getLaporanGym;
const verify = require("../../../utils/verifyToken.js");
const verifyUser = verify.verifyUser;

const router = express.Router();
router.post("/laporanGym", verifyUser, getLaporanGym);

module.exports = router;
