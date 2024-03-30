"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotesControllers_1 = __importDefault(require("../../contollers/Notes/NotesControllers"));
const AuthMiddleware_1 = require("../../middlewares/AuthMiddleware");
const RateLimitMiddleware_1 = require("../../middlewares/RateLimitMiddleware");
const expressValidator_1 = require("../../utils/expressValidator");
const Notes_1 = require("../../validation/Notes");
const BaseRoute_1 = __importDefault(require("../BaseRoute"));
class NotesRoutes extends BaseRoute_1.default {
    routers() {
        /**
         * @swagger
         * /get-all-notes/:id_user:
         *   get:
         *     summary: Endpoint untuk get all notes
         *     description: Melakukan pengambilan seluruh data notes by user yang sedang login.
         *     tags:
         *       - Notes
         *     responses:
         *       200:
         *         description: Login berhasil
         *       429:
         *         description: Terlalu banyak percobaan login
         */
        this.router.get('/get-all-notes/:id_user', RateLimitMiddleware_1.rateLimitMiddleware, AuthMiddleware_1.auth, Notes_1.validateGetAllNotes, expressValidator_1.handleValidationErrors, NotesControllers_1.default.index);
        /**
         * @swagger
         * /get-note-by-id/:id_note/:id_user:
         *   get:
         *     summary: Endpoint untuk get note by
         *     description: Melakukan pengambilan data note by id dan id user yang sedang login.
         *     tags:
         *       - Notes
         *     responses:
         *       200:
         *         description: Login berhasil
         *       429:
         *         description: Terlalu banyak percobaan login
         */
        this.router.get('/get-note-by-id/:id_note/:id_user', RateLimitMiddleware_1.rateLimitMiddleware, AuthMiddleware_1.auth, Notes_1.validationGetNoteById, expressValidator_1.handleValidationErrors, NotesControllers_1.default.show);
        /**
         * @swagger
         * /create-note/:id_user:
         *   post:
         *     summary: Endpoint untuk membuat note
         *     description: Membuat catatan note by user yang login.
         *     tags:
         *       - Notes
         *     parameters:
         *       - name: body
         *         in: body
         *         description: Data login pengguna
         *         required: true
         *         schema:
         *           type: object
         *           properties:
         *             title:
         *               type: string
         *             terjemahan:
         *               type: string
         *             word:
         *               type: string
         *     responses:
         *       200:
         *         description: Login berhasil
         *       429:
         *         description: Terlalu banyak percobaan login
         */
        this.router.post('/create-note/:id_user', RateLimitMiddleware_1.rateLimitMiddleware, AuthMiddleware_1.auth, Notes_1.validationCreateNote, expressValidator_1.handleValidationErrors, NotesControllers_1.default.create);
        /**
         * @swagger
         * /delete-note/{id_user}/{id_note}:
         *   delete:
         *     summary: Endpoint untuk delete note by id pencatatan_keuangan && by id user
         *     description: Melakukan penghapusan dana note user yang sedang login.
         *     tags:
         *       - Notes
         *     parameters:
         *      - name: id_user
         *      - name: id_pencatatan_keuangan
         *     responses:
         *       200:
         *         description: Login berhasil
         *       429:
         *         description: Terlalu banyak percobaan login
         */
        this.router.delete('/delete-note/:id_user/:id_note', RateLimitMiddleware_1.rateLimitMiddleware, AuthMiddleware_1.auth, Notes_1.validationDeleteNote, expressValidator_1.handleValidationErrors, NotesControllers_1.default.delete);
        /**
         * @swagger
         * /notes/update-note:
         *   put:
         *     summary: Endpoint untuk mengupdate note
         *     description: Melakukan update data terhadap note.
         *     tags:
         *       - Notes
         *     parameters:
         *       - name: body
         *         in: body
         *         description: Data login pengguna
         *         required: true
         *         schema:
         *           type: object
         *           properties:
         *             id_user:
         *               type: integer
         *             id_note:
         *               type: integer
         *             title:
         *               type: string
         *             terjemahan:
         *               type: string
         *             word:
         *               type: string
         *     responses:
         *       200:
         *         description: Login berhasil
         *       429:
         *         description: Terlalu banyak percobaan login
         */
        this.router.put('/update-note', RateLimitMiddleware_1.rateLimitMiddleware, AuthMiddleware_1.auth, Notes_1.validationUpdateNote, expressValidator_1.handleValidationErrors, NotesControllers_1.default.update);
    }
}
exports.default = new NotesRoutes().router;
