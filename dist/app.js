"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const error_mdw_1 = require("./middlewares/error.mdw");
const config_1 = require("./configs/config");
const morgan_config_1 = require("./configs/morgan.config");
const app = (0, express_1.default)();
if (config_1.env !== 'test') {
    app.use(morgan_config_1.successHandler);
    app.use(morgan_config_1.errorHandler);
}
//body parser
app.use(body_parser_1.default.json);
// enable cors
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(http_status_1.default.NOT_FOUND, 'Not found'));
});
// convert error to ApiError, if needed
app.use(error_mdw_1.errorConverter);
// handle error
app.use(error_mdw_1.errorHandler);
app.listen(config_1.port, () => {
    console.log(`Server is running on PORT ${config_1.port}`);
});
//# sourceMappingURL=app.js.map