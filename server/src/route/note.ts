import express from 'express'
import prisma from '../db/db'

const router = express.Router()

router.get('/notes/:id', async (req: express.Request, res: express.Response) => {
    const id = req.params.id
    const note = await prisma.note.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!note) {
        return res.status(404).send('Note not found')
    }

    res.json(note)
})

router.get('/notes', async (req: express.Request, res: express.Response) => {
    const notes = await prisma.note.findMany()

    res.json(notes)
})

router.post('/notes', async (req: express.Request, res: express.Response) => {
    const { title, content, userId, tags } = req.body

    if (!title || !content) {
        return res.status(400).send('Title and content are required')
    }

    const note = await prisma.note.create({
        data: {
            title,
            content,
            userId,
            tags: {
                create: tags
            }
        }
    })

    res.json(note)
})

export default router