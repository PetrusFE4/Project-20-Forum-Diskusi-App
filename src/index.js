import express from 'express'
import subjectRouter from './routes/subject.js'
import discussionRouter from './routes/discussion.js'
import replyRouter from './routes/reply.js'
import authRouter from './routes/auth.js'
import { connectDB } from './database/mongodb.js'
import { isAuth } from './middlewares/isAuth.js'
import cors from 'cors'

connectDB()

const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost' 
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', authRouter)

app.use('/api/v1/subjects', isAuth, subjectRouter)
app.use('/api/v1/discussions', isAuth, discussionRouter)
app.use('/api/v1/replies', isAuth, replyRouter)

app.listen(port, host, () => {
    console.log(`App listening on port ${port}`)
})