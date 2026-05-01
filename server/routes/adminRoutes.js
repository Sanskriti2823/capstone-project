const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { getAllBookings, updateBookingStatus } = require("../controllers/adminController");

router.use(auth, admin);
router.get("/bookings", getAllBookings);
router.patch("/bookings/:id/status", updateBookingStatus);

module.exports = router;