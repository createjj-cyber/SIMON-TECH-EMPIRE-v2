import { Telegraf } from 'telegraf';
import logger from '../../services/logger-service/index.js';
import commandHandler from './handlers/command-handler.js';
import messageHandler from './handlers/message-handler.js';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Middleware
bot.use(async (ctx, next) => {
  const userId = ctx.from.id;
  const username = ctx.from.username || 'Anonymous';
  logger.info(`Telegram User: @${username} (${userId})`);
  await next();
});

// Command Handlers
bot.command('start', commandHandler.start);
bot.command('pair', commandHandler.pair);
bot.command('status', commandHandler.status);
bot.command('disconnect', commandHandler.disconnect);
bot.command('reconnect', commandHandler.reconnect);
bot.command('help', commandHandler.help);
bot.command('about', commandHandler.about);

// Message Handlers
bot.on('text', messageHandler.text);
bot.on('photo', messageHandler.photo);
bot.on('document', messageHandler.document);
bot.on('video', messageHandler.video);

// Callback Queries
bot.action(/.*/, (ctx) => {
  logger.info(`Action: ${ctx.match[0]}`);
  ctx.answerCbQuery();
});

// Error Handling
bot.catch((err, ctx) => {
  logger.error('Telegram Bot Error:', err);
  ctx.reply('❌ An error occurred. Please try again.').catch(() => {
    logger.error('Failed to send error message');
  });
});

// Launch Bot
export const startTelegramBot = async () => {
  try {
    await bot.launch();
    logger.info('✅ Telegram bot started successfully');
  } catch (error) {
    logger.error('❌ Failed to start Telegram bot:', error);
  }
};

export default bot;
