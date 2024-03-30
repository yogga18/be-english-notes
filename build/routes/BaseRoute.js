"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Create Abstrac Class
const express_1 = require("express");
class BaseRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routers();
    }
}
exports.default = BaseRoute;
