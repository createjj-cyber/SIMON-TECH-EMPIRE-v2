import logger from '../../../services/logger-service/index.js';

const errorHandler = (err, req, res, next) => {
  logger.error('Error:', err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    status,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
