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
Object.defineProperty(exports, "__esModule", { value: true });
const AuthModel_1 = require("../../models/Auth/AuthModel");
const NotesModel_1 = require("../../models/Notes/NotesModel");
class NotesControllers {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { id_user } = req.params;
            try {
                const [rows] = yield (0, AuthModel_1.checkUserById)(id_user);
                const usernameCheck = rows;
                // Check username is already exist
                if (((_a = usernameCheck[0]) === null || _a === void 0 ? void 0 : _a.id_user) === parseInt(id_user)) {
                    const notes = yield (0, NotesModel_1.getAllNotes)(id_user);
                    return res.status(200).json({
                        success: true,
                        message: 'GET all data success',
                        data: notes,
                    });
                }
                else {
                    return res.status(400).json({
                        message: 'User dosent exist',
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Error getting all notes.',
                    data: [],
                });
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const { id_user } = req.params;
            const { title, terjemahan, word } = req.body;
            try {
                const [rows] = yield (0, AuthModel_1.checkUserById)(id_user);
                const usernameCheck = rows;
                // Check username is already exist
                if (((_b = usernameCheck[0]) === null || _b === void 0 ? void 0 : _b.id_user) === parseInt(id_user)) {
                    const data = yield (0, NotesModel_1.createNote)(id_user, title, terjemahan, word);
                    return res.status(200).json({
                        success: true,
                        message: 'Notes successfully created',
                        data: data,
                    });
                }
                else {
                    return res.status(400).json({
                        message: 'User dosent exist',
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Error getting all notes.',
                    data: [],
                });
            }
        });
        this.show = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _c;
            const { id_note, id_user } = req.params;
            try {
                const [rows] = yield (0, AuthModel_1.checkUserById)(id_user);
                const usernameCheck = rows;
                // Check username is already exist
                if (((_c = usernameCheck[0]) === null || _c === void 0 ? void 0 : _c.id_user) === parseInt(id_user)) {
                    const note = yield (0, NotesModel_1.getNoteById)(id_note, id_user);
                    return res.status(200).json({
                        success: true,
                        message: 'Get one note by id success',
                        data: note,
                    });
                }
                else {
                    return res.status(400).json({
                        message: 'User dosent exist',
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Error getting note by id.',
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _d;
            const { id_user, id_note, title, terjemahan, word } = req.body;
            try {
                const [rows] = yield (0, AuthModel_1.checkUserById)(id_user);
                const usernameCheck = rows;
                // Check username is already exist
                if (((_d = usernameCheck[0]) === null || _d === void 0 ? void 0 : _d.id_user) === parseInt(id_user)) {
                    const data = yield (0, NotesModel_1.updateNote)(id_user, id_note, title, terjemahan, word);
                    return res.status(200).json({
                        success: true,
                        message: 'Note updated successfully',
                        data: data,
                    });
                }
                else {
                    return res.status(400).json({
                        message: 'User dosent exist',
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Error getting note by id.',
                });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _e;
            const { id_user, id_note } = req.params;
            try {
                const [rows] = yield (0, AuthModel_1.checkUserById)(id_user);
                const usernameCheck = rows;
                // Check username is already exist
                if (((_e = usernameCheck[0]) === null || _e === void 0 ? void 0 : _e.id_user) === parseInt(id_user)) {
                    const data = yield (0, NotesModel_1.deleteNote)(id_note, id_user);
                    return res.status(200).json({
                        success: true,
                        message: 'GET all data',
                        data: data,
                    });
                }
                else {
                    return res.status(400).json({
                        message: 'User dosent exist',
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Error getting note by id.',
                    data: [],
                });
            }
        });
    }
}
exports.default = new NotesControllers();
