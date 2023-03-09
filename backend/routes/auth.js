//delete
const express= require('express');
const router = express.Router();
const {isAuthenticcatedUser, authRole} = require('../middlewares/authentic')

const{registerUser, logInUser, requestPassword, resetPassword, updatePassword, updateProfile, getProfile, logOut, allUsers, getUserDetails, updateUser, deleteUser}= require('../controllers/userContr');
router.route('/register').post(registerUser);
router.route('/login').post(logInUser);
router.route('/password/request').post(requestPassword);
router.route('/password/update').put(isAuthenticcatedUser, updatePassword);
router.route('/me').get(isAuthenticcatedUser, getProfile);
router.route('/me/update').put(isAuthenticcatedUser, updateProfile);
router.route('/password/reset/:token').put(resetPassword);
router.route('/admin/users').get(isAuthenticcatedUser, authRole('admin'), allUsers);
router.route('/admin/user/:id')
    .get(isAuthenticcatedUser, authRole('admin'), getUserDetails)
    .put(isAuthenticcatedUser, authRole('admin'), updateUser)
    .delete(isAuthenticcatedUser, authRole('admin'), deleteUser);

router.route('/logout').get(logOut);
module.exports = router;