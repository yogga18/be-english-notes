import AuthControllers from '../../contollers/Auth/AuthControllers';
import { rateLimitMiddleware } from '../../middlewares/RateLimitMiddleware';
import BaseRoute from '../BaseRoute';
import { handleValidationErrors } from '../../utils/expressValidator';
import {
  validateLogin,
  validateLogout,
  validateRegister,
} from '../../validation/Auth/AuthValidation';

class AuthRoutes extends BaseRoute {
  public routers(): void {
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
    this.router.post(
      '/login',
      rateLimitMiddleware,
      validateLogin,
      handleValidationErrors,
      AuthControllers.login
    );

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
    this.router.post(
      '/register',
      rateLimitMiddleware,
      validateRegister,
      handleValidationErrors,
      AuthControllers.register
    );

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
    this.router.post(
      '/logout',
      rateLimitMiddleware,
      validateLogout,
      handleValidationErrors,
      AuthControllers.logout
    );
  }
}

export default new AuthRoutes().router;
