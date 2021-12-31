const express = require('express');

const products = require('./data/products');

const app = express();

app.get('/', (req, res, next) => {
  res.send('API is running');
});

app.get('/api/products', (req, res, next) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res, next) => {
  const product = products.find((p) => p._id === req.params.id);
  if (product) return res.json(product);

  res
    .status(404)
    .json({ message: 'Product not found with the ID', status: 404 });
});

app.listen(5000, console.log('Server is running on port: 5000'));
