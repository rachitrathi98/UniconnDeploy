const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();
const Teachers = require("../models/teacher");
const Students = require("../models/student");
const College = require("../models/college");
const Project = require("../models/project");

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

//Read json file
const teachers = JSON.parse(
  fs.readFileSync(`${__dirname}/teachers.json`, "utf-8"),
);
// const project = JSON.parse(
//   fs.readFileSync(`${__dirname}/projects.json`, "utf-8"),
// );
// const college = JSON.parse(
//   fs.readFileSync(`${__dirname}/colleges.json`, "utf-8"),
// );
// READ JSON FILE
const students = JSON.parse(
  fs.readFileSync(`${__dirname}/students.json`, "utf-8"),
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Teachers.insertMany(teachers);
    await Students.insertMany(students);
    // await Project.insertMany(project);
    // await College.insertMany(college);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    // await Teachers.deleteMany();
    await Students.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
