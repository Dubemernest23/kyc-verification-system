import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/error';
import logger from '../config/logger';

/**
 * Centralized error handling middleware
 * Must be the last middleware in the stack
 */

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Default error values
  let statusCode = 500;
  let message = 'Internal server error';
  // var isOperational = false;

  // Check if it's an AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    // isOperational = err.isOperational;
  }

  // Log error
  const errorLog = {
    message: err.message,
    stack: err.stack,
    statusCode,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userId: (req as any).user?.userId || 'anonymous',
  };

  if (statusCode >= 500) {
    logger.error(`ERROR: ${JSON.stringify(errorLog, null, 2)}`);
  } else {
    logger.warn(`WARNING: ${JSON.stringify(errorLog, null, 2)}`);
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack,
        statusCode,
      }),
    },
  });
};

/**
 * Catch-all for 404 errors
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};