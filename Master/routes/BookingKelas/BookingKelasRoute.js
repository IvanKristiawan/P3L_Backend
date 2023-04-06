const express = require("express");
const controller = require("../../controllers/BookingKelas/BookingKelasController.js");
const verify = require("../../../utils/verifyToken.js");
const getBookingKelas = controller.getBookingKelas;
const getBookingKelasById = controller.getBookingKelasById;
const saveBookingKelas = controller.saveBookingKelas;
const updateBookingKelas = controller.updateBookingKelas;
const deleteBookingKelas = controller.deleteBookingKelas;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/bookingKelas", verifyUser, getBookingKelas);
router.post("/bookingKelas/:id", verifyUser, getBookingKelasById);
router.post("/saveBookingKelas", verifyUser, saveBookingKelas);
router.post("/updateBookingKelas/:id", verifyUser, updateBookingKelas);
router.post("/deleteBookingKelas/:id", verifyUser, deleteBookingKelas);

module.exports = router;
