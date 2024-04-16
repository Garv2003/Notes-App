"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNote = exports.UpdateNote = exports.GetNoteById = exports.CreateNote = exports.GetUserNotes = void 0;
const prisma_db_1 = __importDefault(require("../db/prisma.db"));
const redis_db_1 = __importDefault(require("../db/redis.db"));
const GetUserNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const cacheNotes = await redis_db_1.default.get(`notes:user:${id}`);
        if (cacheNotes) {
            return res.json(JSON.parse(cacheNotes));
        }
        const notes = await prisma_db_1.default.notes.findMany({
            where: {
                userId: id,
            },
            include: {
                tags: true,
            },
        });
        await redis_db_1.default.setEx(`notes:user:${id}`, 600, JSON.stringify(notes));
        res.json(notes);
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ success: false, error: err });
    }
};
exports.GetUserNotes = GetUserNotes;
const CreateNote = async (req, res) => {
    const { title, content, userId, tags } = req.body;
    try {
        const note = await prisma_db_1.default.notes.create({
            data: {
                title,
                content,
                userId: userId,
                tags: {
                    connectOrCreate: tags.map((tag) => ({
                        where: { label: tag.label },
                        create: { label: tag.label, userId: userId }
                    }))
                }
            }
        });
        await redis_db_1.default.del(`notes:user:${userId}`);
        res.status(201).json({ success: true, note });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ success: false, error: err });
    }
};
exports.CreateNote = CreateNote;
const GetNoteById = async (req, res) => {
    const { id } = req.params;
    try {
        const cacheNote = await redis_db_1.default.get(`note:noteId:${id}`);
        if (cacheNote) {
            return res.json({ success: true, note: JSON.parse(cacheNote) });
        }
        const note = await prisma_db_1.default.notes.findUnique({
            where: {
                id: id,
            },
            include: {
                tags: true,
            },
        });
        await redis_db_1.default.setEx(`note:noteId:${id}`, 600, JSON.stringify(note));
        res.json({ success: true, note });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err });
    }
};
exports.GetNoteById = GetNoteById;
const UpdateNote = async (req, res) => {
    const { title, markdown, tags } = req.body;
    const { id } = req.params;
    try {
        const currentNote = await prisma_db_1.default.notes.findUnique({
            where: { id: id },
            include: { tags: true },
        });
        if (!currentNote) {
            return res.status(404).json({ success: false, error: 'Note not found' });
        }
        const tagIds = currentNote.tags.map((tag) => tag.id);
        const tagsToDelete = tagIds.filter((tagId) => !tags.some((tag) => tag.id === tagId));
        await prisma_db_1.default.notes.update({
            where: {
                id: id,
            },
            data: {
                tags: {
                    disconnect: tagsToDelete.map((tagId) => ({ id: tagId })),
                },
            },
        });
        const note = await prisma_db_1.default.notes.update({
            where: {
                id: id,
            },
            data: {
                title,
                content: markdown,
                tags: {
                    connectOrCreate: tags.map((tag) => ({
                        where: { label: tag.label },
                        create: { label: tag.label }
                    }))
                }
            }
        });
        await redis_db_1.default.del(`note:user:${id}`);
        res.status(200).json({ success: true, note });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err });
    }
};
exports.UpdateNote = UpdateNote;
const DeleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma_db_1.default.notes.delete({
            where: {
                id: id,
            },
        });
        await redis_db_1.default.del(`note:user:${id}`);
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err });
    }
};
exports.DeleteNote = DeleteNote;
//# sourceMappingURL=note.controller.js.map