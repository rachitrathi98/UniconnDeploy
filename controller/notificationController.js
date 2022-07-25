const { catchAsync, filterObj, addArrayNum } = require("../utils/utils");
const AppError = require("../utils/appError");

exports.updateNotification = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    if (req.body.notification) document = doc[0].push(req.body.notification);

    if (!document)
      return next(new AppError("could not udpate the database", 407));
    const finaldoc = await doc.save();

    res.status(200).json({
      status: "success",
      data: {
        data: finaldoc,
      },
    });
  });

exports.updateReadStatus = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc[0]) {
      return next(new AppError("No document found with that ID", 404));
    }
    // console.log("Doc",doc[0]);

    doc[0].map((notification) => {
      notification.ReadStatus = true;
    });
    for (i = 0; i < doc[0].length; i++) {
      Object.values(doc[0])[i].ReadStatus = true;
    }
    const finaldoc = await doc.save();
    res.status(200).json({
      status: "success",
      data: {
        data: finaldoc,
      },
    });
  });

exports.deleteNotification = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    doc[0] = doc[0].filter((notification) => {
      return req.query.notification_id !== String(notification._id);
    });

    const finaldoc = await doc.save();

    res.status(200).json({
      status: "success",
      data: {
        data: finaldoc,
      },
    });
  });
