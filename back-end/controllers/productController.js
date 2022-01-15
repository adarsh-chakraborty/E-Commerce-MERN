import Product from '../models/Product.js';
import AppError from '../utils/AppError.js';

// @desc Fetch all Products
// @route GET /api/products
// @access Public
const getAllProducts = async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
};

// @desc Fetch a Single Product
// @route GET /api/:id
// @access Public
const getProductById = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);

  throw new AppError(
    "Product with that ID doesn't exist",
    'ProductNotFound',
    404
  );
};

export { getAllProducts, getProductById };
