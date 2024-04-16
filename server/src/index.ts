import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL
}))
app.use(helmet())
app.use(compression())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./route/auth.route').authRouter)
app.use('/', require('./route/note.route').noteRouter)
app.use('/', require('./route/tag.route').tagRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port ' + process.env.PORT || 3000)
})
