const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const { uploadBookingPhoto } = require("../controllers/imageController");

const upload = multer({ dest: "uploads/" });

router.post("/", auth, upload.single("image"), uploadBookingPhoto);

module.exports = router;