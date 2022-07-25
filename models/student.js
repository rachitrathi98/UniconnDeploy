const mongoose = require("mongoose");
const { setStringType } = require("../utils/utils");
//const upload = require("../utils/imageGrid");
const connection = mongoose.connection; //mongoose connection
const Grid = require("gridfs-stream");
const { Schema } = mongoose;

connection.once("open", () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("upload");
});

let diff = {}; //Initialized to prevent `can't read property of undefined` error
const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: setStringType(2056),
    batch: setStringType(85),
    branch: setStringType(85),
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    }, // fast filtering
    photo: {
      type: String,
      default: "default.png",
    },
    university_id: Number,
    field_of_interest: [
      {
        type: String,
        trim: true,
      },
    ],

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
      required: true,
    },
    links: [{ type: String }],
    contact: {
      email: {
        type: String,
        trim: true,
      },
      website: {
        type: String,
      },
      github: {
        type: String,
      },
      linkedIn: {
        type: String,
      },
      phone_no: Number,
    },
    collegeId: { type: mongoose.Schema.ObjectId, ref: "College" }, // auto-generated from virtual properties
    projectId: [{ type: mongoose.Schema.ObjectId, ref: "Project" }], // only projects done with teachers
    channels: [
      {
        person: {
          type: Schema.Types.ObjectId,
          refPath: "channels.onModel",
        },
        chat: {
          type: Schema.Types.ObjectId,
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
    isRegistered: {
      type: Boolean,
      default: false,
    },
    isTPC: Boolean,
  },
  { timestamps: true },
);

StudentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "collegeId",
    select: "-__v -createdAt -updatedAt",
  })
    .populate({
      path: "projectId",
      select: "-__v -createdAt -updatedAt",
    })
    .populate({
      path: "activityId",
      select: "-__v -createdAt -updatedAt",
    });
  next();
});

StudentSchema.pre("save", async function (next) {
  const s = await mongoose.model("Student", StudentSchema).findById(this._id);
  if (s && s.photo !== this.photo) {
    gfs.remove({ _id: s.photo, root: "upload" }, (err, gridStore) => {
      if (err) {
        console.log("error", err);
      }
      console.log("user photo delete");
    });
  }
  next();
});

module.exports = mongoose.model("Student", StudentSchema);
