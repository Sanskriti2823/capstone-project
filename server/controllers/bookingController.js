const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const { service, date, price, imageUrl } = req.body;
    const booking = await Booking.create({
      userId: req.user,
      service,
      date,
      price: price || 199,
      imageUrl,
    });
    res.json(booking);
  } catch (error) {
    res.status(500).json("Booking creation failed");
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user }).populate("userId", "name email");
    res.json(bookings);
  } catch {
    res.status(500).json("Could not fetch bookings");
  }
};