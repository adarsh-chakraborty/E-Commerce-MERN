class AppError extends Error {
  constructor(message, type, statusCode) {
    super(message);
    this.name = type;
    this.statusCode = statusCode;
  }
}

export default AppError;
