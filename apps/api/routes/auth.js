import express from 'express';
import AuthController from '../controllers/auth.js';
import { validateRequest } from '../middleware/validators.js';

const router = express.Router();

router.post('/register', validateRequest, AuthController.register);
router.post('/login', validateRequest, AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', AuthController.logout);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post('/verify-email', AuthController.verifyEmail);
router.post('/resend-verification', AuthController.resendVerification);

export default router;
