import dotenv from 'dotenv';
if (!process.env.HEROKU) dotenv.config();
import express from 'express';
import path from 'path';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import colors from 'colors';
import morgan from 'morgan';
import { errorMiddleware, notFound } from './middlewares/errorMiddleware.js';

connectDB();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === 'production') {
  // SPA : Single Page Application Setuo
  app.use(express.static(path.join(path.resolve(), '/front-end/build')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(path.resolve(), 'front-end', 'build', 'index.html')
    );
  });
}

app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));
// Not found and Error Middleware
app.use(notFound);
app.use(errorMiddleware);
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
