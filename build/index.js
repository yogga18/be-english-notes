"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const HelloWorldRoute_1 = __importDefault(require("./routes/helloworld/HelloWorldRoute"));
const AuthRoutes_1 = __importDefault(require("./routes/Auth/AuthRoutes"));
const swaggerConfig_1 = require("./documentation/swaggerConfig");
const NotesRoutes_1 = __importDefault(require("./routes/Notes/NotesRoutes"));
// import { swaggerSpec, swaggerui } from './documentation/swaggerConfig';
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use('/api-docs', swaggerConfig_1.swaggerui.serve, swaggerConfig_1.swaggerui.setup(swaggerConfig_1.swaggerSpec));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)('dev')); // morgan for logging request
        this.app.use((0, compression_1.default)()); // compress all request response
        this.app.use((0, helmet_1.default)()); // secure your app by setting various HTTP headers
        this.app.use((0, cors_1.default)());
        (0, dotenv_1.config)();
    }
    routes() {
        this.app.use('/api/v1/testing', HelloWorldRoute_1.default);
        this.app.use('/api/v1/auth', AuthRoutes_1.default);
        this.app.use('/api/v1/notes', NotesRoutes_1.default);
    }
}
// const PORT = process.env.PORT || 8001;
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8001;
const app = new App().app;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
