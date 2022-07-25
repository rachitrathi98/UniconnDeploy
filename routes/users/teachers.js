const router = require("express").Router();
const Teacher = require("../../models/teacher");
const factory = require("../../controller/handlerFactory");
const { restrictTo, isOwner } = require("../../middleware/authMiddleware");
const passport = require("passport");
const { teacherAddValidator } = require("../../controller/validateController");
const { runValidation } = require("../../middleware/validateMiddleware");
const userPhoto = require("../../controller/userPhoto");
const { recommended } = require("../../middleware/queryMiddleware");

router
  .route("/")
  .get(factory.getAll(Teacher))
  .post(
    passport.authenticate("jwt", { session: false }),
    restrictTo(),
    teacherAddValidator,
    runValidation,
    factory.createOne(Teacher),
  );

router
  .route("/:id")
  .get(factory.getOne(Teacher))
  .patch(
    passport.authenticate("jwt", { session: false }),
    restrictTo("teacher"),
    userPhoto.uploadUserPhoto,
    isOwner,
    factory.updateOne(Teacher),
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    restrictTo(),
    factory.deleteOne(Teacher),
  );

router
  .post("/recommended",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      recommended(req, res, next, Teacher);
    }
  );
module.exports = router;
