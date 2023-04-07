const express = require("express");
const router = express.Router();
const {
  newOrder,
  singleOrder,
  theOrders,
  everyOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderContr");
const { isAuthdU, roleAuth } = require("../middlewares/authentic");
router.route("/order/new").post(isAuthdU, newOrder);
router.route("/order/:id").get(isAuthdU, singleOrder);
router.route("/orders/me").get(isAuthdU, theOrders);
router.route("/admin/orders/").get(isAuthdU, roleAuth("admin"), everyOrder);
router
  .route("/admin/order/:id")
  .put(isAuthdU, roleAuth("admin"), updateOrder)
  .delete(isAuthdU, roleAuth("admin"), deleteOrder);
module.exports = router;
