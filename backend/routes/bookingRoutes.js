const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookingController");

// Admin
router.get("/", controller.getBookings);

// User
router.get("/user/:userId", controller.getUserBookings);
router.post("/", controller.createBooking);
// User: cancel booking
router.delete("/:id", controller.cancelBooking);
// ADMIN: mark booking completed
router.patch("/:id/complete", controller.completeBooking);

module.exports = router;