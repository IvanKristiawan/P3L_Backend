const express = require("express");
const controller = require("../../controllers/IzinInstruktur/IzinInstrukturController.js");
const verify = require("../../../utils/verifyToken.js");
const getIzinInstrukturs = controller.getIzinInstrukturs;
const getIzinInstrukturById = controller.getIzinInstrukturById;
const konfirmasiIzinInstruktur = controller.konfirmasiIzinInstruktur;
const saveIzinInstruktur = controller.saveIzinInstruktur;
const updateIzinInstruktur = controller.updateIzinInstruktur;
const deleteIzinInstruktur = controller.deleteIzinInstruktur;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/izinInstruktur", verifyUser, getIzinInstrukturs);
router.post("/izinInstruktur/:id", verifyUser, getIzinInstrukturById);
router.post(
  "/konfirmasiIzinInstruktur/:id",
  verifyUser,
  konfirmasiIzinInstruktur
);
router.post("/saveIzinInstruktur", verifyUser, saveIzinInstruktur);
router.post("/updateIzinInstruktur/:id", verifyUser, updateIzinInstruktur);
router.post("/deleteIzinInstruktur/:id", verifyUser, deleteIzinInstruktur);

module.exports = router;
