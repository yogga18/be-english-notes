"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerui = exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerui = swagger_ui_express_1.default;
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'be-enlish-note API Documentation',
            version: '1.0.0',
            description: 'API Documentation for be-enlish-note',
        },
    },
    apis: ['src/routes/*.ts', 'src/routes/**/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.swaggerSpec = swaggerSpec;
