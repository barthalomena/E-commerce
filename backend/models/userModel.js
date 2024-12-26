const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const webToken = require("jsonwebtoken");

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
  this.password = await bcrypt.hash(this.password, 10);
});

// user token function
userSchema.methods.getECOMToken = function () {
  return webToken.sign({ id: this.id }, process.env.JWT_SEC, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
// is valida user function
userSchema.methods.isValidPassword =async function(getPassword){
return await bcrypt.compare(getPassword,this.password)
}


const User = mongoose.model("User", userSchema);
module.exports = User;