const User = require('../models/user');
const ErrorHandler = require("../utilities/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticcatedUser= catchAsyncErrors(async (req,res,next) => {
    const {token}  = req.cookies
    if(!token) {
        return next(new ErrorHandler('You must be logged in to access this.', 401))
    }

    const decoded= jwt.verify(token, process.env.JWT_SECRET)
    req.user= await User.findById(decoded.id);
    next()

})

exports.authRole = (... roles) =>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            new ErrorHandler(`The role (${req.user.role}) is not abel to use this feature.`, 403)
        }
        next();
    }
}