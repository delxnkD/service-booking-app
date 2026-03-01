const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customerName: String,
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  date: String,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Booking", bookingSchema);