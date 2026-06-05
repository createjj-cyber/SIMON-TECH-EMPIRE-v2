import logger from '../../../services/logger-service/index.js';

class WebhookController {
  static async handleIncomingMessage(req, res, next) {
    try {
      const { sessionId, from, content, timestamp } = req.body;
      logger.info(`Incoming message from ${from}`);
      res.json({ success: true, message: 'Message received' });
    } catch (error) {
      logger.error('Webhook error:', error);
      next(error);
    }
  }

  static async handleMessageStatus(req, res, next) {
    try {
      const { messageId, status } = req.body;
      logger.info(`Message status update: ${messageId} - ${status}`);
      res.json({ success: true, message: 'Status updated' });
    } catch (error) {
      next(error);
    }
  }

  static async handleSessionStatus(req, res, next) {
    try {
      const { sessionId, status } = req.body;
      logger.info(`Session status update: ${sessionId} - ${status}`);
      res.json({ success: true, message: 'Status updated' });
    } catch (error) {
      next(error);
    }
  }

  static async verifyWebhook(req, res, next) {
    try {
      const { token } = req.params;
      res.json({ success: true, message: 'Webhook verified' });
    } catch (error) {
      next(error);
    }
  }
}

export default WebhookController;
