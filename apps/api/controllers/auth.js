import User from '../../../database/models/User.js';
import { generateToken } from '../../../services/auth-service/jwt.js';
import { hashPassword, comparePassword } from '../../../services/auth-service/password.js';
import logger from '../../../services/logger-service/index.js';

class AuthController {
  static async register(req, res, next) {
    try {
      const { email, password, name } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await hashPassword(password);
      const user = new User({
        email,
        password: hashedPassword,
        name,
      });

      await user.save();

      const token = generateToken(user._id);
      logger.info(`User registered: ${email}`);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      logger.error('Registration error:', error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user._id);
      logger.info(`User logged in: ${email}`);

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      logger.error('Login error:', error);
      next(error);
    }
  }

  static async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      res.json({ message: 'Token refreshed' });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      logger.info('User logged out');
      res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      res.json({ message: 'Password reset email sent' });
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { token, password } = req.body;
      res.json({ message: 'Password reset successful' });
    } catch (error) {
      next(error);
    }
  }

  static async verifyEmail(req, res, next) {
    try {
      const { token } = req.body;
      res.json({ message: 'Email verified' });
    } catch (error) {
      next(error);
    }
  }

  static async resendVerification(req, res, next) {
    try {
      const { email } = req.body;
      res.json({ message: 'Verification email sent' });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
