const Booking = require("../models/Booking");

// USER: create booking
exports.createBooking = async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json(booking);
};

// ADMIN: get all bookings
exports.getBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("service")
    .populate("user", "username email");
  res.json(bookings);
};

// USER: get own bookings
exports.getUserBookings = async (req, res) => {
  const { userId } = req.params;
  const bookings = await Booking.find({ user: userId }).populate("service");
  res.json(bookings);
};
// USER: cancel own booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Use deleteOne
    await booking.deleteOne();

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ADMIN: mark booking complete
exports.completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "Completed" },
      { new: true } // return updated doc
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking marked as completed", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};