const ErrorHandler = require('../utilities/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Server Error';

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error={...err}

        error.message = err.message

        if (err.name==='CastError') {
            const message = `Resourse not found. Invalid: ${err.path}`
            error = new ErrorHandler(message,400)
        }

        if (err.name==='ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message,400)
        }

        if(err.code==11000){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(message,400)
        }

        if (err.name==='JsonWebTokenError') {
            const message = 'JSON Web Token is incorrect';
            error = new ErrorHandler(message,400)
        }

        if (err.name==='TokenExpiredError') {
            const message = 'JSON Web Token is expired';
            error = new ErrorHandler(message,400)
        }



        res.status(err.statusCode).json({
            success: false,
            message: err.message || 'Server Error'
        })


    }

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success:false,
            error: err,
            errMessage: err.message,
            stack: err.stack

        })
    }

    
}

