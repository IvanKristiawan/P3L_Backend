const express = require("express");
const content = require("../controllers/UserController.js");
const content2 = require("../../utils/verifyToken.js");
const updateUser = content.updateUser;
const updateUserThenLogin = content.updateUserThenLogin;
const deleteUser = content.deleteUser;
const getUser = content.getUser;
const aktivasiUser = content.aktivasiUser;
const updateDepositUser = content.updateDepositUser;
const getUsers = content.getUsers;
const getUsername = content.getUsername;
const verifyUser = content2.verifyUser;
const router = express.Router();

// UPDATE
router.post("/users/:id", verifyUser, updateUser);
router.post("/updateUserThenLogin/:id", verifyUser, updateUserThenLogin);
// DELETE
router.post("/users/deleteUser/:id", verifyUser, deleteUser);
// GET
router.post("/findUser/:id", verifyUser, getUser);
router.post("/aktivasiUser/:id", verifyUser, aktivasiUser);
router.post("/updateDepositUser/:id", verifyUser, updateDepositUser);
// GET ALL
router.post("/users/", verifyUser, getUsers);
router.post("/getUsername", verifyUser, getUsername);

module.exports = router;
