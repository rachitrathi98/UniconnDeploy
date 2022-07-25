const mongoose = require("mongoose");
const { setStringType } = require("../utils/utils");

const connection = mongoose.connection; //mongoose connection
const Grid = require("gridfs-stream");

connection.once("open", () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("upload");
});

let diff = {}; //Initialized to prevent `can't read property of undefined` error
let diffchannels = {};
const TeacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: setStringType(2056),
    photo: {
      type: String,
      default: "default.png",
    },
    employee_id: Number,
    joined: setStringType(206),
    department: setStringType(256),
    field_of_interest: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    educational_qualification: [
      {
        type: String,
        trim: true,
      },
    ],
    role: {
      type: String,
      enum: ["teacher", "admin"],
      default: "teacher",
    },
    position: setStringType(226),
    ratingsAverage: {
      type: Number,
      default: 3,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    links: [{ type: String }],
    contact: {
      website: {
        type: String,
      },
      github: {
        type: String,
      },
      linkedIn: {
        type: String,
      },
      email: {
        type: String,
        trim: true,
      },
      phone_no: {
        type: Number,
      },
    },
    channels: [
      {
        person: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "channels.onModel",
        },
        chat: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "NewChannel",
        },
        onModel: {
          type: String,
          required: true,
          enum: ["Student", "Teacher"],
        },
      },
    ],
    notificationId: {
      type: mongoose.Schema.ObjectId,
      ref: "Notification",
    },
    projectId: [{ type: mongoose.Schema.ObjectId, ref: "Project" }],
    activityId: [{ type: mongoose.Schema.ObjectId, ref: "Activity" }],
    collegeId: { type: mongoose.Schema.ObjectId, ref: "College" },
    isHOD: Boolean,
    isRegistered: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true },
);

// TeacherSchema.virtual("reviews", {
//   ref: "Review",
//   foreignField: "teacherId",
//   localField: "_id",
// });

TeacherSchema.pre(/^find/, function (next) {
  this.populate("projectId");
  next();
});

TeacherSchema.pre(/^find/, function (next) {
  this.populate("activityId");
  next();
});

// TeacherSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "channels.chat",
//     model: "NewChannel",
//   });
//   next();
// });

TeacherSchema.pre(/^find/, function (next) {
  this.populate({
    path: "collegeId",
    // select: 'emailId branch'
  });
  next();
});

TeacherSchema.pre("save", async function (next) {
  const t = await mongoose.model("Teacher", TeacherSchema).findById(this._id);
  if (t && t.photo !== this.photo) diff = { photo: t.photo };
  next();
});
TeacherSchema.post("save", function () {
  if (diff && diff.photo) {
    if (diff.photo) {
      gfs.remove({ _id: diff.photo, root: "upload" }, (err, gridStore) => {
        if (err) {
          console.log("error", err);
        }
        console.log(" user photo delete");
      });
    }
  }
});
TeacherSchema.set("toObject", { virtuals: true });
TeacherSchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("Teacher", TeacherSchema);
