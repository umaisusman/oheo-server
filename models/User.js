const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true },  // Use String for unique userId
  // username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  resetToken: { type: String, default: null },
  resetTokenExpiry: { type: Date, default: null },
  loginCode: { type: String, default: null }, // Ensure this is defined
  loginCodeExpiry: { type: Date, default: null }, 
});

// Pre-save hook to assign userId automatically
UserSchema.pre("save", function(next) {
  if (!this.userId) {
    this.userId = this._id.toString();  // Assign the MongoDB _id as userId
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
