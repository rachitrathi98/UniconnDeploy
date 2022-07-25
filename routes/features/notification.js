const router = require("express").Router();
const { restrictTo } = require("../../middleware/authMiddleware");
const Notification = require("../../models/notification");
const factory = require("../../controller/handlerFactory");
const notificationController = require("../../controller/notificationController");
const passport = require("passport");
const { isNotificationOwner } = require("../../middleware/authMiddleware");

router
  .route("/")
  .post(
    passport.authenticate("jwt", { session: false }),
    factory.createOne(Notification),
  );

router
  .route("/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    isNotificationOwner,
    factory.getOne(Notification),
  )
  .patch(
    passport.authenticate("jwt", { session: false }),
    notificationController.updateNotification(Notification),
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    notificationController.deleteNotification(Notification),
  );

  router
  .route("/readStatus/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    isNotificationOwner,
    notificationController.updateReadStatus(Notification),
  )

module.exports = router;
