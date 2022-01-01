import dotenv from 'dotenv';
if (!process.env.HEROKU) dotenv.config();
import express from 'express';
import colors from 'colors';

import connectDB from './config/db.js';
import products from './data/products.js';

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
  res.send('API is running');
});

app.get('/api/products', (req, res, next) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res, next) => {
  const product = products.find((p) => p._id === req.params.id);
  if (product) return res.json(product);

  res.status(404).json({
    message: `No product exist with Id: ${req.params.id}`,
    status: 404
  });
});

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
