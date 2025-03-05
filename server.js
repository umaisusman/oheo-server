require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./config/passport"); // Import Passport Strategies
const authRoutes = require("./routes/authRoutes");
const businessRoutes = require("./routes/businessRoutes");

const path = require("path");


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


// app.use("/uploads", express.static("uploads"));


// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/auth", authRoutes);
app.use(authRoutes);
app.use("/api/business", businessRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
