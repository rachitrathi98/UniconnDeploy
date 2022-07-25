const Review = require("../models/review");
const { ObjectId } = require("mongoose").Types;
const { sendEmail } = require("../helpers");
const Student = require("../models/student");

const factory = require("../controller/handlerFactory");
// add  pre post middleware in reviewSchema too much repeating code

//  convert current code to something like below

// exports.getAllReviews = factory.getAll(Review);
// exports.getReview = factory.getOne(Review);
// exports.createReview = factory.createOne(Review);

// const filter = (req) => {
//   const filteredBody = filterObj(req.body, "emailId");
//   if (req.file) filteredBody.photo = req.file.filename;
//   filteredBody.contact = {
//     address: req.body.address,
//     email: req.body.email,
//   };
//   return filteredBody;
// };
// exports.updateReview = factory.updateOne(Review, filter);

exports.getAllReview = (req, res) => {
  Review.aggregate([
    {
      $project: {
        approved: 1,
        anonymous: 1,
        teacherId: 1,
        rating: 1,
        comments: 1,
        studentId: {
          $cond: [{ $eq: ["$anonymous", true] }, "$$REMOVE", "$studentId"],
        },
      },
    },
    {
      $lookup: {
        from: "teachers",
        localField: "teacherId",
        foreignField: "_id",
        as: "teacher",
      },
    },
    {
      $unwind: "$teacher",
    },
    {
      $lookup: {
        from: "students",
        localField: "studentId",
        foreignField: "_id",
        as: "student",
      },
    },
    {
      $unwind: {
        path: "$student",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]).then((reviews, err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send({ reviews });
  });
};
exports.getReview = (req, res) => {
  Review.aggregate([
    { $match: { _id: ObjectId(req.params.id) } },
    {
      $project: {
        approved: 1,
        anonymous: 1,
        teacherId: 1,
        rating: 1,
        comments: 1,
        studentId: {
          $cond: [{ $eq: ["$anonymous", true] }, "$studentId", "$$REMOVE"],
        },
      },
    },
    {
      $lookup: {
        from: "teachers",
        localField: "teacherId",
        foreignField: "_id",
        as: "teacher",
      },
    },
    {
      $unwind: "$teacher",
    },
    {
      $lookup: {
        from: "students",
        localField: "studentId",
        foreignField: "_id",
        as: "student",
      },
    },
    {
      $unwind: {
        path: "$student",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]).then(([review], err) => {
    if (err) return res.status(500).send(err);
    if (review) return res.status(200).send({ review });
    return res.status(404).send({ message: `Couldn't find post` });
  });
};
exports.updateReview = (req, res) => {
  if (!req.body) return res.status(400).send({ error: `Body can't be empty` });
  if (req.body.isApproved === undefined)
    return res
      .status(400)
      .send({ error: `Feild 'approved' is necessary for an update` });
  Review.findOneAndUpdate(
    { _id: ObjectId(req.params.id) },
    {
      $set: {
        approved: req.body.approved,
      },
    },
    (err, debug) => {
      if (err) return res.status(500).send({ err });
      if (debug) {
        Student.findById(debug.studentId, (queryErr, { emailId }) => {
          if (queryErr) return res.status(500).send({ queryErr });

          sendEmail({
            to: emailId,
            approved: req.body.approved,
            message: req.body.message,
            subject: "Your review has been updated",
          }).then(({ emailErr, emailDebug }) => {
            if (emailErr) return res.status(500).send({ emailErr });
            return res.status(200).send({
              message: `Successfully updated review status and email sent`,
              debug: { dbDebug: debug, emailDebug },
            });
          });
        });
      } else return res.status(404).send({ error: `Review not found`, debug });
    },
  );
};
exports.deleteReview = factory.deleteOne(Review);
