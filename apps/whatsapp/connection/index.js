import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import logger from '../../../services/logger-service/index.js';
import commandHandler from './handlers/command-handler.js';

const createWhatsAppClient = () => {
  const client = new Client({
    authStrategy: new LocalAuth(),
  });

  client.on('qr', (qr) => {
    logger.info('QR Code generated for pairing');
  });

  client.on('authenticated', () => {
    logger.info('WhatsApp client authenticated');
  });

  client.on('auth_failure', (msg) => {
    logger.error('Authentication failed:', msg);
  });

  client.on('disconnected', (reason) => {
    logger.info('Client disconnected:', reason);
  });

  client.on('message', async (message) => {
    try {
      const messageText = message.body;
      const isCommand = messageText.startsWith('.');
      
      if (isCommand) {
        const commandName = messageText.split(' ')[0].substring(1);
        const args = messageText.split(' ').slice(1);
        
        if (commandHandler[commandName]) {
          await commandHandler[commandName](message, args, client);
        }
      }
    } catch (error) {
      logger.error('Message handling error:', error);
    }
  });

  return client;
};

export default createWhatsAppClient;
