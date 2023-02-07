const app = require('./store');

const dotenv = require('dotenv');

dotenv.config({path: 'backend/config/config.env'})

app.listen(process.env.PORT,() => {
    console.log(`Server working on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});