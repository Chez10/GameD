const express = require('express');
const app = express();

app.use(express.json());

const items = require('./routes/item');

app.use('/api/v1',items)

module.exports = app;