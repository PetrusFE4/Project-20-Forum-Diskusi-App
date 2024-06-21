import app from './src/app.js'
import fs from 'fs'
import http from 'http'
import { InitWebSocket } from './src/config/websocket.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 3000
const host = process.env.HOST || 'http://localhost'

app.use(express.static(path.join(__dirname, 'public')))
const server = http.createServer(app)
InitWebSocket(server)

var dirs = ['./public/uploads/', './public/uploads/tmp', './public/uploads/community', './public/uploads/post', './public/uploads/user']

for (const dir of dirs) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
}

server.listen(port, () => {
    console.log(`Server is running on${port}`);
})
