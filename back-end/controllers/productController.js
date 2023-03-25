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
  // Check if the ID is valid Mongoose ID
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);

  throw new AppError(
    "Product with that ID doesn't exist",
    'ProductNotFound',
    404
  );
};

const deleteProduct = async (req, res, next) => {
  // Check if the ID is valid Mongoose ID
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    return res.json({ message: 'Product removed' });
  }

  throw new AppError(
    "Product with that ID doesn't exist",
    'ProductNotFound',
    404
  );
};

const createProduct = async (req, res, next) => {
  // Check if the ID is valid Mongoose ID
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

const updateProduct = async (req, res, next) => {
  // Check if the ID is valid Mongoose ID

  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError(
      "Product with that ID doesn't exist",
      'ProductNotFound',
      404
    );
  }
  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
};
export {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct
};
