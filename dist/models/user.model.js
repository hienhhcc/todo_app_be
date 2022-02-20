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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true, minlength: 8 },
    todos: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Todo' }],
});
//* Statics
userSchema.static('isUsernameTaken', function isUsernameTaken(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ username });
        return !!user;
    });
});
userSchema.static('getUserByUsername', function getUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ username });
        return user;
    });
});
userSchema.static('getUserById', function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findById(id);
        return user;
    });
});
//* Document Methods
userSchema.methods.isPasswordMatch = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, this.password);
    });
};
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map