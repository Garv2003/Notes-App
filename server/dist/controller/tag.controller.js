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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTag = exports.GetUserTags = void 0;
var prisma_db_1 = __importDefault(require("../db/prisma.db"));
var redis_db_1 = __importDefault(require("../db/redis.db"));
var GetUserTags = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, cacheTags, tags, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, redis_db_1.default.get("tags:".concat(userId))];
            case 2:
                cacheTags = _a.sent();
                if (cacheTags) {
                    return [2 /*return*/, res.json(JSON.parse(cacheTags))];
                }
                return [4 /*yield*/, prisma_db_1.default.tag.findMany({
                        where: {
                            userId: userId,
                        },
                    })];
            case 3:
                tags = _a.sent();
                return [4 /*yield*/, redis_db_1.default.setEx("tags:".concat(userId), 3600, JSON.stringify(tags))];
            case 4:
                _a.sent();
                res.json(tags);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                res.status(400).json({ success: false, error: err_1 });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.GetUserTags = GetUserTags;
var DeleteTag = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_db_1.default.tag.delete({
                        where: {
                            id: id,
                        },
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, redis_db_1.default.del("tags:user:".concat(id))];
            case 3:
                _a.sent();
                res.json({ success: true });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                res.status(400).json({ success: false, error: err_2 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.DeleteTag = DeleteTag;
//# sourceMappingURL=tag.controller.js.map