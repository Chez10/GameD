const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the name of the game"],
    trim: true,
    maxLength: [100, "Name of game cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter description of game"],
  },
  price: {
    type: Number,
    required: [true, "Please enter price of the game"],
    maxLength: [5, "Game price cannot exceed 5 digits"],
    default: 0.0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please select category for this game"],
    enum: {
      values: [
        "Sandbox",
        "Shooters",
        "Multiplayer online battle arena",
        "Role-playing",
        "Sports",
        "Puzzlers",
        "Action-adventure",
        "Horror",
      ],
      message: "Please select correct category for game",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter game seller"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model("Item", itemSchema);
