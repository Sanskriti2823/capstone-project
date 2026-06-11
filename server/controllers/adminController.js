const Booking = require("../models/Booking");

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId", "name email");
    res.json(bookings);
  } catch {
    res.status(500).json("Failed to load bookings");
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!booking) return res.status(404).json("Booking not found");
    res.json(booking);
  } catch {
    res.status(500).json("Unable to update booking status");
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json("Booking not found");
    res.json({ message: "Booking deleted" });
  } catch {
    res.status(500).json("Unable to delete booking");
  }
};