import prisma from '../db/prisma.db'
import client from '../db/redis.db'
import { Request, Response } from 'express'

const GetUserTags = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {

        const cacheTags = await client.get(`tags:${userId}`);

        if (cacheTags) {
            return res.json(JSON.parse(cacheTags));
        }

        const tags = await prisma.tag.findMany({
            where: {
                userId,
            },
        });

        await client.setEx(`tags:${userId}`, 600, JSON.stringify(tags));

        res.json(tags);
    }
    catch (err) {
        res.status(400).json({ success: false, error: err });
    }
}

const DeleteTag = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await prisma.tag.delete({
            where: {
                id,
            },
        });

        await client.del(`tags:user:${id}`);

        res.json({ success: true });

    }
    catch (err) {
        res.status(400).json({ success: false, error: err });
    }
}

export { GetUserTags, DeleteTag }