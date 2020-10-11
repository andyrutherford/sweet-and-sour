import express from 'express';

import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';
import { validateId } from '../middleware/validateIdMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(validateId, getProductById);

export default router;
