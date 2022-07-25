const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    groupby: {
      type: String,
      trim: true,
      default: "miscellaneous",
    },
    ownerId: { type: mongoose.Schema.ObjectId, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Tag", TagSchema);
