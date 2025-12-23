import { ApiError } from "../errors/index.js";

export const errorMiddleware = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors = [];
  let stack = err.stack;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors || [];
    stack = err.stack;
  }

  else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ID format for ${err.path}`;
    errors = [`Invalid parameter: ${err.path}`];
  }

  else if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Failed";
    errors = Object.values(err.errors).map(e => e.message);
  }

  else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue).join(", ");
    message = `Duplicate value for ${field}`;
    errors = [`${field} must be unique`];
  }

  else if (err.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Invalid JSON payload";
    errors = ["Request body must be valid JSON"];
  }

  const isProduction = process.env.NODE_ENV === "production";
  const isOperational =
    err instanceof ApiError && err.isOperational === true;

  if (!isOperational) {
    console.error("PROGRAMMING ERROR:", err);
  }

  if (isProduction) {
    if (statusCode === 500) {
      message = "An unexpected server error occurred.";
    }
    stack = undefined;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString(),
    ...(stack && { stack })
  });
};
