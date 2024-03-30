import { Response, Request, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

const validate = [
  check('username').isString(),
  check('password').isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        message: errors.array(),
      });
    }

    return next();
  },
];

export default validate;
