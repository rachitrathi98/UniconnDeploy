const { check } = require("express-validator");

exports.collegeAddValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("emailID").isEmail().withMessage("Must be a valid email address"),
];

exports.studentAddValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("emailID").isEmail().withMessage("Must be a valid Email address"),
  check("role")
    .isIn(["student", "clg_admin", "admin"])
    .withMessage("Please provide appropriate roles"),
];

exports.teacherAddValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("emailID").isEmail().withMessage("Must be a valid Email address"),
  check("field_of_interest")
    .not()
    .isEmpty()
    .withMessage("Please provide fields of interest"),
  check("role")
    .isIn(["teacher", "clg_admin", "admin"])
    .withMessage("Please provide appropriate roles"),
];

exports.projectAddValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("field_of_interest")
    .not()
    .isEmpty()
    .withMessage("Please provide fields of interest"),
  check("status")
    .isIn(["Ongoing", "Completed", "Float", "Ongoing | Assistance-needed"])
    .withMessage("Please provide appropriate status"),
];

exports.floatAddValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("field_of_interest")
    .not()
    .isEmpty()
    .withMessage("Please provide fields of interest"),
  check("status")
    .isIn(["Ongoing | Assistance-needed"])
    .withMessage("Please provide appropriate status"),
];

exports.activityAddValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("status")
    .isIn(["Ongoing", "Completed", "Ongoing | Assistance-needed"])
    .withMessage("Please provide appropriate status"),
];

exports.reviewAddValidator = [
  check("rating")
    .isInt({ gt: 0, lt: 6 })
    .withMessage("Please give a rating between 1 to 5"),
];

exports.recommendedValidator = [
  check("field_of_interest")
  .not()
  .isEmpty()
  .withMessage("Please provide fields of interest")
]