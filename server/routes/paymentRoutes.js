const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { createCheckoutSession, handleWebhook } = require("../controllers/paymentController");

router.post("/create-session", auth, createCheckoutSession);
router.post("/webhook", handleWebhook);

module.exports = router;