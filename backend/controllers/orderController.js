import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc        Create an order
// @route       POST /api/orders
// @access      PRIVATE
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc        Get order by id
// @route       POST /api/orders/:id
// @access      PRIVATE
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let order = await Order.findById(id).populate('user', 'name email');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  } else if (
    req.user.isAdmin ||
    req.user._id.toString() === order.user._id.toString()
  ) {
    return res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export { addOrderItems, getOrderById };
