const express = require("express");
const controller = require("../../controllers/Aktivasi/AktivasiController.js");
const verify = require("../../../utils/verifyToken.js");
const getAktivasis = controller.getAktivasis;
const getAktivasiNextKode = controller.getAktivasiNextKode;
const getAktivasiById = controller.getAktivasiById;
const saveAktivasi = controller.saveAktivasi;
const updateAktivasi = controller.updateAktivasi;
const deleteAktivasi = controller.deleteAktivasi;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/aktivasis", verifyUser, getAktivasis);
router.post("/aktivasiNextKode", verifyUser, getAktivasiNextKode);
router.post("/aktivasis/:id", verifyUser, getAktivasiById);
router.post("/saveAktivasi", verifyUser, saveAktivasi);
router.post("/updateAktivasi/:id", verifyUser, updateAktivasi);
router.post("/deleteAktivasi/:id", verifyUser, deleteAktivasi);

module.exports = router;
