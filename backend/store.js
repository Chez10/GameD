const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(cookieParser());

const items = require('./routes/item');
const users = require('./routes/auth');

app.use('/api/v1',items)
app.use('/api/v1',users)

app.use(errorMiddleware);
module.exports = app;