"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError_1.default)) {
        let statusCode = error.statusCode || http_status_1.default.INTERNAL_SERVER_ERROR;
        let message = error.message || http_status_1.default[statusCode];
        error = new ApiError_1.default(statusCode, message);
    }
    next(error);
};
exports.errorConverter = errorConverter;
const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode).json({ success: false, message: err.message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.mdw.js.map