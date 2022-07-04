// err: AppError
const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'fail';

  res.status(statusCode).json({
    status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

module.exports = { globalErrorHandler };
