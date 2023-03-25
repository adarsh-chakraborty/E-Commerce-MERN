import express from 'express';

import {
  getAllProducts,
  getProductById
} from '../controllers/productController.js';
import catchAsync from '../utils/catchASync.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import {
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview
} from '../controllers/productController.js';

const Router = express.Router();

Router.route('/')
  .get(catchAsync(getAllProducts))
  .post(catchAsync(protect), catchAsync(admin), catchAsync(createProduct));
Router.route('/:id')
  .get(catchAsync(getProductById))
  .delete(catchAsync(protect), catchAsync(admin), catchAsync(deleteProduct))
  .put(catchAsync(protect), catchAsync(admin), catchAsync(updateProduct));

Router.route('/:id/reviews').post(
  catchAsync(protect),
  catchAsync(createProductReview)
);

export default Router;
