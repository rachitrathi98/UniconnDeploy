const router = require("express").Router();
const { restrictTo } = require("../../middleware/authMiddleware");
const Float = require("../../models/float");
const factory = require("../../controller/handlerFactory");
const passport = require("passport");
const { floatAddValidator } = require("../../controller/validateController");
const { runValidation } = require("../../middleware/validateMiddleware");

router
  .route("/")
  .get(factory.getAll(Float))
  .post(
    passport.authenticate("jwt", { session: false }),
    restrictTo("student"),
    floatAddValidator,
    runValidation,
    factory.createOne(Float),
  );

router
  .route("/:id")
  .get(factory.getOne(Float))
  .patch(
    passport.authenticate("jwt", { session: false }),
    restrictTo("student"),
    factory.updateOne(Float),
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    restrictTo("student"),
    factory.deleteOne(Float),
  );

module.exports = router;
