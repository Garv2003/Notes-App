"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
exports.testRouter = Router;
Router.get('/', (req, res) => {
    res.send("For Testing Purpose");
});
//# sourceMappingURL=test.route.js.map