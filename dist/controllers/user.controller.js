"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const services_1 = require("../services");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
//* Fetch all todo
const getAllTodo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const id = req.user._id;
    if (id.toString() !== userId.toString()) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized');
    }
    const todos = yield services_1.todoService.getAllTodosOfUser({ userId });
    return res.status(http_status_1.default.OK).json({ success: true, todos });
}));
//* Add Todo
const addTodo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoName } = req.body;
    const userId = req.params.userId;
    const id = req.user._id;
    if (id.toString() !== userId.toString()) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized');
    }
    const todo = yield services_1.todoService.addNewTodo({ todoName, userId });
    return res.status(http_status_1.default.OK).json({ success: true, todo });
}));
//* Check and uncheck complete Todo
const editTodo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isChecked } = req.body;
    const { userId, todoId } = req.params;
    const id = req.user._id;
    if (id.toString() !== userId.toString()) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized');
    }
    const todo = yield services_1.todoService.patchTodo({ todoId, userId, isChecked });
    return res.status(http_status_1.default.OK).json({ success: true, todo });
}));
//* Remove Todo
const removeTodo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, todoId } = req.params;
    const id = req.user._id;
    if (id.toString() !== userId.toString()) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized');
    }
    const todo = yield services_1.todoService.removeTodo({ todoId, userId });
    return res.status(http_status_1.default.OK).json({ success: true, todo });
}));
exports.default = { addTodo, editTodo, removeTodo, getAllTodo };
//# sourceMappingURL=user.controller.js.map