const mongoose = require("mongoose");
const { setStringType, addArrayProject } = require("../utils/utils");
const Student = require("./student");

const FloatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: setStringType(2506),
    more_description: setStringType(250),
    status: {
      type: String,
      enum: ["Ongoing | Assistance-needed"],
      required: true,
    },
    links: [{ type: String }],
    field_of_interest: [
      {
        type: String,
        required: true,
      },
    ],
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true },
);

FloatSchema.pre("save", async function (next) {
  const doc = await Student.findById(this.ownerId);
  const unique = addArrayProject(doc.floatId, String(this._id));
  doc.floatId = unique;
  console.log(doc);
  await doc.save();
  next();
});

module.exports = mongoose.model("Float", FloatSchema);
