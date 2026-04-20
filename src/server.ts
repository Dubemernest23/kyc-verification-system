import dotenv from 'dotenv';
import app from './app';
import logger from './config/logger';

// Load environment variables
dotenv.config();
console.log(process.env.PORT)
const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
  try {
    logger.info(` KYC Verification Service started`);
    logger.info(` Server running on port ${PORT}`);
    logger.info(` Environment: ${process.env.NODE_ENV}`);
    logger.info(` API Version: ${process.env.API_VERSION}`); 
  } catch (error) {
    console.log(error)
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  setTimeout(() => {
    server.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });
  }, 1000);
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: Error) => {
  logger.error(`Unhandled Rejection: ${reason.message}`);
  logger.error(reason.stack || '');
  // process.exit(1);
});

export default server;