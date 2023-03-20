import express from 'express';

import {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser
} from '../controllers/userController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';
import catchAsync from '../utils/catchASync.js';

const Router = express.Router();

Router.route('/')
  .post(catchAsync(registerUser))
  .get(catchAsync(protect), catchAsync(admin), catchAsync(getAllUsers));
Router.post('/login', catchAsync(authUser));
Router.route('/profile')
  .get(catchAsync(protect), catchAsync(getUserProfile))
  .put(catchAsync(protect), catchAsync(updateUserProfile));

Router.route('/:id')
  .get(catchAsync(protect), catchAsync(admin), catchAsync(getUserById))
  .put(catchAsync(protect), catchAsync(admin), catchAsync(updateUser))
  .delete(catchAsync(protect), catchAsync(admin), catchAsync(deleteUser));

export default Router;
