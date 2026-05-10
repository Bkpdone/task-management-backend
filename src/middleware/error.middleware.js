const ApiError = require("../utils/ApiError");

const errorHandler = (err, _req, res, _next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";
    error = new ApiError(statusCode, message, error.errors || []);
  }

  if (process.env.NODE_ENV !== "production") {
    console.error("[Error]", err);
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors,
  });
};

module.exports = errorHandler;
