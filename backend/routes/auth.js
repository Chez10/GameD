const express= require('express');
const router = express.Router();

const{registerUser, logInUser, logOut}= require('../controllers/userContr');
router.route('/register').post(registerUser);
router.route('/login').post(logInUser);
router.route('/logout').get(logOut);
module.exports = router;