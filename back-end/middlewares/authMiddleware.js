import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      console.log('token exists on request');
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET1);
      console.log(decoded);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (e) {
      throw new AppError(
        'Not Authorized, Invalid token',
        'AuthorizationError',
        401
      );
    }
  }
  if (!token) {
    throw new AppError(
      'Not Authorized, Missing Token',
      'AuthorizationError',
      422
    );
  }
};

export { protect };
