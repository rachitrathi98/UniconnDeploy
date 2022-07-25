const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const UsersSchema = require("./Users");
// const notification = require("../models/notification");
// const { IUserData } = require("../Interfaces/Interfaces.model");
const { createHmac } = require("crypto");
// import Project from "../models/project";
// CONNECT TO MONGODB
const mongoDB =
  "mongodb+srv://thanemandal:screwdriver4123@cluster0.3g2sy.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(mongoDB, {
    keepAlive: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log("Couldn't connect to Mongodb", err));

mongoose.Promise = global.Promise;
// IMPORT DATA INTO DB
const importData = async (users) => {
  try {
    await UsersSchema.insertMany(users);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const encrptPassword = (password, salt) => {
  if (!password) return "";
  try {
    return createHmac("sha1", salt).update(password).digest("hex");
  } catch (err) {
    return "";
  }
};

const yesTrueVV = (value) => {
  switch (value) {
    case "Yes":
      return true;
      break;
    case "No":
      return false;
      break;
    default:
      return null;
      break;
  }
};

const importDatafn = () => {
  try {
    const res = JSON.parse(fs.readFileSync(`${__dirname}/test.json`, "utf-8"));
    const finaldoc = [];
    res.forEach(async (user) => {
      let user_Final = user;
      const salt = Math.round(new Date().valueOf() * Math.random()) + "";
      user_Final.hashed_password = encrptPassword(user.password, salt);
      user_Final.salt = salt;
      let mobile_nos = user.mobile_number.split(",");
      user_Final.mobile_number = parseInt(mobile_nos[0]);
      user_Final.alternate_number = mobile_nos[1]
        ? parseInt(mobile_nos[1].trim())
        : null;
      let height = user.height.split(".");
      user_Final.height = {
        inches: parseInt(height[0][0]),
        feet: parseInt(height[1][0]),
      };
      user_Final.isMangal = yesTrueVV(user.isMangl);
      user_Final.out_of_india = yesTrueVV(user.out_of_india);
      user_Final.has_spectacle = yesTrueVV(user.hasSpectacle);
      delete user_Final.isMangl;
      delete user_Final.hasSpectacle;
      // TODO to array
      user_Final.educational_qualification = [];
      user_Final.family_details = [];
      user_Final.occupation_details = [];
      user_Final.field_of_interest = [];
      user_Final.links = [];

      // TODO: fill fields
      user_Final.role = "user";
      user_Final.isRegistered = true;
      // const res1 = await notification.create();
      // console.log("res1", res1);
      if (
        user.subcaste === "Deshastha Rigvedi" ||
        user.subcaste === "Karhade" ||
        user.subcaste === "Kokanastha" ||
        user.subcaste === "Deshastha Yajurvedi"
      ) {
        user_Final.caste = "brahman";
      } else user_Final.caste = "brahman";
      let expectation = {
        // exp_marital_status: null,
        // exp_out_of_India: null,
        // exp_occupation_type: null,
        // exp_salary: null,
        // exp_caste: null,
        // exp_sub_caste: null,
        // exp_complexion: null,
        // exp_residential_status: null,
        // exp_isManglik: null,
        // exp_hasSpectacle: null,
        // exp_dob: null,
        exp_details: user.exp_details,
      };
      let occupation_details = {
        // company_name: null,
        salary: user.salary,
        // position: null,
        // location: null,
        // type: null,
        // description: null,
      };
      let kundali_details = {
        kundali_photo: user.kundali,
        place_of_birth: user.place_of_birth,
        time_of_birth: user.time_of_birth,
        nakshatra: user.nakshatra,
        charan: user.charan,
        naadi: user.naadi,
        raas: user.raas,
        gan: user.gan,
        gotra: user.gotra,
      };
      user_Final.occupation_details = occupation_details;
      user_Final.expectation = expectation;
      user_Final.kundali_details = kundali_details;
      delete user_Final.password;
      delete user_Final.salary_range;
      delete user_Final.salary;
      delete user_Final.kundali;
      delete user_Final.time_of_birth;
      delete user_Final.place_of_birth;
      delete user_Final.nakshatra;
      delete user_Final.charan;
      delete user_Final.naadi;
      delete user_Final.raas;
      delete user_Final.gan;
      delete user_Final.gotra;
      delete user_Final.exp_details;
      finaldoc.push(user_Final);
    });
    importData(finaldoc);
  } catch (error) {
    console.log(error);
  }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    // await Users.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import" || process.argv[2] === "-i") {
  importDatafn();
} else if (process.argv[2] === "--delete" || process.argv[2] === "-d") {
  deleteData();
}
