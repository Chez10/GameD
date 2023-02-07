const express = require('express');
const router = express.Router();

const {getItems} = require('../controllers/itemContr');

router.route('/items').get(getItems);

module.exports = router;