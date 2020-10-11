import express from 'express';

import {
  addOrderItems,
  getOrderById,
  markOrderPaid,
} from '../controllers/orderController.js';

import { protect } from '../middleware/authMiddleware.js';
import { validateId } from '../middleware/validateIdMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, validateId, getOrderById);
router.route('/:id/pay').put(protect, validateId, markOrderPaid);

export default router;
