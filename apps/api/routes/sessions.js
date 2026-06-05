import express from 'express';
import SessionController from '../controllers/sessions.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, SessionController.getAll);
router.post('/', authenticate, SessionController.create);
router.get('/:id', authenticate, SessionController.getById);
router.put('/:id', authenticate, SessionController.update);
router.delete('/:id', authenticate, SessionController.delete);
router.post('/:id/pair', authenticate, SessionController.pairSession);
router.post('/:id/unpair', authenticate, SessionController.unpairSession);
router.get('/:id/status', authenticate, SessionController.getStatus);

export default router;
