const mongoose = require("mongoose");
const Question = require("./question");
const moment=require("moment-timezone");

const { addArrayProject } = require("../utils/utils");
const AnswerSchema = new mongoose.Schema(
  {
    // for_whom
    teacher_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    //by_whom
    student_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },

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
    answer: String,
    replies: [
      {
        teacher_Id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
        },
        //by_whom
        student_Id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        reply: String,
      },
    ],
    question_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
    date: {
      type: String
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

AnswerSchema.pre("save", async function (next) {
  const doc = await Question.findById(this.question_Id._id);
  const unique = addArrayProject(doc.answers, String(this._id));
  doc.answers = unique;
  // console.log("middleware", doc, unique);
  await doc.save();
  next();
});

module.exports = mongoose.model("Answer", AnswerSchema);
