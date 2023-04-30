const express = require("express");
const controller = require("../../controllers/Kelas/KelasController.js");
const verify = require("../../../utils/verifyToken.js");
const getKelass = controller.getKelass;
const getKelasById = controller.getKelasById;
const saveKelas = controller.saveKelas;
const updateKelas = controller.updateKelas;
const deleteKelas = controller.deleteKelas;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/kelas", verifyUser, getKelass);
router.post("/kelas/:id", verifyUser, getKelasById);
router.post("/saveKelas", verifyUser, saveKelas);
router.post("/updateKelas/:id", verifyUser, updateKelas);
router.post("/deleteKelas/:id", verifyUser, deleteKelas);

module.exports = router;
