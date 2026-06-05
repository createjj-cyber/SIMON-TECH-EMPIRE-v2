import express from 'express';
import UserController from '../controllers/users.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, UserController.getAll);
router.get('/:id', authenticate, UserController.getById);
router.put('/:id', authenticate, UserController.update);
router.delete('/:id', authenticate, UserController.delete);
router.get('/:id/profile', authenticate, UserController.getProfile);
router.put('/:id/profile', authenticate, UserController.updateProfile);
router.post('/:id/change-password', authenticate, UserController.changePassword);

export default router;
