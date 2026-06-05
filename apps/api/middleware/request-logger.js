import logger from '../../../services/logger-service/index.js';

const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(
      `${req.method} ${req.path} - Status: ${res.statusCode} - Duration: ${duration}ms`
    );
  });

  next();
};

export default requestLogger;
