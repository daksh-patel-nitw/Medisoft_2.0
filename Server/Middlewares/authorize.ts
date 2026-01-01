import { Request, Response, NextFunction } from 'express';
import { forbiddenError } from '../Errors/BaseError';

/**
 * Authorization middleware factory.
 * Restricts access to a route based on user roles.
 * Requires `req.currentUser` to be set by a prior authentication middleware.
 * Throws a forbidden error if the user's role is not allowed.
 *
 * @param allowedRoles - List of roles permitted to access the route
 */

export const authorize = (...allowedRoles: string[]) => {

  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser || !allowedRoles.includes(req.currentUser.role)) {
      throw forbiddenError('Action not Permitted.', true);
    }

    next();
  };
};