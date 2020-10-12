import express from 'express';

import {
  authUser,
  getUserProfile,
  createUser,
  updateUserProfile,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateId } from '../middleware/validateIdMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/').post(createUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);

// Admin routes
router.route('/').get(protect, adminOnly, getAllUsers);
router.route('/:id').delete(protect, adminOnly, validateId, deleteUser);
router.route('/:id').get(protect, adminOnly, validateId, getUserById);
router.route('/:id').put(protect, adminOnly, validateId, updateUser);

export default router;
