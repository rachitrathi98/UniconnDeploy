const router = require("express").Router();
const authController = require("../controller/authController");
const mailController = require("../controller/mailController");
const { roleExtractor } = require("../middleware/authMiddleware");
const passport = require("passport");
const factory = require("../controller/handlerFactory");
const userPhoto = require("../controller/userPhoto");

router.get("/login-teacher", authController.loginTeacher);
router.get("/login-student", authController.loginStudent);

router.get("/login/callbackTeacher", authController.loginCallbackTeacher);
router.get("/login/callbackStudent", authController.loginCallbackStudent);

router.get("/logout", authController.logout);

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  authController.getUser,
);
router.post(
  "/report",
  passport.authenticate("jwt", { session: false }),
  mailController.report,
);
router.post(
  "/studentRegistration",
  passport.authenticate("jwt", { session: false }),
  mailController.registerStudent,
);
router.post(
  "/teacherRegistration",
  passport.authenticate("jwt", { session: false }),
  mailController.registerTeacher,
);
router.get("/:id", userPhoto.getUserPhoto);

router.delete("/:id", userPhoto.deleteUserPhoto);

module.exports = router;
