import { Telegraf } from 'telegraf';
import logger from '../../services/logger-service/index.js';
import commandHandler from './handlers/command-handler.js';
import messageHandler from './handlers/message-handler.js';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Middleware
bot.use(async (ctx, next) => {
  logger.info(`Telegram: ${ctx.update.update_id}`);
  await next();
});

// Commands
bot.command('start', commandHandler.start);
bot.command('pair', commandHandler.pair);
bot.command('status', commandHandler.status);
bot.command('disconnect', commandHandler.disconnect);
bot.command('reconnect', commandHandler.reconnect);
bot.command('help', commandHandler.help);
bot.command('about', commandHandler.about);

// Messages
bot.on('text', messageHandler.text);
bot.on('photo', messageHandler.photo);
bot.on('document', messageHandler.document);

// Callback Queries
bot.action(/.*/, (ctx) => {
  logger.info(`Action: ${ctx.match[0]}`);
  ctx.answerCbQuery();
});

// Error Handler
bot.catch((err, ctx) => {
  logger.error('Telegram Bot Error:', err);
  ctx.reply('An error occurred. Please try again.');
});

// Launch Bot
export const startTelegramBot = async () => {
  try {
    await bot.launch();
    logger.info('Telegram bot started');
  } catch (error) {
    logger.error('Failed to start Telegram bot:', error);
  }
};

export default bot;
