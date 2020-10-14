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

// @desc        Delete a product
// @route       DELETE /api/products/:id
// @access      ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let productToDelete = await Product.findById(id);
  if (!productToDelete) {
    res.status(404);
    throw new Error('Product does not exist.');
  } else {
    await productToDelete.remove();
    res.json({ message: 'Product deleted.' });
  }
});

// @desc        Create a product
// @route       POST /api/products/
// @access      PRIVATE
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample',
    price: 0,
    user: req.user._id,
    image: '/images/sample.png',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const newProduct = await product.save();
  res.status(201);
  res.json(newProduct);
});

// @desc        Update product
// @route       PUT /api/products/:id
// @access      PRIVATE
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log(req.body);
  if (req.body.price && req.body.price < 0) {
    res.status(422);
    throw new Error('The price cannot be a negative number.');
  }
  if (req.body.countInStock && req.body.countInStock < 0) {
    res.status(422);
    throw new Error('The count in stock cannot be a negative number.');
  }
  if (req.body.price && typeof req.body.price !== typeof 1) {
    res.status(422);
    throw new Error('The price must be a number.');
  }
  if (req.body.countInStock && typeof req.body.countInStock !== typeof 1) {
    res.status(422);
    throw new Error('The count in stock must be a number.');
  }
  console.log(product.price);
  if (product) {
    product.name = req.body.name || product.name;
    product.image = req.body.image || product.image;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;
    product.price = req.body.price
      ? (Math.round(req.body.price * 100) / 100).toFixed(2)
      : product.price;
    product.countInStock =
      Math.floor(req.body.countInStock) || product.countInStock;

    const updatedProduct = await product.save();
    res.json({
      _id: updatedProduct._id,
      name: updatedProduct.name,
      image: updatedProduct.image,
      brand: updatedProduct.brand,
      category: updatedProduct.category,
      description: updatedProduct.description,
      price: updatedProduct.price,
      countInStock: updatedProduct.countInStock,
    });
  } else {
    res.status(404);
    throw new Error('Product not found.');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
