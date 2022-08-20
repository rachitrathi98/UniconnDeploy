const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/utils");
const { sendEmail } = require("../helpers");

exports.loginStudent = passport.authenticate("google-student", {
  scope: ["profile", "email"],
});

exports.loginTeacher = passport.authenticate("google-teacher", {
  scope: ["profile", "email"],
});

exports.loginCallbackTeacher = (req, res, next) => {
  passport.authenticate("google-teacher", (err, user) => {
    if (err) return next(new AppError(`Google Error ${err.message}`, 403));

    if (!user.emailId)
      // return next(new AppError("This college isnt registered with us", 402));
      return res
        .status(200)
        .redirect(
          `${process.env.REACT_APP_BASE_URL}/profile#/error/college_Registration`,
        );

    if (
      !(
        // process.env.ALLOWED_DOMAINS.includes(user.emailId.split("@")[1]) ||
        process.env.ADMIN_EMAILS.includes(user.emailId) ||
        process.env.TEACHERS_EMAILS.includes(user.emailId)
      )
    ) {
      return res
        .status(200)
        .redirect(
          `${process.env.REACT_APP_BASE_URL}/profile#/error/college_Registration`,
        );
    }

    const jwtToken = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "100h",
    });
    res.cookie("jwt", jwtToken, {
      expires: new Date(
        Date.now() +
        4 * 24 * 60 * 10 * 60 * 1000,
      ),
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });
    return res
      .status(200)
      .redirect(`${process.env.REACT_APP_BASE_URL}/?#/profile`);
  })(req, res);
};

exports.loginCallbackStudent = (req, res, next) => {
  passport.authenticate("google-student", (err, user) => {
    if (err) return next(new AppError(`Google Error ${err.message}`, 403));

    if (!user.emailId)
      // return next(new AppError("This college isnt registered with us", 402));
      return res
        .status(200)
        .redirect(
          `${process.env.REACT_APP_BASE_URL}/profile#/error/college_Registration`,
        );

    if (
      !(
        // process.env.ALLOWED_DOMAINS.includes(user.emailId.split("@")[1]) ||
        process.env.ADMIN_EMAILS.includes(user.emailId) ||
        process.env.STUDENTS_EMAILS.includes(user.emailId)
      )
    )
      return res
        .status(200)
        .redirect(
          `${process.env.REACT_APP_BASE_URL}/profile#/error/college_Registration`,
        );

    const jwtToken = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "100h",
    });

    res.cookie("jwt", jwtToken, {
      expires: new Date(
        Date.now() +
          4 * 24 * 60 * 10 * 60 * 1000,
      ),
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });
    return res
      .status(200)
      .redirect(`${process.env.REACT_APP_BASE_URL}/?#/profile`);
  })(req, res);
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  res.status(200).json({ status: "success" });
};

exports.passportInit = (passport) => {
  const jwtExtractor = function (req) {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (req.cookies) {
      token = req.cookies["jwt"];
    }
    return token;
  };

  const options = {
    jwtFromRequest: jwtExtractor,
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    "google-teacher",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `/api/auth/login/callbackTeacher`,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        if (
          // process.env.ALLOWED_DOMAINS.includes(
          //   profile._json.email.split("@")[1],
          // ) ||
          process.env.TEACHERS_EMAILS.includes(profile._json.email)
        ) {
          const results = await Student.find({
            emailId: profile._json.email,
          });
          if (results[0]) {
            done(null, {
              emailId: profile._json.email,
              name: profile.displayName,
              role: "student",
            });
          } else {
            done(null, {
              emailId: profile._json.email,
              name: profile.displayName,
              role: "teacher",
            });
          }
        } else if (process.env.ADMIN_EMAILS.includes(profile._json.email)) {
          // create a admin session with all rights
          done(null, {
            name: profile.displayName,
            emailId: profile.emails[0].value,
            role: "admin",
          });
        } else {
          return done(null, false);
        }
      },
    ),
  );

  passport.use(
    "google-student",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `/api/auth/login/callbackStudent`,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        if (
          // process.env.ALLOWED_DOMAINS.includes(
          //   profile._json.email.split("@")[1],
          // ) ||
          process.env.STUDENTS_EMAILS.includes(profile._json.email)
        ) {
          const results = await Teacher.find({
            emailId: profile._json.email,
          });
          if (results[0]) {
            done(null, {
              emailId: profile._json.email,
              name: profile.displayName,
              role: "teacher",
            });
          } else {
            done(null, {
              emailId: profile._json.email,
              name: profile.displayName,
              role: "student",
            });
          }
        } else if (process.env.ADMIN_EMAILS.includes(profile._json.email)) {
          // create a admin session with all rights
          done(null, {
            name: profile.displayName,
            emailId: profile.emails[0].value,
            role: "admin",
          });
        } else {
          return done(null, false);
        }
      },
    ),
  );
  passport.use(
    new JwtStrategy(options, (jwtPayload, done) => {
      if (jwtPayload.role === "student") {
        Student.findOne({ emailId: jwtPayload.emailId }).then((currStudent) => {
          if (currStudent) {
            done(null, currStudent);
          } else {
            new Student({
              name: jwtPayload.name,
              emailId: jwtPayload.emailId,
            })
              .save()
              .then((newStudent) => done(null, newStudent));
          }
        });
      } else if (jwtPayload.role === "admin") {
        Student.findOne({ emailId: jwtPayload.emailId }).then((currStudent) => {
          if (currStudent) {
            done(null, currStudent);
          } else {
            new Student({
              name: jwtPayload.name,
              emailId: jwtPayload.emailId,
              role: "admin",
            })
              .save()
              .then((newStudent) => done(null, newStudent));
          }
        });
      } else if (jwtPayload.role === "teacher") {
        Teacher.findOne({ emailId: jwtPayload.emailId }).then((currTeacher) => {
          if (currTeacher) {
            done(null, currTeacher);
          } else {
            new Teacher({
              name: jwtPayload.name,
              emailId: jwtPayload.emailId,
              role: "teacher",
            })
              .save()
              .then((newTeacher) => done(null, newTeacher));
          }
        });
      } else {
        return done(null, false);
      }
    }),
  );
};

exports.getUser = catchAsync(async (req, res, next) => {
  data = "no data";
  if (req.user.role === "teacher")
    data = await Teacher.findById(req.user.id).populate("channels.chat");
  else if (req.user.role === "student")
    data = await Student.findById(req.user.id).populate("channels.chat");
  else if (req.user.role === "admin") {
    data = await Student.findById(req.user.id);
  }

  res.status(200).send({ user: data });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
