const passport = require('../config/passport');
import { Request, Response, NextFunction } from 'express';
import { getUser } from '../_helpers';

export function authenticated(req: Request, res: Response, next: NextFunction){
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if (err || !user) return res.status(401).json({ status: 'error', message: 'unauthorized' });
    req.user = user;
    next();
  })(req, res, next);
}

export function authenticatedOwner(req: Request, res: Response, next: NextFunction) {
  if (getUser(req) && (getUser(req).role === 'owner')) return next();
  return res.status(403).json({ status: 'error', message: 'permission denied' });
}

export function authenticatedUser(req: Request, res: Response, next: NextFunction) {
  if (getUser(req) && (getUser(req).role === 'user')) return next();
  return res.status(403).json({ status: 'error', message: 'permission denied' });
}

