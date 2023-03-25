import Order from '../models/Order.js';
import AppError from '../utils/AppError.js';

// To do wrap all controller functions in catchAsync

const addOrderItems = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    throw new AppError('No order items', 'BadRequest', 400);
  }

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

const getOrderById = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    return res.json(order);
  }

  throw new AppError('Order not found', 'NotFound', 404);
};

const updateOrderToPaid = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    };

    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  }

  throw new AppError('Order not found', 'NotFound', 404);
};

const getUserOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
};

const getOrders = async (req, res, next) => {
  const orders = await Order.find().populate('user', 'id name');
  res.json(orders);
};

const updateOrderToDelivered = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  }

  throw new AppError('Order not found', 'NotFound', 404);
};

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUserOrders,
  getOrders
};
