import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

/**
 * HTTP request logger middleware
 * Logs all incoming requests with method, URL, status code, and response time
 */
export const httpLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();

  // Log when response finishes
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const message = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms - ${req.ip}`;

    // Log with appropriate level based on status code
    if (res.statusCode >= 500) {
      logger.error(message);
    } else if (res.statusCode >= 400) {
      logger.warn(message);
    } else {
      logger.http(message);
    }
  });

  next();
};