const express = require("express");
const controller = require("../../controllers/LaporanInstruktur/LaporanInstrukturController.js");
const getLaporansInstruktur = controller.getLaporansInstruktur;
const verify = require("../../../utils/verifyToken.js");
const verifyUser = verify.verifyUser;

const router = express.Router();
router.post("/laporanInstruktur", verifyUser, getLaporansInstruktur);

module.exports = router;
