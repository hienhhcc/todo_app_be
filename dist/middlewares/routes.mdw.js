"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("../routes");
const requireRoutes = (app) => {
    app.use('/user/auth', routes_1.authUserRoute);
    app.use('/user', routes_1.userRoute);
};
exports.default = requireRoutes;
//# sourceMappingURL=routes.mdw.js.map