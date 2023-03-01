const User = require('../models/user');
const sendToken = require('../utilities/jwtToken');
const ErrorHandler = require('../utilities/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


exports.registerUser= catchAsyncErrors(async (req, res, next) => {
    const {name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:'blank-profile-picture-973460_1280',
            url:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }
    })

    sendToken(user, 200, res)
})

exports.logInUser= catchAsyncErrors(async (req, res, next) => {
    const{email, password}= req.body;
    if(!email || !password){
        return next(new ErrorHandler('Enter an email and password', 400))
    }

    const user= await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler('Wrong email or password', 401))
    }

    const isPasswordMatch=await user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new ErrorHandler('Wrong email or password', 401))
    }

    sendToken(user, 200, res)

})

exports.logOut= catchAsyncErrors(async (req, res, next)=> {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success: true,
        message: 'You exit your account, logged out'
    })
})
