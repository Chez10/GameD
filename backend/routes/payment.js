const express = require("express");
const router = express.Router();
const { processPayment, stripeApi } = require("../controllers/payContr");
const { isAuthdU } = require("../middlewares/authentic");

router.route("/payment/process").post(isAuthdU, processPayment);
router.route("/stripeapi").get(isAuthdU, stripeApi);

module.exports = router;
