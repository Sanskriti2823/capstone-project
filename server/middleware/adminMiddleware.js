const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    if (!user || user.role !== "admin") return res.status(403).json("Admin access required");
    next();
  } catch {
    res.status(500).json("Unable to verify admin");
  }
};