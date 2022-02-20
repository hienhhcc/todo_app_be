"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETodoStatus = void 0;
const mongoose_1 = require("mongoose");
var ETodoStatus;
(function (ETodoStatus) {
    ETodoStatus["COMPLETED"] = "COMPLETED";
    ETodoStatus["INPROGRESS"] = "INPROGRESS";
})(ETodoStatus = exports.ETodoStatus || (exports.ETodoStatus = {}));
const todoSchema = new mongoose_1.Schema({
    content: { type: String, trim: true, required: true },
    status: {
        type: String,
        required: true,
        enum: ETodoStatus,
        default: ETodoStatus.INPROGRESS,
    },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
});
const Todo = (0, mongoose_1.model)('Todo', todoSchema);
exports.default = Todo;
//# sourceMappingURL=todo.model.js.map