const User = require("../models/user");
const sendToken = require("../utilities/jwtToken");
const ErrorHandler = require("../utilities/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const crypto = require("crypto");
const emailSend = require("../utilities/emailSend");
const cloudinary = require('cloudinary')

exports.regisU = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: { //I think this photo needs to be edited
      public_id: "blank-profile-picture-973460_1280",
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  });

  sendToken(user, 200, res);
});

exports.log_inU = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Enter an email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Wrong email or password", 401));
  }

  const isMatchedPassW = await user.comparisonPassW(password);
  if (!isMatchedPassW) {
    return next(new ErrorHandler("Wrong email or password", 401));
  }

  sendToken(user, 200, res);
});

exports.reqPassW = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("No account found with this email", 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = `Password reset token:\n\n${resetUrl}\n\nIf this is not you just ignore it.`;

  try {
    await emailSend({
      email: user.email,
      subject: "Recover your password",
      message,
    });

    res.status(200).json({
      success: true,
      message: `An email was sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resPassW = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Invalid token or expired", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("The password do not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

exports.getProfileData = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassW = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isMatched = await user.comparisonPassW(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("the old password is wrong", 400));
  }
  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

exports.updateProfileData = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidator: true,
    userFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.log_out = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "You exit your account, logged out",
  });
});

exports.everyU = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getU_detail = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User not found with id:  ${req.params.id}`));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidator: true,
    userFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.removeU = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User not found with id:  ${req.params.id}`));
  }

  await user.remove();

  res.status(200).json({
    success: true,
  });
});
