import { Request, Response, NextFunction } from "express";

export function apiErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    status: 'error',
    message: err.message
  });
}
