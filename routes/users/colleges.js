const router = require("express").Router();
const College = require("../../models/college");
const factory = require("../../controller/handlerFactory");
const { restrictTo } = require("../../middleware/authMiddleware");
const passport = require("passport");
const { collegeAddValidator } = require("../../controller/validateController");
const { runValidation } = require("../../middleware/validateMiddleware");

router
  .route("/")
  .get(factory.getAll(College))
  .post(
    passport.authenticate("jwt", { session: false }),
    restrictTo(),
    collegeAddValidator,
    runValidation,
    factory.createOne(College),
  );

router
  .route("/:id")
  .get(factory.getOne(College))
  .patch(
    passport.authenticate("jwt", { session: false }),
    restrictTo(),
    factory.updateOne(College),
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    restrictTo(),
    factory.deleteOne(College),
  );

module.exports = router;
