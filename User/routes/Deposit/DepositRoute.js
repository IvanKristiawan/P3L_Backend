const express = require("express");
const controller = require("../../controllers/Deposit/DepositController.js");
const verify = require("../../../utils/verifyToken.js");
const getDeposits = controller.getDeposits;
const getDepositNextKode = controller.getDepositNextKode;
const getDepositById = controller.getDepositById;
const saveDeposit = controller.saveDeposit;
const updateDeposit = controller.updateDeposit;
const deleteDeposit = controller.deleteDeposit;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/deposits", verifyUser, getDeposits);
router.post("/depositNextKode", verifyUser, getDepositNextKode);
router.post("/deposits/:id", verifyUser, getDepositById);
router.post("/saveDeposit", verifyUser, saveDeposit);
router.post("/updateDeposit/:id", verifyUser, updateDeposit);
router.post("/deleteDeposit/:id", verifyUser, deleteDeposit);

module.exports = router;
