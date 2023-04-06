const express = require("express");
const controller = require("../../controllers/JadwalGym/JadwalGymController.js");
const verify = require("../../../utils/verifyToken.js");
const getJadwalGyms = controller.getJadwalGyms;
const getJadwalGymsMasihAda = controller.getJadwalGymsMasihAda;
const getJadwalGymById = controller.getJadwalGymById;
const saveJadwalGym = controller.saveJadwalGym;
const updateJadwalGym = controller.updateJadwalGym;
const deleteJadwalGym = controller.deleteJadwalGym;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/jadwalGyms", verifyUser, getJadwalGyms);
router.post("/jadwalGymsMasihAda", verifyUser, getJadwalGymsMasihAda);
router.post("/jadwalGyms/:id", verifyUser, getJadwalGymById);
router.post("/saveJadwalGym", verifyUser, saveJadwalGym);
router.post("/updateJadwalGym/:id", verifyUser, updateJadwalGym);
router.post("/deleteJadwalGym/:id", verifyUser, deleteJadwalGym);

module.exports = router;
