//delete
const express = require("express");
const router = express.Router();
const { isAuthdU, roleAuth } = require("../middlewares/authentic");

const {
  regisU,
  log_inU,
  reqPassW,
  resPassW,
  updatePassW,
  updateProfileData,
  getProfileData,
  log_out,
  everyU,
  getU_detail,
  updateUser,
  removeU,
} = require("../controllers/userContr");
router.route("/register").post(regisU);
router.route("/login").post(log_inU);
router.route("/password/request").post(reqPassW);
router.route("/password/update").put(isAuthdU, updatePassW);
router.route("/me").get(isAuthdU, getProfileData);
router.route("/me/update").put(isAuthdU, updateProfileData);
router.route("/password/reset/:token").put(resPassW);
router.route("/admin/users").get(isAuthdU, roleAuth("admin"), everyU);
router
  .route("/admin/user/:id")
  .get(isAuthdU, roleAuth("admin"), getU_detail)
  .put(isAuthdU, roleAuth("admin"), updateUser)
  .delete(isAuthdU, roleAuth("admin"), removeU);

router.route("/logout").get(log_out);
module.exports = router;
