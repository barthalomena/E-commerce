const catchAsyncError = require("../middelewares/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require('../utils/ecom')


exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  const token = user.getECOMToken();

  sendToken(user,201,res)

});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  //    finding User
  const user = await User.findOne({ email }).select("+password");
if(!user){
    return next(new ErrorHandler("Invalid Email and Password", 401));

}
// password check
if(! await user.isValidPassword(password)){
    return next(new ErrorHandler("Invalid Email and Password", 401));

}

sendToken(user,201,res)

});
