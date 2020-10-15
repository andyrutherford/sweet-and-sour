import express from 'express';

import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopRated,
} from '../controllers/productController.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateId } from '../middleware/validateIdMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/top').get(getTopRated);
router.route('/:id').get(validateId, getProductById);
router.route('/:id/reviews').post(protect, validateId, createReview);

// Admin routes
router.route('/').post(protect, adminOnly, createProduct);
router.route('/:id').put(protect, adminOnly, validateId, updateProduct);
router.route('/:id').delete(protect, adminOnly, validateId, deleteProduct);

export default router;
