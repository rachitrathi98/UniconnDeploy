const mongoose = require("mongoose");
const { setStringType } = require("./utils");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
    },
    middle_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    profile_photo: [
      {
        type: String,
        default: "default.png",
      },
    ],
    display_photo: {
      type: String,
      default: "default.png",
    },
    mobile_number: {
      type: Number,
    },
    alternate_number: {
      type: Number,
    },
    address: {
      type: String,
    },
    city: { type: String, required: true },
    hobbies_description: setStringType(250),
    field_of_interest: [
      {
        type: String,
        trim: true,
      },
    ],
    links: [String],
    blood_group: {
      type: String,
      enum: [
        "A -ve",
        "O +ve",
        "O -ve",
        "A +ve",
        "B +ve",
        "B -ve",
        "AB +ve",
        "AB -ve",
      ],
    },
    marital_status: {
      type: String,
      enum: [
        "Single",
        "Widow with child",
        "Widow without child",
        "Divorced with child",
        "Divorced without child",
      ],
    },
    dob: {
      type: String,
    },
    caste: {
      type: String,
      enum: ["brahman", "others"],
    },
    sub_caste: {
      type: String,
      enum: [
        "Deshastha Rigvedi",
        "Karhade",
        "Kokanastha",
        "Deshastha Yajurvedi",
      ],
    },
    height: {
      inches: {
        type: Number,
      },
      feet: {
        type: Number,
      },
    },
    weight: {
      type: Number,
    },
    complexion: {
      type: String,
      enum: ["Extremely_fair", "Fair", "Wheatish", "Brown", "Black"],
    },
    out_of_india: {
      type: Boolean,
    },
    isMangl: Boolean,
    isHealthIssue: {
      type: Boolean,
      default: false,
    },
    hasSpectacle: Boolean,
    health_description: setStringType(250),
    educational_qualification: [
      {
        college_name: {
          type: String,
          trim: true,
        },
        degree: {
          type: String,
          enum: ["GRAD", "UNDER_GRAD", "POST_GRAD", "PROFFESSIONAL"],
        },
        location: {
          type: String,
          trim: true,
        },
        special_achievements: setStringType(250),
      },
    ],
    occupation_details: {
      company_name: {
        type: String,
        trim: true,
      },
      salary: {
        type: String,
      },
      salary_range: {
        type: String,
        enum: [
          "below_5_LPA",
          "5LPA_10LPA",
          "10LPA_15LPA",
          "15LPA_20LPA",
          "above_20_LPA",
        ],
      },
      position: {
        type: String,
      },
      location: {
        type: String,
      },
      type: {
        type: String,
        enum: ["service", "business"],
      },
      description: setStringType(100),
    },
    expectation: {
      exp_marital_status: {
        type: String,
        enum: [
          "Single",
          "Widow with child",
          "Widow without child",
          "Divorced with child",
          "Divorced without child",
          "any",
        ],
      },
      exp_out_of_India: {
        type: Boolean,
      },
      exp_occupation_type: {
        type: String,
        enum: ["service", "business", "any"],
      },
      exp_salary: {
        type: String,
        enum: [
          "below_5_LPA",
          "5LPA_10LPA",
          "10LPA_15LPA",
          "15LPA_20LPA",
          "above_20_LPA",
        ],
      },
      exp_caste: {
        type: String,
        enum: ["brahman", "others"],
      },
      exp_sub_caste: {
        type: String,
        enum: [
          "Deshastha_Rigvedi",
          "Karhade",
          "Kokanastha",
          "Deshastha Yajurvedi",
        ],
      },
      exp_complexion: {
        type: String,
        enum: ["Extremely_fair", "Fair", "Wheatish", "Brown", "Black"],
      },
      exp_residential_status: {
        type: String,
        enum: ["within_Indian", "Outside_India", "any"],
      },
      exp_isManglik: Boolean,
      exp_hasSpectacle: Boolean,
      exp_dob: {
        type: String,
      },
      exp_details: setStringType(100),
    },
    family_details: [
      {
        name: String,
        occupation_type: {
          type: String,
          enum: ["service", "business"],
        },
        relation: String,
        isAlive: Boolean,
        marital_status: {
          type: String,
          enum: ["Widow", "Divorced", "married"],
        },
        mobile_number: Number,
      },
    ],
    family_background: setStringType(100),
    kundali_details: {
      kundali_photo: {
        type: String,
        default: "default.png",
      },
      place_of_birth: {
        type: String,
        trim: true,
      },
      time_of_birth: {
        type: String,
        trim: true,
      },
      nakshatra: {
        type: String,
        trim: true,
      },
      charan: {
        type: String,
        trim: true,
      },
      naadi: {
        type: String,
        trim: true,
      },
      raas: {
        type: String,
        trim: true,
      },
      gan: {
        type: String,
        trim: true,
      },
      gotra: {
        type: String,
        trim: true,
      },
    },
    other_details: setStringType(500),
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    notificationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
    Transaction_id: String,
    transaction_date: String,
    hashed_password: {
      type: String,
    },
    salt: String,
    resetPasswordLink: {
      data: String,
      default: "",
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

// UserSchema.pre(/^save/, async function (next: any) {
//   const t = await mongoose.model("Teacher", UserSchema).findById(this._id);
//   if (t && t.profile_photo !== this.profile_photo)
//     diff = { profile_photo: t.profile_photo };
//   next();
// });

// UserSchema.virtual("password")
//   .set(function (this: any, password: string) {
//     this._password = password;
//     this.salt = this.makesalt();
//     this.hashed_password = this.encrptPassword(password);
//   })
//   .get(function (this: any) {
//     return this._password;
//   });

// UserSchema.methods = {
//   authenticate: function (plainText: string) {
//     return this.encrptPassword(plainText) === this.hashed_password;
//   },
//   encrptPassword: function (password: string) {
//     if (!password) return "";
//     try {
//       return crypto
//         .createHmac("sha1", this.salt)
//         .update(password)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   },
//   makesalt: function () {
//     return Math.round(new Date().valueOf() * Math.random()) + "";
//   },
// };

UserSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Users", UserSchema);
