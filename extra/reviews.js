const router = require("express").Router();
const reviewController = require("../../controller/reviewController");
const factory = require("../controller/handlerFactory");
const Review = require("../models/review");
const { reviewAddValidator } = require("../controller/validateController");
const { runValidation } = require("../middleware/validateMiddleware");

router
  .route("/")
  .get(factory.getAll(Review))
  .post(reviewAddValidator, runValidation, factory.createOne(Review));

router
  .route("/:id")
  .get(factory.getOne(Review))
  .patch(factory.updateOne(Review))
  .delete(factory.deleteOne(Review));

module.exports = router;
