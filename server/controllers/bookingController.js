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

exports.updateBooking = async (req, res) => {
  try {
    const { service, date, price } = req.body;
    const updates = {};
    if (service) updates.service = service;
    if (date) updates.date = date;
    if (price !== undefined) updates.price = price;

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      updates,
      { new: true }
    );

    if (!booking) return res.status(404).json("Booking not found");
    res.json(booking);
  } catch {
    res.status(500).json("Unable to update booking");
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({ _id: req.params.id, userId: req.user });
    if (!booking) return res.status(404).json("Booking not found");
    res.json({ message: "Booking deleted" });
  } catch {
    res.status(500).json("Unable to delete booking");
  }
};
