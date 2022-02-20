"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRATION_MINUTES = exports.JWT_SECRET = exports.MONGO_DEFAULT_DATABASE = exports.MONGO_PASSWORD = exports.MONGO_USER = exports.port = exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
const envVarsSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string()
        .valid('production', 'development', 'test')
        .required(),
    PORT: joi_1.default.number().default(8000),
    MONGO_USER: joi_1.default.string().required().description('Mongodb user'),
    MONGO_PASSWORD: joi_1.default.string().required().description('Mongodb password'),
    MONGO_DEFAULT_DATABASE: joi_1.default.string()
        .required()
        .description('Mongodb default database'),
    JWT_SECRET: joi_1.default.string().required().description('Jwt secret'),
    JWT_EXPIRATION_MINUTES: joi_1.default.string()
        .required()
        .description('Jwt expiration minutes'),
})
    .unknown();
const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.env = envVars.NODE_ENV, exports.port = envVars.PORT, exports.MONGO_USER = envVars.MONGO_USER, exports.MONGO_PASSWORD = envVars.MONGO_PASSWORD, exports.MONGO_DEFAULT_DATABASE = envVars.MONGO_DEFAULT_DATABASE, exports.JWT_SECRET = envVars.JWT_SECRET, exports.JWT_EXPIRATION_MINUTES = envVars.JWT_EXPIRATION_MINUTES;
//# sourceMappingURL=config.js.map