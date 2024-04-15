import express from 'express'
import prisma from '../db/db'

const router = express.Router()

router.post('/new_user', async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send('Email and password are required')
    }

    const user = await prisma.user.create({
        data: {
            email,
            password
        }
    })

    res.json(user)
})

export default router