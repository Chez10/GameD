const catchAysncError = require("../middlewares/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.processPayment = catchAysncError(async (req, res, next) => {
  const intentPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
  });
  res.status(200).json({
    success: true,
    client_secret: intentPayment.client_secret,
  });
});

exports.stripeApi = catchAysncError(async (req, res, next) => {
  res.status(200).json({
    stripeApi: process.env.STRIPE_API_KEY,
  });
});
