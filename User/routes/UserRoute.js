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
const getUsersManager = content.getUsersManager;
const getUsersKasir = content.getUsersKasir;
const getUsersAdmin = content.getUsersAdmin;
const getUsersInstruktur = content.getUsersInstruktur;
const getUsersMember = content.getUsersMember;
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
router.post("/usersManager/", verifyUser, getUsersManager);
router.post("/usersKasir/", verifyUser, getUsersKasir);
router.post("/usersAdmin/", verifyUser, getUsersAdmin);
router.post("/usersInstruktur/", verifyUser, getUsersInstruktur);
router.post("/usersMember/", verifyUser, getUsersMember);
router.post("/getUsername", verifyUser, getUsername);

module.exports = router;
