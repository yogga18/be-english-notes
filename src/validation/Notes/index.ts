import { param, body } from 'express-validator';

export const validateGetAllNotes = [
  param('id_user')
    .exists()
    .withMessage('untuk mendapatkan semua catatan, id_user harus ada'),
];

export const validationGetNoteById = [
  param('id_note')
    .exists()
    .withMessage('untuk mendapatkan catatan, id_note harus ada'),
  param('id_user')
    .exists()
    .withMessage('untuk mendapatkan catatan, id_user harus ada'),
];

export const validationCreateNote = [
  param('id_user')
    .exists()
    .withMessage('untuk membuat catatan, id_user harus ada'),
  body('title')
    .exists()
    .withMessage('title harus diisi')
    .isString()
    .withMessage('title harus berupa string'),
  body('terjemahan')
    .exists()
    .withMessage('terjemahan harus diisi')
    .isString()
    .withMessage('terjemahan harus berupa string'),
  body('word')
    .exists()
    .withMessage('word harus diisi')
    .isString()
    .withMessage('word harus berupa string'),
];

export const validationDeleteNote = [
  param('id_user')
    .exists()
    .withMessage('untuk menghapus catatan, id_user harus ada'),
  param('id_note')
    .exists()
    .withMessage('untuk menghapus catatan, id_note harus ada'),
];

export const validationUpdateNote = [
  body('id_user')
    .exists()
    .withMessage('untuk mengupdate catatan, id_user harus ada'),
  body('id_note')
    .exists()
    .withMessage('untuk mengupdate catatan, id_note harus ada'),
  body('title')
    .exists()
    .withMessage('title harus diisi')
    .isString()
    .withMessage('title harus berupa string'),
  body('terjemahan')
    .exists()
    .withMessage('terjemahan harus diisi')
    .isString()
    .withMessage('terjemahan harus berupa string'),
  body('word')
    .exists()
    .withMessage('word harus diisi')
    .isString()
    .withMessage('word harus berupa string'),
];
