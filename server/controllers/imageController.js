const Booking = require("../models/Booking");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.uploadBookingPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json("No image uploaded");

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "studio-bookings",
      resource_type: "image",
    });

    if (req.body.bookingId) {
      await Booking.findByIdAndUpdate(req.body.bookingId, {
        imageUrl: result.secure_url,
      });
    }

    fs.unlinkSync(req.file.path);
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).json("Image upload failed");
  }
};