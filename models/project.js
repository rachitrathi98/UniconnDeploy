const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const Teacher = require("./teacher");
const Student = require("./student");
const {
  setStringType,
  findDiff,
  addArrayProject,
  delArrayNum,
} = require("../utils/utils");

let diff = {};

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: setStringType(2506),
    more_description: setStringType(2506),

    publication: [setStringType(256)],
    links: [{ type: String }],
    field_of_interest: [
      {
        type: String,
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Float", "Ongoing | Assistance-needed"],
      required: true,
    },

    studentId: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Student",
      },
    ],
    createdBy: {
      type: String,
      enum: ["teacher", "student"],
    },
    teacherId: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Teacher",
        required: true,
      },
    ],
  },
  { timestamps: true },
);
//DOCUMENT MIDDLEWARE:
ProjectSchema.pre("save", async function (next) {
  const p = await mongoose.model("Project", ProjectSchema).findById(this._id);
  if (!p) {
    const doc = await (this.createdBy === "teacher"
      ? Teacher.findById(this.teacherId[0])
      : Student.findById(this.studentId[0]));

    const unique = addArrayProject(doc.projectId, String(this._id));

    doc.projectId = unique;
    await doc.save();
  } else
    diff = {
      teacherId: findDiff(p ? p.teacherId : [], this.teacherId),
      studentId: findDiff(p ? p.studentId : [], this.studentId),
    };
  diff = {
    field_of_interest: findDiff(
      p ? p.field_of_interest : [],
      this.field_of_interest,
    ),
  };
  next();
});

ProjectSchema.post("save", async function () {
  const owner =
    this.createdBy === "teacher"
      ? this.teacherId[0]
      : this.createdBy === "student"
      ? this.studentId[0]
      : null;
  if (diff.studentId || diff.studentId) {
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
            ? addArrayProject(doc.projectId, String(this._id))
            : delArrayNum(doc.projectId, String(this._id));
          doc.projectId = unique;
          await doc.save();
        });
      }
    };

    updateProfile(addedTeachers, { include: true, isTeacher: true });
    updateProfile(addedStudents, { include: true, isTeacher: false });
    updateProfile(removedTeachers, { include: false, isTeacher: true });
    updateProfile(removedStudents, { include: false, isTeacher: false });
  }
  let {
    field_of_interest: [addedFoI, removedFoI],
  } = diff;

  if (addedFoI.length > 0 || removedFoI.length > 0) {
    const s = await Student.find({ isRegistered: true });
    const t = await Teacher.find({ isRegistered: true });

    let studentMail = {};
    let teacherMail = {};
    let studentUnsubscribeMail = {};
    let teacherUnsubscribeMail = {};

    if (removedFoI.length > 0) {
      removedFoI.map((item) => {
        s.map((student) => {
          const sid = String(student._id);

          if (
            sid !== owner &&
            !(sid in studentUnsubscribeMail) &&
            student.field_of_interest.some((i) => String(i) === item)
          )
            studentUnsubscribeMail[sid] = {
              name: student.name,
              email: student.emailId,
            };
        });
        t.map((teacher) => {
          const tid = String(teacher._id);
          if (
            tid !== owner &&
            !(tid in teacherUnsubscribeMail) &&
            teacher.field_of_interest.some((i) => String(i) === item)
          )
            teacherUnsubscribeMail[tid] = {
              name: teacher.name,
              email: teacher.emailId,
            };
        });
      });
    }

    if (addedFoI.length > 0) {
      addedFoI.map((item) => {
        s.map((student) => {
          const sid = String(student._id);
          if (
            sid !== owner &&
            !(sid in studentMail) &&
            student.field_of_interest.some((i) => String(i) === item)
          )
            studentMail[sid] = { name: student.name, email: student.emailId };
        });
        t.map((teacher) => {
          const tid = String(teacher._id);
          if (
            tid !== owner &&
            !(tid in teacherMail) &&
            teacher.field_of_interest.some((i) => String(i) === item)
          )
            teacherMail[tid] = { name: teacher.name, email: teacher.emailId };
        });
      });
    }
  }
});

module.exports = mongoose.model("Project", ProjectSchema);
