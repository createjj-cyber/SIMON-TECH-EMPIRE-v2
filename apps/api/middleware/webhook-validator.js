import crypto from 'crypto';
import logger from '../../../services/logger-service/index.js';

export const validateWebhookSignature = (req, res, next) => {
  try {
    const signature = req.headers['x-webhook-signature'];
    const timestamp = req.headers['x-webhook-timestamp'];

    if (!signature || !timestamp) {
      return res.status(401).json({ message: 'Invalid webhook' });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (Math.abs(currentTime - parseInt(timestamp)) > 300) {
      return res.status(401).json({ message: 'Request expired' });
    }

    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', process.env.WEBHOOK_SECRET)
      .update(`${timestamp}.${body}`)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(401).json({ message: 'Invalid signature' });
    }

    next();
  } catch (error) {
    logger.error('Webhook validation error:', error);
    res.status(500).json({ message: 'Validation failed' });
  }
};
