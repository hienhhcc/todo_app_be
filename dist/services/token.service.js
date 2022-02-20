"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../configs/config");
const generateAuthToken = ({ _id, username, }) => {
    return jsonwebtoken_1.default.sign({
        username,
        _id: _id.toString(),
    }, config_1.JWT_SECRET, {
        expiresIn: config_1.JWT_EXPIRATION_MINUTES,
    });
};
const tokenService = { generateAuthToken };
exports.default = tokenService;
//# sourceMappingURL=token.service.js.map