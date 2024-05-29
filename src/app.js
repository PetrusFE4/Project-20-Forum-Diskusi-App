import express from 'express'
import router from './routes/api.js'
import { connectDB } from './database/mongodb.js'
import cors from 'cors'

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', router)

export default app