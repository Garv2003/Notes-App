"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRouter = void 0;
const express_1 = __importDefault(require("express"));
const note_controller_1 = require("../controller/note.controller");
const router = express_1.default.Router();
exports.noteRouter = router;
router.get('/notes/user/:id', note_controller_1.GetUserNotes);
router.post('/note', note_controller_1.CreateNote);
router.get('note/:id', note_controller_1.GetNoteById);
router.patch('/note/:id', note_controller_1.UpdateNote);
router.delete('/note/:id', note_controller_1.DeleteNote);
//# sourceMappingURL=note.route.js.map