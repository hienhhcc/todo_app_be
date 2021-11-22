"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        let statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        let message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message);
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