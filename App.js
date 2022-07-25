const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");

const protocol =
  process.env.NODE_ENV === "production"
    ? require("https").createServer(
        {
          key: fs.readFileSync("/etc/letsencrypt/live/uniconn.in/privkey.pem"),
          cert: fs.readFileSync(
            "/etc/letsencrypt/live/uniconn.in/fullchain.pem",
          ),
        },
        app,
      )
    : require("http").createServer(app);

const Student = require("./models/student");
const Teacher = require("./models/teacher");
const NewChannel = require("./models/newChannel");
const cookieParser = require("cookie-parser");
const compression = require("compression");

const globalErrorHandler = require("./controller/globalErrorController");
const AppError = require("./utils/appError");
const { passportInit } = require("./controller/authController");

require("dotenv").config();

//required for heroku to send cookies while secure is set to true
app.enable("trust proxy");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

var io = require("socket.io")(protocol, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.BASE_URL
        : "http://localhost:3000",
    credentials: true,
  },
});
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log("Couldn't connect to Mongodb", err));

mongoose.Promise = global.Promise;
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    credentials: true,
    origin: process.env.REACT_APP_BASE_URL,
  }),
);

app.use(cookieParser());

app.use(compression());

app.use(passport.initialize());
passportInit(passport);

const routes = require("./routes");
const { info } = require("console");
const { request } = require("http");

// app.get("/getChannels", function (req, res) {
//   console.log("here checking for params:", req.query._id, req.query.category);
//   if (req.query.category == "student") {
//     Student.findOne({ _id: req.query._id })
//       .populate("channels.person")
//       .exec(function (err, person) {
//         if (err) console.log("Error occured");
//         console.log("The object is :", person);
//         res.json({ info: person.channels });
//       });
//   } else {
//     Teacher.findOne({ _id: req.query._id })
//       .populate("channels.person")
//       .exec(function (err, person) {
//         if (err) console.log("Error occured");
//         console.log("The object is :", person);
//         res.json({ info: person.channels });
//       });
//   }
// });

app.get("/api/getMessages", function (req, res) {
  NewChannel.findOne(
    { _id: mongoose.Types.ObjectId(req.query.id) },
    function (err, channel) {
      if (err) console.log("Error occured");
      console.log("Channel", channel);
      res.json({
        messageList: channel.messageList,
        unreadMessageList: channel.unreadMessageList,
      });
    },
  );
});

routes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error Handler
app.use(globalErrorHandler);

// ASSIGN PORT AND START SERVER
const port = process.env.PORT;
protocol.listen(port, () => {
  console.log(`Api is running on port ${port} - ${process.env.NODE_ENV}`);
});

io.on("connection", (socket) => {
  console.log("new client connected");
  socket.emit("connection", null);

  socket.on("connectMe", async (data) => {
    console.log("New Joining data is:", data);
    if (data.category === "student") {
      const student = await Student.findOne({ _id: data._id });
      student.channels.map((itemID) => {
        socket.join("foo" + itemID.chat);
        console.log("Checking for joining :", itemID.chat);
      });
    } else {
      const teacher = await Teacher.findOne({ _id: data._id });
      teacher.channels.map((itemID) => {
        socket.join("foo" + itemID.chat);
        console.log("Checking for joining :", itemID.chat);
      });
    }
  });

  socket.on("message", async (data) => {
    const newMsg = {
      text: data.text,
      username: data.username,
      Date: data.Date,
    };
    console.log("Before NewChannel", newMsg);
    try {
      // const result = await newMsg.save();
      NewChannel.findOne(
        { _id: mongoose.Types.ObjectId(data.channelId) },
        async (err, newMsgChannel) => {
          if (err) {
            console.log("Error occured message cannot be saved");
          } else {
            newMsgChannel.messageList.push(newMsg);
            newMsgChannel.unreadMessageList.push(newMsg);
            // if(newMsg.username !== data.from)
            //   newMsgChannel.unreadMessageList.push(newMsg);
            // else  newMsgChannel.unreadMessageList = [];
            console.log("Yes inside NewChannel");
            try {
              await newMsgChannel.save();
              io.to("foo" + data.channelId).emit("newMsg", data);
              console.log("newMsg2", data);
            } catch (err1) {
              console.log("Error occured", err1);
            }
          }
        },
      );
    } catch (err) {
      console.log("The message could not be saved");
    }

    // io.to("foo" + data.channelId).emit("newMsg", data);
  });
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

//heroku specific
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
