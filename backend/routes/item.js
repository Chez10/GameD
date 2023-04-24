const express = require("express");
const router = express.Router();

const {
  getGames,
  newGames,
  singleGame,
  updateGame,
  deleteGame,
  itemReview,
  getItemReview,
  deleteReview,
} = require("../controllers/itemContr");
const { isAuthdU, roleAuth } = require("../middlewares/authentic");

router.route("/games").get(getGames);
router.route("/game/:id").get(singleGame);

//admin
router.route("/admin/game/new").post(isAuthdU, roleAuth("admin"), newGames);
router
  .route("/admin/game/:id")
  .put(isAuthdU, roleAuth("admin"), updateGame)
  .delete(isAuthdU, roleAuth("admin"), deleteGame);

router.route("/review").put(isAuthdU, itemReview);
router.route("/reviews").get(isAuthdU, getItemReview);
router.route("/reviews").delete(isAuthdU, deleteReview);

module.exports = router;
