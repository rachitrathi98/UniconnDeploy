const router = require("express").Router();
const {
  restrictTo,
  isActivityOwner,
} = require("../../middleware/authMiddleware");
const Activity = require("../../models/activity");
const factory = require("../../controller/handlerFactory");
const passport = require("passport");
const { activityAddValidator } = require("../../controller/validateController");
const { runValidation } = require("../../middleware/validateMiddleware");

router
  .route("/")
  .get(factory.getAll(Activity))
  .post(
    passport.authenticate("jwt", { session: false }),
    restrictTo("teacher", "alumni"),
    activityAddValidator,
    runValidation,
    factory.createOne(Activity),
  );

router
  .route("/:id")
  .get(factory.getOne(Activity))
  .patch(
    passport.authenticate("jwt", { session: false }),
    factory.updateOne(Activity),
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    isActivityOwner,
    factory.deleteOne(Activity),
  );

module.exports = router;
