const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createBooking, getBookings } = require("../controllers/bookingController");

router.post("/", auth, createBooking);
router.get("/", auth, getBookings);

module.exports = router;