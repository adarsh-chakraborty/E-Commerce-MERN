import express from 'express';

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUserOrders,
  getOrders
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import catchAsync from '../utils/catchASync.js';

const Router = express.Router();

Router.route('/')
  .post(protect, catchAsync(addOrderItems))
  .get(catchAsync(protect), catchAsync(admin), catchAsync(getOrders));
Router.route('/myorders').get(protect, catchAsync(getUserOrders));
Router.route('/:id').get(protect, catchAsync(getOrderById));
Router.route('/:id/pay').put(protect, catchAsync(updateOrderToPaid));
Router.route('/:id/deliver').put(
  catchAsync(protect),
  catchAsync(admin),
  catchAsync(updateOrderToDelivered)
);

export default Router;
