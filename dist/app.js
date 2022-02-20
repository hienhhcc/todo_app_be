"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_mdw_1 = require("./middlewares/error.mdw");
const config_1 = require("./configs/config");
const ApiError_1 = __importDefault(require("./utils/ApiError"));
const routes_mdw_1 = __importDefault(require("./middlewares/routes.mdw"));
const app = (0, express_1.default)();
app.disable('etag');
//body parser
app.use(express_1.default.json());
// enable cors
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, morgan_1.default)('dev'));
(0, routes_mdw_1.default)(app);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Not found'));
});
// convert error to ApiError, if needed
app.use(error_mdw_1.errorConverter);
// handle error
app.use(error_mdw_1.errorHandler);
mongoose_1.default
    .connect(`mongodb+srv://${config_1.MONGO_USER}:${config_1.MONGO_PASSWORD}@mycluster.r6sla.mongodb.net/${config_1.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`)
    .then(() => {
    console.log('Connect Mongodb Successfully');
    app.listen(config_1.port, () => {
        console.log(`Server is running on PORT ${config_1.port}`);
    });
})
    .catch((error) => console.log(error));
//# sourceMappingURL=app.js.map