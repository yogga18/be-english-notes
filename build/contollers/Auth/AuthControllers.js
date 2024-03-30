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
const Authtentication_1 = __importDefault(require("../../utils/Authtentication"));
const AuthModel_1 = require("../../models/Auth/AuthModel");
const ValidationModel_1 = require("../../models/Validation/ValidationModel");
class AuthControllers {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let { username, password, full_name, gender, b_day, email, phone_number, } = req.body;
                const is_login = 'off line';
                const role = 'user';
                const [rows] = yield (0, AuthModel_1.checkUser)(username);
                const usernameCheck = rows;
                // Check username is already exist
                if (((_a = usernameCheck[0]) === null || _a === void 0 ? void 0 : _a.username) === username) {
                    return res.status(400).json({
                        message: 'Username already exists',
                    });
                }
                const hashedPassword = yield Authtentication_1.default.Authtentication(password);
                const regisUser = yield (0, AuthModel_1.registerUser)(username, hashedPassword, role, is_login, full_name, gender, b_day);
                if (regisUser.signal) {
                    const validationUser = yield (0, ValidationModel_1.insertValidation)(regisUser.result.insertId, email, phone_number);
                    if (validationUser.signal) {
                        return res.status(200).json({
                            success: true,
                            message: 'User created successfully',
                        });
                    }
                    else {
                        return res.status(400).json({
                            message: 'Failed to register user',
                        });
                    }
                }
                else {
                    return res.status(400).json({
                        message: 'Failed to register user',
                    });
                }
            }
            catch (error) {
                console.error('Error registering user:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error',
                });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { username, password } = req.body;
                const [rows] = yield (0, AuthModel_1.checkUser)(username);
                if (Array.isArray(rows) && rows.length > 0) {
                    const user = rows[0];
                    let userPwdCompare = yield Authtentication_1.default.passwordCompare(password, user.password);
                    if (userPwdCompare) {
                        const resultLogin = yield (0, AuthModel_1.loginUser)(username, 'online');
                        if (resultLogin) {
                            const getValidation = yield (0, ValidationModel_1.checkValidation)(user.id_user);
                            const data = getValidation[0];
                            let token = Authtentication_1.default.generateToken(user.id_user, user.username, user.password, user.role, 'online', user.full_name, user.gender, user.b_day, user.udcr, user.udch, data[0].email, data[0].phone_number);
                            return res.status(200).send({
                                success: true,
                                message: 'Login success',
                                data: token,
                            });
                        }
                        else {
                            return res.status(400).send({
                                success: false,
                                message: 'Failed to login',
                                data: {},
                            });
                        }
                    }
                    else {
                        return res.status(400).send({
                            success: false,
                            message: 'Wrong password',
                            data: {},
                        });
                    }
                }
                return res.status(400).send({
                    success: false,
                    message: 'Make sure your username is correct or maybe you are not registered',
                });
            }
            catch (error) {
                console.error('Error logging in:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error',
                });
            }
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { username } = req.body;
                yield (0, AuthModel_1.logoutUser)(username, 'off line');
                req.app.locals.credential = null;
                return res.status(200).send({
                    success: true,
                    message: 'Logout success',
                });
            }
            catch (error) {
                console.error('Error logging out:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error',
                });
            }
        });
    }
}
exports.default = new AuthControllers();
