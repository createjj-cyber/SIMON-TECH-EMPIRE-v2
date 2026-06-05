import express from 'express';
import WebhookController from '../controllers/webhooks.js';
import { authenticate } from '../middleware/auth.js';
import { validateWebhookSignature } from '../middleware/webhook-validator.js';

const router = express.Router();

router.post('/incoming-message', validateWebhookSignature, WebhookController.handleIncomingMessage);
router.post('/message-status', validateWebhookSignature, WebhookController.handleMessageStatus);
router.post('/session-status', validateWebhookSignature, WebhookController.handleSessionStatus);
router.get('/verify/:token', WebhookController.verifyWebhook);

export default router;
