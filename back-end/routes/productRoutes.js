import express from 'express';
import Product from '../models/Product.js';
const Router = express.Router();

// @desc Fetch all Products
// @route GET /api/products
// @access Public
Router.get('/', async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Fetch a Single Product
// @route GET /api/:id
// @access Public
Router.get('/:id', async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);

  res.status(404).json({
    message: `No product exist with Id: ${req.params.id}`,
    status: 404
  });
});

export default Router;
