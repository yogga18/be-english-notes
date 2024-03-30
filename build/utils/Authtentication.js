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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authtentication {
}
_a = Authtentication;
Authtentication.Authtentication = (password) => {
    return bcrypt_1.default.hash(password, 10);
};
Authtentication.passwordCompare = (text, encryptedText) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield bcrypt_1.default.compare(text, encryptedText);
    return result;
});
Authtentication.generateToken = (id_user, username, password, role, is_login, full_name, gender, b_day, udcr, udch, email, phone_number) => {
    const secretKey = process.env.JWT_SERCRET_KEY || 'secret';
    // exp in 24 hours
    const expiredIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
    const token = jsonwebtoken_1.default.sign({
        id_user,
        username,
        password,
        role,
        is_login,
        full_name,
        gender,
        b_day,
        udcr,
        udch,
        email,
        phone_number,
    }, secretKey, {
        expiresIn: expiredIn,
    });
    return token;
};
exports.default = Authtentication;
