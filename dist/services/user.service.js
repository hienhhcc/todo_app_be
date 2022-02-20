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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const models_1 = require("../models");
const createUser = ({ username, password }) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield models_1.User.isUsernameTaken(username)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Username đã có người sử dụng');
    }
    const hashPassword = yield bcryptjs_1.default.hash(password, 12);
    const user = new models_1.User({
        username,
        password: hashPassword,
    });
    yield user.save();
    return user;
});
//* Check Login User
const tryLoginUser = ({ username, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.getUserByUsername(username);
    //TODO: Nếu mật khẩu không khớp
    if (!user || !(yield user.isPasswordMatch(password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Sai username hoặc mật khẩu!');
    }
    return user;
});
const userService = { createUser, tryLoginUser };
exports.default = userService;
//# sourceMappingURL=user.service.js.map