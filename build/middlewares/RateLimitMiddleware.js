"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 100, // maksimum 100 permintaan
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    //   skipSuccessfulRequests: true,
    //   skipFailedRequests: false,
    message: 'Too many requests from your IP, please try again later',
});
const rateLimitMiddleware = (req, res, next) => {
    limiter(req, res, next);
};
exports.rateLimitMiddleware = rateLimitMiddleware;
