import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc        Fetch all products
// @route       GET /api/products
// @access      PUBLIC
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc        Fetch a product by id
// @route       GET /api/products/:id
// @access      PUBLIC
const getProductById = asyncHandler(async (req, res) => {
  // Validate objectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid product ID.');
  }
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found.');
  }
});

export { getProducts, getProductById };
