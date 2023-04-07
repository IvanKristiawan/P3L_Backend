const express = require("express");
const controller = require("../../controllers/BookingGym/BookingGymController.js");
const verify = require("../../../utils/verifyToken.js");
const getBookingGyms = controller.getBookingGyms;
const getBookingGymNextKode = controller.getBookingGymNextKode;
const getBookingGymById = controller.getBookingGymById;
const saveBookingGym = controller.saveBookingGym;
const updateBookingGym = controller.updateBookingGym;
const presensiBookingGym = controller.presensiBookingGym;
const deleteBookingGym = controller.deleteBookingGym;
const verifyUser = verify.verifyUser;

const router = express.Router();

router.post("/bookingGyms", verifyUser, getBookingGyms);
router.post("/bookingGymNextKode", verifyUser, getBookingGymNextKode);
router.post("/bookingGyms/:id", verifyUser, getBookingGymById);
router.post("/saveBookingGym", verifyUser, saveBookingGym);
router.post("/updateBookingGym/:id", verifyUser, updateBookingGym);
router.post("/presensiBookingGym/:id", verifyUser, presensiBookingGym);
router.post("/deleteBookingGym/:id", verifyUser, deleteBookingGym);

module.exports = router;
