import express from 'express';

import {
  getAllProducts,
  getProductById
} from '../controllers/productController.js';
import catchAsync from '../utils/catchASync.js';

const Router = express.Router();

Router.route('/').get(catchAsync(getAllProducts));
Router.route('/:id').get(catchAsync(getProductById));

export default Router;
