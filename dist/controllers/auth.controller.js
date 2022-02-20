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
//* Register User
const register = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    yield services_1.userService.createUser({ username, password });
    return res.status(http_status_1.default.OK).json({ success: true });
}));
//* Login User
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //TODO Check if credentials correct
    const user = yield services_1.userService.tryLoginUser({ username, password });
    //TODO Generate auth token
    const token = services_1.tokenService.generateAuthToken(user);
    return res.status(http_status_1.default.OK).json({
        success: true,
        token,
        user: { _id: user._id, username: user.username },
    });
}));
exports.default = { register, login };
//# sourceMappingURL=auth.controller.js.map