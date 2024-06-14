import express from 'express'
import router from './routes/api.js'
import { connectDB } from './database/mongodb.js'
import cors from 'cors'
import { serve, setup } from 'swagger-ui-express'
import mainSwaggerDoc from '../../docs/mainSwaggerDoc.js'

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/docs', serve, setup(mainSwaggerDoc))

app.use('/api/v1', router)

export default app