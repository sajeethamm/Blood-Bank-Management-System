// authRoutes.js
import express from 'express';
import { registerController, loginController, currentUserController } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register Route (POST)
router.post('/register', registerController);

// Login Route (POST)
router.post('/login', loginController);

// Current User Route (GET)
router.get('/current-user', authMiddleware, currentUserController);

// Export the router
export default router;
