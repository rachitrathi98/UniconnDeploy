const mongoose = require("mongoose");

const { Schema } = mongoose;

const Notification = new Schema([
  [
    [
      {
        Message: { type: String },
        Link: { type: String },
        teacher_Id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
        },
        student_Id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        Status: {
          type: String,
          enum: ["Accept", "Reject"],
        },
        NotificationType: {
          type: String,
          enum: [
            "ChatRequest",
            "ProjectRequest",
            "Project",
            "Answer",
            "Question",
            "ActivityRequest",
            "Activity",
            "Float",
            "Chat",
            "status",
            "UniconnTeam",
            "Default",
          ],
        },
        SendMail: {
          type: Boolean,
          default: false,
        },
        channel: {
          person: {
            type: String,
          },
          chat: {
            type: String,
          },
          onModel: {
            type: String,
            enum: ["Student", "Teacher"],
          },
        },
        project: { title: { type: String }, _id: { type: String } },
        activity: { title: { type: String }, _id: { type: String } },
        ReadStatus: { type: Boolean, default: false },
        date: {
          required: true,
          type: String,
        },
      },
    ],
  ],
]);
// add mail feature here
module.exports = mongoose.model("Notification", Notification);
