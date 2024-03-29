const express = require("express");
const controller = require("../../controllers/BookingKelas/BookingKelasController.js");
const verify = require("../../../utils/verifyToken.js");
const getBookingKelas = controller.getBookingKelas;
const getBookingKelasNextKode = controller.getBookingKelasNextKode;
const getBookingKelasById = controller.getBookingKelasById;
const saveBookingKelas = controller.saveBookingKelas;
const updateBookingKelas = controller.updateBookingKelas;
const presensiBookingKelas = controller.presensiBookingKelas;
const deleteBookingKelas = controller.deleteBookingKelas;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/bookingKelas", verifyUser, getBookingKelas);
router.post("/bookingKelasNextKode", verifyUser, getBookingKelasNextKode);
router.post("/bookingKelas/:id", verifyUser, getBookingKelasById);
router.post("/saveBookingKelas", verifyUser, saveBookingKelas);
router.post("/updateBookingKelas/:id", verifyUser, updateBookingKelas);
router.post("/presensiBookingKelas/:id", verifyUser, presensiBookingKelas);
router.post("/deleteBookingKelas/:id", verifyUser, deleteBookingKelas);

module.exports = router;
