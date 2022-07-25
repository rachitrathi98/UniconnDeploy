const authRouter = require("./auth");
const studentRouter = require("./users/students");
const teacherRouter = require("./users/teachers");
const projectRouter = require("./features/projects");
const activityRouter = require("./features/activity");
const collegeRouter = require("./users/colleges");
const tagRouter = require("./features/forum/tag");
const answerRouter = require("./features/forum/answer");
const questionRouter = require("./features/forum/question");
const NotificationRouter = require("./features/notification");
const ChannelRouter = require("./features/channel");
const passport = require("passport");

module.exports = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/students", studentRouter);
  app.use("/api/teachers", teacherRouter);
  app.use("/api/projects", projectRouter);
  app.use("/api/activity", activityRouter);
  app.use("/api/colleges", collegeRouter);
  app.use(
    "/api/tags",
    passport.authenticate("jwt", { session: false }),
    tagRouter,
  );
  app.use(
    "/api/questions",
    passport.authenticate("jwt", { session: false }),
    questionRouter,
  );
  app.use(
    "/api/answers",
    passport.authenticate("jwt", { session: false }),
    answerRouter,
  );
  app.use(
    "/api/notification",
    passport.authenticate("jwt", { session: false }),
    NotificationRouter,
  );
  app.use(
    "/api/channel",
    passport.authenticate("jwt", { session: false }),
    ChannelRouter,
  );
};
