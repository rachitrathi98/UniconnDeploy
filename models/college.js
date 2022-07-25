const mongoose = require("mongoose");
const { setStringType } = require("../utils/utils");

const CollegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String, maxLength: 200 },
    domain: { type: String, maxLength: 10 },
    address: setStringType(256),
    contact: {
      email: {
        type: String,
      },
      website: {
        type: String,
      },
      phone_no: Number,
      phone_no1: Number,
      fax: Number,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("College", CollegeSchema);
