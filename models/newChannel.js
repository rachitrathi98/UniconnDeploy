const mongoose = require("mongoose");
const { Schema } = mongoose;

const newChannel = new Schema({
  messageList: [
    {
      text: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      Date: { type: String },
    },
  ],
  unreadMessageList: [
    {
      text: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      Date: { type: String },
    },
  ],
});

module.exports = mongoose.model("NewChannel", newChannel);
