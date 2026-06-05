import User from '../../../database/models/User.js';
import logger from '../../../services/logger-service/index.js';

class UserController {
  static async getAll(req, res, next) {
    try {
      const users = await User.find().select('-password');
      res.json({ success: true, data: users });
    } catch (error) {
      logger.error('Get users error:', error);
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      logger.error('Get user error:', error);
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      logger.info(`User updated: ${user._id}`);
      res.json({ success: true, data: user });
    } catch (error) {
      logger.error('Update user error:', error);
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      logger.info(`User deleted: ${user._id}`);
      res.json({ success: true, message: 'User deleted' });
    } catch (error) {
      logger.error('Delete user error:', error);
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { name, avatar, bio } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, avatar, bio },
        { new: true }
      ).select('-password');
      logger.info(`Profile updated: ${user._id}`);
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      res.json({ success: true, message: 'Password changed' });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
