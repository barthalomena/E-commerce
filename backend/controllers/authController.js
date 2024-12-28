const catchAsyncError = require("../middelewares/catchAsyncError");
const User = require("../models/userModel");
const {resetPasswordGenerate} = require("../models/userModel");
const crypto = require('crypto')
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/ecom");
const sendEmail = require("../utils/email");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  const token = user.getECOMToken();

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  //    finding User
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email and Password", 401));
  }
  // password check
  if (!(await user.isValidPassword(password))) {
    return next(new ErrorHandler("Invalid Email and Password", 401));
  }

  sendToken(user, 201, res);
});
exports.logoutUser = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({ success: true, message: "Logged Out" });
};
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  const resetToken = user.getresetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset url is as follows \n \n ${resetURL} \n\n if You have not requested this email, then ignore it. `;
  try {
    sendEmail({
      email:user.email,
      subject:"ECOM password recovery",
      message
    })
    res.status(200).json({success:true,message:`Email sent to ${user.email}`})
  } catch (error) {
    user.resetPassword = undefined;
    user.resetPasswordExpire = undefined;
  await user.save({validateBeforeSave:false})
  return next(new ErrorHandler(error.message),500)
  }
});

exports.resetPassword=catchAsyncError(async(req,res,next)=>{
const resetPassword =  crypto.createHash('sha256').update(req.params.token ).digest('hex')
const user = await User.findOne({
  resetPassword,
  resetPasswordExpire:{
    $gt:Date.now()
  }
})
if(!user){return next(new ErrorHandler('password rest token is invalid or expired'))}

if(req.body.password !== req.body.confirmPassword){
  return next(new ErrorHandler('password not matching with confirm password'))

}
user.password=req.body.password
user.resetPassword=undefined
user.resetPasswordExpire=undefined

await user.save({validateBeforeSave:false})

sendToken(user,201,res)

})
