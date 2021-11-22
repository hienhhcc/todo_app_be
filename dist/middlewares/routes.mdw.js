"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("../routes");
const routes = (app) => {
    app.use('/user/auth', routes_1.authUserRoute);
};
exports.default = routes;
//# sourceMappingURL=routes.mdw.js.map