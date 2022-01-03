const errorMiddleware = (err, req, res, next) => {
  res.status(500).json({ message: 'Internal server error', status: 500 });
  console.log(err);
};

const notFound = (req, res, next) => {
  res.status(404).json({ message: 'Resource Not Found', status: 404 });
};

export { errorMiddleware, notFound };
