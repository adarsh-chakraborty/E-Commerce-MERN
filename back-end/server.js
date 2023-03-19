import dotenv from 'dotenv';
if (!process.env.HEROKU) dotenv.config();
import express from 'express';
import colors from 'colors';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

import { errorMiddleware, notFound } from './middlewares/errorMiddleware.js';

connectDB();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use('*', notFound);
app.use(errorMiddleware);
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
