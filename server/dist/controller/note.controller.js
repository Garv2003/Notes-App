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
exports.DeleteNote = exports.UpdateNote = exports.GetNoteById = exports.CreateNote = exports.GetUserNotes = void 0;
var prisma_db_1 = __importDefault(require("../db/prisma.db"));
var redis_db_1 = __importDefault(require("../db/redis.db"));
var GetUserNotes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, cacheNotes, notes, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = req.params.id;
                return [4 /*yield*/, redis_db_1.default.get("notes:user:".concat(id))];
            case 1:
                cacheNotes = _a.sent();
                if (cacheNotes) {
                    return [2 /*return*/, res.json(JSON.parse(cacheNotes))];
                }
                return [4 /*yield*/, prisma_db_1.default.notes.findMany({
                        where: {
                            userId: id,
                        },
                        include: {
                            tags: true,
                        },
                    })];
            case 2:
                notes = _a.sent();
                return [4 /*yield*/, redis_db_1.default.setEx("notes:user:".concat(id), 600, JSON.stringify(notes))];
            case 3:
                _a.sent();
                res.json(notes);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(400).json({ success: false, error: err_1 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.GetUserNotes = GetUserNotes;
var CreateNote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, content, userId, tags, note, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, content = _a.content, userId = _a.userId, tags = _a.tags;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_db_1.default.notes.create({
                        data: {
                            title: title,
                            content: content,
                            userId: userId,
                            tags: {
                                connectOrCreate: tags.map(function (tag) { return ({
                                    where: { label: tag.label },
                                    create: { label: tag.label, userId: userId }
                                }); })
                            }
                        }
                    })];
            case 2:
                note = _b.sent();
                return [4 /*yield*/, redis_db_1.default.del("notes:user:".concat(userId))];
            case 3:
                _b.sent();
                res.status(201).json({ success: true, note: note });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                console.error(err_2);
                res.status(400).json({ success: false, error: err_2 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.CreateNote = CreateNote;
var GetNoteById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, cacheNote, note, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, redis_db_1.default.get("note:noteId:".concat(id))];
            case 2:
                cacheNote = _a.sent();
                if (cacheNote) {
                    return [2 /*return*/, res.json({ success: true, note: JSON.parse(cacheNote) })];
                }
                return [4 /*yield*/, prisma_db_1.default.notes.findUnique({
                        where: {
                            id: id,
                        },
                        include: {
                            tags: true,
                        },
                    })];
            case 3:
                note = _a.sent();
                return [4 /*yield*/, redis_db_1.default.setEx("note:noteId:".concat(id), 600, JSON.stringify(note))];
            case 4:
                _a.sent();
                res.json({ success: true, note: note });
                return [3 /*break*/, 6];
            case 5:
                err_3 = _a.sent();
                res.status(400).json({ success: false, error: err_3 });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.GetNoteById = GetNoteById;
var UpdateNote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, markdown, tags, id, currentNote, tagIds, tagsToDelete, note, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, markdown = _a.markdown, tags = _a.tags;
                id = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, prisma_db_1.default.notes.findUnique({
                        where: { id: id },
                        include: { tags: true },
                    })];
            case 2:
                currentNote = _b.sent();
                if (!currentNote) {
                    return [2 /*return*/, res.status(404).json({ success: false, error: 'Note not found' })];
                }
                tagIds = currentNote.tags.map(function (tag) { return tag.id; });
                tagsToDelete = tagIds.filter(function (tagId) { return !tags.some(function (tag) { return tag.id === tagId; }); });
                return [4 /*yield*/, prisma_db_1.default.notes.update({
                        where: {
                            id: id,
                        },
                        data: {
                            tags: {
                                disconnect: tagsToDelete.map(function (tagId) { return ({ id: tagId }); }),
                            },
                        },
                    })];
            case 3:
                _b.sent();
                return [4 /*yield*/, prisma_db_1.default.notes.update({
                        where: {
                            id: id,
                        },
                        data: {
                            title: title,
                            content: markdown,
                            tags: {
                                connectOrCreate: tags.map(function (tag) { return ({
                                    where: { label: tag.label },
                                    create: { label: tag.label }
                                }); })
                            }
                        }
                    })];
            case 4:
                note = _b.sent();
                return [4 /*yield*/, redis_db_1.default.del("note:user:".concat(id))];
            case 5:
                _b.sent();
                res.status(200).json({ success: true, note: note });
                return [3 /*break*/, 7];
            case 6:
                err_4 = _b.sent();
                res.status(400).json({ success: false, error: err_4 });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.UpdateNote = UpdateNote;
var DeleteNote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_db_1.default.notes.delete({
                        where: {
                            id: id,
                        },
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, redis_db_1.default.del("note:user:".concat(id))];
            case 3:
                _a.sent();
                res.status(200).json({ success: true });
                return [3 /*break*/, 5];
            case 4:
                err_5 = _a.sent();
                res.status(400).json({ success: false, error: err_5 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.DeleteNote = DeleteNote;
//# sourceMappingURL=note.controller.js.map