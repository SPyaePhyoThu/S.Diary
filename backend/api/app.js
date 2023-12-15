const express = require("express");
const cors = require("cors");
const pcors = require("permissive-cors");
const path = require("path");
const diaryRoutes = require("./routes/diariesRoutes");
const userRoutes = require("./routes/userRoutes");
const globalErrorHandler = require("./controller/errorController");
const rateLimit = require("express-rate-limit");
const AppError = require("./util/appError");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const xss = require("xss-clean");

//express app
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, ".", "views"));

app.use(cors());
app.use(pcors());

app.options("*", cors());

//serving static files from the backend
app.use("/static", express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//trust the first hop
app.set("trust proxy", 1);

// limiting api request
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP , please try again in an hour!",
});
app.use("/api", limiter);

// app.get("/api/v1/user/resetPasswordPage/:resetToken", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "ResetPasswordPage.html"));
// });

//body parser
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(compression());

//data sanitization against noSQL query injection
app.use(mongoSanitize());
//Data sanitization against XSS
app.use(xss());

//routes
app.use("/api/v1/diary", diaryRoutes);
app.use("/api/v1/user", userRoutes);
app.get("/api/v1/userphoto/:filename", (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, "../public/img/users", filename));
});

//favicon
app.use(function (req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
    return res.sendStatus(204);
  }

  next();
});

//error for unknown routes
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Cant find ${req.originalUrl} on this server!`,
  // });
  // const err = new Error(`Cant find ${req.originalUrl} on this server!`);
  // err.status = "fail";
  // err.statusCode = 404;

  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
