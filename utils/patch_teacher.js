const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();
const Teachers = require("../models/teacher");
const Notification = require("../models/notification");

// CONNECT TO MONGODB
const mongoDB =
  "mongodb+srv://uniconn:uniconn-2020@cluster0.hxhbq.mongodb.net/Uniconn-Development?retryWrites=true&w=majority";
mongoose
  .connect(mongoDB, {
    useUnifiedTopology: true,
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log("Couldn't connect to Mongodb", err));

mongoose.Promise = global.Promise;

// DELETE ALL DATA FROM DB
const patchData = async () => {
  try {
    // await Teachers.deleteMany();
    res = await Teachers.Find({ isRegistered: true });
    if (res && res.status === 200) {
      console.log("res", res);
      res1 = await Notification.create();
      console.log("res", res1);
    }
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--patch") {
  patchData();
}
