const Items = require("../models/item");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utilities/keyword");

exports.newGames = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const item = await Items.create(req.body);
  res.status(201).json({
    success: true,
    item,
  });
});

exports.getGames = catchAsyncErrors(async (req, res, next) => {
  const gamesPerPage = 8;
  const gameCount = await Items.countDocuments();

  const features = new APIFeatures(Items.find(), req.query)
    .search()
    .filter()
    .pagination(gamesPerPage);

  let items = await features.query;
  let filteredGamesCount = items.length;

  setTimeout(() => {
    res.status(200).json({
      success: true,
      gameCount,
      gamesPerPage,
      filteredGamesCount,
      items,
    });
  }, 1000);
});

exports.singleGame = catchAsyncErrors(async (req, res, next) => {
  const item = await Items.findById(req.params.id);
  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Game not found",
    });
  }
  res.status(200).json({
    success: true,
    item,
  });
});

exports.updateGame = catchAsyncErrors(async (req, res, next) => {
  let item = await Items.findById(req.params.id);
  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Item not found",
    });
  }

  item = await Items.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    item,
  });
});

exports.deleteGame = catchAsyncErrors(async (req, res, next) => {
  const item = await Items.findById(req.params.id);
  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Item not found",
    });
  }

  await item.remove();
  res.status(200).json({
    success: true,
    message: "Item is deleted",
  });
});

exports.itemReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const item = await Items.findById(productId);

  const isReviewed = item.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    item.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    item.reviews.push(review);
    item.numOfReviews = item.reviews.length;
  }
  item.ratings =
    item.reviews.reduce((acc, product) => product.rating + acc, 0) /
    item.reviews.length;
  await item.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

exports.getItemReview = catchAsyncErrors(async (req, res, next) => {
  const item = await Items.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: item.reviews,
  });
});

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const item = await Items.findById(req.query.productId);

  const reviews = item.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  const numOfReviews = reviews.length;
  const ratings =
    item.reviews.reduce((acc, product) => product.rating + acc, 0) /
    reviews.length;

  await Items.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
