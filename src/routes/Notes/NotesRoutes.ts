import NotesControllers from '../../contollers/Notes/NotesControllers';
import { auth } from '../../middlewares/AuthMiddleware';
import { rateLimitMiddleware } from '../../middlewares/RateLimitMiddleware';
import { handleValidationErrors } from '../../utils/expressValidator';
import {
  validateGetAllNotes,
  validationCreateNote,
  validationDeleteNote,
  validationGetNoteById,
  validationUpdateNote,
} from '../../validation/Notes';
import BaseRoute from '../BaseRoute';

class NotesRoutes extends BaseRoute {
  public routers(): void {
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
    this.router.get(
      '/get-all-notes/:id_user',
      rateLimitMiddleware,
      auth,
      validateGetAllNotes,
      handleValidationErrors,
      NotesControllers.index
    );

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
    this.router.get(
      '/get-note-by-id/:id_note/:id_user',
      rateLimitMiddleware,
      auth,
      validationGetNoteById,
      handleValidationErrors,
      NotesControllers.show
    );

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
    this.router.post(
      '/create-note/:id_user',
      rateLimitMiddleware,
      auth,
      validationCreateNote,
      handleValidationErrors,
      NotesControllers.create
    );

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
    this.router.delete(
      '/delete-note/:id_user/:id_note',
      rateLimitMiddleware,
      auth,
      validationDeleteNote,
      handleValidationErrors,
      NotesControllers.delete
    );

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
    this.router.put(
      '/update-note',
      rateLimitMiddleware,
      auth,
      validationUpdateNote,
      handleValidationErrors,
      NotesControllers.update
    );
  }
}

export default new NotesRoutes().router;
