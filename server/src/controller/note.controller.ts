import prisma from '../db/prisma.db'
import client from '../db/redis.db'
import { Request, Response } from 'express'

const GetUserNotes = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const cacheNotes = await client.get(`notes:user:${id}`)

        if (cacheNotes) {
            return res.json(JSON.parse(cacheNotes))
        }

        const notes = await prisma.notes.findMany({
            where: {
                userId: id,
            },
            include: {
                tags: true,
            },
        })

        await client.setEx(`notes:user:${id}`, 600, JSON.stringify(notes))

        res.json(notes)
    } catch (err) {
        console.error(err)
        res.status(400).json({ success: false, error: err })
    }
}

const CreateNote = async (req: Request, res: Response) => {

    const { title, content, userId, tags } = req.body

    try {
        const note = await prisma.notes.create({
            data: {
                title,
                content,
                userId: userId,
                tags: {
                    connectOrCreate: tags.map((tag: any) => ({

                        where: { label: tag.label },
                        create: { label: tag.label, userId: userId }

                    }
                    )
                    )
                }
            }
        })

        await client.del(`notes:user:${userId}`)

        res.status(201).json({ success: true, note })
    } catch (err) {
        console.error(err)
        res.status(400).json({ success: false, error: err })
    }
}

const GetNoteById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {

        const cacheNote = await client.get(`note:noteId:${id}`)

        if (cacheNote) {
            return res.json({ success: true, note: JSON.parse(cacheNote) })
        }

        const note = await prisma.notes.findUnique({
            where: {
                id: id,
            },
            include: {
                tags: true,
            },
        })

        await client.setEx(`note:noteId:${id}`, 600, JSON.stringify(note))

        res.json({ success: true, note })
    }
    catch (err) {
        res.status(400).json({ success: false, error: err })
    }
}

const UpdateNote = async (req: Request, res: Response) => {
    const { title, markdown, tags } = req.body
    const { id } = req.params

    try {
        const currentNote = await prisma.notes.findUnique({
            where: { id: id },
            include: { tags: true },
        });

        if (!currentNote) {
            return res.status(404).json({ success: false, error: 'Note not found' });
        }

        const tagIds = currentNote.tags.map((tag) => tag.id);

        const tagsToDelete = tagIds.filter(
            (tagId) => !tags.some((tag: any) => tag.id === tagId)
        );

        await prisma.notes.update({
            where: {
                id: id,
            },
            data: {
                tags: {
                    disconnect: tagsToDelete.map((tagId) => ({ id: tagId })),
                },
            },
        });

        const note = await prisma.notes.update({
            where: {
                id: id,
            },
            data: {
                title,
                content: markdown,
                tags: {
                    connectOrCreate: tags.map((tag: any) => ({

                        where: { label: tag.label },
                        create: { label: tag.label }
                    }
                    )
                    )
                }
            }
        })

        await client.del(`note:user:${id}`)

        res.status(200).json({ success: true, note })
    } catch (err) {
        res.status(400).json({ success: false, error: err })
    }
}


const DeleteNote = async (req: Request, res: Response) => {
    const { id } = req.params

    try {

        await prisma.notes.delete({
            where: {
                id: id,
            },
        })

        await client.del(`note:user:${id}`)

        res.status(200).json({ success: true })
    } catch (err) {
        res.status(400).json({ success: false, error: err })
    }
}

export { GetUserNotes, CreateNote, GetNoteById, UpdateNote, DeleteNote }