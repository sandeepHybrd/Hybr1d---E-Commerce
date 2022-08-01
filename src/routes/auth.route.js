import express from 'express';
import { authController } from '../controllers/index.js';
import { authMiddleware } from '../middlewares/index.js';
const router = express.Router();

router.route('/ping').get(authMiddleware.verifyToken, authController.authPing);
router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

export const authRoutes = router;
