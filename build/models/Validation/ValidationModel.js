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
exports.checkValidation = exports.insertValidation = void 0;
const database_1 = __importDefault(require("../../config/database"));
const insertValidation = (id_user, email, phone_number) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SQLQuery = 'INSERT INTO validation (id_user, email, phone_number) VALUES (?, ?, ?)';
        const values = [id_user, email, phone_number];
        const [result] = yield database_1.default.promise().query(SQLQuery, values);
        const { affectedRows } = result;
        if (affectedRows && affectedRows > 0) {
            return {
                result: result,
                signal: true,
            };
        }
        else {
            return {
                result: result,
                signal: false,
            };
        }
    }
    catch (error) {
        throw new Error('Error inserting validation.');
    }
});
exports.insertValidation = insertValidation;
const checkValidation = (id_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SQLQuery = 'SELECT id_validation ,id_user, email, phone_number FROM validation WHERE id_user = ?';
        const values = [id_user];
        // return data
        return yield database_1.default.promise().query(SQLQuery, values);
    }
    catch (error) {
        console.error('Error executing checkValidation query:', error);
        throw new Error('Error checking validation.');
    }
});
exports.checkValidation = checkValidation;
