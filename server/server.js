require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const connectDB = require("./config/db");

const app = express();

const placeholderEnvPatterns = [
  "<db_password>",
  "<password>",
  "<username>",
  "your_",
  "change_this",
];

const isPlaceholderValue = (value) => {
  if (!value) return true;
  return placeholderEnvPatterns.some((pattern) => value.includes(pattern));
};

const validateEnv = () => {
  const requiredEnv = ["JWT_SECRET", "ADMIN_KEY", "CLIENT_URL"];
  const productionOnlyEnv = [
    "MONGO_URI",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ];

  const errors = [];
  const warnings = [];

  requiredEnv.forEach((key) => {
    const value = process.env[key];
    if (!value) {
      errors.push(`${key} is not set`);
    } else if (isPlaceholderValue(value)) {
      warnings.push(`${key} is still using a placeholder value`);
    }
  });

  if (process.env.NODE_ENV === "production") {
    productionOnlyEnv.forEach((key) => {
      const value = process.env[key];
      if (!value) {
        errors.push(`${key} is not set`);
      } else if (isPlaceholderValue(value)) {
        errors.push(`${key} is still using a placeholder value`);
      }
    });
  } else {
    productionOnlyEnv.forEach((key) => {
      const value = process.env[key];
      if (value && isPlaceholderValue(value)) {
        warnings.push(`${key} is still using a placeholder value`);
      }
    });
  }

  if (warnings.length > 0) {
    console.warn("Environment warnings:\n" + warnings.join("\n"));
  }

  if (errors.length > 0) {
    console.error("Environment validation failed:\n" + errors.join("\n"));
    process.exit(1);
  }
};

validateEnv();
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(express.json());
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/uploads", require("./routes/imageRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // SPA fallback - serve index.html for all non-API routes
  app.get("*", (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith("/api")) {
      return res.status(404).json({ error: "API endpoint not found" });
    }
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));