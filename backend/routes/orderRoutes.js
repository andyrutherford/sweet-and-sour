import express from 'express';

import {
  addOrderItems,
  getOrderById,
  markOrderPaid,
  markOrderDelivered,
  getMyOrders,
  getAllOrders,
} from '../controllers/orderController.js';

import { protect } from '../middleware/authMiddleware.js';
import { validateId } from '../middleware/validateIdMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/my-orders').get(protect, getMyOrders);
router.route('/:id').get(protect, validateId, getOrderById);
router.route('/:id/pay').put(protect, validateId, markOrderPaid);
router
  .route('/:id/deliver')
  .put(protect, validateId, adminOnly, markOrderDelivered);

// Admin routes
router.route('/').get(protect, adminOnly, getAllOrders);

export default router;
