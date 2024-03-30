"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthControllers_1 = __importDefault(require("../../contollers/Auth/AuthControllers"));
const RateLimitMiddleware_1 = require("../../middlewares/RateLimitMiddleware");
const BaseRoute_1 = __importDefault(require("../BaseRoute"));
const expressValidator_1 = require("../../utils/expressValidator");
const AuthValidation_1 = require("../../validation/Auth/AuthValidation");
class AuthRoutes extends BaseRoute_1.default {
    routers() {
        /**
         * @swagger
         * /login:
         *   post:
         *     summary: Endpoint untuk login
         *     description: Melakukan proses login.
         *     tags:
         *       - Auth
         *     parameters:
         *       - name: body
         *         in: body
         *         description: Data login pengguna
         *         required: true
         *         schema:
         *           type: object
         *           properties:
         *             username:
         *               type: string
         *             password:
         *               type: string
         *     responses:
         *       200:
         *         description: Login berhasil
         *       429:
         *         description: Terlalu banyak percobaan login
         */
        this.router.post('/login', RateLimitMiddleware_1.rateLimitMiddleware, AuthValidation_1.validateLogin, expressValidator_1.handleValidationErrors, AuthControllers_1.default.login);
        /**
         * @swagger
         * /register:
         *   post:
         *     summary: Endpoint untuk Registrasi pengguna
         *     description: Melakukan proses registrasi.
         *     tags:
         *       - Auth
         *     parameters:
         *       - name: body
         *         in: body
         *         description: Data Registrasi pengguna
         *         required: true
         *         schema:
         *           type: object
         *           properties:
         *             username:
         *               type: string
         *             password:
         *               type: string
         *             is_login:
         *              type: string
         *             full_name:
         *              type: string
         *             gender:
         *              type: string
         *             b_day:
         *              type: string
         *     responses:
         *       200:
         *         description: Login berhasil
         *       429:
         *         description: Terlalu banyak percobaan login
         */
        this.router.post('/register', RateLimitMiddleware_1.rateLimitMiddleware, AuthValidation_1.validateRegister, expressValidator_1.handleValidationErrors, AuthControllers_1.default.register);
        /**
         * @swagger
         * /logout:
         *   post:
         *     summary: Endpoint untuk logout
         *     description: Melakukan proses logout.
         *     tags:
         *       - Auth
         *     parameters:
         *       - name: body
         *         in: body
         *         description: Data logout pengguna
         *         required: true
         *         schema:
         *           type: object
         *           properties:
         *             username:
         *               type: string
         *     responses:
         *       200:
         *         description: Logout berhasil
         *       401:
         *         description: Token tidak valid
         */
        this.router.post('/logout', RateLimitMiddleware_1.rateLimitMiddleware, AuthValidation_1.validateLogout, expressValidator_1.handleValidationErrors, AuthControllers_1.default.logout);
    }
}
exports.default = new AuthRoutes().router;
