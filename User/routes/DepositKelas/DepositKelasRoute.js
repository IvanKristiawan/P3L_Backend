const express = require("express");
const controller = require("../../controllers/DepositKelas/DepositKelasController.js");
const verify = require("../../../utils/verifyToken.js");
const getDepositKelass = controller.getDepositKelass;
const getDepositKelasNextKode = controller.getDepositKelasNextKode;
const getDepositKelasById = controller.getDepositKelasById;
const saveDepositKelas = controller.saveDepositKelas;
const updateDepositKelas = controller.updateDepositKelas;
const deleteDepositKelas = controller.deleteDepositKelas;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/depositKelass", verifyUser, getDepositKelass);
router.post("/depositKelasNextKode", verifyUser, getDepositKelasNextKode);
router.post("/depositKelass/:id", verifyUser, getDepositKelasById);
router.post("/saveDepositKelas", verifyUser, saveDepositKelas);
router.post("/updateDepositKelas/:id", verifyUser, updateDepositKelas);
router.post("/deleteDepositKelas/:id", verifyUser, deleteDepositKelas);

module.exports = router;
