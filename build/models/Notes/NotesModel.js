"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNote = exports.deleteNote = exports.createNote = exports.getNoteById = exports.getAllNotes = void 0;
const database_1 = __importDefault(require("../../config/database"));
const getAllNotes = (id_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SQLQuery = 'SELECT id_note, id_user, title, terjemahan, word, udcr, udch FROM notes WHERE id_user = ?';
        const values = [id_user];
        const [rows] = yield database_1.default.promise().query(SQLQuery, values);
        return rows;
    }
    catch (error) {
        throw new Error('Error getting all notes.');
    }
});
exports.getAllNotes = getAllNotes;
const getNoteById = (id_note, id_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SQLQuery = 'SELECT id_note, id_user, title, terjemahan, word, udcr, udch FROM notes WHERE id_note = ? AND id_user = ?';
        const values = [id_note, id_user];
        const [rows] = yield database_1.default.promise().query(SQLQuery, values);
        return rows;
    }
    catch (error) {
        throw new Error('Error getting note by id.');
    }
});
exports.getNoteById = getNoteById;
const createNote = (id_user, title, terjemahan, word) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SQLQuery = 'INSERT INTO notes (id_user, title, terjemahan, word) VALUES (?, ?, ?, ?)';
        const values = [id_user, title, terjemahan, word];
        const [rows] = yield database_1.default.promise().query(SQLQuery, values);
        return rows;
    }
    catch (error) {
        throw new Error('Error creating note.');
    }
});
exports.createNote = createNote;
const deleteNote = (id_note, id_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SQLQuery = 'DELETE FROM notes WHERE id_note = ? AND id_user = ?';
        const values = [id_note, id_user];
        const [rows] = yield database_1.default.promise().query(SQLQuery, values);
        return rows;
    }
    catch (error) {
        throw new Error('Error deleting note.');
    }
});
exports.deleteNote = deleteNote;
const updateNote = (id_user, id_note, title, terjemahan, word) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SQLQuery = 'UPDATE notes SET title = ?, terjemahan = ?, word = ? WHERE id_note = ? AND id_user = ?';
        const values = [title, terjemahan, word, id_note, id_user];
        const [rows] = yield database_1.default.promise().query(SQLQuery, values);
        return rows;
    }
    catch (error) {
        throw new Error('Error updating note.');
    }
});
exports.updateNote = updateNote;
