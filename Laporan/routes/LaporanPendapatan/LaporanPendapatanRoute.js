const express = require("express");
const controller = require("../../controllers/LaporanPendapatan/LaporanPendapatanController.js");
const getLaporanPendapatan = controller.getLaporanPendapatan;
const verify = require("../../../utils/verifyToken.js");
const verifyUser = verify.verifyUser;

const router = express.Router();
router.post("/laporanPendapatan", verifyUser, getLaporanPendapatan);

module.exports = router;
