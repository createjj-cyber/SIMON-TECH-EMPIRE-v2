import logger from '../../../services/logger-service/index.js';

const messageHandler = {
  text: async (ctx) => {
    try {
      const message = ctx.message.text;
      logger.info(`Text message: ${message}`);
      await ctx.reply(`You said: ${message}`);
    } catch (error) {
      logger.error('Text message handler error:', error);
    }
  },

  photo: async (ctx) => {
    try {
      const photo = ctx.message.photo;
      logger.info(`Photo received: ${photo[photo.length - 1].file_id}`);
      await ctx.reply('📸 Photo received and saved!');
    } catch (error) {
      logger.error('Photo message handler error:', error);
    }
  },

  document: async (ctx) => {
    try {
      const document = ctx.message.document;
      logger.info(`Document received: ${document.file_id}`);
      await ctx.reply('📄 Document received and saved!');
    } catch (error) {
      logger.error('Document message handler error:', error);
    }
  },
};

export default messageHandler;
