const express = require("express");
const controller = require("../../controllers/LaporanKelas/LaporanKelasController.js");
const getLaporanKelas = controller.getLaporanKelas;
const verify = require("../../../utils/verifyToken.js");
const verifyUser = verify.verifyUser;

const router = express.Router();
router.post("/laporanKelas", verifyUser, getLaporanKelas);

module.exports = router;
