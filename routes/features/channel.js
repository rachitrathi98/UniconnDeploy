const router = require("express").Router();
const { restrictTo } = require("../../middleware/authMiddleware");
const Channel = require("../../models/newChannel");
const factory = require("../../controller/handlerFactory");
const passport = require("passport");

router
  .route("/")
  .get(factory.getAll(Channel))
  .post(
    passport.authenticate("jwt", { session: false }),
    factory.createOne(Channel),
  );

router
  .route("/:id")
  .get(factory.getOne(Channel))
  .patch(
    passport.authenticate("jwt", { session: false }),
    factory.updateOne(Channel),
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    factory.deleteOne(Channel),
  );

module.exports = router;
