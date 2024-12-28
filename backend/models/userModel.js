const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const webToken = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "Password must be at least 6 characters long"], // Updated the message
    select: false,
  },
  avatar: {
    type: String,
    default: "default-avatar.png", // Example placeholder
  },
  role: {
    type: String,
    default: "user",
  },
  resetPassword: String,
  resetPasswordExpire: Date,
  createdAt: {
    // Fixed typo
    type: Date,
    default: Date.now,
  },
});

// password hash function
userSchema.pre("save", async function (next) {
  if(!this.isModified('password')){
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// user token function
userSchema.methods.getECOMToken = function () {
  return webToken.sign({ id: this.id }, process.env.JWT_SEC, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
// is valid user function
userSchema.methods.isValidPassword = async function (getPassword) {
  return await bcrypt.compare(getPassword, this.password);
};

// forgot password function÷
userSchema.methods.getresetToken = function () {
  const password_token = crypto.randomBytes(20).toString("hex"); // Increased length for more security

  // Hash the token
  this.resetPassword = crypto
    .createHash("sha256")
    .update(password_token)
    .digest("hex");

  // Set the expiry time for the token (30 minutes)
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return password_token;
}; 


const User = mongoose.model("User", userSchema);
module.exports = User;
