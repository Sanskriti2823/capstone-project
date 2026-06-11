const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createBooking, getBookings, updateBooking, deleteBooking } = require("../controllers/bookingController");

router.post("/", auth, createBooking);
router.get("/", auth, getBookings);
router.put("/:id", auth, updateBooking);
router.delete("/:id", auth, deleteBooking);

module.exports = router;