const router = require("express").Router();
const { restrictTo, isOwner } = require("../../middleware/authMiddleware");
const Student = require("../../models/student");
const factory = require("../../controller/handlerFactory");
const passport = require("passport");
const { studentAddValidator } = require("../../controller/validateController");
const { runValidation } = require("../../middleware/validateMiddleware");
const userPhoto = require("../../controller/userPhoto");
const { recommended } = require("../../middleware/queryMiddleware");

router
  .route("/")
  .get(factory.getAll(Student))
  .post(
    passport.authenticate("jwt", { session: false }),
    restrictTo(),
    studentAddValidator,
    runValidation,
    factory.createOne(Student),
  );

router
  .route("/:id")
  .get(factory.getOne(Student))
  .patch(
    passport.authenticate("jwt", { session: false }),
    restrictTo("student"),
    isOwner,
    userPhoto.uploadUserPhoto,
    factory.updateOne(Student),
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    restrictTo(),
    factory.deleteOne(Student),
  );

router
  .post("/recommended",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      recommended(req, res, next, Student);
    }
  );
module.exports = router;
