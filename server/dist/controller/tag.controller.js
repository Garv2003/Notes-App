"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTag = exports.GetUserTags = void 0;
const prisma_db_1 = __importDefault(require("../db/prisma.db"));
const redis_db_1 = __importDefault(require("../db/redis.db"));
const GetUserTags = async (req, res) => {
    const userId = req.params.userId;
    try {
        const cacheTags = await redis_db_1.default.get(`tags:${userId}`);
        if (cacheTags) {
            return res.json(JSON.parse(cacheTags));
        }
        const tags = await prisma_db_1.default.tag.findMany({
            where: {
                userId,
            },
        });
        await redis_db_1.default.setEx(`tags:${userId}`, 3600, JSON.stringify(tags));
        res.json(tags);
    }
    catch (err) {
        res.status(400).json({ success: false, error: err });
    }
};
exports.GetUserTags = GetUserTags;
const DeleteTag = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma_db_1.default.tag.delete({
            where: {
                id,
            },
        });
        await redis_db_1.default.del(`tags:user:${id}`);
        res.json({ success: true });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err });
    }
};
exports.DeleteTag = DeleteTag;
//# sourceMappingURL=tag.controller.js.map