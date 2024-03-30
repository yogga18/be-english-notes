"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogout = exports.validateLogin = exports.validateRegister = void 0;
const express_validator_1 = require("express-validator");
exports.validateRegister = [
    (0, express_validator_1.body)('username')
        .isString()
        .isLength({
        min: 3,
    })
        .withMessage('Username minimal 3 karakter'),
    (0, express_validator_1.body)('password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)
        .withMessage('Password harus mengandung huruf besar, huruf kecil, angka, dan karakter spesial dan memiliki minimal 8 karakter'),
    (0, express_validator_1.body)('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password tidak sama');
        }
        return true;
    }),
    (0, express_validator_1.body)('full_name')
        .isLength({ min: 3 })
        .withMessage('Nama lengkap minimal 3 karakter'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Email tidak valid'),
    (0, express_validator_1.body)('phone_number')
        .isMobilePhone('id-ID')
        .withMessage('Nomor telepon tidak valid'),
];
exports.validateLogin = [
    (0, express_validator_1.body)('username')
        .isString()
        .isLength({
        min: 3,
    })
        .withMessage('Username minimal 3 karakter'),
    (0, express_validator_1.body)('password')
        .isString()
        .isLength({
        min: 8,
    })
        .withMessage('Password minimal 8 karakter'),
];
exports.validateLogout = [
    (0, express_validator_1.body)('username')
        .isString()
        .isLength({
        min: 3,
    })
        .withMessage('Username minimal 3 karakter'),
];
