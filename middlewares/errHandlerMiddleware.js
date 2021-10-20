import AppError from '../errors/appError';

function errorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (err instanceof AppError) {
    console.error(err.stack);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error(err.stack);
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
}

module.exports = errorHandler;
