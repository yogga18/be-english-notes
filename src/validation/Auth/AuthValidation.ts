import { body } from 'express-validator';

export const validateRegister = [
  body('username')
    .isString()
    .isLength({
      min: 3,
    })
    .withMessage('Username minimal 3 karakter'),
  body('password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
    )
    .withMessage(
      'Password harus mengandung huruf besar, huruf kecil, angka, dan karakter spesial dan memiliki minimal 8 karakter'
    ),
  body('confirm_password').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password tidak sama');
    }
    return true;
  }),
  body('full_name')
    .isLength({ min: 3 })
    .withMessage('Nama lengkap minimal 3 karakter'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('phone_number')
    .isMobilePhone('id-ID')
    .withMessage('Nomor telepon tidak valid'),
];

export const validateLogin = [
  body('username')
    .isString()
    .isLength({
      min: 3,
    })
    .withMessage('Username minimal 3 karakter'),
  body('password')
    .isString()
    .isLength({
      min: 8,
    })
    .withMessage('Password minimal 8 karakter'),
];

export const validateLogout = [
  body('username')
    .isString()
    .isLength({
      min: 3,
    })
    .withMessage('Username minimal 3 karakter'),
];
