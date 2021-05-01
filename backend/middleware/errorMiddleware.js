const notFound = (req, res, next) => {
  const error = new Error(` Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // Change status
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    // only in developing mode
    stack: process.env.NODE_ENV == "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
