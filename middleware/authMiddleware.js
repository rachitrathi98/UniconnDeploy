const AppError = require("./../utils/appError");

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (req.user) {
      if (roles.includes(req.user.role) || req.user.role === "admin") {
        next();
      } else {
        return next(
          new AppError(
            "You do not have permission to perform this action",
            403,
          ),
        );
      }
    } else {
      return next(new AppError("You are not logged in", 401));
    }
  };
};

exports.isOwner = (req, res, next) => {
  if (req.params.id === String(req.user._id) || req.user.role === "admin")
    return next();

  return next(new AppError("You do not own this profile", 401));
};

exports.isNotificationOwner = (req, res, next) => {
  if (
    req.params.id === String(req.user.notificationId) ||
    req.user.role === "admin"
  )
    return next();

  return next(new AppError("You do not own this profile", 401));
};

exports.isProjectOwner = (req, res, next) => {
  const allproject = req.user.projectId;
  const projectId = req.url.split("/")[1];
  let count = 0;
  if (projectId.length > 0)
    allproject.map((project) => {
      console.log(
        String(projectId) === String(project._id),
        projectId,
        project._id,
      );
      if (projectId === String(project._id) || req.user.role === "admin")
        count = 1;
    });
  if (count) return next();
  else return next(new AppError("You do not own this profile", 401));
};
exports.isActivityOwner = (req, res, next) => {
  const allactivity = req.user.activityId;
  const activityId = req.url.split("/")[1];
  let count = 0;
  if (activityId.length > 0)
    allactivity.map((activity) => {
      console.log(
        String(activityId) === String(activity._id),
        activityId,
        activity._id,
      );
      if (activityId === String(activity._id) || req.user.role === "admin")
        count = 1;
    });
  if (count) return next();
  else return next(new AppError("You do not own this profile", 401));
};
