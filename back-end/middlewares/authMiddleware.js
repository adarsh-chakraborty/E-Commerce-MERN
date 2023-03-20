import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new AppError('Not Authorized, Admin Only', 'AuthorizationError', 401);
  }
};

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
      const currentUser = await User.findById(decoded.id).select('-password');
      if (!currentUser) {
        next(new AppError('User not found', 'UserNotFound', 404));
      }
      req.user = currentUser;
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

export { protect, admin };
