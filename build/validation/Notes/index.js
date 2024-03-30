"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationUpdateNote = exports.validationDeleteNote = exports.validationCreateNote = exports.validationGetNoteById = exports.validateGetAllNotes = void 0;
const express_validator_1 = require("express-validator");
exports.validateGetAllNotes = [
    (0, express_validator_1.param)('id_user')
        .exists()
        .withMessage('untuk mendapatkan semua catatan, id_user harus ada'),
];
exports.validationGetNoteById = [
    (0, express_validator_1.param)('id_note')
        .exists()
        .withMessage('untuk mendapatkan catatan, id_note harus ada'),
    (0, express_validator_1.param)('id_user')
        .exists()
        .withMessage('untuk mendapatkan catatan, id_user harus ada'),
];
exports.validationCreateNote = [
    (0, express_validator_1.param)('id_user')
        .exists()
        .withMessage('untuk membuat catatan, id_user harus ada'),
    (0, express_validator_1.body)('title')
        .exists()
        .withMessage('title harus diisi')
        .isString()
        .withMessage('title harus berupa string'),
    (0, express_validator_1.body)('terjemahan')
        .exists()
        .withMessage('terjemahan harus diisi')
        .isString()
        .withMessage('terjemahan harus berupa string'),
    (0, express_validator_1.body)('word')
        .exists()
        .withMessage('word harus diisi')
        .isString()
        .withMessage('word harus berupa string'),
];
exports.validationDeleteNote = [
    (0, express_validator_1.param)('id_user')
        .exists()
        .withMessage('untuk menghapus catatan, id_user harus ada'),
    (0, express_validator_1.param)('id_note')
        .exists()
        .withMessage('untuk menghapus catatan, id_note harus ada'),
];
exports.validationUpdateNote = [
    (0, express_validator_1.body)('id_user')
        .exists()
        .withMessage('untuk mengupdate catatan, id_user harus ada'),
    (0, express_validator_1.body)('id_note')
        .exists()
        .withMessage('untuk mengupdate catatan, id_note harus ada'),
    (0, express_validator_1.body)('title')
        .exists()
        .withMessage('title harus diisi')
        .isString()
        .withMessage('title harus berupa string'),
    (0, express_validator_1.body)('terjemahan')
        .exists()
        .withMessage('terjemahan harus diisi')
        .isString()
        .withMessage('terjemahan harus berupa string'),
    (0, express_validator_1.body)('word')
        .exists()
        .withMessage('word harus diisi')
        .isString()
        .withMessage('word harus berupa string'),
];
