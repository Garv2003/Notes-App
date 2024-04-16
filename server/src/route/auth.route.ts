import express from 'express'
import prisma from '../db/prisma.db'

const router = express.Router()

router.post('/new_user', async (req: express.Request, res: express.Response) => {

    const { id, fullName, primaryEmailAddress, imageUrl, username } = req.body

    if (!id || !username || !primaryEmailAddress.emailAddress) {
        return res.status(301).send('Id, firstName and email are required')
    }

    try {
        const existuser = await prisma.user.findUnique({
            where: {
                clerkId: id
            }
        })

        if (existuser) {
            return res.status(201).send('User already exists')
        }

        const user = await prisma.user.create({
            data: {
                clerkId: id,
                name: fullName || username,
                email: primaryEmailAddress.emailAddress,
                profileImg: imageUrl,
                username: username
            }
        })

        res.json({ success: true, message: 'User created successfully' })
    } catch (err: any) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})

router.post('/update_user', async (req: express.Request, res: express.Response) => {
    const { email, username, name, clerkId, profileImg } = req.body

    if (!email || !username || !name || !clerkId) {
        return res.status(400).send('Email, username, name, and clerkId are required')
    }

    const user = await prisma.user.update({
        where: {
            clerkId: clerkId
        },
        data: {
            username: username,
            name: name,
            email: email,
            profileImg: profileImg
        }
    })

    res.json({ success: true, message: 'User updated successfully' })
})

export { router as authRouter }