import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import logger from '../../services/logger-service/index.js';
import commandHandler from './handlers/command-handler.js';

const createWhatsAppClient = () => {
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
      args: ['--no-sandbox'],
    },
  });

  // QR Code Event
  client.on('qr', (qr) => {
    logger.info('📱 QR Code generated - Scan to authenticate');
  });

  // Authentication Success
  client.on('authenticated', () => {
    logger.info('✅ WhatsApp client authenticated successfully');
  });

  // Authentication Failure
  client.on('auth_failure', (msg) => {
    logger.error('❌ Authentication failed:', msg);
  });

  // Client Ready
  client.on('ready', () => {
    logger.info('🤖 WhatsApp bot is ready');
  });

  // Disconnected
  client.on('disconnected', (reason) => {
    logger.warn('⚠️  WhatsApp client disconnected:', reason);
  });

  // Message Handler
  client.on('message', async (message) => {
    try {
      const messageText = message.body.trim();
      const isCommand = messageText.startsWith('.');

      if (isCommand) {
        const commandName = messageText.split(' ')[0].substring(1).toLowerCase();
        const args = messageText.split(' ').slice(1);

        logger.info(`📝 Command: .${commandName}`);

        if (commandHandler[commandName]) {
          await commandHandler[commandName](message, args, client);
        } else {
          await message.reply('❌ Unknown command. Type .help for available commands');
        }
      }
    } catch (error) {
      logger.error('Message handling error:', error);
      message.reply('❌ Error processing message').catch(() => {});
    }
  });

  return client;
};

export default createWhatsAppClient;
