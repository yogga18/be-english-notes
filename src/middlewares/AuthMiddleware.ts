import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      success: false,
      message: 'Unauthorized',
    });
  }

  let secretKey: string = process.env.JWT_SERCRET || 'secret';
  let token: string = req.headers.authorization.split(' ')[1];

  try {
    const credential: string | object = jwt.verify(token, secretKey);

    if (credential) {
      req.app.locals.credential = credential;
      return next();
    }

    if (!credential) {
      return res.status(401).send({
        success: false,
        message: 'Token invalid',
      });
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: error,
    });
  }
};
