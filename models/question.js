const mongoose = require("mongoose");
// const Teacher = require("./teacher");
const { ObjectId } = require("mongoose").Types;
const AnswerSchema = require("./answer");

const Schema = new mongoose.Schema(
  {
    teacher_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    student_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    question: String,
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    upvotes: [
      {
        type: String,
      },
    ],
    downvotes: [
      {
        type: String,
      },
    ],
    isPrivate: { type: Boolean, default: false, required: true },
    isAnonymous: { type: Boolean, default: false, required: true },
    isApproved: { type: Boolean, default: false, required: true },
    collegeName: { type: String },
    date: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true },
);

Schema.pre(/^find/, function (next) {
  // this
  this.populate({
    path: "answers",
  });
  next();
});

module.exports = mongoose.model("Question", Schema);
