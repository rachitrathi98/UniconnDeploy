const mongoose = require("mongoose");
const Teacher = require("./teacher");
const Student = require("./student");
const {
  setStringType,
  findDiff,
  delArrayNum,
  addArrayProject,
} = require("../utils/utils");
let diff = {};

const ActivitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: setStringType(2506),
    more_description: setStringType(2506),
    position: setStringType(26),
    links: [{ type: String }],
    photographs: [{ type: String }],
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Ongoing | Assistance-needed"],
      required: true,
    },
    studentId: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Student",
      },
    ],
    teacherId: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Teacher",
        required: true,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true },
);

// DOCUMENT MIDDLEWARE:
ActivitySchema.pre("save", async function (next) {
  const a = await mongoose.model("Activity", ActivitySchema).findById(this._id);
  if (!a) {
    const doc = await Teacher.findById(this.teacherId[0]);
    const unique = addArrayProject(doc.activityId, String(this._id));
    doc.activityId = unique;
    await doc.save();
  } else
    diff = {
      teacherId: findDiff(a ? a.teacherId : [], this.teacherId),
      studentId: findDiff(a ? a.studentId : [], this.studentId),
    };
  next();
});

ActivitySchema.post("save", async function () {
  if (diff.teacherId || diff.studentId) {
    const owner =
      this.createdBy === "teacher"
        ? this.teacherId[0]
        : this.createdBy === "student"
        ? this.studentId[0]
        : null;
    let {
      studentId: [addedStudents, removedStudents],
      teacherId: [addedTeachers, removedTeachers],
    } = diff;
    const updateProfile = (list, { include, isTeacher }) => {
      if (list.length > 0) {
        list.map(async (_id) => {
          let doc = isTeacher
            ? await Teacher.findById(_id)
            : await Student.findById(_id);
          let unique = include
            ? addArrayProject(doc.activityId, String(this._id))
            : delArrayNum(doc.activityId, String(this._id));
          doc.activityId = unique;
          await doc.save();
        });
      }
    };
    updateProfile(addedTeachers, { include: true, isTeacher: true });
    updateProfile(addedStudents, { include: true, isTeacher: false });
    updateProfile(removedTeachers, { include: false, isTeacher: true });
    updateProfile(removedStudents, { include: false, isTeacher: false });
  }
});

module.exports = mongoose.model("Activity", ActivitySchema);
