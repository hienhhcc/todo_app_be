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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const todo_model_1 = require("../models/todo.model");
const addNewTodo = ({ todoName, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.getUserById(userId);
    const newTodo = new models_1.Todo({ content: todoName });
    newTodo.user = user;
    user.todos.push(newTodo);
    yield Promise.all([user.save(), newTodo.save()]);
    return newTodo;
});
const patchTodo = ({ todoId, userId, isChecked }) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield models_1.Todo.findById(todoId);
    if (isChecked) {
        todo.status = todo_model_1.ETodoStatus.COMPLETED;
    }
    else {
        todo.status = todo_model_1.ETodoStatus.INPROGRESS;
    }
    yield todo.save();
    return todo;
});
const removeTodo = ({ todoId, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield models_1.Todo.findByIdAndDelete(todoId);
    return todo;
});
const getAllTodosOfUser = ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findById(userId).populate('todos').exec();
    return user.todos;
});
const todoService = { addNewTodo, getAllTodosOfUser, patchTodo, removeTodo };
exports.default = todoService;
//# sourceMappingURL=todo.service.js.map