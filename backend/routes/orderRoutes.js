import express from 'express';

import {
  addOrderItems,
  getOrderById,
  markOrderPaid,
  getMyOrders,
} from '../controllers/orderController.js';

import { protect } from '../middleware/authMiddleware.js';
import { validateId } from '../middleware/validateIdMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/my-orders').get(protect, getMyOrders);
router.route('/:id').get(protect, validateId, getOrderById);
router.route('/:id/pay').put(protect, validateId, markOrderPaid);

export default router;
