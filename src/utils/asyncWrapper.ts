import { Request, Response, NextFunction } from 'express';

/**
 * Wrapper for async route handlers to catch errors
 * Eliminates need for try-catch in every controller
 * 
 * Usage:
 * router.get('/users', asyncHandler(async (req, res) => {
 *   const users = await UserService.getAll();
 *   res.json(users);
 * }));
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};