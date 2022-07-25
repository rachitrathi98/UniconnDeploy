const Review = require("../models/review");
const factory = require("../controller/handlerFactory");
const { sendEmail } = require("../helpers");
const { ObjectId } = require("mongoose").Types;

// add  pre post middleware in reviewSchema too much repeating code

//  convert current code to something like below

// exports.getAllReviews = factory.getAll(Review);
// exports.getReview = factory.getOne(Review);
// exports.deleteReview = factory.deleteOne(Review);
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
  /* Expected to get { teacherId, rating, comments, studentId(if not anonymous)} 

    MongoDB docs link : https://docs.mongodb.com/manual/core/aggregation-pipeline/, 
    mongoose docs link : https://mongoosejs.com/docs/api.html#model_Model.aggregate
    */

  Review.aggregate([
    { $match: { approved: true } },
    {
      $project: {
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

exports.createReview = (req, res) => {
  /* Assuming the following response on first creation 
    body: {teacherId,rating,anonymous(optional),comments(optional)}*/
  Review.create({ ...req.body, studentId: req.user._id }, (err, debug) => {
    if (err) {
      return res.status(500).send(err);
    }
    /* 
        if approved = undefined: moderation case 
        else approved or unapproved for their respective cases 
      */
    sendEmail({
      to: req.user.emailId,
      subject: "Your review has been created",
    }).then(({ emailErr, emailDebug }) => {
      if (emailErr) return res.status(500).send({ emailErr });
      return res.status(200).send({
        message: `Successfully created review and sent for moderation`,
        debug: { dbDebug: debug, emailDebug },
      });
    });
    // return res.status(200).send({
    //   message: `Successfully created review and sent for moderation`,
    //   debug: { dbDebug: debug, emailDebug },
    // });
  });
};

exports.updateReview = (req, res) => {
  /* 
    * expected request body
        body: {comments, rating (optional), anonymous(optional)} 
    * Set approved:false as it'll be checked again
    * The optional fields will not be updated 
  */

  if (!req.body) {
    return res.status(400).send({ error: `Body can't be empty` });
  }
  Review.findOneAndUpdate(
    { _id: ObjectId(req.params.id), studentId: ObjectId(req.user._id) },
    {
      $set: {
        ...req.body,
        approved: false,
      },
    },
    (err, debug) => {
      if (err) return res.status(500).send({ err });
      if (debug) {
        /* 
            if approved = undefined: moderation case 
            else approved or unapproved for their respective cases 
          */
        sendEmail({
          to: req.user.emailId,
          subject: "Your review has been updated",
        }).then(({ emailErr, emailDebug }) => {
          if (emailErr) return res.status(500).send({ emailErr });
          return res.status(200).send({
            message: `Successfully updated review and sent for moderation`,
            debug: { dbDebug: debug, emailDebug },
          });
        });
      } else
        return res
          .status(400)
          .send({ error: `You can't access/update others' reviews`, debug });
    },
  );
};

exports.deleteReview = factory.deleteOne(Review);

exports.getReview = (req, res) => {
  /* For anyone to view the post if approved  

  Use the below condition in projecting studentId 
  if Want to show approved anonymous post, 
  to the user owning it
  
  $cond: [
    {
      $or: [
        { $not: { $eq: ['$anonymous', true] } },
        { $eq: ['$studentId', ObjectId(req.user._id)] }
      ]
    },
    '$studentId',
    '$$REMOVE'
  ] 
  */
  Review.aggregate([
    { $match: { _id: ObjectId(req.params.id), approved: true } },
    {
      $project: {
        teacherId: 1,
        rating: 1,
        comments: 1,
        studentId: {
          $cond: [{ $eq: ["$anonymous", false] }, "$studentId", "$$REMOVE"],
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
