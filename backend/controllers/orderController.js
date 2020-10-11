import mongoose from 'mongoose';
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

// @desc        Mark order as paid
// @route       POST /api/orders/:id/pay
// @access      PRIVATE
const markOrderPaid = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let order = await Order.findById(id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  } else if (req.user._id.toString() === order.user._id.toString()) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();

    return res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export { addOrderItems, getOrderById, markOrderPaid };
