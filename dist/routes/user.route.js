"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const controllers_1 = require("../controllers");
const passportJWT_config_1 = require("../configs/passportJWT.config");
const auth_mdw_1 = require("../middlewares/auth.mdw");
const router = express_1.default.Router();
(0, passportJWT_config_1.requirePassportJWT)(passport_1.default);
router.get('/:userId/todos', (0, auth_mdw_1.auth)(), controllers_1.userController.getAllTodo);
router.post('/:userId/todos', (0, auth_mdw_1.auth)(), controllers_1.userController.addTodo);
router.patch('/:userId/todos/:todoId', (0, auth_mdw_1.auth)(), controllers_1.userController.editTodo);
router.delete('/:userId/todos/:todoId', (0, auth_mdw_1.auth)(), controllers_1.userController.removeTodo);
exports.default = router;
//# sourceMappingURL=user.route.js.map