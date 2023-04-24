const app = require('./store');

const connectDatabase = require('./config/database')

const dotenv = require('dotenv');
const cloudinary = require("cloudinary")

dotenv.config({path: 'backend/config/config.env'})

connectDatabase();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_CLOUD_APIKEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
})


app.listen(process.env.PORT,() => {
    console.log(`Server working on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});
