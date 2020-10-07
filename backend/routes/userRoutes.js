import express from 'express';

import {
  authUser,
  getUserProfile,
  createUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(createUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;