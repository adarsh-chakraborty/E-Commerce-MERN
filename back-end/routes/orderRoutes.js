import express from 'express';

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid
} from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';
import catchAsync from '../utils/catchASync.js';

const Router = express.Router();

Router.route('/').post(protect, catchAsync(addOrderItems));
Router.route('/:id').get(protect, catchAsync(getOrderById));
Router.route('/:id/pay').put(protect, catchAsync(updateOrderToPaid));

export default Router;
