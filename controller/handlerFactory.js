const AppError = require("../utils/appError");
const { sendEmail } = require("../helpers");
const APIFeatures = require("../utils/apiFeatures");
const { ObjectId } = require("mongoose").Types;
const {
  catchAsync,
  filterObj,
  addArrayNum,
  addArrayProject,
} = require("../utils/utils");

const updateHelper = (doc, req) => {
  if (!doc.contact) doc.contact = {};
  if (req.body.website) doc.contact.website = req.body.website;
  if (req.body.phone_no) doc.contact.phone_no = Number(req.body.phone_no);
  if (req.body.phone_no === "") doc.contact.phone_no = null;

  if (typeof req.body.email === "string") doc.contact.email = req.body.email;
  if (req.body.github) doc.contact.github = req.body.github;
  if (req.body.linkedIn) doc.contact.linkedIn = req.body.linkedIn;
  if (req.body.fax) doc.contact.fax = req.body.fax;
  // if (req.body.isApproved)
  //   if (req.user.role === "admin") {
  if (req.body.isApproved) doc.isApproved = req.body.isApproved;
  //   } else {
  //     doc = null;
  //   }
  if (req.body.field_of_interest)
    req.body.field_of_interest.length > 0
      ? (doc.isRegistered = true)
      : (doc.isRegistered = false);

  if (req.file) doc.photo = req.file["id"].toString();
  if (req.body.defaultPhoto) doc.photo = "default.png";

  const filteredBody = filterObj(
    req.body,
    "name",
    "text",
    "department",
    "question",
    "more_description",
    "gender",
    "comments",
    "rating",
    "position",
    "batch",
    "branch",
    "answer",
    "description",
    "project_Id",
    "status",
    "link",
    "collaborator",
    "address",
    "university_id",
    "collegeId",
    "NotificationType",
    "Status",
    "createdBy",
    "date",
  );

  Object.keys(filteredBody).forEach((el) => (doc[el] = filteredBody[el]));
  if (req.body.channels)
    doc.channels.push({
      person: ObjectId(req.body.channels.person),
      chat: ObjectId(req.body.channels.chat),
      onModel: req.body.channels.onModel,
    });
  if (req.body.studentId) {
    const unique = addArrayNum(req.body.studentId);
    doc.studentId = unique;
  }
  if (req.body.isPrivate) {
    doc.isPrivate = Boolean(req.body.isPrivate);
  }
  if (req.body.ReadStatus) {
    doc.ReadStatus = Boolean(req.body.ReadStatus);
  }
  if (req.body.isAnonymous) {
    doc.isAnonymous = Boolean(req.body.isAnonymous);
  }
  if (req.body.teacherId) {
    const unique = addArrayNum(req.body.teacherId);
    doc.teacherId = unique;
  }
  if (req.body.unreadMessageList) {
    doc.unreadMessageList = req.body.unreadMessageList;
  }
  if (req.body.projectId) {
    const unique = addArrayProject(doc.projectId, req.body.projectId);
    doc.projectId = unique;
  }

  if (req.body.publication) {
    doc.publication = req.body.publication;
  }
  if (req.body.tags) {
    doc.tags = req.body.tags;
  }
  if (req.body.replies) {
    doc.replies = req.body.replies;
  }

  if (req.body.upvotes) {
    doc.upvotes = req.body.upvotes;
  }
  if (req.body.downvotes) {
    doc.downvotes = req.body.downvotes;
  }

  if (req.body.links) {
    doc.links = req.body.links;
  }

  if (req.body.educational_qualification) {
    doc.educational_qualification = req.body.educational_qualification;
  }

  if (req.body.field_of_interest) {
    doc.field_of_interest = req.body.field_of_interest;
  }

  if (req.body.collegeId) {
    doc.collegeId = ObjectId(req.body.collegeId);
  }
  if (req.body.activityId) {
    doc.activityId = ObjectId(req.body.activityId);
  }
  if (req.body.teacher_Id) {
    doc.teacher_Id = ObjectId(req.body.teacher_Id);
  }
  if (req.body.student_Id) {
    doc.student_Id = ObjectId(req.body.student_Id);
  }
  if (req.body.ownerId) {
    doc.ownerId = ObjectId(req.body.ownerId);
  }
  if (req.body.question_Id) {
    doc.question_Id = ObjectId(req.body.question_Id);
  }
  if (req.body.notificationId) {
    doc.notificationId = ObjectId(req.body.notificationId);
  }
  console.log("handler factory", doc, "\n body", req.body);
  return doc;
};

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    console.log(doc, req.params.id)
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    document = updateHelper(doc, req);
    if (!document)
      return next(new AppError("could not udpate the database", 407));

    const finaldoc = await document.save();

    res.status(200).json({
      status: "success",
      data: {
        data: finaldoc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let data = {};
    const filteredBody = filterObj(
      req.body,
      "emailId",
      "role",
      "name",
      "report",
      "subject",
      "joined",
      "employee_id",
      "domain",
    );

    Object.keys(filteredBody).forEach((el) => (data[el] = filteredBody[el]));
    document = updateHelper(data, req);
    const doc = await Model.create(document);
    if (doc.rating > 0) {
      sendEmail({
        to: req.user.emailId,
        subject: "Your review has been created",
      }).then(({ emailErr, emailDebug }) => {
        if (emailErr) return res.status(500).send({ emailErr });
        return res.status(200).send({
          message: `Successfully created review and sent for moderation`,
          debug: { dbDebug: emailDebug },
        });
      });
    } else {
      res.status(201).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    }
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let filter = { _id: req.params.id };

    if (req.baseUrl === "/api/reviews")
      if (req.user.role !== "admin")
        filter = { _id: req.params.id, isApproved: true };

    let query = Model.find(filter);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // // To allow for nested GET reviews on review
    let filter = {};

    if (req.baseUrl === "/api/reviews")
      if (req.user.role !== "admin") filter = { isApproved: true };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
