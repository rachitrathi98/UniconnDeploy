const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/utils");
const { sendEmail } = require("../helpers");
const studentRegistration = require("../utils/StudentEmailFormat.js");
const teacherRegistration = require("../utils/TeacherEmailFormat.js");

exports.report = catchAsync(async (req, res, next) => {
  console.log("report: data linking pending", req.body, req.user);
  sendEmail({
    to: req.user.emailId,
    subject: req.body.report,
  }).then(({ emailErr, emailDebug }) => {
    if (emailErr) return res.status(500).send({ emailErr });
    return res.status(200).send({
      message: `Successfully created review and sent for moderation`,
      debug: { dbDebug: emailDebug },
    });
  });
});



exports.registerStudent = catchAsync(async (req, res, next) => {
  sendEmail({
    to: req.user.emailId,
    subject: req.body.subject,
    html:studentRegistration
  }).then(({ emailErr, emailDebug }) => {
    if (emailErr) return res.status(500).send({ emailErr });
    return res.status(200).send({
      message: `Successfully created review and sent for moderation`,
      debug: { dbDebug: emailDebug },
    });
  });
});

exports.registerTeacher = catchAsync(async (req, res, next) => {
  sendEmail({
    to: req.user.emailId,
    subject: req.body.subject,
    html:teacherRegistration
  }).then(({ emailErr, emailDebug }) => {
    if (emailErr) return res.status(500).send({ emailErr });
    return res.status(200).send({
      message: `Successfully created review and sent for moderation`,
      debug: { dbDebug: emailDebug },
    });
  });
});