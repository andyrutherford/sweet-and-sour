import express from 'express';

import {
  getProducts,
  getProductById,
  deleteProduct,
} from '../controllers/productController.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateId } from '../middleware/validateIdMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(validateId, getProductById);

// Admin routes
router.route('/:id').delete(protect, adminOnly, validateId, deleteProduct);

export default router;
