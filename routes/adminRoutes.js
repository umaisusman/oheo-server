const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

// Admin-Only Route
router.get("/dashboard", (req, res) => {
  // Make sure the user is authenticated before accessing the dashboard
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  // Send a response with user details (or render a dashboard page if needed)
  res.json({
    message: "Welcome to your dashboard!",
    user: req.user,  // Send user data as part of the response
  });
});
module.exports = router;
