import AppError from '../utils/AppError.js';

const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, type: err.name, status: err.statusCode });
  }

  res.status(500).json({
    message: 'Internal server error',
    type: 'InternalError',
    status: 500
  });
};

const notFound = (req, res, next) => {
  res.status(404).json({ message: 'Resource Not Found', status: 404 });
};

export { errorMiddleware, notFound };
