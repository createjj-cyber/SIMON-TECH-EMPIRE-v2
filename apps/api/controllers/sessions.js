import Session from '../../../database/models/Session.js';
import logger from '../../../services/logger-service/index.js';

class SessionController {
  static async getAll(req, res, next) {
    try {
      const sessions = await Session.find({ userId: req.user.id });
      res.json({ success: true, data: sessions });
    } catch (error) {
      logger.error('Get sessions error:', error);
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { name, platform } = req.body;
      const session = new Session({
        userId: req.user.id,
        name,
        platform,
      });
      await session.save();
      logger.info(`Session created: ${session._id}`);
      res.status(201).json({ success: true, data: session });
    } catch (error) {
      logger.error('Create session error:', error);
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const session = await Session.findById(req.params.id);
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      res.json({ success: true, data: session });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const session = await Session.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      logger.info(`Session updated: ${session._id}`);
      res.json({ success: true, data: session });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const session = await Session.findByIdAndDelete(req.params.id);
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      logger.info(`Session deleted: ${session._id}`);
      res.json({ success: true, message: 'Session deleted' });
    } catch (error) {
      next(error);
    }
  }

  static async pairSession(req, res, next) {
    try {
      const session = await Session.findById(req.params.id);
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      session.status = 'paired';
      await session.save();
      logger.info(`Session paired: ${session._id}`);
      res.json({ success: true, message: 'Session paired' });
    } catch (error) {
      next(error);
    }
  }

  static async unpairSession(req, res, next) {
    try {
      const session = await Session.findById(req.params.id);
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      session.status = 'unpaired';
      await session.save();
      logger.info(`Session unpaired: ${session._id}`);
      res.json({ success: true, message: 'Session unpaired' });
    } catch (error) {
      next(error);
    }
  }

  static async getStatus(req, res, next) {
    try {
      const session = await Session.findById(req.params.id);
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      res.json({ success: true, data: { status: session.status } });
    } catch (error) {
      next(error);
    }
  }
}

export default SessionController;
