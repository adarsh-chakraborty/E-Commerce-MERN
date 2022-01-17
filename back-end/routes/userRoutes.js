import express from 'express';

import {
  authUser,
  getUserProfile,
  putUserProfile,
  registerUser
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import catchAsync from '../utils/catchASync.js';

const Router = express.Router();

Router.route('/').post(catchAsync(registerUser));
Router.post('/login', catchAsync(authUser));
Router.route('/profile')
  .get(catchAsync(protect), catchAsync(getUserProfile))
  .put(catchAsync(protect), catchAsync(putUserProfile));

export default Router;
