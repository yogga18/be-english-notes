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
exports.logoutUser = exports.loginUser = exports.registerUser = exports.checkUserById = exports.checkUser = void 0;
const database_1 = __importDefault(require("../../config/database"));
const checkUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SQLQuery = 'SELECT id_user, username, password, role, is_login, full_name, gender, b_day, udcr, udch FROM users WHERE username = ?';
        const values = [username];
        return yield database_1.default.promise().query(SQLQuery, values);
    }
    catch (error) {
        // Tangani kesalahan
        console.error('Error executing checkUser query:', error);
        throw new Error('Error checking user.'); // Atau pesan kesalahan yang sesuai
    }
});
exports.checkUser = checkUser;
const checkUserById = (id_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SQLQuery = 'SELECT id_user, username, password, role, is_login, full_name, gender, b_day, udcr, udch FROM users WHERE id_user = ?';
        const values = [id_user];
        return yield database_1.default.promise().query(SQLQuery, values);
    }
    catch (error) {
        // Tangani kesalahan
        console.error('Error executing checkUser query:', error);
        throw new Error('Error checking user.'); // Atau pesan kesalahan yang sesuai
    }
});
exports.checkUserById = checkUserById;
const registerUser = (username, password, role, is_login, full_name, gender, b_day) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SQLQuery = 'INSERT INTO users (username, password, role, is_login, full_name, gender, b_day) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [
            username,
            password,
            role,
            is_login,
            full_name,
            gender,
            b_day,
        ];
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
        throw new Error('Error registering user.'); // Atau pesan kesalahan yang sesuai
    }
});
exports.registerUser = registerUser;
const loginUser = (username, is_login) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SQLQuery = 'UPDATE users SET is_login = ? WHERE username = ?';
        const values = [is_login, username];
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
        // Tangani kesalahan
        console.error('Error executing loginUser query:', error);
        throw new Error('Error logging in user.'); // Atau pesan kesalahan yang sesuai
    }
});
exports.loginUser = loginUser;
const logoutUser = (username, is_login) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SQLQuery = 'UPDATE users SET is_login = ? WHERE username = ?';
        const values = [is_login, username];
        return yield database_1.default.promise().query(SQLQuery, values);
    }
    catch (error) {
        // Tangani kesalahan
        console.error('Error executing logoutUser query:', error);
        throw new Error('Error logging out user.'); // Atau pesan kesalahan yang sesuai
    }
});
exports.logoutUser = logoutUser;
