import express from 'express'
import router from './routes/api.js'
import { connectDB } from './database/mongodb.js'
import cors from 'cors'
import { serve, setup } from 'swagger-ui-express'
import mainSwaggerDoc from '../docs/mainSwaggerDoc.js'
import * as Middleware from './middlewares/index.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

connectDB()

const app = express()
app.use(express.static(path.resolve(__dirname, '../public')))

app.use(cors())
app.use(express.json())

app.use('/docs', serve, setup(mainSwaggerDoc))

app.use('/api/v1', router)

app.use(Middleware.error)

export default app