const router = require("express").Router();
const Question = require("../../../models/question");
const factory = require("../../../controller/handlerFactory");
const passport = require("passport");

router
  .route("/")
  .get(factory.getAll(Question))
  .post(factory.createOne(Question));

router
  .route("/:id")
  .get(factory.getOne(Question))
  .patch(factory.updateOne(Question))
  .delete(factory.deleteOne(Question));

module.exports = router;
