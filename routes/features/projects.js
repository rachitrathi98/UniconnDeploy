const router = require("express").Router();
const { isProjectOwner } = require("../../middleware/authMiddleware");
const Project = require("../../models/project");
const factory = require("../../controller/handlerFactory");
const passport = require("passport");
const { projectAddValidator, recommendedValidator } = require("../../controller/validateController");
const { runValidation } = require("../../middleware/validateMiddleware");
const { recommended } = require("../../middleware/queryMiddleware");

router
  .route("/")
  .get(factory.getAll(Project))
  .post(
    passport.authenticate("jwt", { session: false }),
    projectAddValidator,
    runValidation,
    factory.createOne(Project),
  );

router
  .route("/:id")
  .get(factory.getOne(Project))
  .patch(
    passport.authenticate("jwt", { session: false }),
    isProjectOwner,
    factory.updateOne(Project),
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    isProjectOwner,
    factory.deleteOne(Project),
  );

router
  .post("/recommended",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      recommended(req, res, next, Project);
    }
  );
module.exports = router;
