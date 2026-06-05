import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './users.js';
import sessionRoutes from './sessions.js';
import messageRoutes from './messages.js';
import webhookRoutes from './webhooks.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/sessions', sessionRoutes);
router.use('/messages', messageRoutes);
router.use('/webhooks', webhookRoutes);

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SIMON-TECH-EMPIRE API',
    version: '2.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      sessions: '/api/sessions',
      messages: '/api/messages',
      webhooks: '/api/webhooks',
    },
  });
});

export default router;
