import express from 'express'

const Router = express.Router()

Router.get('/', (req: express.Request, res: express.Response) => {
    res.send("For Testing Purpose")
})

export { Router as testRouter }