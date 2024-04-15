import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()

const app = express()

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(require('./route/auth'))
app.use(require('./route/note'))

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})
