import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // maksimum 100 permintaan
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  //   skipSuccessfulRequests: true,
  //   skipFailedRequests: false,
  message: 'Too many requests from your IP, please try again later',
});

export const rateLimitMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  limiter(req, res, next);
};
