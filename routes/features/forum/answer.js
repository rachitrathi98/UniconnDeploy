const router = require("express").Router();
const Answer = require("../../../models/answer");
const factory = require("../../../controller/handlerFactory");
const passport = require("passport");

router.route("/").get(factory.getAll(Answer)).post(factory.createOne(Answer));

router
  .route("/:id")
  .get(factory.getOne(Answer))
  .patch(factory.updateOne(Answer))
  .delete(factory.deleteOne(Answer));

module.exports = router;
