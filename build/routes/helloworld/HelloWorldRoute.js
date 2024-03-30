"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HelloWorldController_1 = __importDefault(require("../../contollers/helloworld/HelloWorldController"));
const RateLimitMiddleware_1 = require("../../middlewares/RateLimitMiddleware");
const BaseRoute_1 = __importDefault(require("../BaseRoute"));
class HelloWorldRoute extends BaseRoute_1.default {
    routers() {
        this.router.get('/hello', RateLimitMiddleware_1.rateLimitMiddleware, HelloWorldController_1.default.index);
    }
}
exports.default = new HelloWorldRoute().router;
