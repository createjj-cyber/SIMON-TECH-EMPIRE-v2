import express from 'express';
import MessageController from '../controllers/messages.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, MessageController.getAll);
router.post('/send', authenticate, MessageController.send);
router.post('/broadcast', authenticate, MessageController.broadcast);
router.get('/:id', authenticate, MessageController.getById);
router.put('/:id', authenticate, MessageController.update);
router.delete('/:id', authenticate, MessageController.delete);
router.post('/:id/retry', authenticate, MessageController.retry);
router.get('/session/:sessionId/history', authenticate, MessageController.getHistory);

export default router;
