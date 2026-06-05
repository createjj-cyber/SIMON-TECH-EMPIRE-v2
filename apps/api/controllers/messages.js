import Message from '../../../database/models/Message.js';
import logger from '../../../services/logger-service/index.js';

class MessageController {
  static async getAll(req, res, next) {
    try {
      const messages = await Message.find().limit(100);
      res.json({ success: true, data: messages });
    } catch (error) {
      logger.error('Get messages error:', error);
      next(error);
    }
  }

  static async send(req, res, next) {
    try {
      const { sessionId, to, content, media } = req.body;
      const message = new Message({
        sessionId,
        to,
        content,
        media,
        status: 'pending',
      });
      await message.save();
      logger.info(`Message sent: ${message._id}`);
      res.status(201).json({ success: true, data: message });
    } catch (error) {
      logger.error('Send message error:', error);
      next(error);
    }
  }

  static async broadcast(req, res, next) {
    try {
      const { sessionId, recipients, content } = req.body;
      res.json({ success: true, message: 'Broadcast initiated' });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const message = await Message.findById(req.params.id);
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
      res.json({ success: true, data: message });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const message = await Message.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
      logger.info(`Message updated: ${message._id}`);
      res.json({ success: true, data: message });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const message = await Message.findByIdAndDelete(req.params.id);
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
      logger.info(`Message deleted: ${message._id}`);
      res.json({ success: true, message: 'Message deleted' });
    } catch (error) {
      next(error);
    }
  }

  static async retry(req, res, next) {
    try {
      const message = await Message.findById(req.params.id);
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
      message.status = 'pending';
      await message.save();
      logger.info(`Message retry: ${message._id}`);
      res.json({ success: true, message: 'Message queued for retry' });
    } catch (error) {
      next(error);
    }
  }

  static async getHistory(req, res, next) {
    try {
      const messages = await Message.find(
        { sessionId: req.params.sessionId }
      ).sort({ createdAt: -1 });
      res.json({ success: true, data: messages });
    } catch (error) {
      next(error);
    }
  }
}

export default MessageController;
