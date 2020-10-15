import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc        Fetch all products
// @route       GET /api/products
// @access      PUBLIC
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const query = req.query.query
    ? {
        name: {
          $regex: req.query.query,
          $options: 'i',
        },
      }
    : {};
  const count = await Product.countDocuments({ ...query });
  const products = await Product.find({ ...query })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// @desc        Create a review
// @route       POST /api/products/:id/reviews
// @access      PRIVATE
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    res.status(400);
    res.json({ message: 'A rating and comment is required.' });
  }
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You have already reviewed this product.');
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, i) => i.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201);
    res.json({ message: 'Review added' });
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
  createReview,
};
