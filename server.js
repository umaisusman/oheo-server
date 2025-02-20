require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./config/passport"); // Import Passport Strategies
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "upgrade-insecure-requests");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});


// Routes
app.use("/auth", authRoutes);
app.use(authRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send("Server is running!");
});
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
