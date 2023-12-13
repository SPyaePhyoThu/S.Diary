const AppError = require("../util/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: ${value} , please use another name `;
  return new AppError(message, 500);
};

const handleValidationErrDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data . ${errors.join(".")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token,Please log in again", 401);

const handleTokenExpError = () =>
  new AppError("Token has expired , please log in again", 401);

const sendError = (error, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    res.status(error.statusCode).json({
      status: error.status,
      error: error,
      message: error.message,
      stack: error.stack,
    });
  } else
    res.status(error.statusCode).render("error", {
      title: "Something went worng",
      msg: error.message,
    });
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  let err = { ...error };
  err.message = error.message;
  if (error.name === "CastError") err = handleCastErrorDB(err);
  if (error.code === 11000) err = handleDuplicateFieldsDB(err);
  if (error.name === "ValidationError") err = handleValidationErrDB(err);
  if (err.name === "JsonWebTokenError") err = handleJWTError();
  if (err.name === "TokenExpiredError") err = handleTokenExpError();

  sendError(err, req, res);
  //   }
};
