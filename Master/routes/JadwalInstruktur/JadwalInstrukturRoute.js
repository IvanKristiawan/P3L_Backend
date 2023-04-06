const express = require("express");
const controller = require("../../controllers/JadwalInstruktur/JadwalInstrukturController.js");
const verify = require("../../../utils/verifyToken.js");
const getJadwalInstrukturs = controller.getJadwalInstrukturs;
const getJadwalInstrukturById = controller.getJadwalInstrukturById;
const saveJadwalInstruktur = controller.saveJadwalInstruktur;
const updateJadwalInstruktur = controller.updateJadwalInstruktur;
const deleteJadwalInstruktur = controller.deleteJadwalInstruktur;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/jadwalInstrukturs", verifyUser, getJadwalInstrukturs);
router.post("/jadwalInstrukturs/:id", verifyUser, getJadwalInstrukturById);
router.post("/saveJadwalInstruktur", verifyUser, saveJadwalInstruktur);
router.post("/updateJadwalInstruktur/:id", verifyUser, updateJadwalInstruktur);
router.post("/deleteJadwalInstruktur/:id", verifyUser, deleteJadwalInstruktur);

module.exports = router;
