"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const prisma_db_1 = __importDefault(require("../db/prisma.db"));
const router = express_1.default.Router();
exports.authRouter = router;
router.post('/new_user', async (req, res) => {
    const { id, fullName, primaryEmailAddress, imageUrl, username } = req.body;
    if (!id || !username || !fullName) {
        return res.status(301).send('Id, firstName and email are required');
    }
    const existuser = await prisma_db_1.default.user.findUnique({
        where: {
            clerkId: id
        }
    });
    if (existuser) {
        return res.status(201).send('User already exists');
    }
    const user = await prisma_db_1.default.user.create({
        data: {
            clerkId: id,
            name: fullName,
            email: primaryEmailAddress.emailAddress,
            profileImg: imageUrl,
            username: username
        }
    });
    res.json({ success: true, message: 'User created successfully' });
});
router.post('/update_user', async (req, res) => {
    const { email, username, name, clerkId, profileImg } = req.body;
    if (!email || !username || !name || !clerkId) {
        return res.status(400).send('Email, username, name, and clerkId are required');
    }
    const user = await prisma_db_1.default.user.update({
        where: {
            clerkId: clerkId
        },
        data: {
            username: username,
            name: name,
            email: email,
            profileImg: profileImg
        }
    });
    res.json({ success: true, message: 'User updated successfully' });
});
//# sourceMappingURL=auth.route.js.map